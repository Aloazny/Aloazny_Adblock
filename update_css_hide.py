#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
adblock2userscript.py
从 Adblock 规则文件（本地或 URL，可多个叠加）提取「通用元素隐藏规则」，
生成一个原生、无 GM 依赖、高性能的油猴脚本。

用法:
    python adblock2userscript.py easylist.txt -o hide.user.js
    python adblock2userscript.py a.txt b.txt c.txt -o hide.user.js
    python adblock2userscript.py https://easylist.to/easylist/easylist.txt
"""

import argparse
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from urllib.request import Request, urlopen


# --------------------------- 载入 ---------------------------
def load_text(source: str) -> str:
    if source.startswith(("http://", "https://")):
        req = Request(source, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=60) as r:
            return r.read().decode("utf-8", errors="ignore")
    return Path(source).read_bytes().decode("utf-8", errors="ignore")


# --------------------------- 解析 ---------------------------
def extract_generic_rules(text: str) -> list:
    """提取通用元素隐藏规则（## 语法，无域名前缀，排除放行/扩展规则）。"""
    rules = set()
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("!"):
            continue

        # 排除放行规则 #@#
        if "#@#" in line:
            continue
        # 排除扩展/脚本语法 #?#  #%#  (含 #@?# / #@%# 变体)
        if "#?#" in line or "#%#" in line:
            continue
        # 只处理元素隐藏规则
        if "##" not in line:
            continue

        idx = line.find("##")
        domains = line[:idx].strip()
        selector = line[idx + 2:].strip()

        # 通用规则：无域名前缀（有 domain 的属于域特定规则，跳过）
        if domains:
            continue
        if not selector:
            continue
        # 排除 uBO 特有语法：scriptlet / HTML过滤 / 响应头过滤
        if selector.startswith("+js") or selector.startswith("^"):
            continue

        rules.add(selector)

    return sorted(rules)

# --------------------------- 版本 / 旧文件解析 ---------------------------
VERSION_RE = re.compile(r'//\s*@version\s+(\S+)')
SELECTORS_BLOCK_RE = re.compile(
    r'const SELECTORS\s*=\s*\[\s*\n(.*?)\n\s*\];',
    re.DOTALL
)


def gen_version() -> str:
    return datetime.now().strftime("%Y%m%d%H%M%S")


def parse_existing_script(text: str):
    vm = VERSION_RE.search(text)
    version = vm.group(1) if vm else None

    sm = SELECTORS_BLOCK_RE.search(text)
    if not sm:
        return version, None

    selectors = []
    for raw in sm.group(1).splitlines():
        line = raw.strip().rstrip(',')
        if not line:
            continue
        try:
            selectors.append(json.loads(line))
        except json.JSONDecodeError:
            return version, None
    return version, selectors

# --------------------------- 匹配模式处理 ---------------------------
def normalize_match_input(raw):
    """把用户友好输入规范化为油猴 @match 模式。
    支持：裸域名(a.com)、带路径(a.com/foo)、通配子域(*.a.com)、
    通配主机(cn*.91short.com)、完整 URL(https://a.com/path)、
    通配 scheme(*://a.com/*)、残缺输入(://a.com、//a.com)。
    无法识别时原样返回。
    """
    s = raw.strip()
    if not s:
        return None

    if s.startswith('://'):
        s = '*' + s
    elif s.startswith('//'):
        s = '*:' + s

    m = re.match(r'^(\*|https?|ftp)://([^/]+)(/.*)?$', s)
    if m:
        scheme, host, path = m.groups()
        if '*' not in host:
            host = '*.' + host
        return '%s://%s%s' % (scheme, host, path if path else '/*')

    s = s.lstrip('/')
    m = re.match(r'^([^/]+)(/.*)?$', s)
    if not m:
        return raw.strip()
    host, path = m.groups()
    if '.' not in host and '*' not in host:
        return raw.strip()
    if '*' not in host:
        host = '*.' + host
    return '*://%s%s' % (host, path if path else '/*')

def _parse_match_pattern(pattern):
    """把 @match 模式解析为 (scheme, host, path)；无法解析返回 None。"""
    m = re.match(r'^([^:]+)://([^/]+)(/.*)?$', pattern)
    if not m:
        return None
    scheme, host, path = m.groups()
    return scheme, host, path if path else '/*'

def _glob_to_regex(s):
    """glob 片段（* 为通配）转正则片段，其余字符转义。"""
    return ''.join('.*' if c == '*' else re.escape(c) for c in s)

def _build_include_regex(scheme, host, path_regex):
    """由 scheme/host/path 片段拼出 /.../ 形式的 @include 正则。"""
    scheme_re = r'https?' if scheme == '*' else re.escape(scheme)
    if host == '*':
        host_re = r'[^/]+'
    elif host.startswith('*.'):
        host_re = r'(?:[^/]+\.)?' + _glob_to_regex(host[2:])
    else:
        host_re = _glob_to_regex(host)
    return '/^%s://%s%s$/' % (scheme_re, host_re, path_regex)

def optimize_match_patterns(patterns, max_match=5):
    """把模式列表优化为 [('@match'|'@include', value), ...]。
    规则：
      - 数量 <= max_match：全部 @match
      - 否则：按 (scheme, host) 分组，多路径组用 @include 正则合并
      - 优化后条目没有减少则回退为全部 @match
    """
    if len(patterns) <= max_match:
        return [('@match', p) for p in patterns]

    groups = {}
    unparsed = []
    for p in patterns:
        parsed = _parse_match_pattern(p)
        if parsed is None:
            unparsed.append(p)
            continue
        scheme, host, path = parsed
        groups.setdefault((scheme, host), []).append(path)

    result = [('@match', p) for p in unparsed]
    for (scheme, host), paths in groups.items():
        unique_paths = sorted(set(paths))
        if len(unique_paths) == 1:
            result.append(('@match', '%s://%s%s' % (scheme, host, unique_paths[0])))
        else:
            path_res = [_glob_to_regex(p) for p in unique_paths]
            combined = '(?:%s)' % '|'.join(path_res)
            result.append(('@include', _build_include_regex(scheme, host, combined)))

    if len(result) >= len(patterns):
        return [('@match', p) for p in patterns]
    return result

def format_match_lines(items):
    """把 (kind, value) 列表格式化为元数据行。"""
    lines = []
    for kind, value in items:
        pad = ' ' * max(1, 14 - len(kind))
        lines.append('// %s%s%s' % (kind, pad, value))
    return '\n'.join(lines)
# --------------------------- 模板 ---------------------------
USERSCRIPT_TEMPLATE = r'''// ==UserScript==
// @name  __NAME__
// @namespace  https://viayoo.com/xrgy5f
// @version  __VERSION__
// @author  Github@lingeringsound && damengzhu && Deepseek
// @description  由AI提取并生成通用规则提取的高性能CSS隐藏 + uBO/AdGuard scriptlet 注入，无GM依赖，附带按站点拦截/放行管理界面。
__MATCH_LINES__
// @icon  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAeFBMVEVHcEwZHi0XHCoRFSACAwYEBgwTFyMNEBoNEBoaHy7/dFS5VERYW2Xe5O49JjD/c1aMkZ34blQ5PUn6c1PR1+GVmaKDiJRfYmwnKzhQVGAoIzD9el9oMzW/ZVvvubnGdG1NP0hDMDrOhIBPTFl1eoXOg4G7wMngoqE4WKtbAAAACXRSTlMA9teLECOmY2ErhICWAAACK0lEQVR42qWX6XKbMBCAVyuJq7U9uJO+/+Nl0pm6JNTl0FGBDQaHQ9qs/1iMv4/VCsmsgCEkN8omsB8VE6jbYcQG3FgvenAwbKcCwdsYwqKWWo0CYU0CoVEh6wzY8UjgITEobhmQ7j/m4DLgRN7lwLsMpI6BGjVvOTA6D0JZIXUolSOYy/27lYKrQF4WETT53WC5CK2g1JFpYxzqqFER+MlYoSXwaWOGC5alBL7ijyTEF/kgwRIfIljk4akGJ/axKrAdnwt8hXXBSa8vyo9XcDy/Ml7A6hSYrVcf4LLnLxCz2XWc767zKq/LGw/nemMKwIVc5M+l49PvV4BW6S1BSP39l3GL9xFs8h6CbX5fsMPvCvb4PcEu/yzIq9nw+Ks/f7LDu4Dksih42gt2vhfSUrnnLy77X/LLfgaNaKbDl7fu+Y9/94OoWsxgvhei4yoPx8hjCu64/DZ+T/44Ps3uOf2N/vkIQuq/vYy+/JrAm18R+PPLggB+URDCLwmC+E+CE6RvN/7nfd2LbcH8SYSUlarnM+beRvvYOTSfNhP7yK+q4x8b52AL/wwwG/nD8MkwIIOhfi/vkw1W+AvC6v95FSj8VEDiAcdzJifxlRj/rJHCAxOTORB412uMczBNHAfzrmV4vO1PX6J9o+YMeATkqFAjYE0XMIdDKytyArKFruthraDxaE0nMFw0gnR/cL0C7xaQlEOFMDSeoFgUXMk6Yo/WF77cfPcKWvv/H7EBM8SJcT2bAAAAAElFTkSuQmCC
// @run-at  document-start
// @license  GPL-3.0-or-later
// @grant  none
// ==/UserScript==

(function () {
	'use strict';

	// 规则来源于合并规则 https://raw.githubusercontent.com/Aloazny/Aloazny_Adblock/main/Rules/Adblock_attach.txt
	// 原始规则来源于Github@lingeringsound(@coolapk 10007) https://raw.githubusercontent.com/lingeringsound/adblock_auto/main/base/%E5%85%B6%E4%BB%96.prop
	// 以及Github@damengzhu(@coolapk 大萌主) https://raw.githubusercontent.com/damengzhu/banad/main/jiekouAD.txt
	// 感谢大佬的规则！
	// ====== Css通用选择器 ======
	const SELECTORS = [
__SELECTORS__
	];

	// ====== 预置常用规则（勾选式载入） ======
	const PRESET_RULES = [
		{
			title: '对抗流氓网站',
			desc: '拦截 navigator.platform 读取，常用对抗流氓网站的规则',
			rule: '##+js(aopr, navigator.platform)'
		},
		{
			title: '禁用 WebRTC',
			desc: '禁用该网站的 WebRTC，防止真实 IP 泄露',
			rule: '##+js(nowebrtc)'
		},
		{
			title: '禁用新标签页打开',
			desc: '禁用网页通过 window.open 打开新标签页',
			rule: '##+js(nowoif)'
		},
		{
			title: '移除悬浮元素',
			desc: '移除底部悬浮广告、诱导点击层等常见悬浮元素',
			rule: 'body > [style*="position:fixed; bottom:0vw; left:0vw; z-index:"],div[style*="bottom:0vw;"][style*="9.6vw;"][style$="background: #000;opacity:0.01;"],body > [style*="background"][style*="#000"][style$="opacity:0.01;"],[style$="z-index:100;display:block;width:9.6vw;height:7.96875vw;background: #000;opacity:0.01;"]'
		}
	];

	const CONFIG = {
		IDLE_TIME: 3000,
		MANAGED_STYLE_ID: '__css_logger_managed__',
		HIDE_DECL: ' {display:none!important;}',
		SHOW_DECL: ' {display:revert!important;}',
		STORAGE_PREFIX: 'css_logger_'
	};

	// ================= 通用工具 =================
	function generateToken() {
		return String.fromCharCode(Date.now() % 26 + 97) +
			Math.floor(982451653 * Math.random() + 982451653).toString(36);
	}
	function hookOnError(token) {
		const orig = window.onerror;
		window.onerror = function (msg) {
			if (typeof msg === 'string' && msg.indexOf(token) !== -1) return true;
			if (orig instanceof Function) return orig.apply(this, arguments);
		}.bind();
	}
	function toRegex(pattern) {
		if (!pattern || pattern === '') return /^/;
		if (pattern.length >= 2 && pattern[0] === '/' && pattern[pattern.length - 1] === '/') {
			try { return new RegExp(pattern.slice(1, -1)); } catch (e) { return /^/; }
		}
		return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
	}
	const _hostReCache = new Map();
	function hostMatch(hostPattern) {
		if (!hostPattern || hostPattern === '*') return true;
		const hostname = location.hostname;
		if (hostPattern.indexOf(',') !== -1) {
			return hostPattern.split(',').some(h => hostMatch(h.trim()));
		}
		if (hostPattern.indexOf('*') !== -1) {
			let regex = _hostReCache.get(hostPattern);
			if (!regex) {
				regex = new RegExp('^' + hostPattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^.]*') + '$', 'i');
				_hostReCache.set(hostPattern, regex);
			}
			return regex.test(hostname);
		}
		return hostname === hostPattern || hostname.endsWith('.' + hostPattern);
	}

	// ================= Scriptlet 库 =================
	const Scriptlets = Object.create(null);

	// aopr / abort-on-property-read
	function aoprImpl(prop) {
		if (!prop) return;
		const token = generateToken();
		const throwErr = function () { throw new ReferenceError(token); };
		const install = function (obj, path) {
			const dot = path.indexOf('.');
			if (dot === -1) {
				const desc = Object.getOwnPropertyDescriptor(obj, path);
				if (!desc || desc.get !== throwErr) {
					try {
						Object.defineProperty(obj, path, {
							get: throwErr,
							set: function () {},
							configurable: true
						});
					} catch (e) {}
				}
				return;
			}
			const key = path.slice(0, dot);
			let val = obj[key];
			path = path.slice(dot + 1);
			if (val) { install(val, path); return; }
			const desc = Object.getOwnPropertyDescriptor(obj, key);
			if (desc && desc.set !== undefined) return;
			try {
				Object.defineProperty(obj, key, {
					get: function () { return val; },
					set: function (v) { val = v; if (v instanceof Object) install(v, path); },
					configurable: true
				});
			} catch (e) {}
		};
		install(window, prop);
		hookOnError(token);
	}
	Scriptlets['aopr'] = aoprImpl;
	Scriptlets['abort-on-property-read'] = aoprImpl;

	// aopw / abort-on-property-write
	function aopwImpl(prop) {
		if (!prop) return;
		const token = generateToken();
		let obj = window, key = prop;
		for (;;) {
			const dot = key.indexOf('.');
			if (dot === -1) break;
			obj = obj[key.slice(0, dot)];
			if (obj instanceof Object === false) return;
			key = key.slice(dot + 1);
		}
		try { delete obj[key]; } catch (e) {}
		try {
			Object.defineProperty(obj, key, {
				set: function () { throw new ReferenceError(token); },
				configurable: true
			});
		} catch (e) { return; }
		hookOnError(token);
	}
	Scriptlets['aopw'] = aopwImpl;
	Scriptlets['abort-on-property-write'] = aopwImpl;

	// acis / abort-current-inline-script
	function acisImpl(prop, pattern) {
		if (!prop) return;
		const regex = toRegex(pattern || '');
		const parts = prop.split('.');
		let obj = window, key;
		for (;;) {
			key = parts.shift();
			if (parts.length === 0) break;
			obj = obj[key];
			if (obj instanceof Object === false) return;
		}
		const desc = Object.getOwnPropertyDescriptor(obj, key);
		let saved, hasGetter = false;
		if (desc instanceof Object && desc.get instanceof Function) hasGetter = true;
		else saved = obj[key];

		const token = generateToken();
		const check = function () {
			const s = document.currentScript;
			if (s instanceof HTMLScriptElement && s.src === '' && regex.test(s.textContent)) {
				throw new ReferenceError(token);
			}
		};
		try {
			Object.defineProperty(obj, key, {
				get: function () { check(); return hasGetter ? desc.get() : saved; },
				set: function (v) { check(); if (hasGetter) desc.set(v); else saved = v; },
				configurable: true
			});
		} catch (e) { return; }
		hookOnError(token);
	}
	Scriptlets['acis'] = acisImpl;
	Scriptlets['abort-current-inline-script'] = acisImpl;

	// noop / noopjs
	const noopImpl = function () {};
	Scriptlets['noop'] = noopImpl;
	Scriptlets['noopjs'] = noopImpl;

	// noeval / silent-noeval
	function noevalImpl() {
		window.eval = new Proxy(window.eval, { apply: function () {} });
	}
	Scriptlets['noeval'] = noevalImpl;
	Scriptlets['silent-noeval'] = noevalImpl;

	// set-constant / set
	function setConstantImpl(prop, value) {
		if (!prop) return;
		let v;
		if (value === 'undefined') v = undefined;
		else if (value === 'false') v = false;
		else if (value === 'true') v = true;
		else if (value === 'null') v = null;
		else if (value === 'noopFunc') v = function () {};
		else if (value === 'trueFunc') v = function () { return true; };
		else if (value === 'falseFunc') v = function () { return false; };
		else if (value === "''") v = '';
		else if (/^\d+$/.test(value)) { v = parseFloat(value); if (Math.abs(v) > 32767) return; }
		else return;
		const parts = prop.split('.');
		let obj = window, key;
		for (;;) {
			key = parts.shift();
			if (parts.length === 0) break;
			obj = obj[key];
			if (obj instanceof Object === false) return;
		}
		try {
			Object.defineProperty(obj, key, {
				get: function () { return v; },
				set: function () {},
				configurable: true
			});
		} catch (e) {}
	}
	Scriptlets['set'] = setConstantImpl;
	Scriptlets['set-constant'] = setConstantImpl;

	// no-fetch-if
	function noFetchIfImpl() {
		const args = Array.prototype.slice.call(arguments).join(' ').trim();
		const needles = [];
		if (args) {
			for (const cond of args.split(/\s+/)) {
				if (!cond) continue;
				let key = 'url', value = cond;
				const pos = cond.indexOf(':');
				if (pos !== -1) { key = cond.slice(0, pos); value = cond.slice(pos + 1); }
				needles.push({ key, re: toRegex(value) });
			}
		}
		self.fetch = new Proxy(self.fetch, {
			apply: function (target, thisArg, args2) {
				if (needles.length === 0) return Reflect.apply(target, thisArg, args2);
				let proceed = true;
				try {
					let details;
					if (args2[0] instanceof Request) details = args2[0];
					else details = Object.assign({ url: args2[0] }, args2[1] || {});
					for (const { key, re } of needles) {
						const val = details[key];
						if (typeof val !== 'string' || !re.test(val)) { proceed = true; break; }
						proceed = false;
					}
				} catch (e) { proceed = true; }
				return proceed ? Reflect.apply(target, thisArg, args2) : Promise.resolve(new Response());
			}
		});
	}
	Scriptlets['no-fetch-if'] = noFetchIfImpl;

	// nowebrtc
	function nowebrtcImpl() {
		const name = window.RTCPeerConnection ? 'RTCPeerConnection'
			: window.webkitRTCPeerConnection ? 'webkitRTCPeerConnection' : '';
		if (!name) return;
		const nop = function () {};
		const Faker = function () {};
		Faker.prototype = {
			close: nop, createDataChannel: nop, createOffer: nop,
			setRemoteDescription: nop,
			toString: function () { return '[object RTCPeerConnection]'; }
		};
		const orig = window[name];
		window[name] = Faker;
		if (orig.prototype) {
			orig.prototype.createDataChannel = function () {
				return { close: nop, send: nop };
			};
		}
	}
	Scriptlets['nowebrtc'] = nowebrtcImpl;

	// aeld / addEventListener-defuser
	function aeldImpl(type, pattern) {
		const typeRe = toRegex(type || '');
		const patternRe = toRegex(pattern || '');
		const orig = self.EventTarget.prototype.addEventListener;
		self.EventTarget.prototype.addEventListener = new Proxy(orig, {
			apply: function (target, thisArg, args) {
				const t = String(args[0]);
				const fn = String(args[1]);
				if (typeRe.test(t) && patternRe.test(fn)) return;
				return target.apply(thisArg, args);
			}
		});
	}
	Scriptlets['aeld'] = aeldImpl;
	Scriptlets['addEventListener-defuser'] = aeldImpl;

	// nowoif / no-window-open-if
	function nowoifImpl(pattern) {
		let pat = pattern || '';
		let inverted = false;
		if (pat.charAt(0) === '!') { inverted = true; pat = pat.slice(1); }
		let re;
		if (!pat || pat === '') re = /^/;
		else if (pat.length >= 2 && pat.charAt(0) === '/' && pat.charAt(pat.length - 1) === '/') {
			try { re = new RegExp(pat.slice(1, -1)); } catch (e) { re = /^/; }
		} else {
			re = new RegExp(pat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
		}
		window.open = new Proxy(window.open, {
			apply: function (target, thisArg, args) {
				const url = String(args[0] || '');
				if (re.test(url) !== inverted) return null;
				return Reflect.apply(target, thisArg, args);
			}
		});
	}
	Scriptlets['nowoif'] = nowoifImpl;
	Scriptlets['no-window-open-if'] = nowoifImpl;

	// ================= 规则解析 =================
	function parseScriptlet(line) {
		// uBO: host##+js(name, arg1, arg2)
		let m = line.match(/^(.*?)##\+js\(\s*([^,)]+)\s*(?:,\s*([^)]*))?\)\s*$/);
		if (m) {
			const host = (m[1] || '').trim();
			const name = m[2].trim();
			const argsStr = m[3] || '';
			const args = argsStr ? argsStr.split(',').map(s => s.trim()).filter(s => s !== '') : [];
			return { host, name, args };
		}
		// AdGuard: host#%#//scriptlet('name', 'arg1')
		m = line.match(/^(.*?)#%#\/\/scriptlet\(\s*['"]([^'"]+)['"]\s*(?:,\s*(.+))?\)\s*$/);
		if (m) {
			const host = (m[1] || '').trim();
			const name = m[2].trim();
			const args = [];
			if (m[3]) {
				const re = /['"]([^'"]*)['"]/g;
				let mm;
				while ((mm = re.exec(m[3])) !== null) args.push(mm[1]);
			}
			return { host, name, args };
		}
		return null;
	}

	function parseCssRule(line, defaultType) {
		const allowMatch = line.match(/^(.*?)#@#(.+)$/);
		if (allowMatch) {
			const sel = allowMatch[2].trim();
			if (!sel) return null;
			const host = allowMatch[1].trim();
			if (host && !hostMatch(host)) return null;
			return { type: 'allow', selector: sel };
		}
		const blockMatch = line.match(/^(.*?)##(.+)$/);
		if (blockMatch) {
			const sel = blockMatch[2].trim();
			if (!sel || sel.startsWith('+js')) return null;
			const host = blockMatch[1].trim();
			if (host && !hostMatch(host)) return null;
			return { type: 'block', selector: sel };
		}
		return { type: defaultType || 'block', selector: line };
	}

	// ================= 存储 =================
	const Store = {
		get(key, def) {
			try {
				const v = localStorage.getItem(CONFIG.STORAGE_PREFIX + key);
				return v === null ? def : JSON.parse(v);
			} catch (e) { return def; }
		},
		set(key, val) {
			try { localStorage.setItem(CONFIG.STORAGE_PREFIX + key, JSON.stringify(val)); } catch (e) {}
		}
	};

	// ============ 阶段一：通用 CSS 注入（最高优先级） ============
	(function injectBase() {
		if (!SELECTORS.length) return;
		const STYLE_ID  = '__adblock_generic_hide__';
		const HIDE_DECL = '{display:none!important;}';
		// 关键性能点：一次性 join 出完整 CSS 文本
		// 相比逐条 style.sheet.insertRule()，避免了 N 次样式重算
		const cssText = SELECTORS.map(function (s) { return s + HIDE_DECL; }).join('\n');

		if (document.getElementById(STYLE_ID)) return;
		const style = document.createElement('style');
		style.id = STYLE_ID;
		style.type = 'text/css';
		// 用 textContent 而非 innerHTML：跳过 HTML 解析器
		style.textContent = cssText;
		const target = document.head || document.documentElement;
		if (target) {
			target.appendChild(style);
		} else {
			// 极早期（documentElement 尚未生成）时兜底
			const obs = new MutationObserver(function () {
				const t = document.head || document.documentElement;
				if (t) {
					t.appendChild(style);
					obs.disconnect();
				}
			});
			obs.observe(document, { childList: true, subtree: true });
		}
	})();

	// ============ 阶段二：document-start 执行 scriptlet ============
	(function runScriptletsAtStart() {
		const hostname = location.hostname;
		const blockLines = Store.get('userBlocks', {})[hostname] || [];
		const allowLines = Store.get('userAllows', {})[hostname] || [];
		const globalBlocks = Store.get('globalBlocks', []) || [];

		const allLines = blockLines.concat(allowLines, globalBlocks);
		const seen = new Set();

		for (const line of allLines) {
			const parsed = parseScriptlet(line);
			if (!parsed) continue;
			if (parsed.host && !hostMatch(parsed.host)) continue;
			const key = parsed.name + '|' + parsed.args.join('|');
			if (seen.has(key)) continue;
			seen.add(key);
			const fn = Scriptlets[parsed.name];
			if (typeof fn !== 'function') continue;
			try { fn.apply(null, parsed.args); } catch (e) {}
		}
	})();

	// ============ 阶段三：用户 CSS 注入 ============
	function injectManagedCss() {
		const hostname = location.hostname;
		const blockLines = Store.get('userBlocks', {})[hostname] || [];
		const allowLines = Store.get('userAllows', {})[hostname] || [];

		const parts = [];

		const addRules = (lines, defaultType) => {
			for (const line of lines) {
				const r = parseCssRule(line, defaultType);
				if (!r) continue;
				if (r.type === 'block') parts.push(r.selector + CONFIG.HIDE_DECL);
				else parts.push(r.selector + CONFIG.SHOW_DECL);
			}
		};
		addRules(blockLines, 'block');
		addRules(allowLines, 'allow');

		let style = document.getElementById(CONFIG.MANAGED_STYLE_ID);
		if (!style) {
			style = document.createElement('style');
			style.id = CONFIG.MANAGED_STYLE_ID;
			style.type = 'text/css';
			const target = document.head || document.documentElement;
			if (target) target.appendChild(style);
			else return; // 极早期，等 DOMContentLoaded
		}
		style.textContent = parts.join('\n');
	}

	if (document.documentElement) injectManagedCss();

	// ================= 面板打开时的跳转保护 =================
	const Protect = {
		active: false,
		hiddenNodes: [],
		origOpen: null,
		clickHandler: null,

		isCrossOrigin(url) {
			if (!url || typeof url !== 'string') return false;
			if (/^(javascript|data|about|blob|mailto|tel|#)/i.test(url)) return false;
			try {
				const t = new URL(url, location.href);
				return t.hostname !== location.hostname;
			} catch (e) { return false; }
		},

		enable() {
			if (this.active) return;
			this.active = true;
			const self = this;
			this.origOpen = window.open;
			window.open = function (url) {
				if (self.isCrossOrigin(url)) return null;
				return self.origOpen.apply(this, arguments);
			};
			this.clickHandler = function (e) {
				let t = e.target;
				while (t && t.tagName !== 'A') t = t.parentNode;
				if (!t || !t.href) return;
				const href = t.getAttribute('href') || t.href;
				if (self.isCrossOrigin(href)) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
				}
			};
			document.addEventListener('click', this.clickHandler, true);
			this.hideFloating();
		},
		disable() {
			if (!this.active) return;
			this.active = false;
			if (this.origOpen) window.open = this.origOpen;
			if (this.clickHandler) document.removeEventListener('click', this.clickHandler, true);
			this.restoreFloating();
		},
		hideFloating() {
			try {
				document.querySelectorAll('body > *').forEach(el => {
					if (el.id === 'css-logger-container') return;
					try {
						const cs = window.getComputedStyle(el);
						if (cs.position !== 'fixed' && cs.position !== 'sticky') return;
						const zi = parseInt(cs.zIndex, 10);
						if (isNaN(zi) || zi < 1000) return;
						if (el.style.display === 'none') return;
						this.hiddenNodes.push(el);
						el.style.setProperty('display', 'none', 'important');
					} catch (e) {}
				});
			} catch (e) {}
		},
		restoreFloating() {
			for (const el of this.hiddenNodes) {
				try { el.style.removeProperty('display'); } catch (e) {}
			}
			this.hiddenNodes = [];
		}
	};

	// ================= UI =================
	const Core = {
		highlightAdRule(rule) {
			const slt = rule.match(/^(.*?)##\+js\(\s*([^,)]+)\s*(?:,\s*([^)]*))?\)\s*$/);
			if (slt) {
				const host = slt[1] || '';
				const name = slt[2].trim();
				const args = (slt[3] || '').split(',').map(s => s.trim()).filter(s => s !== '');
				let inner = '<span class="hl-slt-name">' + name + '</span>';
				for (const a of args) {
					inner += '<span class="hl-comma">, </span>';
					if (a.length >= 2 && a[0] === '/' && a[a.length - 1] === '/') {
						inner += '<span class="hl-regex">' + a + '</span>';
					} else if (/^[a-zA-Z_$][\w$]*(\.[a-zA-Z_$][\w$]*)+$/.test(a)) {
						inner += '<span class="hl-path">' + a + '</span>';
					} else if (/^(noopFunc|trueFunc|falseFunc|true|false|null|undefined|'')$/.test(a)) {
						inner += '<span class="hl-const">' + a + '</span>';
					} else {
						inner += '<span class="hl-arg">' + a + '</span>';
					}
				}
				return '<span class="hl-domain">' + host + '</span>' +
					'<span class="hl-slt-sep">##+js</span>' +
					'<span class="hl-paren">(</span>' +
					inner +
					'<span class="hl-paren">)</span>';
			}
			const match = rule.match(/^(.*?)(###?)(.*)$/);
			if (!match) return '<span>' + rule + '</span>';
			let rest = match[3]
				.replace(/("(.*?)")/g, '<span class="hl-url">"$2"</span>')
				.replace(/(:(?:has|not|is|where|nth-child|hover|focus|active))(\(.*?\))?/g,
					'<span class="hl-pseudo">$1</span><span class="hl-paren">$2</span>');
			return '<span class="hl-domain">' + match[1] + '</span>' +
				'<span class="hl-sep">' + match[2] + '</span>' +
				'<span class="hl-selector">' + rest + '</span>';
		},
		async copyText(text) {
			try {
				if (navigator.clipboard && window.isSecureContext) {
					await navigator.clipboard.writeText(text);
					return true;
				}
			} catch (e) {}
			try {
				const input = document.createElement('textarea');
				input.value = text;
				input.style.position = 'fixed';
				input.style.opacity = '0';
				document.body.appendChild(input);
				input.select();
				document.execCommand('copy');
				document.body.removeChild(input);
				return true;
			} catch (e) { return false; }
		}
	};

	const UI_CSS = `
	#mask { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: none; z-index: 999998; backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
	#fab { position: fixed; right: 0; top: 35%; transform: translateY(-50%); width: 42px; height: 46px; background: rgba(255, 255, 255, 0.6); color: #000; border-radius: 21px 0 0 21px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: -2px 0 12px rgba(0,0,0,0.1); z-index: 999997; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); padding-left: 4px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3); border-right: none; font-size: 13px; font-weight: 700; user-select: none; touch-action: none; }
	#fab::before { content: "CSS"; }
	#fab.idle { opacity: 0.3; transform: translateY(-50%) translateX(25px); }
	#panel { display: none; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 400px; max-width: 92vw; height: 560px; max-height: 85vh; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; z-index: 999999; border: 1px solid rgba(255,255,255,0.4); font-family: -apple-system, system-ui; box-shadow: 0 20px 60px rgba(0,0,0,0.25); overflow: hidden; }
	.header { display: flex; justify-content: space-between; align-items: center; padding: 20px 20px 10px 20px; }
	.header h3 { margin: 0; font-size: 18px; font-weight: 800; color: #1d1d1f; }
	.close-btn { cursor: pointer; padding: 4px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s; color: #1d1d1f; }
	.close-btn:hover { background: rgba(0,0,0,0.1); }
	.tabs { display: flex; padding: 0 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 15px; }
	.tab { font-size: 13px; font-weight: bold; color: #536471; padding-bottom: 8px; cursor: pointer; border-bottom: 2px solid transparent; }
	.tab.active { color: #1d9bf0; border-bottom-color: #1d9bf0; }
	.view-slider { display: flex; width: 400%; height: calc(100% - 95px); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
	.page { width: 25%; height: 100%; box-sizing: border-box; padding: 15px 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
	label { display: block; font-size: 12px; font-weight: bold; color: #536471; margin-bottom: 4px; }
	.hint { font-size: 11px; color: #888; margin-bottom: 4px; line-height: 1.4; }
	.hint code { background: rgba(0,0,0,0.05); padding: 1px 4px; border-radius: 4px; font-family: monospace; }
	textarea { width: 100%; flex: 1; min-height: 180px; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 10px; box-sizing: border-box; resize: none; outline: none; transition: all 0.2s; background: rgba(255,255,255,0.5); font-size: 12px; font-family: monospace; line-height: 1.5; }
	textarea:focus { border-color: #1d9bf0; background: #fff; box-shadow: 0 0 0 3px rgba(29,155,240,0.1); }
	.save { background: #1d9bf0; color: #fff; padding: 11px; border-radius: 12px; border: none; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 13px; }
	.save:hover { background: #1a8cd8; }
	.save:active { transform: scale(0.96); }
	.save.danger { background: #ff3b30; }
	.save.danger:hover { background: #d92d23; }
	.preset-btn { background: #af52de; color: #fff; padding: 11px; border-radius: 12px; border: none; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 13px; }
	.preset-btn:hover { background: #9b45c8; }
	.preset-btn:active { transform: scale(0.96); }
	.btn-row { display: flex; gap: 8px; }
	.btn-row > button { flex: 1; }
	.list-container { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 4px; }
	.list-container::-webkit-scrollbar { width: 4px; }
	.list-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
	.active-card { background: rgba(255,255,255,0.6); border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 8px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.2s; }
	.active-card:hover { background: #fff; box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
	.active-card.done { opacity: 0.35; pointer-events: none; }
	.active-card.scriptlet { border-left: 3px solid #af52de; }
	.active-line { font-family: "SF Mono", SFMono-Regular, Consolas, monospace; font-size: 12px; line-height: 1.4; word-break: break-all; }
	.active-footer { display: flex; justify-content: space-between; align-items: center; }
	.active-badge { background: rgba(0,122,255,0.08); color: #007AFF; font-size: 11px; padding: 3px 8px; border-radius: 8px; font-weight: 600; }
	.active-badge.slt { background: rgba(175,82,222,0.1); color: #af52de; }
	.active-footer .btn-group { display: flex; gap: 6px; }
	.copy-btn { background: #34c759; color: #fff; padding: 6px 14px; border-radius: 10px; border: none; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
	.copy-btn:hover { background: #2aa94a; }
	.copy-btn:active { transform: scale(0.95); }
	.allow-btn { background: #ff9500; color: #fff; padding: 6px 14px; border-radius: 10px; border: none; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
	.allow-btn:hover { background: #e68600; }
	.allow-btn:active { transform: scale(0.95); }
	.remove-btn { background: #ff3b30; color: #fff; padding: 6px 14px; border-radius: 10px; border: none; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
	.remove-btn:hover { background: #d92d23; }
	.remove-btn:active { transform: scale(0.95); }
	.empty { text-align: center; color: #888; font-size: 13px; padding: 40px 0; }
	.hl-domain { color: #ff8c00; font-weight: 600; }
	.hl-sep { color: #007bff; font-weight: 700; }
	.hl-selector { color: #808080; }
	.hl-url { color: #ff0000; font-weight: 600; }
	.hl-pseudo { color: #d197d9; font-weight: 600; }
	.hl-paren { color: #deb887; }
	.hl-slt-sep { color: #007bff; font-weight: 700; }
	.hl-slt-name { color: #af52de; font-weight: 700; }
	.hl-regex { color: #ff6b35; font-weight: 600; }
	.hl-path { color: #34c759; font-weight: 600; }
	.hl-const { color: #ff1493; font-weight: 600; }
	.hl-arg { color: #34c759; font-weight: 600; }
	.hl-comma { color: #808080; }
	.toast-msg { position: fixed; top: 80vh; left: 50vw; transform: translate(-50%,-50%); background: rgba(255,255,255,0.3); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); padding: 12px 20px; border-radius: 22px; box-shadow: 0 6px 24px rgba(0,0,0,0.15); color: #1C2526; font-family: -apple-system, system-ui; font-size: 15px; font-weight: 500; text-align: center; border: 1px solid rgba(255,255,255,0.25); opacity: 0; transition: opacity 0.3s ease-in-out; white-space: pre-wrap; z-index: 2147483647; }
	#preset-modal { display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.35); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); z-index: 20; align-items: center; justify-content: center; padding: 16px; box-sizing: border-box; }
	#preset-modal.show { display: flex; }
	.preset-dialog { width: 100%; max-width: 340px; max-height: 100%; background: #fff; border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 12px 32px rgba(0,0,0,0.2); overflow: hidden; }
	.preset-dialog h4 { margin: 0; font-size: 15px; font-weight: 800; color: #1d1d1f; }
	.preset-list { display: flex; flex-direction: column; gap: 8px; overflow-y: auto; padding-right: 2px; }
	.preset-list::-webkit-scrollbar { width: 4px; }
	.preset-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
	.preset-item { display: flex; gap: 10px; padding: 10px; border-radius: 10px; background: rgba(0,0,0,0.03); cursor: pointer; transition: background 0.15s; align-items: flex-start; }
	.preset-item:hover { background: rgba(0,0,0,0.06); }
	.preset-item.disabled { opacity: 0.5; cursor: default; }
	.preset-item input[type="checkbox"] { margin: 3px 0 0 0; flex-shrink: 0; }
	.preset-item .info { flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; }
	.preset-item .title { font-weight: 700; font-size: 13px; color: #1d1d1f; display: flex; align-items: center; gap: 6px; }
	.preset-item .title .done-tag { color: #34c759; font-size: 11px; font-weight: 600; }
	.preset-item .desc { font-size: 11px; color: #888; line-height: 1.4; }
	.preset-item .rule { font-size: 10px; color: #aaa; font-family: "SF Mono", Consolas, monospace; word-break: break-all; line-height: 1.3; }
	.preset-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px; }
	.preset-actions button { padding: 9px 16px; border-radius: 10px; border: none; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; }
	.preset-actions .cancel { background: #eee; color: #333; }
	.preset-actions .cancel:hover { background: #e0e0e0; }
	.preset-actions .confirm { background: #af52de; color: #fff; }
	.preset-actions .confirm:hover { background: #9b45c8; }
	@media (prefers-color-scheme: dark) {
		#fab { background: rgba(0, 0, 0, 0.6); color: #fff; }
		#panel { background: rgba(21, 32, 43, 0.85); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
		.header h3 { color: #fff; }
		.close-btn { color: #fff; }
		.close-btn:hover { background: rgba(255,255,255,0.1); }
		.tabs { border-bottom-color: rgba(255,255,255,0.05); }
		.tab { color: #8b98a5; }
		.tab.active { color: #1d9bf0; }
		label { color: #8b98a5; }
		.hint { color: #6b7580; }
		.hint code { background: rgba(255,255,255,0.08); }
		textarea { background: rgba(0,0,0,0.3); color: #fff; border-color: rgba(255,255,255,0.1); }
		textarea:focus { background: rgba(0,0,0,0.5); }
		.active-card { background: rgba(44,44,46,0.6); border-color: rgba(255,255,255,0.05); }
		.active-card:hover { background: rgba(58,58,60,0.8); }
		.hl-selector { color: #d1d1d6; }
		.toast-msg { background: rgba(44,44,46,0.5); color: #fff; border-color: rgba(255,255,255,0.1); }
		.preset-dialog { background: #2c2c2e; }
		.preset-dialog h4 { color: #fff; }
		.preset-item { background: rgba(255,255,255,0.05); }
		.preset-item:hover { background: rgba(255,255,255,0.1); }
		.preset-item .title { color: #fff; }
		.preset-item .desc { color: #8b98a5; }
		.preset-item .rule { color: #6b7580; }
		.preset-actions .cancel { background: rgba(255,255,255,0.1); color: #fff; }
		.preset-actions .cancel:hover { background: rgba(255,255,255,0.18); }
	}
	`;

	const UI = {
		container: null,
		shadow: null,

		ensureShadow() {
			if (this.container) return;
			this.container = document.createElement('div');
			this.container.id = 'css-logger-container';
			document.documentElement.appendChild(this.container);
			this.shadow = this.container.attachShadow({ mode: 'closed' });
			const style = document.createElement('style');
			style.textContent = UI_CSS;
			this.shadow.appendChild(style);
		},

		toast(msg) {
			this.ensureShadow();
			const toast = document.createElement('div');
			toast.className = 'toast-msg';
			toast.textContent = msg;
			this.shadow.appendChild(toast);
			requestAnimationFrame(() => toast.style.opacity = '1');
			setTimeout(() => {
				toast.style.opacity = '0';
				setTimeout(() => toast.remove(), 300);
			}, 2200);
		},

		buildPanelSkeleton() {
			const wrap = document.createElement('div');
			wrap.innerHTML = `
				<div id="mask"></div>
				<div id="fab"></div>
				<div id="panel">
					<div class="header">
						<h3>CSS + Scriptlet 管理</h3>
						<div class="close-btn" id="closeX"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></div>
					</div>
					<div class="tabs">
						<div class="tab active" data-idx="0">拦截规则</div>
						<div class="tab" data-idx="1">放行规则</div>
						<div class="tab" data-idx="2">移除规则</div>
						<div class="tab" data-idx="3">生效规则</div>
					</div>
					<div class="view-slider" id="slider">
						<div class="page">
							<label>拦截规则（每行一条）</label>
							<div class="hint">CSS：<code>.ad-banner</code>　uBO：<code>##+js(aopr, navigator.platform)</code>　AG：<code>#%#//scriptlet('aopw','adblock')</code><br>⚠ Scriptlet 修改后需 <b>刷新页面</b> 才能生效</div>
							<textarea id="block-ta" placeholder=".ad-banner&#10;example.com##+js(aopr, __Ybid_)&#10;example.com##+js(acis, document.onkeydown, /popup/)&#10;example.com#%#//scriptlet('aopw', 'foo.bar')"></textarea>
							<div class="btn-row">
								<button class="preset-btn" id="loadPreset">载入常用</button>
								<button class="save" id="saveBlocks">保存并应用</button>
							</div>
						</div>
						<div class="page">
							<label>放行规则（每行一条）</label>
							<div class="hint">用 <code>#@#</code> 放行被拦截的 CSS；scriptlet 不支持放行</div>
							<textarea id="allow-ta" placeholder=".some-important-element&#10;example.com#@#.ad-banner"></textarea>
							<button class="save" id="saveAllows">保存并应用</button>
						</div>
						<div class="page">
							<label>移除规则（每行一条）</label>
							<div class="hint">支持 CSS 与 Adblock 语法混用：<code>.ad-banner</code>　<code>example.com##.ad-banner</code><br>在通用隐藏 + 用户拦截生效之后，把匹配元素从 DOM 中直接移除（类似 uBO 的 <code>:remove()</code>）<br>⚠ 放行名单中的选择器不会移除；动态插入的匹配元素会被持续清理</div>
							<textarea id="remove-ta" placeholder=".ad-banner&#10;example.com##div[id^=&quot;popup-&quot;]&#10;body > [style*=&quot;position:fixed; bottom:0vw; left:0vw; z-index:&quot;]"></textarea>
							<button class="save danger" id="saveRemoves">保存并应用</button>
						</div>
						<div class="page">
							<div class="list-container" id="active-list"></div>
						</div>
					</div>
					<div id="preset-modal">
						<div class="preset-dialog">
							<h4>选择要添加的规则</h4>
							<div class="preset-list" id="preset-list"></div>
							<div class="preset-actions">
								<button class="cancel" id="presetCancel">取消</button>
								<button class="confirm" id="presetConfirm">添加选中</button>
							</div>
						</div>
					</div>
				</div>
			`;
			while (wrap.firstChild) this.shadow.appendChild(wrap.firstChild);

			const slider = this.shadow.getElementById('slider');
			const tabs = this.shadow.querySelectorAll('.tab');
			tabs.forEach(t => {
				t.onclick = () => {
					tabs.forEach(tab => tab.classList.remove('active'));
					t.classList.add('active');
					const idx = parseInt(t.getAttribute('data-idx'), 10);
					slider.style.transform = 'translateX(-' + (idx * 25) + '%)';
					if (idx === 3) this.renderActiveList();
				};
			});

			this.shadow.getElementById('mask').onclick = () => this.hidePanel();
			this.shadow.getElementById('closeX').onclick = () => this.hidePanel();

			const presetModal = this.shadow.getElementById('preset-modal');
			this.shadow.getElementById('loadPreset').onclick = () => {
				const currentLines = this.shadow.getElementById('block-ta').value
					.split('\n').map(s => s.trim()).filter(Boolean);
				const list = this.shadow.getElementById('preset-list');
				list.innerHTML = '';
				PRESET_RULES.forEach((item, idx) => {
					const exists = currentLines.indexOf(item.rule) !== -1;
					const el = document.createElement('label');
					el.className = 'preset-item' + (exists ? ' disabled' : '');
					const cb = document.createElement('input');
					cb.type = 'checkbox';
					cb.setAttribute('data-idx', idx);
					cb.disabled = exists;
					cb.checked = !exists;
					const info = document.createElement('div');
					info.className = 'info';
					const title = document.createElement('div');
					title.className = 'title';
					title.textContent = item.title;
					if (exists) {
						const tag = document.createElement('span');
						tag.className = 'done-tag';
						tag.textContent = '已添加';
						title.appendChild(tag);
					}
					const desc = document.createElement('div');
					desc.className = 'desc';
					desc.textContent = item.desc;
					const ruleEl = document.createElement('div');
					ruleEl.className = 'rule';
					ruleEl.textContent = item.rule.length > 70 ? item.rule.slice(0, 70) + '…' : item.rule;
					info.appendChild(title);
					info.appendChild(desc);
					info.appendChild(ruleEl);
					el.appendChild(cb);
					el.appendChild(info);
					list.appendChild(el);
				});
				presetModal.classList.add('show');
			};
			this.shadow.getElementById('presetCancel').onclick = () => presetModal.classList.remove('show');
			this.shadow.getElementById('presetConfirm').onclick = () => {
				const cbs = this.shadow.querySelectorAll('#preset-list input[type="checkbox"]');
				const ta = this.shadow.getElementById('block-ta');
				const current = ta.value.split('\n').map(s => s.trim()).filter(Boolean);
				let added = 0;
				cbs.forEach(cb => {
					if (cb.disabled || !cb.checked) return;
					const idx = parseInt(cb.getAttribute('data-idx'), 10);
					const rule = PRESET_RULES[idx].rule;
					if (current.indexOf(rule) === -1) {
						current.push(rule);
						added++;
					}
				});
				ta.value = current.join('\n');
				presetModal.classList.remove('show');
				if (added > 0) this.toast('已添加 ' + added + ' 条规则\n点击「保存并应用」生效');
				else this.toast('没有新增规则');
			};

			this.shadow.getElementById('saveBlocks').onclick = () => {
				const lines = this.shadow.getElementById('block-ta').value
					.split('\n').map(s => s.trim()).filter(Boolean);
				App.setUserBlocks(lines);
				App.applyRules();
				this.toast('拦截规则已保存\nScriptlet 需刷新页面才生效');
			};

			this.shadow.getElementById('saveAllows').onclick = () => {
				const lines = this.shadow.getElementById('allow-ta').value
					.split('\n').map(s => s.trim()).filter(Boolean);
				App.setUserAllows(lines);
				App.applyRules();
				this.toast('放行规则已保存');
			};

			this.shadow.getElementById('saveRemoves').onclick = () => {
				const lines = this.shadow.getElementById('remove-ta').value
					.split('\n').map(s => s.trim()).filter(Boolean);
				App.setUserRemoves(lines);
				App.applyRemovals();
				this.toast('移除规则已保存并生效');
			};
		},

		renderActiveList() {
			if (!this.shadow) return;
			const list = this.shadow.getElementById('active-list');
			if (!list) return;
			list.innerHTML = '';

			// scriptlet 卡片
			const hostname = location.hostname;
			const allLines = (App.getUserBlocks() || []).concat(App.getUserAllows() || []);
			const sltRules = [];
			for (const line of allLines) {
				const p = parseScriptlet(line);
				if (!p) continue;
				if (p.host && !hostMatch(p.host)) continue;
				sltRules.push(p);
			}
			sltRules.forEach(p => {
				const card = document.createElement('div');
				card.className = 'active-card scriptlet';
				const label = p.host ? p.host : '*';
				const fullRule = label + '##+js(' + p.name + (p.args.length ? ', ' + p.args.join(', ') : '') + ')';
				card.innerHTML = `
					<div class="active-line">${Core.highlightAdRule(fullRule)}</div>
					<div class="active-footer">
						<div class="active-badge slt">Scriptlet</div>
						<div class="btn-group">
							<button class="copy-btn">复制</button>
						</div>
					</div>
				`;
				card.querySelector('.copy-btn').onclick = async (e) => {
					e.stopPropagation();
					const ok = await Core.copyText(fullRule);
					this.toast(ok ? '已复制规则' : '复制失败');
				};
				list.appendChild(card);
			});

			// CSS 生效卡片
			const rules = App.getActiveCssRules();
			if (rules.length === 0 && sltRules.length === 0) {
				const empty = document.createElement('div');
				empty.className = 'empty';
				empty.textContent = '当前页面暂无生效的规则';
				list.appendChild(empty);
				return;
			}
			rules.forEach(r => {
				const card = document.createElement('div');
				card.className = 'active-card';
				const fullRule = location.hostname + '##' + r.selector;
				card.innerHTML = `
					<div class="active-line">${Core.highlightAdRule(fullRule)}</div>
					<div class="active-footer">
						<div class="active-badge">${r.count} 个元素</div>
						<div class="btn-group">
							<button class="copy-btn">复制</button>
							<button class="allow-btn">放行</button>
							<button class="remove-btn">移除</button>
						</div>
					</div>
				`;
				card.querySelector('.copy-btn').onclick = async (e) => {
					e.stopPropagation();
					const ok = await Core.copyText(fullRule);
					this.toast(ok ? '已复制规则' : '复制失败');
				};
				card.querySelector('.allow-btn').onclick = (e) => {
					e.stopPropagation();
					App.addAllow(r.selector);
					this.toast('已放行此规则');
					card.classList.add('done');
					if (list.querySelectorAll('.active-card:not(.done)').length === 0) {
						setTimeout(() => this.renderActiveList(), 400);
					}
				};
				card.querySelector('.remove-btn').onclick = (e) => {
					e.stopPropagation();
					App.removeRule(r.selector);
					this.toast('已从 DOM 移除匹配元素\n并写入本站移除规则');
					card.classList.add('done');
					if (list.querySelectorAll('.active-card:not(.done)').length === 0) {
						setTimeout(() => this.renderActiveList(), 400);
					}
				};
				list.appendChild(card);
			});
		},

		showPanel(skipProtect) {
			this.ensureShadow();
			if (!this.shadow.getElementById('panel')) this.buildPanelSkeleton();
			this.shadow.getElementById('block-ta').value = App.getUserBlocks().join('\n');
			this.shadow.getElementById('allow-ta').value = App.getUserAllows().join('\n');
			this.shadow.getElementById('remove-ta').value = App.getUserRemoves().join('\n');
			this.renderActiveList();
			this.shadow.getElementById('mask').style.display = 'block';
			this.shadow.getElementById('panel').style.display = 'block';
			if (!skipProtect) Protect.enable();
		},

		hidePanel(skipProtect) {
			if (!this.shadow) return;
			const mask = this.shadow.getElementById('mask');
			const panel = this.shadow.getElementById('panel');
			const presetModal = this.shadow.getElementById('preset-modal');
			if (mask) mask.style.display = 'none';
			if (panel) panel.style.display = 'none';
			if (presetModal) presetModal.classList.remove('show');
			if (!skipProtect) Protect.disable();
		},

		initFloatBtn() {
			this.ensureShadow();
			this.buildPanelSkeleton();
			const fab = this.shadow.getElementById('fab');
			let idleTimer;
			const resetIdle = () => {
				fab.classList.remove('idle');
				clearTimeout(idleTimer);
				idleTimer = setTimeout(() => {
					const panel = this.shadow.getElementById('panel');
					if (!panel || panel.style.display !== 'block') fab.classList.add('idle');
				}, CONFIG.IDLE_TIME);
			};
			let isDragging = false, startY, startTop, moved = false;
			fab.ontouchstart = (e) => {
				isDragging = true; moved = false;
				startY = e.touches[0].clientY;
				startTop = fab.offsetTop;
				fab.style.transition = 'none';
				resetIdle();
			};
			window.addEventListener('touchmove', (e) => {
				if (!isDragging) return;
				moved = Math.abs(e.touches[0].clientY - startY) > 5;
				const moveY = e.touches[0].clientY - startY;
				fab.style.top = (startTop + moveY) + 'px';
			}, { passive: false });
			window.addEventListener('touchend', () => {
				if (!isDragging) return;
				isDragging = false;
				fab.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
				const finalTop = Math.max(50, Math.min(window.innerHeight - 50, fab.offsetTop));
				fab.style.top = finalTop + 'px';
				resetIdle();
			});
			fab.onclick = (e) => {
				if (moved) return;
				e.stopPropagation();
				this.showPanel();
				resetIdle();
			};
			fab.onmouseenter = () => fab.classList.remove('idle');
			fab.onmouseleave = resetIdle;
			resetIdle();
		}
	};

	function autoInitAndHide() { const host = UI.container; if (!host || !UI.shadow) return; const origHostVisibility = host.style.visibility; const panel = UI.shadow.getElementById('panel'); const origPanelVisibility = panel ? panel.style.visibility : ''; host.style.setProperty('visibility', 'hidden', 'important'); if (panel) panel.style.setProperty('visibility', 'hidden', 'important'); try { UI.showPanel(true); UI.hidePanel(true); } finally { host.style.visibility = origHostVisibility; if (panel) panel.style.visibility = origPanelVisibility; } }

	const App = {
		_removeObserver: null,
		_removeFrame: 0,
		_pendingRemoves: [],

		getUserBlocks() {
			const all = Store.get('userBlocks', {});
			return all[location.hostname] || [];
		},
		getUserAllows() {
			const all = Store.get('userAllows', {});
			return all[location.hostname] || [];
		},
		getUserRemoves() {
			const all = Store.get('userRemoves', {});
			return all[location.hostname] || [];
		},
		setUserBlocks(arr) {
			const all = Store.get('userBlocks', {});
			all[location.hostname] = arr;
			Store.set('userBlocks', all);
		},
		setUserAllows(arr) {
			const all = Store.get('userAllows', {});
			all[location.hostname] = arr;
			Store.set('userAllows', all);
		},
		setUserRemoves(arr) {
			const all = Store.get('userRemoves', {});
			all[location.hostname] = arr;
			Store.set('userRemoves', all);
		},
		addAllow(selector) {
			const allows = this.getUserAllows();
			const line = location.hostname + '#@#' + selector;
			const normalized = allows.map(l => l.trim());
			if (normalized.indexOf(line) !== -1 || normalized.indexOf(selector) !== -1) return;
			allows.push(line);
			this.setUserAllows(allows);
			this.applyRules();
			const ta = UI.shadow && UI.shadow.getElementById('allow-ta');
			if (ta) ta.value = allows.join('\n');
		},

		removeRule(selector) {
			const removes = this.getUserRemoves();
			if (removes.indexOf(selector) === -1) {
				removes.push(selector);
				this.setUserRemoves(removes);
				const ta = UI.shadow && UI.shadow.getElementById('remove-ta');
				if (ta) ta.value = removes.join('\n');
			}
			this.applyRemovals();
		},

		applyRemovals() {
			const lines = this.getUserRemoves();

			// 收集当前页面上真正生效的放行选择器（host 不匹配的放行规则会被 parseCssRule 直接过滤掉）
			const allowSet = new Set();
			for (const line of this.getUserAllows()) {
				const r = parseCssRule(line, 'allow');
				if (r && r.type === 'allow') allowSet.add(r.selector);
			}

			// 用 parseCssRule 解析移除规则，支持 CSS 与 Adblock 语法混用
			const valid = [];
			for (const line of lines) {
				const r = parseCssRule(line, 'block');
				if (!r || r.type !== 'block') continue;
				if (allowSet.has(r.selector)) continue;
				try { document.querySelectorAll(r.selector); valid.push(r.selector); } catch (e) {}
			}

			if (this._removeObserver) {
				this._removeObserver.disconnect();
				this._removeObserver = null;
			}
			if (this._removeFrame) {
				cancelAnimationFrame(this._removeFrame);
				this._removeFrame = 0;
			}
			this._pendingRemoves = [];
			if (valid.length === 0) return;

			const combined = valid.join(',');
			try {
				const nodes = document.querySelectorAll(combined);
				nodes.forEach(el => { if (el.parentNode) el.parentNode.removeChild(el); });
			} catch (e) {}

			if (!document.documentElement) return;
			const self = this;
			this._removeObserver = new MutationObserver(function (mutations) {
				for (const m of mutations) {
					if (m.type !== 'childList') continue;
					for (const node of m.addedNodes) {
						if (node.nodeType !== 1) continue;
						self._pendingRemoves.push(node);
					}
				}
				if (self._removeFrame) return;
				self._removeFrame = requestAnimationFrame(function () {
					self._removeFrame = 0;
					const pending = self._pendingRemoves;
					self._pendingRemoves = [];
					for (const node of pending) {
						if (!node.parentNode) continue;
						try {
							if (node.matches && node.matches(combined)) {
								node.parentNode.removeChild(node);
								continue;
							}
							if (node.querySelectorAll) {
								const hit = node.querySelectorAll(combined);
								for (let i = 0; i < hit.length; i++) {
									const el = hit[i];
									if (el.parentNode) el.parentNode.removeChild(el);
								}
							}
						} catch (e) {}
					}
				});
			});
			this._removeObserver.observe(document.documentElement, { childList: true, subtree: true });
		},

		applyRules() {
			const parts = [];

			const addRules = (lines, defaultType) => {
				for (const line of lines) {
					const r = parseCssRule(line, defaultType);
					if (!r) continue;
					if (r.type === 'block') parts.push(r.selector + CONFIG.HIDE_DECL);
					else parts.push(r.selector + CONFIG.SHOW_DECL);
				}
			};
			addRules(this.getUserBlocks(), 'block');
			addRules(this.getUserAllows(), 'allow');

			let style = document.getElementById(CONFIG.MANAGED_STYLE_ID);
			if (!style) {
				style = document.createElement('style');
				style.id = CONFIG.MANAGED_STYLE_ID;
				(document.head || document.documentElement).appendChild(style);
			}
			style.textContent = parts.join('\n');
		},

		getActiveCssRules() {
			const blocks = [];
			const allows = [];
			const collect = (lines, defaultType) => {
				for (const line of lines) {
					const r = parseCssRule(line, defaultType);
					if (!r) continue;
					if (r.type === 'block') blocks.push(r.selector);
					else allows.push(r.selector);
				}
			};
			collect(this.getUserBlocks(), 'block');
			collect(this.getUserAllows(), 'allow');

			const seen = new Set();
			const all = [];
			const push = s => { if (!seen.has(s)) { seen.add(s); all.push(s); } };
			blocks.forEach(push);
			SELECTORS.forEach(push);

			const allowSet = new Set(allows);
			const effective = all.filter(s => !allowSet.has(s));

			const result = [];
			effective.forEach(selector => {
				try {
					const n = document.querySelectorAll(selector).length;
					if (n > 0) result.push({ selector, count: n });
				} catch (e) {}
			});
			result.sort((a, b) => b.count - a.count);
			return result;
		},

		init() {
			this.applyRules();
			this.applyRemovals();
			if (Store.get('floatEnabled', true)) UI.initFloatBtn();
			autoInitAndHide();
		}
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () {
			injectManagedCss();
			setTimeout(function () { App.init(); }, 0);
		});
	} else {
		injectManagedCss();
		setTimeout(function () { App.init(); }, 0);
	}
})();
'''

# --------------------------- 主流程 ---------------------------
def main():
    ap = argparse.ArgumentParser(description="Adblock 通用规则 → 油猴隐藏脚本")
    ap.add_argument("sources", nargs="+",
                    help="规则文件路径或 URL（可多个叠加）")
    ap.add_argument("-o", "--output", default="adblock-generic-hide.user.js",
                    help="输出文件（默认 adblock-generic-hide.user.js）")
    ap.add_argument("--name", default="Adblock Generic CSS Hider",
                    help="脚本 @name")
    ap.add_argument("--match", action="append", default=None,
                    help="脚本 @match（可重复指定，或用逗号分隔；支持裸域名/URL/油猴语法，默认 *://*/*）")
    ap.add_argument("--match-threshold", type=int, default=5,
                    help="超过该数量时尝试合并为 @include 正则（默认 5）")
    args = ap.parse_args()

    match_patterns = []
    if args.match:
        for item in args.match:
            for part in item.split(','):
                part = part.strip()
                if not part:
                    continue
                normalized = normalize_match_input(part)
                if normalized and normalized not in match_patterns:
                    match_patterns.append(normalized)
    if not match_patterns:
        match_patterns = ['*://*/*']

    all_rules = set()
    for src in args.sources:
        sys.stderr.write("[*] 读取规则源: %s\n" % src)
        text = load_text(src)
        found = extract_generic_rules(text)
        sys.stderr.write("[+]   -> 提取 %d 条\n" % len(found))
        all_rules.update(found)

    rules = sorted(all_rules)
    sys.stderr.write("[+] 合并去重后共 %d 条通用隐藏规则\n" % len(rules))

    if not rules:
        sys.stderr.write("[!] 未提取到规则，退出\n")
        sys.exit(1)

    merged = optimize_match_patterns(match_patterns, args.match_threshold)
    match_lines = format_match_lines(merged)
    sys.stderr.write("[+] @match/@include 共 %d 条（输入 %d 条）\n"
                     % (len(merged), len(match_patterns)))

    out_path = Path(args.output)
    version = None
    if out_path.exists():
        old_text = out_path.read_text(encoding="utf-8")
        old_version, old_rules = parse_existing_script(old_text)
        if old_rules == rules and old_version:
            version = old_version
            sys.stderr.write("[=] 规则无变化，沿用 @version %s\n" % version)
        else:
            sys.stderr.write("[~] 规则发生变化，生成新 @version\n")

    if version is None:
        version = gen_version()
        sys.stderr.write("[+] 使用新 @version %s\n" % version)

    selectors_js = ",\n".join(
        "\t" + json.dumps(s, ensure_ascii=False) for s in rules
    )

    script = (USERSCRIPT_TEMPLATE
              .replace("__NAME__", args.name)
              .replace("__VERSION__", version)
              .replace("__MATCH_LINES__", match_lines)
              .replace("__SELECTORS__", selectors_js))

    if out_path.exists() and out_path.read_text(encoding="utf-8") == script:
        sys.stderr.write("[=] 输出内容与磁盘文件完全一致，跳过写入\n")
    else:
        out_path.write_text(script, encoding="utf-8")
        size_kb = len(script.encode("utf-8")) / 1024
        sys.stderr.write("[+] 已写入 %s (%.1f KB)\n" % (args.output, size_kb))

if __name__ == "__main__":
    main()
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
// @name         __NAME__
// @namespace    https://viayoo.com/xrgy5f
// @version      __VERSION__
// @author       Github@lingeringsound && damengzhu && Deepseek
// @description  由AI提取并生成通用规则提取的高性能CSS隐藏，无GM依赖。附带按站点拦截/放行管理界面。
__MATCH_LINES__
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAeFBMVEVHcEwZHi0XHCoRFSACAwYEBgwTFyMNEBoNEBoaHy7/dFS5VERYW2Xe5O49JjD/c1aMkZ34blQ5PUn6c1PR1+GVmaKDiJRfYmwnKzhQVGAoIzD9el9oMzW/ZVvvubnGdG1NP0hDMDrOhIBPTFl1eoXOg4G7wMngoqE4WKtbAAAACXRSTlMA9teLECOmY2ErhICWAAACK0lEQVR42qWX6XKbMBCAVyuJq7U9uJO+/+Nl0pm6JNTl0FGBDQaHQ9qs/1iMv4/VCsmsgCEkN8omsB8VE6jbYcQG3FgvenAwbKcCwdsYwqKWWo0CYU0CoVEh6wzY8UjgITEobhmQ7j/m4DLgRN7lwLsMpI6BGjVvOTA6D0JZIXUolSOYy/27lYKrQF4WETT53WC5CK2g1JFpYxzqqFER+MlYoSXwaWOGC5alBL7ijyTEF/kgwRIfIljk4akGJ/axKrAdnwt8hXXBSa8vyo9XcDy/Ml7A6hSYrVcf4LLnLxCz2XWc767zKq/LGw/nemMKwIVc5M+l49PvV4BW6S1BSP39l3GL9xFs8h6CbX5fsMPvCvb4PcEu/yzIq9nw+Ks/f7LDu4Dksih42gt2vhfSUrnnLy77X/LLfgaNaKbDl7fu+Y9/94OoWsxgvhei4yoPx8hjCu64/DZ+T/44Ps3uOf2N/vkIQuq/vYy+/JrAm18R+PPLggB+URDCLwmC+E+CE6RvN/7nfd2LbcH8SYSUlarnM+beRvvYOTSfNhP7yK+q4x8b52AL/wwwG/nD8MkwIIOhfi/vkw1W+AvC6v95FSj8VEDiAcdzJifxlRj/rJHCAxOTORB412uMczBNHAfzrmV4vO1PX6J9o+YMeATkqFAjYE0XMIdDKytyArKFruthraDxaE0nMFw0gnR/cL0C7xaQlEOFMDSeoFgUXMk6Yo/WF77cfPcKWvv/H7EBM8SJcT2bAAAAAElFTkSuQmCC
// @run-at       document-start
// @license      GPL-3.0-or-later
// @grant        none
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

    // ====== 优先级注入：通用隐藏规则 ======
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

    // ====== 管理界面 ======
    const CONFIG = {
        IDLE_TIME: 3000,
        MANAGED_STYLE_ID: '__css_logger_managed__',
        HIDE_DECL: ' {display:none!important;}',
        SHOW_DECL: ' {display:revert!important;}',
        STORAGE_PREFIX: 'css_logger_'
    };

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

    const _hostReCache = new Map();
    function hostMatch(hostPattern) {
        if (!hostPattern) return true;
        if (hostPattern === '*') return true;
        const hostname = location.hostname;
        if (hostPattern.indexOf(',') !== -1) {
            return hostPattern.split(',').some(function (h) { return hostMatch(h.trim()); });
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

    function parseInputLine(line, defaultType) {
        line = (line || '').trim();
        if (!line) return null;
        const allowMatch = line.match(/^(.*?)#@#(.+)$/);
        if (allowMatch) {
            const hostPart = allowMatch[1].trim();
            const sel = allowMatch[2].trim();
            if (!sel) return null;
            if (hostPart && !hostMatch(hostPart)) return null;
            return { type: 'allow', selector: sel };
        }
        const blockMatch = line.match(/^(.*?)##(.+)$/);
        if (blockMatch) {
            const hostPart = blockMatch[1].trim();
            const sel = blockMatch[2].trim();
            if (!sel) return null;
            if (hostPart && !hostMatch(hostPart)) return null;
            return { type: 'block', selector: sel };
        }
        return { type: defaultType || 'block', selector: line };
    }

    const Core = {
        highlightAdRule(rule) {
            const match = rule.match(/^(.*?)(###?)(.*)$/);
            if (!match) return '<span>' + rule + '</span>';
            let rest = match[3].replace(/("(.*?)")/g, '<span class="hl-url">"$2"</span>').replace(/(:(?:has|not|is|where|nth-child|hover|focus|active))(\(.*?\))?/g, '<span class="hl-pseudo">$1</span><span class="hl-paren">$2</span>');
            return '<span class="hl-domain">' + match[1] + '</span><span class="hl-sep">' + match[2] + '</span><span class="hl-selector">' + rest + '</span>';
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
    #fab.idle { opacity: 0.3; transform: translateY(-50%) translateX(25px); }
    #panel { display: none; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 380px; max-width: 92vw; height: 520px; max-height: 85vh; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; z-index: 999999; border: 1px solid rgba(255,255,255,0.4); font-family: -apple-system, system-ui; box-shadow: 0 20px 60px rgba(0,0,0,0.25); overflow: hidden; }
    .header { display: flex; justify-content: space-between; align-items: center; padding: 20px 20px 10px 20px; }
    .header h3 { margin: 0; font-size: 18px; font-weight: 800; color: #1d1d1f; }
    .close-btn { cursor: pointer; padding: 4px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s; color: #1d1d1f; }
    .close-btn:hover { background: rgba(0,0,0,0.1); }
    .tabs { display: flex; padding: 0 20px; border-bottom: 1px solid rgba(0,0,0,0.05); gap: 15px; }
    .tab { font-size: 13px; font-weight: bold; color: #536471; padding-bottom: 8px; cursor: pointer; border-bottom: 2px solid transparent; }
    .tab.active { color: #1d9bf0; border-bottom-color: #1d9bf0; }
    .view-slider { display: flex; width: 300%; height: calc(100% - 95px); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .page { width: 33.333%; height: 100%; box-sizing: border-box; padding: 15px 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    label { display: block; font-size: 12px; font-weight: bold; color: #536471; margin-bottom: 4px; }
    textarea { width: 100%; flex: 1; min-height: 180px; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 10px; box-sizing: border-box; resize: none; outline: none; transition: all 0.2s; background: rgba(255,255,255,0.5); font-size: 13px; font-family: monospace; }
    textarea:focus { border-color: #1d9bf0; background: #fff; box-shadow: 0 0 0 3px rgba(29,155,240,0.1); }
    .save { background: #1d9bf0; color: #fff; padding: 11px; border-radius: 12px; border: none; font-weight: bold; cursor: pointer; transition: all 0.2s; font-size: 13px; }
    .save:hover { background: #1a8cd8; }
    .save:active { transform: scale(0.96); }
    .list-container { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 4px; }
    .list-container::-webkit-scrollbar { width: 4px; }
    .list-container::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
    .active-card { background: rgba(255,255,255,0.6); border-radius: 14px; padding: 12px; display: flex; flex-direction: column; gap: 8px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.2s; }
    .active-card:hover { background: #fff; box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
    .active-card.done { opacity: 0.35; pointer-events: none; }
    .active-line { font-family: "SF Mono", SFMono-Regular, Consolas, monospace; font-size: 12px; line-height: 1.4; word-break: break-all; }
    .active-footer { display: flex; justify-content: space-between; align-items: center; }
    .active-badge { background: rgba(0,122,255,0.08); color: #007AFF; font-size: 11px; padding: 3px 8px; border-radius: 8px; font-weight: 600; }
    .allow-btn { background: #ff9500; color: #fff; padding: 6px 14px; border-radius: 10px; border: none; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
    .allow-btn:hover { background: #e68600; }
    .allow-btn:active { transform: scale(0.95); }
    .empty { text-align: center; color: #888; font-size: 13px; padding: 40px 0; }
    .hl-domain { color: #ff8c00; font-weight: 600; }
    .hl-sep { color: #007bff; font-weight: 700; }
    .hl-selector { color: #808080; }
    .hl-url { color: #ff0000; font-weight: 600; }
    .hl-pseudo { color: #d197d9; font-weight: 600; }
    .hl-paren { color: #deb887; }
    .toast-msg { position: fixed; top: 80vh; left: 50vw; transform: translate(-50%,-50%); background: rgba(255,255,255,0.3); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); padding: 12px 20px; border-radius: 22px; box-shadow: 0 6px 24px rgba(0,0,0,0.15); color: #1C2526; font-family: -apple-system, system-ui; font-size: 15px; font-weight: 500; text-align: center; border: 1px solid rgba(255,255,255,0.25); opacity: 0; transition: opacity 0.3s ease-in-out; white-space: pre-wrap; z-index: 2147483647; }
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
        textarea { background: rgba(0,0,0,0.3); color: #fff; border-color: rgba(255,255,255,0.1); }
        textarea:focus { background: rgba(0,0,0,0.5); }
        .active-card { background: rgba(44,44,46,0.6); border-color: rgba(255,255,255,0.05); }
        .active-card:hover { background: rgba(58,58,60,0.8); }
        .hl-selector { color: #d1d1d6; }
        .toast-msg { background: rgba(44,44,46,0.5); color: #fff; border-color: rgba(255,255,255,0.1); }
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
            }, 2000);
        },

        buildPanelSkeleton() {
            const wrap = document.createElement('div');
            wrap.innerHTML = `
                <div id="mask"></div>
                <div id="fab">CSS</div>
                <div id="panel">
                    <div class="header">
                        <h3>CSS 规则管理</h3>
                        <div class="close-btn" id="closeX"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></div>
                    </div>
                    <div class="tabs">
                        <div class="tab active" data-idx="0">拦截规则</div>
                        <div class="tab" data-idx="1">放行规则</div>
                        <div class="tab" data-idx="2">生效规则</div>
                    </div>
                    <div class="view-slider" id="slider">
                        <div class="page">
                            <label>当前站点拦截规则（每行一条，支持 adblock 语法）</label>
                            <textarea id="block-ta" placeholder=".ad-banner&#10;dd6bh4.com##.popup-modal"></textarea>
                            <button class="save" id="saveBlocks">保存并应用</button>
                        </div>
                        <div class="page">
                            <label>当前站点放行规则（每行一条，支持 adblock 语法）</label>
                            <textarea id="allow-ta" placeholder=".some-important-element&#10;dd6bh4.com#@#.ad-banner"></textarea>
                            <button class="save" id="saveAllows">保存并应用</button>
                        </div>
                        <div class="page">
                            <div class="list-container" id="active-list"></div>
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
                    slider.style.transform = 'translateX(-' + (idx * 33.333) + '%)';
                    if (idx === 2) this.renderActiveList();
                };
            });

            this.shadow.getElementById('mask').onclick = () => this.hidePanel();
            this.shadow.getElementById('closeX').onclick = () => this.hidePanel();

            this.shadow.getElementById('saveBlocks').onclick = () => {
                const lines = this.shadow.getElementById('block-ta').value.split('\n').map(s => s.trim()).filter(s => s);
                App.setUserBlocks(lines);
                App.applyRules();
                this.toast('拦截规则已保存');
                this.renderActiveList();
            };

            this.shadow.getElementById('saveAllows').onclick = () => {
                const lines = this.shadow.getElementById('allow-ta').value.split('\n').map(s => s.trim()).filter(s => s);
                App.setUserAllows(lines);
                App.applyRules();
                this.toast('放行规则已保存');
                this.renderActiveList();
            };
        },

        renderActiveList() {
            if (!this.shadow) return;
            const list = this.shadow.getElementById('active-list');
            if (!list) return;
            list.innerHTML = '';
            const rules = App.getActiveRules();
            if (!rules.length) {
                const empty = document.createElement('div');
                empty.className = 'empty';
                empty.textContent = '当前页面暂无生效的隐藏规则';
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
                        <button class="allow-btn">放行</button>
                    </div>
                `;
                card.querySelector('.allow-btn').onclick = (e) => {
                    e.stopPropagation();
                    App.addAllow(r.selector);
                    this.toast('已放行此规则');
                    card.classList.add('done');
                    if (list.querySelectorAll('.active-card:not(.done)').length === 0) {
                        setTimeout(() => this.renderActiveList(), 400);
                    }
                };
                list.appendChild(card);
            });
        },

        showPanel() {
            this.ensureShadow();
            if (!this.shadow.getElementById('panel')) this.buildPanelSkeleton();
            this.shadow.getElementById('block-ta').value = App.getUserBlocks().join('\n');
            this.shadow.getElementById('allow-ta').value = App.getUserAllows().join('\n');
            this.renderActiveList();
            this.shadow.getElementById('mask').style.display = 'block';
            this.shadow.getElementById('panel').style.display = 'block';
        },

        hidePanel() {
            if (!this.shadow) return;
            const mask = this.shadow.getElementById('mask');
            const panel = this.shadow.getElementById('panel');
            if (mask) mask.style.display = 'none';
            if (panel) panel.style.display = 'none';
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
                isDragging = true;
                moved = false;
                startY = e.touches[0].clientY;
                startTop = fab.offsetTop;
                fab.style.transition = 'none';
                resetIdle();
            };
            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                moved = (Math.abs(e.touches[0].clientY - startY) > 5);
                let moveY = e.touches[0].clientY - startY;
                fab.style.top = (startTop + moveY) + 'px';
            }, { passive: false });
            window.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;
                fab.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
                let finalTop = Math.max(50, Math.min(window.innerHeight - 50, fab.offsetTop));
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

    const App = {
        _parseCache: null,

        getUserBlocks() {
            const all = Store.get('userBlocks', {});
            return all[location.hostname] || [];
        },

        getUserAllows() {
            const all = Store.get('userAllows', {});
            return all[location.hostname] || [];
        },

        setUserBlocks(arr) {
            const all = Store.get('userBlocks', {});
            all[location.hostname] = arr;
            Store.set('userBlocks', all);
            this._parseCache = null;
        },

        setUserAllows(arr) {
            const all = Store.get('userAllows', {});
            all[location.hostname] = arr;
            Store.set('userAllows', all);
            this._parseCache = null;
        },

        parseAll() {
            if (this._parseCache) return this._parseCache;
            const blockLines = this.getUserBlocks();
            const allowLines = this.getUserAllows();
            const blocks = [];
            const allows = [];
            blockLines.forEach(line => {
                const r = parseInputLine(line, 'block');
                if (!r) return;
                if (r.type === 'block') blocks.push(r.selector);
                else allows.push(r.selector);
            });
            allowLines.forEach(line => {
                const r = parseInputLine(line, 'allow');
                if (!r) return;
                if (r.type === 'block') blocks.push(r.selector);
                else allows.push(r.selector);
            });
            this._parseCache = { blocks, allows };
            return this._parseCache;
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

        applyRules() {
            const parsed = this.parseAll();
            let style = document.getElementById(CONFIG.MANAGED_STYLE_ID);
            if (!style) {
                style = document.createElement('style');
                style.id = CONFIG.MANAGED_STYLE_ID;
                style.type = 'text/css';
                (document.head || document.documentElement).appendChild(style);
            }
            const parts = [];
            parsed.blocks.forEach(s => parts.push(s + CONFIG.HIDE_DECL));
            parsed.allows.forEach(s => parts.push(s + CONFIG.SHOW_DECL));
            style.textContent = parts.join('\n');
        },

        getActiveRules() {
            const parsed = this.parseAll();
            const seen = new Set();
            const all = [];
            parsed.blocks.forEach(s => {
                if (!seen.has(s)) { seen.add(s); all.push(s); }
            });
            SELECTORS.forEach(s => {
                if (!seen.has(s)) { seen.add(s); all.push(s); }
            });
            const allowSet = new Set(parsed.allows);
            const effective = all.filter(s => !allowSet.has(s));

            const result = [];
            effective.forEach(selector => {
                try {
                    const nodes = document.querySelectorAll(selector);
                    if (nodes.length > 0) {
                        result.push({ selector, count: nodes.length });
                    }
                } catch (e) {}
            });
            result.sort((a, b) => b.count - a.count);
            return result;
        },

        init() {
            this.applyRules();
            if (Store.get('floatEnabled', true)) UI.initFloatBtn();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(function () { App.init(); }, 0); });
    } else {
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
        "        " + json.dumps(s, ensure_ascii=False) for s in rules
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
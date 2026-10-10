// ==UserScript==
// @name	ALook浏览器脚本直装助手(GM)
// @name:zh-CN	ALook浏览器脚本直装助手(GM)
// @name:zh-TW	ALook瀏覽器腳本直裝助手(GM)
// @name:en	ALook Browser Script Direct Install Helper (GM)
// @name:ja	ALookブラウザスクリプト直接インストールヘルパー (GM)
// @name:ko	ALook 브라우저 스크립트 직접 설치 도우미 (GM)
// @name:fr	Assistant d'installation directe de scripts pour navigateur ALook (GM)
// @name:de	ALook Browser Skript-Direktinstallationshelfer (GM)
// @name:es	Asistente de instalación directa de scripts para navegador ALook (GM)
// @name:ru	Помощник прямой установки скриптов для браузера ALook (GM)
// @name:pt	Assistente de instalação direta de scripts para navegador ALook (GM)
// @name:it	Assistente per l'installazione diretta di script per browser ALook (GM)
// @namespace	https://www.alookweb.com/
// @version	1.73
// @description	还原ALook原生安装协议识别并安装user.js后缀的脚本，模拟了一些简单的GM函数，并支持通过菜单直链或本地文件安装脚本。
// @description:zh-CN	还原ALook原生安装协议识别并安装user.js后缀的脚本，模拟了一些简单的GM函数，并支持通过菜单直链或本地文件安装脚本。
// @description:zh-TW	還原ALook原生安裝協議識別並安裝user.js後綴的腳本，模擬了一些簡單的GM函數，並支持通過菜單直鏈或本地文件安裝腳本。
// @description:en	Restores ALook native install protocol recognition and installs user.js scripts, simulates some simple GM functions, and supports installing scripts via menu direct link or local file.
// @description:ja	ALookのネイティブインストールプロトコル認識を復元し、user.jsスクリプトをインストールします。簡単なGM関数をシミュレートし、メニュー直リンクまたはローカルファイルからのスクリプトインストールをサポートします。
// @description:ko	ALook 기본 설치 프로토콜 인식을 복원하고 user.js 스크립트를 설치하며, 간단한 GM 함수를 시뮬레이션하고 메뉴 직접 링크 또는 로컬 파일을 통한 스크립트 설치를 지원합니다.
// @description:fr	Restaure la reconnaissance du protocole d'installation natif d'ALook et installe les scripts user.js, simule quelques fonctions GM simples, et prend en charge l'installation de scripts via un lien direct du menu ou un fichier local.
// @description:de	Stellt die native Installationsprotokollerkennung von ALook wieder her und installiert user.js-Skripte, simuliert einige einfache GM-Funktionen und unterstützt die Installation von Skripten über Direktlink im Menü oder lokale Datei.
// @description:es	Restaura el reconocimiento del protocolo de instalación nativo de ALook e instala scripts user.js, simula algunas funciones GM simples y admite la instalación de scripts mediante enlace directo del menú o archivo local.
// @description:ru	Восстанавливает распознавание нативного протокола установки ALook и устанавливает скрипты user.js, имитирует некоторые простые функции GM и поддерживает установку скриптов через прямую ссылку в меню или локальный файл.
// @description:pt	Restaura o reconhecimento do protocolo de instalação nativo do ALook e instala scripts user.js, simula algumas funções GM simples e suporta a instalação de scripts via link direto do menu ou arquivo local.
// @description:it	Ripristina il riconoscimento del protocollo di installazione nativo di ALook e installa script user.js, simula alcune semplici funzioni GM e supporta l'installazione di script tramite link diretto dal menu o file locale.
// @author	Deepseek
// @match		*://*/*
// @icon		https://www.alookweb.com/index_files/alook.png
// @grant		none
// @run-at		document-end
// @license	MIT
// ==/UserScript==

(function() {
	'use strict';

	const I18N = {
		zh: {
			unsupportedEnv: '当前环境不支持安装脚本（window.via.addon 不存在）。',
			extractFailed: '未能从以下来源提取用户脚本内容：\n',
			unknownSource: '未知来源',
			sensitiveDirectives: '该脚本包含 ALook 可能不支持的指令：\n[ ',
			sensitiveDirectivesEnd: ' ]\n\n建议检查兼容性。是否继续安装？',
			largeScript: '脚本正文超过 200000 字符，已跳过深度扫描，仅比对 @grant 声明。',
			largeScriptGrant: '\n\n@grant 声明中 ALook 未实现的 API：\n[ ',
			largeScriptNoGrant: '\n\n@grant 声明的 API 均已在 polyfill 中实现。',
			continueInstall: '\n\n是否继续安装？',
			listEnd: ' ]',
			timeoutScan: 'GM 兼容性检测超时（300ms），未能完成全部 API 扫描。',
			timeoutScanUnsupported: '\n\n已扫描到的未实现 API：\n[ ',
			timeoutScanNone: '\n\n暂未扫描到未实现 API（检测未完成，不保证完整）。',
			unsupportedApi: '该脚本直接依赖 ALook 未实现的 GM API：\n[ ',
			unsupportedApiEnd: ' ]\n\n脚本未做降级处理，可能无法正常运行。是否继续安装？',
			sameVersion: '脚本已安装相同版本：',
			sameVersionEnd: '\n\n继续安装，建议先禁用已安装版本，再以当前内容重新安装。是否继续？',
			versionInstalled: '已安装 ',
			downgradeMid: '，此次为降级安装（版本号 ',
			upgradeMid: '，此次为升级安装（版本号 ',
			versionArrow: ' -> ',
			versionEnd: '）。是否继续？',
			menuInstallUrl: '直链安装脚本',
			menuInstallFile: '本地文件安装脚本',
			promptUrl: '请输入用户脚本的直链 URL：',
			urlInvalid: 'URL 必须以 http:// 或 https:// 开头。',
			fetchFailed: '获取脚本内容失败：内容为空。',
			openInTab: '无法直接获取脚本内容',
			openInTabReasonPrefix: '（',
			openInTabReasonSuffix: '）',
			openInTabReason: '。\n\n是否在新标签打开该链接，由直装助手自动接管安装？\n',
			readFileFailed: '读取文件失败：',
			selfName: 'ALook浏览器脚本直装助手(GM)'
		},
		en: {
			unsupportedEnv: 'Current environment does not support script installation (window.via.addon is missing).',
			extractFailed: 'Failed to extract userscript content from:\n',
			unknownSource: 'Unknown source',
			sensitiveDirectives: 'This script contains directives that ALook may not support:\n[ ',
			sensitiveDirectivesEnd: ' ]\n\nIt is recommended to check compatibility. Continue installation?',
			largeScript: 'Script body exceeds 200000 characters; deep scan skipped, only @grant declarations compared.',
			largeScriptGrant: '\n\nUnimplemented APIs in @grant declarations:\n[ ',
			largeScriptNoGrant: '\n\nAll APIs declared in @grant are implemented in the polyfill.',
			continueInstall: '\n\nContinue installation?',
			listEnd: ' ]',
			timeoutScan: 'GM compatibility check timed out (300ms); unable to complete full API scan.',
			timeoutScanUnsupported: '\n\nUnimplemented APIs scanned so far:\n[ ',
			timeoutScanNone: '\n\nNo unimplemented APIs detected yet (scan incomplete, not guaranteed).',
			unsupportedApi: 'This script directly depends on GM APIs not implemented by ALook:\n[ ',
			unsupportedApiEnd: ' ]\n\nThe script has no fallback and may not work properly. Continue installation?',
			sameVersion: 'Script with same version already installed: ',
			sameVersionEnd: '\n\nContinue installation? It is recommended to disable the installed version first, then reinstall with current content.',
			versionInstalled: 'Installed ',
			downgradeMid: ', this is a downgrade (version ',
			upgradeMid: ', this is an upgrade (version ',
			versionArrow: ' -> ',
			versionEnd: '). Continue?',
			menuInstallUrl: 'Install script from URL',
			menuInstallFile: 'Install script from local file',
			promptUrl: 'Enter userscript direct URL:',
			urlInvalid: 'URL must start with http:// or https://.',
			fetchFailed: 'Failed to fetch script content: empty content.',
			openInTab: 'Cannot fetch script content directly',
			openInTabReasonPrefix: ' (',
			openInTabReasonSuffix: ')',
			openInTabReason: '.\n\nOpen the link in a new tab so the installer can handle it automatically?\n',
			readFileFailed: 'Failed to read file: ',
			selfName: 'ALook Browser Script Direct Install Helper (GM)'
		}
	};

	// 扩展翻译语言说明：
	// 1. 调用 I18N.register('语言标识', { 英文键名: '对应译文' })，例如：
	//    I18N.register('ko', {
	//        menuInstallUrl: 'URL에서 스크립트 설치',
	//        menuInstallFile: '로컬 파일에서 스크립트 설치'
	//    });
	// 2. 再把该语言标识加入下方 I18N_SUPPORTED 数组，例如：const I18N_SUPPORTED = ['zh', 'ko'];
	// 3. 未填写的键会自动使用英文；键名不能翻译，必须与代码中的英文键名一致。
	I18N.register = function(lang, dict) {
		if (!lang || !dict || typeof dict !== 'object') return;
		const base = {};
		const en = this.en || {};
		for (const k in en) { if (Object.prototype.hasOwnProperty.call(en, k)) base[k] = en[k]; }
		for (const k in dict) { if (Object.prototype.hasOwnProperty.call(dict, k)) base[k] = dict[k]; }
		this[lang] = base;
	};

	const I18N_SUPPORTED = ['zh'];

	const I18N_LANG = (function() {
		const list = [];
		try { if (navigator.languages && navigator.languages.length) { for (let i = 0; i < navigator.languages.length; i++) list.push(navigator.languages[i]); } } catch (_) {}
		try { if (navigator.language) list.push(navigator.language); } catch (_) {}
		try { if (navigator.userLanguage) list.push(navigator.userLanguage); } catch (_) {}
		for (let i = 0; i < list.length; i++) {
			const v = String(list[i] || '').toLowerCase();
			const short = v.split('-')[0];
			if (I18N_SUPPORTED.indexOf(short) !== -1) return short;
		}
		return 'en';
	})();

	function t(key) {
		const lang = I18N[I18N_LANG] || I18N.en;
		if (lang && lang[key] !== undefined) return lang[key];
		if (I18N.en && I18N.en[key] !== undefined) return I18N.en[key];
		return key;
	}

	const SCRIPT_ID_SALT = 'alook-userscript:v1:';
	const INSTALLED_KEY_PREFIX = 'alook-userscript-installed:v1:';

	function normalizeScriptName(name) {
		let s = String(name || '未命名脚本').trim();
		try {
			s = s.normalize('NFKC');
		} catch (_) {}
		return s.replace(/\s+/g, ' ').toLowerCase();
	}

	function fnv1a64(str) {
		let h = 0xcbf29ce484222325n;
		const prime = 0x100000001b3n;
		const mask = 0xffffffffffffffffn;
		for (let i = 0; i < str.length; i++) {
			h ^= BigInt(str.charCodeAt(i));
			h = (h * prime) & mask;
		}
		return h.toString(16).padStart(16, '0');
	}

	function makeScriptId(stableName, namespace, matchKey) {
		const ns = String(namespace || '').trim();
		const mk = String(matchKey || '').trim();
		const basis = ns ? (ns + '\n' + normalizeScriptName(stableName)) : (normalizeScriptName(stableName) + '\n' + mk);
		return `userscript-${fnv1a64(SCRIPT_ID_SALT + basis)}`;
	}

	function getBrowserLanguages() {
		const list = [];
		try { if (navigator.languages && navigator.languages.length) { for (let i = 0; i < navigator.languages.length; i++) list.push(navigator.languages[i]); } } catch (_) {}
		try { if (navigator.language) list.push(navigator.language); } catch (_) {}
		try { if (navigator.userLanguage) list.push(navigator.userLanguage); } catch (_) {}
		const out = [];
		for (let i = 0; i < list.length; i++) {
			const v = String(list[i] || '').trim();
			if (v && out.indexOf(v) === -1) out.push(v);
		}
		return out;
	}

	function pickScriptName(meta) {
		const names = {};
		for (const key in meta) {
			if (key === 'name' || key.indexOf('name:') === 0) {
				const list = meta[key];
				if (list && list.length) {
					const k = key.indexOf('name:auto-') === 0 ? 'name:' + key.slice(10) : key;
					if (!names[k]) names[k] = list[0];
				}
			}
		}
		const isCN = (t) => {
			const s = String(t || '');
			if (/[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/.test(s)) return true;
			const reg = /\\u([0-9a-fA-F]{4})/g;
			let m;
			while ((m = reg.exec(s)) !== null) {
				const c = parseInt(m[1], 16);
				if ((c >= 0x4E00 && c <= 0x9FFF) || (c >= 0x3400 && c <= 0x4DBF) || (c >= 0xF900 && c <= 0xFAFF)) return true;
			}
			return false;
		};
		const cnOrder = ['name:zh-cn', 'name:zh-tw', 'name:zh', 'name:zh-hk', 'name:zh-sg', 'name'];
		const pickCN = () => {
			for (let i = 0; i < cnOrder.length; i++) if (names[cnOrder[i]] && isCN(names[cnOrder[i]])) return names[cnOrder[i]];
			for (const k in names) if ((k === 'name' || k.indexOf('name:') === 0) && isCN(names[k])) return names[k];
			return null;
		};
		const langs = getBrowserLanguages();
		for (let i = 0; i < langs.length; i++) {
			const lower = langs[i].toLowerCase(), short = lower.split('-')[0];
			const cands = short && short !== lower ? [lower, short] : [lower];
			for (let j = 0; j < cands.length; j++) if (names['name:' + cands[j]]) return names['name:' + cands[j]];
			if (short === 'zh') { const cn = pickCN(); if (cn) return cn; }
		}
		const cn = pickCN(); if (cn) return cn;
		const fbOrder = ['name:zh-cn', 'name:zh-tw', 'name:en', 'name'];
		for (let i = 0; i < fbOrder.length; i++) if (names[fbOrder[i]]) return names[fbOrder[i]];
		for (const k in names) if (k.indexOf('name:') === 0 && names[k]) return names[k];
		return '未命名脚本';
	}

	function compareVersions(a, b) {
		const pa = String(a || '').trim().replace(/^v/i, '').split(/[.-]/);
		const pb = String(b || '').trim().replace(/^v/i, '').split(/[.-]/);
		const len = Math.max(pa.length, pb.length);
		for (let i = 0; i < len; i++) {
			const na = parseInt(pa[i], 10);
			const nb = parseInt(pb[i], 10);
			if (!isNaN(na) && !isNaN(nb)) {
				if (na > nb) return 1;
				if (na < nb) return -1;
			} else {
				const sa = String(pa[i] || '');
				const sb = String(pb[i] || '');
				if (sa > sb) return 1;
				if (sa < sb) return -1;
			}
		}
		return 0;
	}

	function getInstalledRecord(id) { try { const raw = localStorage.getItem(INSTALLED_KEY_PREFIX + id); return raw ? JSON.parse(raw) : null; } catch (_) { return null; } }
	function setInstalledRecord(id, data) { try { localStorage.setItem(INSTALLED_KEY_PREFIX + id, JSON.stringify(data)); } catch (_) {} }

	const zhBase64 = {
		encode: function(input) {
			const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			let output = "",
				chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
			input = this.utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) enc3 = enc4 = 64;
				else if (isNaN(chr3)) enc4 = 64;
				output += _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		},
		utf8_encode: function(_string) {
			return unescape(encodeURIComponent(
				Array.from(_string).map(char => {
					const codePoint = char.codePointAt(0);
					if (codePoint > 0x7F) {
						if (codePoint <= 0xFFFF) {
							return '\\u' + codePoint.toString(16).padStart(4, '0');
						} else {
							return '\\u' + (0xD800 + ((codePoint - 0x10000) >> 10)).toString(16) + '\\u' + (0xDC00 + ((codePoint - 0x10000) & 0x3FF)).toString(16);
						}
					}
					return char;
				}).join('')
			));
		}
	};

	const extractPureScript = (text) => {
		if (!text) return null;
		const startRegex = /\/\/\s*==UserScript==/i;
		const startMatch = text.match(startRegex);
		if (!startMatch) return null;
		let lines = text.split('\n');
		let lastValidLineIdx = -1;
		for (let i = lines.length - 1; i >= 0; i--) {
			if (lines[i].trim() !== "") {
				lastValidLineIdx = i;
				break;
			}
		}
		if (lastValidLineIdx === -1) return null;
		const lastLineContent = lines[lastValidLineIdx].trim();
		const isEndValid = lastLineContent === ");" || lastLineContent.endsWith("})();") || lastLineContent === "})();";
		if (isEndValid) {
			const cutText = lines.slice(0, lastValidLineIdx + 1).join('\n');
			return cutText.substring(startMatch.index);
		}
		return null;
	};
	
	const WIN1252_REV = {0x20AC:0x80,0x201A:0x82,0x0192:0x83,0x201E:0x84,0x2026:0x85,0x2020:0x86,0x2021:0x87,0x02C6:0x88,0x2030:0x89,0x0160:0x8A,0x2039:0x8B,0x0152:0x8C,0x017D:0x8E,0x2018:0x91,0x2019:0x92,0x201C:0x93,0x201D:0x94,0x2022:0x95,0x2013:0x96,0x2014:0x97,0x02DC:0x98,0x2122:0x99,0x0161:0x9A,0x203A:0x9B,0x0153:0x9C,0x017E:0x9E,0x0178:0x9F};
	function fixInnerText(t) { if (!t) return t; const b = new Uint8Array(t.length); for (let i = 0; i < t.length; i++) { const c = t.charCodeAt(i); if (c <= 0xFF) b[i] = c; else if (WIN1252_REV[c] === undefined) return t; else b[i] = WIN1252_REV[c]; } try { return new TextDecoder('utf-8', { fatal: true }).decode(b); } catch (_) { return t; } }

	function escapeRegExp(text) {
		return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function collectGrantApis(metaRaw) {
		const granted = [];
		const reg = /\/\/\s*@grant\s+([^\s]+)/gi;
		let match;
		while ((match = reg.exec(metaRaw)) !== null) {
			const api = match[1].trim();
			if (!api || /^none$/i.test(api)) continue;
			if (granted.indexOf(api) === -1) granted.push(api);
		}
		return granted;
	}

	// 模拟支持的GM列表
	const IMPLEMENTED_GM_APIS = {
		GM_info: 1, GM_getValue: 1, GM_setValue: 1, GM_deleteValue: 1, GM_listValues: 1,
		GM_addStyle: 1, GM_addElement: 1,
		GM_registerMenuCommand: 1, GM_unregisterMenuCommand: 1,
		GM_xmlhttpRequest: 1, GM_setClipboard: 1,
		GM_notification: 1, GM_updateNotification: 1,
		GM_openInTab: 1,
		GM_log: 1,
		GM_download: 1, GM_cookie: 1,
		GM_getResourceText: 1, GM_getResourceURL: 1,
		unsafeWindow: 1
	};

	function collectUsedApis(body) {
		const used = [];
		const reg = /\b(GM(?:_[A-Za-z0-9_]+)?|unsafeWindow)\b/g;
		let match;
		let steps = 0;
		while ((match = reg.exec(body)) !== null) {
			if (++steps > 20000) break;
			const api = match[1];
			if (api === 'GM' || api === 'GM_POLYFILLED') continue;
			if (IMPLEMENTED_GM_APIS[api]) continue;
			if (used.indexOf(api) === -1) used.push(api);
		}
		return used;
	}

	function hasGmGuard(body, api) {
		const esc = escapeRegExp(api);
		const pattern = [
			`typeof\\s+${esc}\\b`,
			`typeof\\s+window\\.${esc}\\b`,
			`['"]${esc}['"]\\s+in\\s+`,
			`window\\s*\\[\\s*['"]${esc}['"]\\s*\\]`
		].join('|');
		return new RegExp(pattern).test(body);
	}

	function analyzeGmCompat(metaRaw, content) {
		const granted = collectGrantApis(metaRaw);
		if (content.length > 200000) {
			const grantUnsupported = granted.filter(api => !IMPLEMENTED_GM_APIS[api]);
			return { granted: granted, guarded: [], unsupported: grantUnsupported, skipped: 'size' };
		}
		const startedAt = Date.now();
		const timeoutMs = 300;
		const body = content.replace(/\/\/\s*==UserScript==[\s\S]*?\/\/\s*==\/UserScript==/i, '');
		const used = collectUsedApis(body);
		const guarded = [];
		const unsupported = [];
		for (let i = 0; i < used.length; i++) {
			if (Date.now() - startedAt > timeoutMs) return { granted: granted, guarded: guarded, unsupported: unsupported, skipped: 'timeout' };
			const api = used[i];
			if (hasGmGuard(body, api)) guarded.push(api);
			else unsupported.push(api);
		}
		return { granted: granted, guarded: guarded, unsupported: unsupported, skipped: null };
	}

	function _alookGmPolyfill() {
		var W = window;
		if (W.GM_info && W.GM_info.scriptHandler && W.GM_info.scriptHandler !== 'ALook_Fake_GM') return;
		var POLYFILL_VERSION = 11;
		var UPGRADE = (W.__alookGMVersion || 0) < POLYFILL_VERSION;
		if (!UPGRADE) return;
		W.__alookGMVersion = POLYFILL_VERSION;
		W.__alookGMInstalled = true;
		var PF = W.GM_POLYFILLED = W.GM_POLYFILLED || {};
		function reg(name, impl) { W[name] = impl; PF[name] = true; }
		var NS = '__alook_gm::' + location.hostname + '::';
		function g(k, d) { try { var v = localStorage.getItem(NS + k); if (v === null) return d; if (v.length >= 2 && v.charAt(1) === '\u0000') { var t = v.charAt(0); var b = v.slice(2); if (t === 's') return b; if (t === 'n') return Number(b); if (t === 'b') return b === 'true'; if (t === 'x') return null; if (t === 'o') { try { var q = JSON.parse(b); return q === undefined ? d : q; } catch (e2) { return b; } } } try { var p = JSON.parse(v); if (p === undefined) return d; if (p === null || typeof p !== 'object') return v; return p; } catch (e) { return v; } } catch (e) { return d; } }
		function s(k, v) { try { var t = typeof v; var tag = (v === null) ? 'x' : (t === 'string' ? 's' : (t === 'number' ? 'n' : (t === 'boolean' ? 'b' : 'o'))); var body = (t === 'string') ? v : JSON.stringify(v); localStorage.setItem(NS + k, tag + '\u0000' + body); } catch (e) {} }
		function dl(k) { try { localStorage.removeItem(NS + k); } catch (e) {} }
		function ls() { var o = []; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(NS) === 0) o.push(k.slice(NS.length)); } } catch (e) {} return o; }
		function as(c) { try { var e = document.createElement('style'); e.textContent = c; (document.head || document.documentElement).appendChild(e); return e; } catch (e) { return null; } }
		function ae(a, b, c) { try { var p, t, x; if (typeof a === 'string') { t = a; x = b || {}; p = document.head || document.body; } else { p = a; t = b; x = c || {}; } var e = document.createElement(t); for (var k in x) { if (!Object.prototype.hasOwnProperty.call(x, k)) continue; var v = x[k]; if (k === 'textContent') e.textContent = v; else if (k === 'innerHTML') e.innerHTML = v; else if (k === 'style' && v && typeof v === 'object') { for (var sk in v) { if (Object.prototype.hasOwnProperty.call(v, sk)) { try { e.style[sk] = v[sk]; } catch (e2) {} } } } else if (k.indexOf('on') === 0 && k.length > 2 && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v); else if (k === 'attributes' && v && typeof v === 'object') { for (var ak in v) { if (Object.prototype.hasOwnProperty.call(v, ak)) { try { e.setAttribute(ak, v[ak]); } catch (e2) {} } } } else { try { e.setAttribute(k, v); } catch (e2) {} } } p.appendChild(e); return e; } catch (e) { return null; } }
		var R = W.__alookGMMenu || (W.__alookGMMenu = { items: [], seq: 1, ui: null });
		function sn() { try { var s = (W.GM_info && W.GM_info.script) || {}; return { id: s.id || ('name::' + (s.name || '未命名脚本')), name: s.name || '未命名脚本' }; } catch (e) { return { id: 'name::未命名脚本', name: '未命名脚本' }; } }
		function rm(n, f, a) { var id = R.seq++; var s = sn(); R.items.push({ id: id, name: n, fn: f, accessKey: a, scriptId: s.id, script: s.name }); bu(); rf(); return id; }
		function ru(id) { R.items = R.items.filter(function(c) { return c.id !== id; }); rf(); }
		function bu() {
			if (R.ui && document.body && document.body.contains(R.ui.root)) return;
			if (!document.body) { document.addEventListener('DOMContentLoaded', bu, { once: true }); return; }
			var r = document.createElement('div');
			r.style.cssText = 'position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:2147483647;user-select:none;touch-action:none;';
			var sh = r.attachShadow({ mode: 'open' });
			sh.innerHTML = '<style>:host{all:initial;--gm-glass:rgba(255,255,255,.55);--gm-glass-strong:rgba(255,255,255,.72);--gm-border:rgba(255,255,255,.4);--gm-text:#1a1a1a;--gm-sub:#8a8a8a;--gm-accent:#0078d4;--gm-accent-soft:rgba(0,120,212,.18);--gm-shadow:0 12px 40px rgba(0,0,0,.18);--gm-item-hover:rgba(0,120,212,.1)}'
				+ '@media (prefers-color-scheme:dark){:host{--gm-glass:rgba(30,30,32,.55);--gm-glass-strong:rgba(30,30,32,.75);--gm-border:rgba(255,255,255,.12);--gm-text:#f0f0f0;--gm-sub:#999;--gm-accent:#4cc2ff;--gm-accent-soft:rgba(76,194,255,.2);--gm-shadow:0 12px 40px rgba(0,0,0,.55);--gm-item-hover:rgba(76,194,255,.14)}}'
				+ '.btn{position:absolute;right:0;top:0;transform:translateY(-50%);width:34px;height:54px;border-radius:17px 0 0 17px;background:var(--gm-glass);color:var(--gm-text);display:flex;align-items:center;justify-content:center;font:700 12px/1 "SF Pro Text",-apple-system,system-ui,sans-serif;letter-spacing:.5px;cursor:pointer;border:1px solid var(--gm-border);border-right:none;box-shadow:var(--gm-shadow);backdrop-filter:blur(22px) saturate(180%);-webkit-backdrop-filter:blur(22px) saturate(180%);opacity:.55;transition:opacity .35s ease,width .35s cubic-bezier(.34,1.4,.64,1),background .3s ease,color .3s ease,box-shadow .3s ease}'
				+ '.btn.idle{opacity:.28}'
				+ '.btn:hover{opacity:1;width:40px}'
				+ '.btn.on{opacity:1;width:40px;background:var(--gm-accent);color:#fff;border-color:transparent;box-shadow:0 0 0 4px var(--gm-accent-soft),var(--gm-shadow)}'
				+ '.btn.on:hover{width:40px}'
				+ '.panel{position:absolute;right:48px;top:0;transform:translateY(-50%) translateX(12px) scale(.94);transform-origin:right center;min-width:180px;max-width:280px;max-height:60vh;overflow-y:auto;padding:8px;background:var(--gm-glass-strong);border:1px solid var(--gm-border);border-radius:18px;box-shadow:var(--gm-shadow);backdrop-filter:blur(40px) saturate(180%);-webkit-backdrop-filter:blur(40px) saturate(180%);opacity:0;pointer-events:none;transition:opacity .22s ease,transform .35s cubic-bezier(.34,1.4,.64,1);scrollbar-width:none}'
				+ '.panel::-webkit-scrollbar{display:none}'
				+ '.panel.on{opacity:1;pointer-events:auto;transform:translateY(-50%) translateX(0) scale(1)}'
				+ '.group{padding:9px 14px 5px;color:var(--gm-sub);font:600 11px/1.3 "SF Pro Text",-apple-system,system-ui,sans-serif;letter-spacing:.4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
				+ '.group:first-child{padding-top:5px}'
				+ '.item{padding:11px 14px;border-radius:11px;color:var(--gm-text);font:500 13px/1.35 "SF Pro Text",-apple-system,system-ui,sans-serif;cursor:pointer;margin-bottom:4px;transition:background .18s ease,color .18s ease,transform .18s ease;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
				+ '.item:last-child{margin-bottom:0}'
				+ '.item:hover{background:var(--gm-item-hover);color:var(--gm-accent)}'
				+ '.item:active{transform:scale(.97)}'
				+ '.empty{padding:12px 14px;color:var(--gm-sub);font:400 12px/1.4 system-ui,sans-serif;text-align:center}'
				+ '</style><div class="panel"></div><div class="btn">GM</div>';
			var b = sh.querySelector('.btn'), p = sh.querySelector('.panel');
			var idleTimer, isDragging = false, startY, startTop, blockClickUntil = 0;
			var setIdle = function(on) { if (on) b.classList.add('idle'); else b.classList.remove('idle'); };
			var resetIdle = function() { setIdle(false); clearTimeout(idleTimer); idleTimer = setTimeout(function() { if (!p.classList.contains('on')) setIdle(true); }, 3000); };
			resetIdle();
			b.addEventListener('click', function(e) { e.stopPropagation(); if (Date.now() < blockClickUntil) return; var opening = !p.classList.contains('on'); p.classList.toggle('on', opening); b.classList.toggle('on', opening); resetIdle(); if (opening) rf(); });
			b.addEventListener('mouseenter', resetIdle);
			b.addEventListener('touchstart', function(e) { isDragging = false; startY = e.touches[0].clientY; startTop = r.offsetTop; b.style.transition = 'none'; resetIdle(); }, { passive: true });
			b.addEventListener('touchmove', function(e) { var moveY = e.touches[0].clientY - startY; if (Math.abs(moveY) > 5) isDragging = true; if (isDragging) r.style.top = (startTop + moveY) + 'px'; }, { passive: true });
			b.addEventListener('touchend', function() { b.style.transition = ''; if (isDragging) { isDragging = false; var ft = Math.max(60, Math.min(window.innerHeight - 60, r.offsetTop)); r.style.top = ft + 'px'; blockClickUntil = Date.now() + 300; } resetIdle(); });
			document.addEventListener('click', function() { p.classList.remove('on'); b.classList.remove('on'); resetIdle(); });
			document.body.appendChild(r);
			R.ui = { root: r, btn: b, panel: p, resetIdle: resetIdle };
		}
		function rf() { if (!R.ui) return; var p = R.ui.panel; p.innerHTML = ''; if (R.items.length === 0) { p.innerHTML = '<div class="empty">无脚本菜单</div>'; return; } var ids = [], groups = {}; R.items.forEach(function(c) { var gid = c.scriptId || ('name::' + (c.script || '未命名脚本')); var gname = c.script || '未命名脚本'; if (!groups[gid]) { groups[gid] = { name: gname, items: [] }; ids.push(gid); } groups[gid].items.push(c); }); ids.forEach(function(gid) { var g = groups[gid]; var t = document.createElement('div'); t.className = 'group'; t.textContent = g.name; t.title = g.name; p.appendChild(t); g.items.forEach(function(c) { var d = document.createElement('div'); d.className = 'item'; d.textContent = typeof c.name === 'function' ? c.name() : c.name; d.addEventListener('click', function(e) { e.stopPropagation(); try { c.fn(); } catch (err) { console.error(err); } if (R.ui) { R.ui.panel.classList.remove('on'); R.ui.btn.classList.remove('on'); if (R.ui.resetIdle) R.ui.resetIdle(); } }); p.appendChild(d); }); }); }
		function xh(d) { var m = (d.method || 'GET').toUpperCase(), x = new XMLHttpRequest(), req = { readyState: 0, status: 0, statusText: '', responseText: '', response: '', responseHeaders: '', finalUrl: d.url, abort: function() { try { x.abort(); } catch (e) {} } }; var fir = function(n, a) { try { d[n] && d[n](a); } catch (e) {} }; try { if (d.user && d.password) x.open(m, d.url, true, d.user, d.password); else x.open(m, d.url, true); } catch (e) { setTimeout(function() { req.readyState = 4; fir('onreadystatechange', req); fir('onerror', req); }, 0); return req; } try { if (d.headers) { for (var hk in d.headers) { if (Object.prototype.hasOwnProperty.call(d.headers, hk)) { try { x.setRequestHeader(hk, d.headers[hk]); } catch (e) {} } } if (d.cookie) { try { x.setRequestHeader('Cookie', d.cookie); } catch (e) {} } } } catch (e) {} try { if (d.responseType) x.responseType = d.responseType; } catch (e) {} try { if (d.timeout) x.timeout = d.timeout; } catch (e) {} try { if (d.overrideMimeType) x.overrideMimeType(d.overrideMimeType); } catch (e) {} try { if (d.anonymous) x.withCredentials = false; else if (d.credentials === true || d.withCredentials === true) x.withCredentials = true; } catch (e) {} var rsp = function() { try { req.readyState = x.readyState; if (x.readyState >= 2) { req.status = x.status; req.statusText = x.statusText; try { req.responseHeaders = x.getAllResponseHeaders() || ''; } catch (e) {} try { if (x.responseURL) req.finalUrl = x.responseURL; } catch (e) {} } if (x.readyState === 4) { var rt = d.responseType || ''; try { if (rt === 'json') { req.response = x.response; try { req.responseText = JSON.stringify(x.response); } catch (e) { req.responseText = ''; } } else if (rt === 'arraybuffer' || rt === 'blob' || rt === 'document' || rt === 'stream') { req.response = x.response; req.responseText = ''; } else { req.responseText = x.responseText; req.response = x.responseText; } } catch (e) {} } } catch (e) {} }; x.onreadystatechange = function() { rsp(); fir('onreadystatechange', req); }; x.onloadstart = function() { fir('onloadstart', req); }; x.onprogress = function(e) { try { req.lengthComputable = e.lengthComputable; req.loaded = e.loaded; req.total = e.total; } catch (e2) {} fir('onprogress', req); }; x.onload = function() { rsp(); fir('onload', req); }; x.onerror = function() { rsp(); fir('onerror', req); }; x.ontimeout = function() { rsp(); fir('ontimeout', req); }; x.onabort = function() { rsp(); fir('onabort', req); }; try { if (m === 'GET' || m === 'HEAD' || d.data == null) x.send(); else x.send(d.data); } catch (e) { setTimeout(function() { req.readyState = 4; fir('onreadystatechange', req); fir('onerror', req); }, 0); } return req; }
		var NT = W.__alookGMNotify || (W.__alookGMNotify = { list: [], seq: 1, root: null, sh: null });
		function ntr() { if (NT.sh && NT.root && NT.root.parentNode && document.contains(NT.root)) return; if (!document.body) { document.addEventListener('DOMContentLoaded', ntr, { once: true }); return; } var r = document.createElement('div'); r.style.cssText = 'position:fixed;right:0;top:72%;transform:translateY(-50%);z-index:2147483647;display:flex;flex-direction:column;align-items:flex-end;gap:8px;padding:0 16px 0 0;pointer-events:none;box-sizing:border-box;'; var sh = r.attachShadow({ mode: 'open' }); sh.innerHTML = '<style>:host{all:initial;--n-bg:rgba(255,255,255,.82);--n-text:#1a1a1a;--n-sub:#666;--n-border:rgba(0,0,0,.08);--n-accent:#0078d4;--n-ripple:rgba(0,120,212,.28);--n-ripple-end:rgba(0,120,212,0);--n-shadow:0 8px 28px rgba(0,0,0,.18)}@media(prefers-color-scheme:dark){:host{--n-bg:rgba(30,30,32,.82);--n-text:#f0f0f0;--n-sub:#999;--n-border:rgba(255,255,255,.1);--n-accent:#4cc2ff;--n-ripple:rgba(255,255,255,.22);--n-ripple-end:rgba(255,255,255,0);--n-shadow:0 8px 28px rgba(0,0,0,.55)}}.wave{position:fixed;right:130px;top:72%;width:420px;height:420px;margin-right:-210px;margin-top:-210px;border-radius:50%;background:radial-gradient(circle,transparent 0%,transparent 42%,var(--n-ripple) 70%,var(--n-ripple-end) 96%);pointer-events:none;z-index:-1;opacity:0;transform:scale(.18)}@keyframes nWave{0%{opacity:0;transform:scale(.18)}18%{opacity:1}62%{opacity:.45}100%{opacity:0;transform:scale(2.4)}}.n{pointer-events:auto;min-width:200px;max-width:300px;padding:10px 14px;border-radius:12px;background:var(--n-bg);color:var(--n-text);font:500 13px/1.45 "SF Pro Text",-apple-system,system-ui,sans-serif;border:1px solid var(--n-border);box-shadow:var(--n-shadow);backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px) saturate(180%);cursor:pointer;transform:translateX(60px);opacity:0}.n.on{transform:none;opacity:1}.n .t{font-weight:700;margin-bottom:2px}.n .x{font-size:12px;color:var(--n-sub);white-space:pre-wrap;word-break:break-word}.n .p{margin-top:6px;height:3px;border-radius:2px;background:var(--n-border);overflow:hidden}.n .p>i{display:block;height:100%;background:var(--n-accent);transition:width .25s}@media (prefers-reduced-motion: no-preference){.n{transition:transform .38s cubic-bezier(.34,1.3,.64,1),opacity .3s}.wave.on{animation:nWave 1.9s cubic-bezier(.16,1,.3,1) both}}</style>'; document.body.appendChild(r); NT.root = r; NT.sh = sh; NT.waves = null; }
		function nrp() { if (!NT.sh) return; if (!NT.waves) { NT.waves = []; for (var i = 0; i < 2; i++) { var el = document.createElement('div'); el.className = 'wave'; NT.sh.appendChild(el); NT.waves.push(el); } } for (var i = 0; i < NT.waves.length; i++) { var w = NT.waves[i]; w.classList.remove('on'); w.style.animationDelay = (i * 0.3) + 's'; void w.offsetWidth; w.classList.add('on'); } }
		function ndr(o) { var w = o.el; if (o.title != null) { var t = w.querySelector('.t'); if (!t) { t = document.createElement('div'); t.className = 't'; w.insertBefore(t, w.firstChild); } t.textContent = o.title; } if (o.text != null) { var x = w.querySelector('.x'); if (!x) { x = document.createElement('div'); x.className = 'x'; var pp = w.querySelector('.p'); if (pp) w.insertBefore(x, pp); else w.appendChild(x); } x.textContent = o.text; } if (o.progress != null) { var p = w.querySelector('.p'); if (!p) { p = document.createElement('div'); p.className = 'p'; p.innerHTML = '<i></i>'; w.appendChild(p); } p.firstChild.style.width = Math.max(0, Math.min(100, o.progress)) + '%'; } }
		function nfin(o, byUser) { if (o.done) return; o.done = true; clearTimeout(o.tm); var w = o.el; try { w.style.pointerEvents = 'none'; } catch (e) {} w.classList.remove('on'); setTimeout(function () { try { w.remove(); } catch (e) {} NT.list = NT.list.filter(function (x) { return x !== o; }); }, 420); try { o.ondone && o.ondone(byUser); } catch (e) {} }
		function sc(t) { var v = String(t); var ok = false; try { var a = document.createElement('textarea'); a.value = v; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0'; (document.body || document.documentElement).appendChild(a); a.focus(); a.select(); try { a.setSelectionRange(0, v.length); } catch (e) {} try { ok = document.execCommand('copy'); } catch (e) { ok = false; } try { a.parentNode && a.parentNode.removeChild(a); } catch (e) {} } catch (e) { ok = false; } if (ok) return true; try { if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') { navigator.clipboard.writeText(v).catch(function () {}); return true; } } catch (e) {} return false; }
		function nt(a, b, c, e) { var o = typeof a === 'string' ? { text: a, title: b, image: c, onclick: e } : (a || {}); ntr(); if (!NT.sh) { try { console.log('[GM_notification]', o.title || '', o.text || ''); } catch (_) {} return { id: -1, remove: function () {} }; } o.id = NT.seq++; o.done = false; var w = o.el = document.createElement('div'); w.className = 'n'; NT.sh.appendChild(w); NT.list.push(o); ndr(o); nrp(); requestAnimationFrame(function () { w.classList.add('on'); }); if (o.timeout) o.tm = setTimeout(function () { nfin(o, false); }, o.timeout); w.addEventListener('click', function (ev) { try { o.onclick && o.onclick(ev); } catch (e) {} nfin(o, true); }); if (o.oncreate) try { o.oncreate(o.id); } catch (e) {} return { id: o.id, remove: function () { nfin(o, false); } }; }
		function nu(id, o) { for (var i = 0; i < NT.list.length; i++) { var it = NT.list[i]; if (it.id === id) { if (o.title != null) it.title = o.title; if (o.text != null) it.text = o.text; if (o.progress != null) it.progress = o.progress; ndr(it); return; } } }
		function oit(u) { var w = window.open(u, '_blank'); return { close: function() { try { w && w.close(); } catch (e) {} }, get closed() { try { return !w || w.closed; } catch (e) { return true; } } }; }
		function gdl(a, b) { var o = typeof a === 'string' ? { url: a, name: b } : (a || {}); var u = o.url, n = o.name, ok = o.onload, er = o.onerror; if (!u) { try { er && er({ error: 'no url' }); } catch (e) {} return; } try { var el = document.createElement('a'); el.href = u; if (n) el.download = n; el.rel = 'noopener'; el.style.cssText = 'position:fixed;left:-9999px;opacity:0'; (document.body || document.documentElement).appendChild(el); el.click(); setTimeout(function () { try { el.remove(); } catch (e) {} }, 1000); try { ok && ok(); } catch (e) {} } catch (e) { try { er && er(e); } catch (e2) {} } }
		function gc(a, b, c) { var o = (typeof b === 'object' && b) || {}; var cb = typeof b === 'function' ? b : c; if (typeof a === 'object') { try { cb && cb([]); } catch (e) {} return; } var nm = o.name || '', vl = o.value != null ? o.value : ''; try { if (a === 'list') { var list = []; try { (document.cookie || '').split(/;\s*/).forEach(function (p) { var i = p.indexOf('='); if (i < 0) return; var k = p.slice(0, i).trim(); if (nm && k !== nm) return; list.push({ name: k, value: decodeURIComponent(p.slice(i + 1)) }); }); } catch (e) {} try { cb && cb(list); } catch (e) {} } else if (a === 'set') { if (nm) { try { document.cookie = encodeURIComponent(nm) + '=' + encodeURIComponent(vl) + ';path=/' + (o.domain ? ';domain=' + o.domain : '') + (o.expires ? ';expires=' + new Date(o.expires).toUTCString() : ''); } catch (e) {} } try { cb && cb({ ok: true }); } catch (e) {} } else if (a === 'delete') { if (nm) { try { document.cookie = encodeURIComponent(nm) + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/' + (o.domain ? ';domain=' + o.domain : ''); } catch (e) {} } try { cb && cb({ ok: true }); } catch (e) {} } else { try { cb && cb(null); } catch (e) {} } } catch (e) { try { cb && cb(null); } catch (e2) {} } }
		gc.list = function (b, c) { return gc('list', b, c); }; gc.set = function (b, c) { return gc('set', b, c); }; gc.delete = function (b, c) { return gc('delete', b, c); };
		function grt(n) { try { console.warn('[GM] ALook 原生环境不支持 @resource:', n); } catch (e) {} return ''; }
		function gru(n) { try { console.warn('[GM] ALook 原生环境不支持 @resource:', n); } catch (e) {} return ''; }
		reg('unsafeWindow', W);
		reg('GM_getValue', g);
		reg('GM_setValue', s);
		reg('GM_deleteValue', dl);
		reg('GM_listValues', ls);
		reg('GM_addStyle', as);
		reg('GM_addElement', ae);
		reg('GM_registerMenuCommand', rm);
		reg('GM_unregisterMenuCommand', ru);
		reg('GM_xmlhttpRequest', xh);
		reg('GM_setClipboard', sc);
		reg('GM_notification', nt);
		reg('GM_updateNotification', nu);
		reg('GM_openInTab', oit);
		reg('GM_download', gdl);
		reg('GM_cookie', gc);
		reg('GM_getResourceText', grt);
		reg('GM_getResourceURL', gru);
		reg('GM_log', function() { try { console.log.apply(console, arguments); } catch (e) {} });
		reg('GM', {
			getValue: function(k, d) { return Promise.resolve(g(k, d)); },
			setValue: function(k, v) { s(k, v); return Promise.resolve(); },
			deleteValue: function(k) { dl(k); return Promise.resolve(); },
			listValues: function() { return Promise.resolve(ls()); },
			addStyle: function(c) { return Promise.resolve(as(c)); },
			addElement: function(a, b, c) { return Promise.resolve(ae(a, b, c)); },
			registerMenuCommand: rm,
			unregisterMenuCommand: ru,
			xmlHttpRequest: function(d) { return new Promise(function(res, rej) { var ol = d.onload, oe = d.onerror, ot = d.ontimeout; xh(Object.assign({}, d, { onload: function(r) { res(r); ol && ol(r); }, onerror: function(r) { rej(r); oe && oe(r); }, ontimeout: function(r) { rej(r); ot && ot(r); } })); }); },
			setClipboard: function(t) { sc(t); return Promise.resolve(); },
			notification: nt,
			updateNotification: nu,
			openInTab: oit,
			download: gdl,
			cookie: { list: gc.list, set: gc.set, delete: gc.delete },
			log: function() { try { console.log.apply(console, arguments); } catch (e) {} }
		});
			W.GM_info = W.GM_info || {}; W.GM_info.scriptHandler = 'ALook_Fake_GM'; W.GM_info.version = '1.0'; W.GM_info.versionCode = POLYFILL_VERSION; W.GM_info.scriptMetaStr = W.GM_info.scriptMetaStr || ''; W.GM_info.script = W.GM_info.script || { id: '', name: '', namespace: '', version: '', description: '', author: '', copyright: '', includes: [], matches: [], excludes: [], resources: [] };
	}

	const POLYFILL = '(' + _alookGmPolyfill.toString() + ')();';

	const installFromContent = async (rawContent, sourceLabel) => {
		if (!window.via?.addon) { alert(t('unsupportedEnv')); return; }
		try {
			const content = extractPureScript(rawContent) || rawContent;
			if (!content) { alert(t('extractFailed') + (sourceLabel || t('unknownSource'))); return; }
			const metaMatch = content.match(/\/\/\s*==UserScript==([\s\S]*?)\/\/\s*==\/UserScript==/i);
			const metaRaw = metaMatch ? metaMatch[1] : '';
			const sensitiveKeywords = ['resource', 'require', 'connect'];
			let foundKeywords = [];
			sensitiveKeywords.forEach(kw => {
				const reg = new RegExp(`\\/\\/\\s*@${kw}\\s+`, 'i');
				if (reg.test(metaRaw)) foundKeywords.push(`@${kw}`);
			});
			if (foundKeywords.length > 0) {
				if (!confirm(t('sensitiveDirectives') + foundKeywords.join(', ') + t('sensitiveDirectivesEnd'))) return;
			}
			const gmCompat = analyzeGmCompat(metaRaw, content);
			if (gmCompat.skipped === 'size') {
				const grantList = gmCompat.unsupported.length > 0 ? t('largeScriptGrant') + gmCompat.unsupported.join(', ') + t('listEnd') : t('largeScriptNoGrant');
				if (!confirm(t('largeScript') + grantList + t('continueInstall'))) return;
			} else if (gmCompat.skipped === 'timeout') {
				const extra = gmCompat.unsupported.length > 0 ? t('timeoutScanUnsupported') + gmCompat.unsupported.join(', ') + t('listEnd') : t('timeoutScanNone');
				if (!confirm(t('timeoutScan') + extra + t('continueInstall'))) return;
			} else if (gmCompat.unsupported.length > 0) {
				if (!confirm(t('unsupportedApi') + gmCompat.unsupported.join(', ') + t('unsupportedApiEnd'))) return;
			}
			const meta = {};
			metaRaw.split('\n').forEach(line => {
				const match = line.match(/\/\/\s*@([^\s]+)\s+(.*)/);
				if (match) {
					const key = match[1].toLowerCase();
					meta[key] = (meta[key] || []).concat(match[2].trim());
				}
			});
			const runAtMatch = metaRaw.match(/\/\/\s*@run-at\s+(.+)/i);
			const runatValue = (!runAtMatch || runAtMatch[1].trim() === 'document-start') ? 1 : 0;
			const displayName = pickScriptName(meta);
			const stableName = (meta.name || ['未命名脚本'])[0];
			const scriptNamespace = (meta.namespace || [''])[0];
			const scriptVersion = (meta.version || ['1.0'])[0];
			const scriptMatches = meta.match || meta.include || [];
			const scriptUrlKey = scriptMatches.join('@@');
			const scriptId = makeScriptId(stableName, scriptNamespace, scriptUrlKey);
			const installed = getInstalledRecord(scriptId);
			if (installed && installed.version) {
				const cmp = compareVersions(installed.version, scriptVersion);
				if (cmp === 0) {
					if (!confirm(t('sameVersion') + displayName + ' ' + scriptVersion + t('sameVersionEnd'))) return;
				} else if (cmp > 0) {
					if (!confirm(t('versionInstalled') + displayName + ' ' + installed.version + t('downgradeMid') + installed.version + t('versionArrow') + scriptVersion + t('versionEnd'))) return;
				} else {
					if (!confirm(t('versionInstalled') + displayName + ' ' + installed.version + t('upgradeMid') + installed.version + t('versionArrow') + scriptVersion + t('versionEnd'))) return;
				}
			}
			const requireList = (meta.require || []).filter((v, i, a) => v && a.indexOf(v) === i);
			const requireInject = requireList.length > 0 ? `(function(){var R=window.__alookRequiredJS||(window.__alookRequiredJS=Object.create(null));var L=${JSON.stringify(requireList)};for(var i=0;i<L.length;i++){if(R[L[i]])continue;try{var s=document.createElement("script");s.src=L[i];s.async=true;s.referrerPolicy="no-referrer";(document.head||document.documentElement).appendChild(s);R[L[i]]=1;}catch(e){}}})();\n\n` : '';
			const metaJson = JSON.stringify({ id: scriptId, name: displayName, namespace: scriptNamespace, version: scriptVersion, description: (meta.description || [''])[0], author: (meta.author || [''])[0], copyright: (meta.copyright || meta.license || [''])[0], includes: meta.include || [], matches: meta.match || [], excludes: meta.exclude || [], resources: [] });
			const config = {
				id: scriptId,
				name: displayName,
				author: (meta.author || ['未知作者'])[0],
				version: scriptVersion,
				runat: runatValue,
				url: (meta.match || meta.include || ['*']).map(rule =>
					rule.replace(/^https?:\/\//, 'http*://*').replace(/\*/g, '.*')
				).join('@@'),
				code: btoa(unescape(encodeURIComponent(`(function(){\n\n${POLYFILL}\n\n${requireInject}if(window.GM_info){window.GM_info.script=${metaJson};window.GM_info.scriptMetaStr=${JSON.stringify(metaRaw)};}\n\nvar GM_registerMenuCommand=(typeof window.GM_registerMenuCommand==='function')?function(n,f,a){var p=window.GM_info.script;window.GM_info.script=${metaJson};try{return window.GM_registerMenuCommand(n,f,a);}finally{window.GM_info.script=p;}}:undefined;\n\n${content}\n\n})();`)))
			};
			window.via.addon(zhBase64.encode(JSON.stringify(config)));
			setInstalledRecord(scriptId, { version: scriptVersion, name: displayName, namespace: scriptNamespace, url: scriptUrlKey, time: Date.now() });
		} catch (e) {
			console.error(e);
		}
	};

	const installScript = async () => {
		if (!window.via?.addon) return;
		try {
			let content = extractPureScript(fixInnerText(document.body.innerText));
			if (!content) { const res = await fetch(location.href, { cache: 'no-cache' }); content = await res.text(); }
			if (!content) return;
			await installFromContent(content, location.href);
		} catch (e) { console.error(e); }
	};

	const fetchScriptByUrl = (url, callback) => {
		const done = (text) => { if (!text) { alert(t('fetchFailed')); return; } callback(text); };
		const openInTab = (reason) => { if (confirm(t('openInTab') + (reason ? t('openInTabReasonPrefix') + reason + t('openInTabReasonSuffix') : '') + t('openInTabReason') + url)) { window.open(url, '_blank'); } };
		const fallback = () => { fetch(url, { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); }).then(done).catch((e) => { console.error(e); openInTab(e && e.message ? e.message : String(e)); }); };
		if (typeof window.GM_xmlhttpRequest === 'function') {
			try {
				window.GM_xmlhttpRequest({ method: 'GET', url: url, timeout: 20000, onload: (r) => { if (r.status >= 200 && r.status < 400 && r.responseText) done(r.responseText); else fallback(); }, onerror: () => { fallback(); }, ontimeout: () => { fallback(); }});
				return;
			} catch (e) { console.error(e); }
		}
		fallback();
	};

	try { _alookGmPolyfill(); } catch (e) { console.error(e); }

	const SELF_META = { name: t('selfName'), namespace: 'https://www.alookweb.com/', version: '1.70', matches: ['*://*/*'] };

	if (typeof window.GM_registerMenuCommand === 'function') {
		const registerSelfMenuCommand = (name, fn) => {
			const prev = window.GM_info ? window.GM_info.script : undefined;
			if (window.GM_info) window.GM_info.script = SELF_META;
			try { window.GM_registerMenuCommand(name, fn); } finally { if (window.GM_info) window.GM_info.script = prev; }
		};
		registerSelfMenuCommand(t('menuInstallUrl'), () => {
			const input = prompt(t('promptUrl'), /\.(user|userscript)\.js(\?|$)/i.test(location.href) ? location.href : '');
			if (!input) return;
			const url = input.trim();
			if (!/^https?:\/\//i.test(url)) { alert(t('urlInvalid')); return; }
			fetchScriptByUrl(url, (text) => installFromContent(text, url));
		});
		registerSelfMenuCommand(t('menuInstallFile'), () => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = '.js,application/javascript,text/javascript';
			input.style.cssText = 'position:fixed;left:-9999px;opacity:0';
			(document.body || document.documentElement).appendChild(input);
			input.addEventListener('change', () => {
				const file = input.files && input.files[0];
				try { input.remove(); } catch (e) {}
				if (!file) return;
				const reader = new FileReader();
				reader.onload = () => installFromContent(String(reader.result || ''), file.name);
				reader.onerror = () => alert(t('readFileFailed') + (file.name || ''));
				reader.readAsText(file, 'utf-8');
			});
			input.click();
		});
	}

	if (/\.(user|userscript)\.js(\?|$)/i.test(location.href)) {
		if (document.readyState === 'complete') installScript();
		else window.addEventListener('load', installScript, {
			once: true
		});
	}
})();
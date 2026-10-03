// ==UserScript==
// @name         ALook浏览器脚本直装助手(GM)
// @namespace    https://www.alookweb.com/
// @version      1.3
// @description  还原ALook原生安装协议识别并安装user.js后缀的脚本，模拟了一些简单的GM函数，能解决一部分脚本问题。
// @author       Deepseek
// @match        http*://*/*.user.js
// @match        http*://*/*.userscript.js
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const SCRIPT_ID_SALT = 'alook-userscript:v1:';

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

    function makeScriptId(name, namespace) {
        const ns = String(namespace || '').trim();
        const key = SCRIPT_ID_SALT + normalizeScriptName(name) + '\n' + ns;
        return `userscript-${fnv1a64(key)}`;
    }

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
        GM_xmlhttpRequest: 1, GM_setClipboard: 1, GM_notification: 1,
        GM_openInTab: 1,
        GM_log: 1, 
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
            if (api === 'GM') continue;
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
        W.unsafeWindow || (W.unsafeWindow = W);
        var POLYFILL_VERSION = 2;
        if ((W.__alookGMVersion || 0) >= POLYFILL_VERSION) return;
        W.__alookGMVersion = POLYFILL_VERSION;
        W.__alookGMInstalled = true;
        var NS = '__alook_gm::' + location.hostname + '::';
        function g(k, d) { try { var v = localStorage.getItem(NS + k); if (v === null) return d; try { var p = JSON.parse(v); return p === undefined ? d : p; } catch (e) { return v; } } catch (e) { return d; } }
        function s(k, v) { try { localStorage.setItem(NS + k, typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) {} }
        function dl(k) { try { localStorage.removeItem(NS + k); } catch (e) {} }
        function ls() { var o = []; try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(NS) === 0) o.push(k.slice(NS.length)); } } catch (e) {} return o; }
        function as(c) { try { var e = document.createElement('style'); e.textContent = c; (document.head || document.documentElement).appendChild(e); return e; } catch (e) { return null; } }
        function ae(a, b, c) { try { var p, t, x; if (typeof a === 'string') { t = a; x = b || {}; p = document.head || document.body; } else { p = a; t = b; x = c || {}; } var e = document.createElement(t); for (var k in x) { if (k === 'textContent') e.textContent = x[k]; else if (k.indexOf('on') === 0 && typeof x[k] === 'function') e.addEventListener(k.slice(2), x[k]); else e.setAttribute(k, x[k]); } p.appendChild(e); return e; } catch (e) { return null; } }
        var R = W.__alookGMMenu || (W.__alookGMMenu = { items: [], seq: 1, ui: null });
        function rm(n, f, a) { var id = R.seq++; R.items.push({ id: id, name: n, fn: f, accessKey: a }); bu(); rf(); return id; }
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
            R.ui = { root: r, btn: b, panel: p };
        }
        function rf() {
            if (!R.ui) return;
            var p = R.ui.panel;
            p.innerHTML = '';
            if (R.items.length === 0) { p.innerHTML = '<div class="empty">无脚本菜单</div>'; return; }
            R.items.forEach(function(c) {
                var d = document.createElement('div');
                d.className = 'item';
                d.textContent = typeof c.name === 'function' ? c.name() : c.name;
                d.addEventListener('click', function(e) { e.stopPropagation(); try { c.fn(); } catch (t) { console.error(t); } });
                p.appendChild(d);
            });
        }
        function xh(d) { var m = (d.method || 'GET').toUpperCase(), ct = new AbortController(), req = { readyState: 0, status: 0, statusText: '', responseText: '', response: '', responseHeaders: '', finalUrl: d.url, abort: function() { ct.abort(); } }, tm; if (d.timeout) tm = setTimeout(function() { ct.abort('timeout'); }, d.timeout); var fir = function(n, a) { try { d[n] && d[n](a); } catch (e) {} }, st = function(v) { req.readyState = v; fir('onreadystatechange', req); }; st(1); fetch(d.url, { method: m, headers: d.headers || {}, body: m === 'GET' || m === 'HEAD' ? undefined : d.data, credentials: 'omit', signal: ct.signal }).then(function(r) { st(2); req.status = r.status; req.statusText = r.statusText; var hs = []; r.headers.forEach(function(v, k) { hs.push(k + ': ' + v); }); req.responseHeaders = hs.join('\r\n'); return r.text(); }).then(function(t) { st(3); req.responseText = t; req.response = t; st(4); tm && clearTimeout(tm); fir('onload', req); }).catch(function() { tm && clearTimeout(tm); if (ct.signal.aborted && ct.signal.reason === 'timeout') fir('ontimeout', req); else fir('onerror', req); }); return req; }
        function sc(t){var v=String(t);try{var a=document.createElement('textarea');a.value=v;a.style.cssText='position:fixed;left:-9999px;opacity:0';document.body.appendChild(a);a.focus();a.select();document.execCommand('copy');document.body.removeChild(a);}catch(e){}}
        function nt(a, b, c, e) { var o = typeof a === 'string' ? { text: a, title: b, image: c, onclick: e } : (a || {}); try { if (window.Notification && Notification.permission === 'granted') { var n = new Notification(o.title || '', { body: o.text || '', icon: o.image || '' }); if (o.onclick) n.onclick = o.onclick; return n; } console.log('[GM_notification]', o.title || '', o.text || ''); } catch (e) {} }
        function oit(u) { var w = window.open(u, '_blank'); return { close: function() { try { w && w.close(); } catch (e) {} }, get closed() { try { return !w || w.closed; } catch (e) { return true; } } }; }
        W.GM_getValue = g;
        W.GM_setValue = s;
        W.GM_deleteValue = dl;
        W.GM_listValues = ls;
        W.GM_addStyle = as;
        W.GM_addElement = ae;
        W.GM_registerMenuCommand = rm;
        W.GM_unregisterMenuCommand = ru;
        W.GM_xmlhttpRequest = xh;
        W.GM_setClipboard = sc;
        W.GM_notification = nt;
        W.GM_openInTab = oit;
        W.GM_log = function() { try { console.log.apply(console, arguments); } catch (e) {} };
        W.GM_getResourceText = function(n) { console.warn('[GM] @resource 未支持:', n); return ''; };
        W.GM_getResourceURL = W.GM_getResourceText;
        W.GM = {
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
            openInTab: oit,
            log: function() { try { console.log.apply(console, arguments); } catch (e) {} }
        };
        W.GM_info = W.GM_info || {}; W.GM_info.scriptHandler = 'ALook_Fake_GM'; W.GM_info.version = '1.0'; W.GM_info.versionCode = POLYFILL_VERSION; W.GM_info.script = W.GM_info.script || { name: '', namespace: '', version: '', matches: [] };
    }

    const POLYFILL = '(' + _alookGmPolyfill.toString() + ')();';

    const installScript = async () => {
        if (!window.via?.addon) return;

        try {
            let content = extractPureScript(document.body.innerText);
            if (!content) {
                const res = await fetch(location.href, {
                    cache: 'no-cache'
                });
                const remoteText = await res.text();
                content = extractPureScript(remoteText) || remoteText;
            }

            const metaMatch = content.match(/\/\/\s*==UserScript==([\s\S]*?)\/\/\s*==\/UserScript==/i);
            const metaRaw = metaMatch ? metaMatch[1] : '';
            const sensitiveKeywords = ['resource', 'require', 'connect'];
            let foundKeywords = [];
            sensitiveKeywords.forEach(kw => {
                const reg = new RegExp(`\\/\\/\\s*@${kw}\\s+`, 'i');
                if (reg.test(metaRaw)) foundKeywords.push(`@${kw}`);
            });

            if (foundKeywords.length > 0) {
                if (!confirm(`该脚本包含 ALook 可能不支持的指令：\n[ ${foundKeywords.join(', ')} ]\n\n建议检查兼容性。是否继续安装？`)) return;
            }

            const gmCompat = analyzeGmCompat(metaRaw, content);
            if (gmCompat.skipped === 'size') {
                const grantList = gmCompat.unsupported.length > 0 ? `\n\n@grant 声明中 ALook 未实现的 API：\n[ ${gmCompat.unsupported.join(', ')} ]` : '\n\n@grant 声明的 API 均已在 polyfill 中实现。';
                if (!confirm(`脚本正文超过 200000 字符，已跳过深度扫描，仅比对 @grant 声明。${grantList}\n\n是否继续安装？`)) return;
            } else if (gmCompat.skipped === 'timeout') {
                const extra = gmCompat.unsupported.length > 0 ? `\n\n已扫描到的未实现 API：\n[ ${gmCompat.unsupported.join(', ')} ]` : '\n\n暂未扫描到未实现 API（检测未完成，不保证完整）。';
                if (!confirm(`GM 兼容性检测超时（300ms），未能完成全部 API 扫描。${extra}\n\n是否继续安装？`)) return;
            } else if (gmCompat.unsupported.length > 0) {
                if (!confirm(`该脚本直接依赖 ALook 未实现的 GM API：\n[ ${gmCompat.unsupported.join(', ')} ]\n\n脚本未做降级处理，可能无法正常运行。是否继续安装？`)) return;
            }

            const meta = {};
            metaRaw.split('\n').forEach(line => {
                const match = line.match(/\/\/\s*@(\w+)\s+(.*)/);
                if (match) {
                    const key = match[1].toLowerCase();
                    meta[key] = (meta[key] || []).concat(match[2].trim());
                }
            });
            const runAtMatch = metaRaw.match(/\/\/\s*@run-at\s+(.+)/i);
            const runatValue = (!runAtMatch || runAtMatch[1].trim() === 'document-start') ? 1 : 0;
            const scriptName = (meta.name || ['未命名脚本'])[0];
            const scriptNamespace = (meta.namespace || [''])[0];
            const metaJson = JSON.stringify({ name: scriptName, namespace: scriptNamespace, version: (meta.version || ['1.0'])[0], matches: meta.match || meta.include || [] });
            const config = {
                id: makeScriptId(scriptName, scriptNamespace),
                name: scriptName,
                author: (meta.author || ['未知作者'])[0],
                version: (meta.version || ['1.0'])[0],
                runat: runatValue,
                url: (meta.match || meta.include || ['*']).map(rule =>
                    rule.replace(/^https?:\/\//, 'http*://*').replace(/\*/g, '.*')
                ).join('@@'),
                code: btoa(unescape(encodeURIComponent(`(function(){\n\n${POLYFILL}\n\nvar GM_info={scriptHandler:'ALook_Fake_GM',version:'1.0',versionCode:2,script:${metaJson}};\n\n${content}\n\n})();`)))
            };
            window.via.addon(zhBase64.encode(JSON.stringify(config)));
        } catch (e) {
            console.error(e);
        }
    };

    if (/\.(user|userscript)\.js(\?|$)/i.test(location.href)) {
        if (document.readyState === 'complete') installScript();
        else window.addEventListener('load', installScript, {
            once: true
        });
    }
})();
// ==UserScript==
// @name         移除广告内嵌脚本
// @namespace   https://greasyfork.org/zh-CN/users/1373566
// @version      1.6.9
// @license      MIT
// @description  这是一个由AI生成的脚本，通过关键词匹配来移除网页中的内嵌广告脚本。不能保证100%成功，可以在脚本菜单中管理排除的网页和关键词，脚本已经内置一些常见的关键词，若还有广告，可以自行添加Math.random，platform，navigator，new Function，new Date()尝试去除。
// @author       copilot & cheatgpt
// @homepageURL https://scriptcat.org/zh-CN/script-show-page/2796
// @match        http*://*/*
// @exclude      *://*.baidu.*/*
// @exclude      *://*.bing.*/*
// @exclude      *://*.douban.com/*
// @exclude      *://*.douyin.com/*
// @exclude      *://*.github.com/*
// @exclude      *://*.google.*/*
// @exclude      *://*.ifeng.com/*
// @exclude      *://*.iqiyi.com/*
// @exclude      *://*.mgtv.com/*
// @exclude      *://*.pptv.com/*
// @exclude      *://*.qq.com/*
// @exclude      *://*.sina.com.cn/*
// @exclude      *://*.sohu.com/*
// @exclude      *://*.v.qq.com/*
// @exclude      *://*.wandoujia.com/*
// @exclude      *://*.yandex.*/*
// @exclude      *://github.com/*
// @exclude      *://greasyfork.org/*
// @exclude      *://m.douban.com/*
// @exclude      *://scriptcat.org/*
// @exclude      *://twitter.com/*
// @exclude      *://x.com/*
// @icon          data:image/png;base64,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
// @grant         GM_setValue
// @grant         GM_getValue
// @grant         GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const REMOVE_AD_SCRIPTS_KEYWORDS_KEY = 'removeAdScriptsKeywords';
    const EXCLUDE_SITES_KEY = 'excludeSites';
    const SPOOF_UA_SITES_KEY = 'spoofUASites';
    const SPOOF_UA_GLOBAL_MODE_KEY = 'spoofUAGlobalMode';
    const SPOOF_UA_EXCLUDE_SITES_KEY = 'spoofUAExcludeSites';
    const TOTAL_REMOVED_KEY = 'totalRemovedCount';
    const DEFAULT_KEYWORDS = [
        'htmlAds', '_ffc1();', '_ffc2();', '_ffc3();', '_ffc4();', '_ffp();', 'kbbaidu1();', 'kbbaidu2();', 'kbbaidu3();', 'html5player.checkVideoAds', 'ads_codes', '{return void 0!==b[a]?b[a]:a}).join("")}', '${scripts[randomIndex]}', '${scripts[Math.random()', '"https://"+Date.parse(new Date())+', '"https://"+(new Date().getDate())+', 'https://hongosi.xn--', 'https://{randomstr}.', 'new Function(t)()', 'new Function(b)()', 'new Function(c)()', 'new Function(t);', 'new Function(b);', 'new Function(c);', 'new Function(\'d\',e)', 'new Function(document[', 'new Function(function(p,a,c,k,e,d)', 'function a(a){', 'function b(b){', 'function c(c){', 'function updateCarousel()', 'Math.floor(2147483648 * Math.random());', 'Math.floor(Math.random()*url.length)', 'Math.floor(Math.random() * urls.length)', 'new Date()[\'getTime\']()', 'newDate=new window', 'Math.floor(((new Date()).getTime()', '&&navigator[', '=navigator;', 'navigator.platform){setTimeout(function', 'disableDebugger', 'blockDeveloperTools', '["Date"]())[\'getTime\']()', '</\'+\'s\'+\'c\'+\'ri\'+\'pt\'+\'>\');', '<\\/\'+\'s\'+\'c\'+\'ri\'+\'pt\'+\'>\');', 'class=\\"zdhf\\"', '(\'#htmlContenthtml\').html', 'D.createElement(\'span\');', 'class=\\"app_tj\\"', 'window.$m(', 'jsjiami.com.v4', 'histats.com', 'hm.baidu.com', 'adbyunion', '{win:false,mac:false,xll:false}', 'mainCell:".bd",effect:"leftLoop"', '/invoke.js">', 'function|getDate', 'parseInt(Math[\'random\']', 'pc.stgowan.com'
    ];
    const UI_CSS = `
    .mask { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0); backdrop-filter:blur(0px); z-index:2147483646; display:flex; align-items:center; justify-content:center; transition: all 0.3s ease; pointer-events: auto; animation: fade-in 0.3s forwards; }
    .panel { background:#fff; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.2); padding:24px; display:flex; flex-direction:column; gap:12px; width:90%; max-width:400px; font-family:system-ui,-apple-system,sans-serif; box-sizing:border-box; position:relative; transform: scale(0.9); opacity: 0; animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .title { margin:0 0 5px 0; font-size:16px; font-weight:700; color:#1a1a1a; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .btn-group { display:grid; grid-template-columns: 1fr 1fr; gap:8px; }
    button { border:none; border-radius:12px; padding:10px; cursor:pointer; font-size:12px; font-weight:600; transition:all 0.2s; background:#f0f2f5; color:#444; display:flex; align-items:center; justify-content:center; }
    button:hover { background:#e4e6e9; transform: translateY(-1px); }
    button:active { transform:scale(0.95); }
    button.primary { background:#007AFF; color:#fff; }
    button.primary:hover { background:#0063cc; box-shadow: 0 4px 12px rgba(0,122,255,0.3); }
    button.danger { background:#ff4d4f; color:#fff; }
    button.danger:hover { background:#d9363e; box-shadow: 0 4px 12px rgba(255,77,79,0.3); }
    textarea { width:100%; height:160px; border:1px solid #ddd; border-radius:12px; padding:12px; font-family:monospace; font-size:12px; resize:none; box-sizing:border-box; outline:none; line-height:1.5; }
    textarea:focus { border-color:#007AFF; box-shadow:0 0 0 3px rgba(0,122,255,0.1); }
    .footer { display:flex; flex-direction:column; gap:5px; margin-top:5px; }
    .manage-section { border:1px solid #eee; border-radius:12px; margin-bottom:10px; overflow:hidden; }
    .manage-header { padding:10px; background:#f8f9fa; cursor:pointer; font-size:13px; font-weight:bold; display:flex; justify-content:space-between; }
    .manage-body { display:none; padding:10px; max-height:200px; overflow-y:auto; }
    .list-item { display:flex; justify-content:space-between; align-items:center; padding:5px 0; border-bottom:1px solid #f0f0f0; font-size:12px; }
    .list-item:last-child { border-bottom:none; }
    @media (prefers-color-scheme: dark) {
        .panel { background:#1c1c1e; color:#fff; }
        .title { color:#fff; }
        button { background:#2c2c2e; color:#ccc; }
        button:hover { background:#3a3a3c; }
        textarea { background:#2c2c2e; border-color:#444; color:#eee; }
        .manage-header { background:#2c2c2e; color:#eee; }
        .manage-section { border-color:#444; }
        .list-item { border-bottom-color:#333; }
    }
    @keyframes fade-in { to { background:rgba(0,0,0,0.3); backdrop-filter:blur(8px); } }
    @keyframes scale-in { to { transform: scale(1); opacity: 1; } }`;
    let totalRemoved = GM_getValue(TOTAL_REMOVED_KEY, 0);
    let keywords = GM_getValue(REMOVE_AD_SCRIPTS_KEYWORDS_KEY, []);
    let spoofUAList = GM_getValue(SPOOF_UA_SITES_KEY, []);
    let spoofUAExcludeList = GM_getValue(SPOOF_UA_EXCLUDE_SITES_KEY, []);
    let uaMode = GM_getValue(SPOOF_UA_GLOBAL_MODE_KEY, 0);
    let excludeList = GM_getValue(EXCLUDE_SITES_KEY, []);
    let removedScriptsInfo = [];
    let shadowRoot = null;
    let cachedRegexData = null;

    const ensureShadow = () => {
        if (shadowRoot) return;
        const container = document.createElement('div');
        container.id = 'ad-remover-settings-container';
        container.style.cssText = 'position:absolute;top:0;left:0;z-index:2147483647;';
        document.documentElement.appendChild(container);
        shadowRoot = container.attachShadow({ mode: 'closed' });
        const style = document.createElement('style');
        style.textContent = UI_CSS;
        shadowRoot.appendChild(style);
    };

    const toggleSecurePicking = (state) => {
        const UI_ID = 'ad-remover-settings-container';
        const html = document.documentElement;
        if (!window._pickerHandler) {
            window._pickerHandler = (e) => {
                const path = e.composedPath();
                if (path.some(el => el.id === UI_ID)) return;
                if (e.target.tagName === 'A' || e.target.tagName === 'FORM') {
                    e.stopPropagation();
                    e.preventDefault();
                }
            };
        }
        if (state) {
            html.setAttribute('contenteditable', 'true');
            window.addEventListener('click', window._pickerHandler, true);
            window.onbeforeunload = () => "正在编辑，禁止离开";
        } else {
            html.removeAttribute('contenteditable');
            window.removeEventListener('click', window._pickerHandler, true);
            window.onbeforeunload = null;
            removeSpecificScript();
        }
    };

    const spoofPlatform = (p = 'Mac') => {
        const s = new Proxy(navigator, {
            get(t, k) {
                if (k === 'platform') return p;
                let v = Reflect.get(t, k);
                return typeof v === 'function' ? v.bind(t) : v;
            },
            getOwnPropertyDescriptor: (t, k) => k === 'platform' ? { value: p, writable: false, configurable: true, enumerable: true } : Object.getOwnPropertyDescriptor(t, k)
        });
        const f = () => {
            try {
                if (Object.getOwnPropertyDescriptor(navigator, 'platform')) {
                    navigator.__defineGetter__('platform', () => p);
                } else {
                    Object.defineProperty(navigator, 'platform', { get: () => p, configurable: true, enumerable: true });
                }
                Object.defineProperty(window, 'navigator', { value: s, writable: false, configurable: true });
                Object.defineProperty(Navigator.prototype, 'platform', { get: () => p, configurable: true, enumerable: true });
                Object.freeze(window.navigator);
            } catch (e) {}
        };
        const i = String.prototype.indexOf;
        String.prototype.indexOf = function(v) {
            if (this === p) {
                if (['Win', 'Linux', 'X11'].includes(v)) return -1;
                if (v === p) return 0;
            }
            return i.apply(this, arguments);
        };
        f();
    };

    const saveKeywords = () => GM_setValue(REMOVE_AD_SCRIPTS_KEYWORDS_KEY, keywords);
    const saveExcludeList = () => GM_setValue(EXCLUDE_SITES_KEY, excludeList);

    const getKeywordsForCurrentSite = () => {
        const siteKeywords = keywords
            .filter(k => k.startsWith(`${window.location.hostname}:`))
            .map(k => k.split(':').slice(1).join(':'));
        return siteKeywords.length > 0 ? siteKeywords : DEFAULT_KEYWORDS;
    };

    const getCachedRegexes = () => {
        if (cachedRegexData) return cachedRegexData;
        const rawKeywords = getKeywordsForCurrentSite();
        const regexes = rawKeywords.map(k => {
            try {
                let pattern = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                               .replace(/\\ /g, '[\\s\\n\\r]*')
                               .replace(/ /g, '[\\s\\n\\r]*')
                               .replace(/\\\)\\\{/g, '\\s*\\)\\s*\\{')
                               .replace(/\\\)\\\;/g, '\\s*\\)\\s*\\;');
                return new RegExp(pattern);
            } catch (e) { return { test: () => false }; }
        });
        cachedRegexData = { regexes, rawKeywords };
        return cachedRegexData;
    };

    const updateCount = (n) => {
        totalRemoved += n;
        GM_setValue(TOTAL_REMOVED_KEY, totalRemoved);
    };

    const formatCount = (num) => {
       if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
       return num;
    };

    const formatAndHighlight = (code, lang) => {
        if (!code) return "";
        let result = code;
        if (result.length > 8000) result = result.substring(0, 8000) + "\n...[此处脚本块过长已截断]";
        const escapeHTML = (str) => str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#039;"}[m]));
        if (lang === 'js') {
            let safeJS = escapeHTML(result);
            return safeJS
                .replace(/(&quot;.*?&quot;|&#039;.*?&#039;|`.*?`)/g, '<span style="color:#7fb4ca">$1</span>')
                .replace(/\b(var|let|const|function|if|else|return|for|while|new|try|catch|async|await|case|switch|break|default)\b/g, '<span style="color:#d197d9">$1</span>');
        } else {
            let safeCSS = escapeHTML(result);
            return safeCSS
                .replace(/^(\s*)([^{}\n]+)(\s*\{)/gm, '$1<span style="color:#deb887">$2</span>$3')
                .replace(/:(\s*)([^;#}\n]+)(;|\n)/g, ':<span style="color:#7fb4ca">$1$2</span>$3');
        }
    };

    const cleanGMData = () => {
        ensureShadow();
        const oldMask = shadowRoot.querySelector('.mask');
        if (oldMask) oldMask.remove();
        const mask = document.createElement('div');
        mask.className = 'mask';
        const siteKeywordsMap = {};
        keywords.forEach(k => { const s = k.split(':')[0]; siteKeywordsMap[s] = (siteKeywordsMap[s] || 0) + 1; });
        const kwSites = Object.keys(siteKeywordsMap);
        const uaActiveList = uaMode === 2 ? spoofUAExcludeList : spoofUAList;
        const uaTitle = uaMode === 2 ? 'UA 排除列表 (白名单)' : 'UA 生效列表 (黑名单)';
        mask.innerHTML = `
            <div class="panel" style="max-width:420px;">
                <div class="title">数据中心</div>
                <div class="manage-section">
                    <div class="manage-header">自定义关键词管理 (${kwSites.length}) <span>展开</span></div>
                    <div class="manage-body">
                        ${kwSites.map(s => `<div class="list-item"><span>${s} (${siteKeywordsMap[s]})</span><button class="danger" style="padding:2px 8px;font-size:10px;" data-op="delKw" data-site="${s}">删除</button></div>`).join('') || '无数据'}
                    </div>
                </div>
                <div class="manage-section">
                    <div class="manage-header">广告拦截排除列表 (${excludeList.length}) <span>展开</span></div>
                    <div class="manage-body">
                        <div style="display:flex;gap:5px;margin-bottom:8px;"><input type="text" id="newExSite" style="flex:1;padding:4px;border-radius:4px;border:1px solid #ddd;" placeholder="新增站点..."><button class="primary" style="padding:4px 8px;" id="addExSiteBtn">加</button></div>
                        <div id="exSiteList">${excludeList.map(s => `<div class="list-item"><span>${s}</span><button class="danger" style="padding:2px 8px;font-size:10px;" data-op="delEx" data-site="${s}">删</button></div>`).join('')}</div>
                    </div>
                </div>
                <div class="manage-section">
                    <div class="manage-header">${uaTitle} (${uaActiveList.length}) <span>展开</span></div>
                    <div class="manage-body">
                        <div style="display:flex;gap:5px;margin-bottom:8px;"><input type="text" id="newUASite" style="flex:1;padding:4px;border-radius:4px;border:1px solid #ddd;" placeholder="新增站点..."><button class="primary" style="padding:4px 8px;" id="addUASiteBtn">加</button></div>
                        <div id="uaSiteList">${uaActiveList.map(s => `<div class="list-item"><span>${s}</span><button class="danger" style="padding:2px 8px;font-size:10px;" data-op="delUA" data-site="${s}">删</button></div>`).join('')}</div>
                    </div>
                </div>
                <div class="footer"><button id="backMain" class="primary">完成返回</button></div>
            </div>`;
        mask.querySelectorAll('.manage-header').forEach(h => { h.onclick = () => { const b = h.nextElementSibling; b.style.display = b.style.display === 'block' ? 'none' : 'block'; h.querySelector('span').innerText = b.style.display === 'block' ? '收起' : '展开'; }; });
        mask.onclick = (e) => {
            const btn = e.target;
            const site = btn.dataset.site;
            if (btn.dataset.op === 'delKw') { keywords = keywords.filter(k => !k.startsWith(`${site}:`)); saveKeywords(); cleanGMData(); }
            if (btn.dataset.op === 'delEx') { excludeList = excludeList.filter(s => s !== site); saveExcludeList(); cleanGMData(); }
            if (btn.dataset.op === 'delUA') {
               if (uaMode === 2) {
                    spoofUAExcludeList = spoofUAExcludeList.filter(s => s !== site); GM_setValue(SPOOF_UA_EXCLUDE_SITES_KEY, spoofUAExcludeList);
                } else {
                    spoofUAList = spoofUAList.filter(s => s !== site); GM_setValue(SPOOF_UA_SITES_KEY, spoofUAList);
                    if (uaMode === 1 && spoofUAList.length === 0) { uaMode = 0; GM_setValue(SPOOF_UA_GLOBAL_MODE_KEY, 0); }
                }
                cleanGMData();
            }
        };
        mask.querySelector('#addExSiteBtn').onclick = () => { const s = mask.querySelector('#newExSite').value.trim(); if(s && !excludeList.includes(s)){ excludeList.push(s); saveExcludeList(); cleanGMData(); } };
        mask.querySelector('#addUASiteBtn').onclick = () => {
            const s = mask.querySelector('#newUASite').value.trim();
            if(!s) return;
            if (uaMode === 2) { if(!spoofUAExcludeList.includes(s)) spoofUAExcludeList.push(s); GM_setValue(SPOOF_UA_EXCLUDE_SITES_KEY, spoofUAExcludeList); }
            else { if(!spoofUAList.includes(s)) spoofUAList.push(s); GM_setValue(SPOOF_UA_SITES_KEY, spoofUAList); }
            cleanGMData();
        };
        mask.querySelector('#backMain').onclick = () => { mask.remove(); showSettings(); };
        shadowRoot.appendChild(mask);
    };

    const showRemovedScriptsInfo = () => {
        ensureShadow();
        const oldMask = shadowRoot.querySelector('.mask');
        if (oldMask) oldMask.remove();
        const infoHtml = removedScriptsInfo.length ? removedScriptsInfo.map((item, i) => `<div style="margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;"><div style="font-weight:bold; margin-bottom:5px; font-size:12px; color:#ff4d4f;"># 拦截记录 ${i + 1}</div><div style="font-size:11px; color:#888; margin-bottom:5px;">匹配关键词: ${item.keywords.join(', ')}</div><pre style="margin:0; white-space:pre-wrap; word-break:break-all; font-size:11px; line-height:1.4; background:#2c2c2e; color:#eee; padding:10px; border-radius:8px;">${formatAndHighlight(item.content, 'js')}</pre></div>`).join('') : '<div style="text-align:center;color:#999;margin-top:20px;">暂无拦截记录</div>';
        const mask = document.createElement('div');
        mask.className = 'mask';
        mask.innerHTML = `<div class="panel" style="max-width:600px; width:95%;"><div class="title">拦截日志 (${removedScriptsInfo.length})</div><div style="height:400px; overflow-y:auto; background:#f9f9f9; padding:15px; border-radius:12px; border:1px solid #eee;">${infoHtml}</div><button id="backBtn" class="primary">返回设置</button></div>`;
        mask.querySelector('#backBtn').onclick = () => { mask.remove(); showSettings(); };
        shadowRoot.appendChild(mask);
    };

    const showInlineScripts = () => {
        ensureShadow();
        const oldMask = shadowRoot.querySelector('.mask');
        if (oldMask) oldMask.remove();
        const scripts = Array.from(document.querySelectorAll('script')).filter(s => s.innerHTML.trim()).map((s, i) => { const content = s.innerHTML.trim(); const lineCount = content.split('\n').length; const wrapStyle = lineCount <= 2 ? 'white-space:pre-wrap;word-break:break-all;' : 'white-space:pre;overflow-x:auto;'; return `<div style="margin-bottom:15px;border-bottom:1px solid #eee;padding-bottom:10px;"><div style="font-weight:bold;margin-bottom:5px;font-size:12px;color:#888;"># 脚本块 ${i + 1}</div><pre style="margin:0;${wrapStyle}font-size:11px;line-height:1.4;background:#2c2c2e;color:#eee;padding:10px;border-radius:8px;">${formatAndHighlight(content, 'js')}</pre></div>`; }).join('');
        const mask = document.createElement('div');
        mask.className = 'mask';
        mask.innerHTML = `<div class="panel" style="max-width:600px; width:95%;"><div class="title">网页内嵌脚本</div><div style="height:400px; overflow-y:auto; background:#f9f9f9; padding:15px; border-radius:12px; border:1px solid #eee;">${scripts || '<div style="text-align:center;color:#999;margin-top:20px;">未发现内嵌脚本</div>'}</div><button class="primary" id="closeSub">返回设置</button></div>`;
        mask.querySelector('#closeSub').onclick = () => { mask.remove(); showSettings(); };
        shadowRoot.appendChild(mask);
    };

    const showSettings = () => {
        ensureShadow();
        if (shadowRoot.querySelector('.mask')) return;
        toggleSecurePicking(true);
        const mask = document.createElement('div');
        mask.className = 'mask';
        const hostname = window.location.hostname;
        const isExcluded = excludeList.includes(hostname);
        const uaStates = [
            { t: 'UA: 默认不启用', c: '#f0f2f5', fc: '#444' },
            { t: 'UA: 对当前网站启用', c: '#5856D6', fc: '#fff' },
            { t: 'UA: 对所有网站启用', c: '#FF9500', fc: '#fff' }
        ];

        let currentUAModeUI = 0;
        if (uaMode === 2) {
            currentUAModeUI = 2;
        } else if (uaMode === 1 && spoofUAList.includes(hostname)) {
            currentUAModeUI = 1;
        }

        mask.innerHTML = `
            <div class="panel">
                <div style="font-size:11px; color:#007AFF; background:rgba(0,122,255,0.1); padding:2px 10px; border-radius:10px; align-self:center; margin-bottom:5px;">🛡️已守护您 ${formatCount(totalRemoved)} 次</div>
                <div class="title" style="margin-bottom:10px;">拦截设置: ${hostname}</div>
                <div class="btn-group">
                    <button id="toggleSite" style="background:${isExcluded ? '#ff4d4f' : '#34C759'}; color:#fff;">${isExcluded ? '已暂停拦截' : '脚本运行中'}</button>
                    <button id="toggleUA" style="background:${uaStates[currentUAModeUI].c}; color:${uaStates[currentUAModeUI].fc};">${uaStates[currentUAModeUI].t}</button>
                    <button id="viewLogs">拦截日志 (${removedScriptsInfo.length})</button>
                    <button id="viewAll">查看内嵌脚本</button>
                </div>
                <div style="font-size:10px; color:#999; text-align:center; margin-top:-5px;">* UA 模拟全局开启可能会影响正常网页运行，建议仅在特定网站开启，如果非要全局模式，请在数据中心管理要排除的网址……</div>
                <div style="font-size:10px; color:#999; text-align:center; margin-top:-5px;">* 若无法拦截，可以尝试添加Math.random，platform，navigator，new Function，new Date()尝试去除……</div>
                <div style="font-size:12px;color:#888;margin-bottom:-8px;padding-left:4px;margin-top:5px;">当前站关键词配置:</div>
                <textarea id="kwEditor" placeholder="每行一个关键词...\n可以自行添加Math.random，platform，navigator，new Function，new Date()尝试去除。"></textarea>
                <div class="footer">
                    <div class="btn-group"><button id="saveKws" class="primary">保存配置</button><button id="cleanData">数据中心</button></div>
                    <button id="closePanel" style="background:none;color:#888;margin-top:5px;font-size:12px;">返回网页</button>
                </div>
            </div>`;
        const editor = mask.querySelector('#kwEditor');
        editor.value = getKeywordsForCurrentSite().join('\n');
        mask.querySelector('#toggleUA').onclick = () => {
            if (currentUAModeUI === 0) {
                uaMode = 1;
                if (!spoofUAList.includes(hostname)) spoofUAList.push(hostname);
                spoofUAExcludeList = spoofUAExcludeList.filter(s => s !== hostname);
            } else if (currentUAModeUI === 1) {
                uaMode = 2;
                spoofUAList = spoofUAList.filter(s => s !== hostname);
            } else {
                uaMode = 0;
                spoofUAList = spoofUAList.filter(s => s !== hostname);
                spoofUAExcludeList = spoofUAExcludeList.filter(s => s !== hostname);
            }
            GM_setValue(SPOOF_UA_SITES_KEY, spoofUAList);
            GM_setValue(SPOOF_UA_EXCLUDE_SITES_KEY, spoofUAExcludeList);
            GM_setValue(SPOOF_UA_GLOBAL_MODE_KEY, uaMode);
            mask.remove();
            showSettings();
        };
        mask.querySelector('#toggleSite').onclick = () => { if (isExcluded) excludeList = excludeList.filter(s => s !== hostname); else excludeList.push(hostname); saveExcludeList(); mask.remove(); showSettings(); };
        mask.querySelector('#viewLogs').onclick = showRemovedScriptsInfo;
        mask.querySelector('#viewAll').onclick = showInlineScripts;
        mask.querySelector('#cleanData').onclick = cleanGMData;
        mask.querySelector('#saveKws').onclick = () => { keywords = keywords.filter(k => !k.startsWith(`${hostname}:`)).concat(editor.value.split('\n').map(k => k.trim()).filter(k => k).map(k => `${hostname}:${k}`)); saveKeywords(); cachedRegexData = null; toggleSecurePicking(false); mask.remove(); };
        mask.querySelector('#closePanel').onclick = () => { toggleSecurePicking(false); mask.remove(); };
        shadowRoot.appendChild(mask);
    };

    const removeSpecificScript = () => {
        if (excludeList.includes(window.location.hostname)) return;
        const { regexes, rawKeywords } = getCachedRegexes();
        let currentRemoved = 0;
        document.querySelectorAll('script').forEach(script => {
            const content = script.innerHTML || script.textContent;
            if (!content) return;
            const matchedKeywords = [];
            const isMatch = regexes.some((reg, index) => { if (reg.test(content)) { matchedKeywords.push(rawKeywords[index]); return true; } return false; });
            if (isMatch) { removedScriptsInfo.push({ keywords: matchedKeywords, content: content }); script.type = 'text/prevented'; script.textContent = ''; script.remove(); currentRemoved++; }
        });
        if (currentRemoved > 0) updateCount(currentRemoved);
    };

    const observer = new MutationObserver(mutations => {
        if (excludeList.includes(window.location.hostname)) return;
        const { regexes, rawKeywords } = getCachedRegexes();
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeName === 'SCRIPT') {
                    const check = (c) => {
                        const mk = [];
                        if (regexes.some((reg, i) => { if (reg.test(c)) { mk.push(rawKeywords[i]); return true; } return false; })) {
                            removedScriptsInfo.push({ keywords: mk, content: c });
                            node.type = 'text/prevented'; node.textContent = ''; if (node.parentNode) node.remove(); updateCount(1);
                        }
                    };
                    const content = node.innerHTML || node.textContent;
                    if (content) check(content);
                    else { const obs = new MutationObserver(() => { const lc = node.innerHTML || node.textContent; if (lc) { check(lc); obs.disconnect(); } }); obs.observe(node, { childList: true, characterData: true }); setTimeout(() => obs.disconnect(), 5000); }
                }
            });
        });
    });

    const initUA = () => {
        const host = window.location.hostname; let doUA = false;
        if (uaMode === 1 && spoofUAList.includes(host)) doUA = true;
        else if (uaMode === 2 && !spoofUAExcludeList.includes(host)) doUA = true;
        if (doUA) spoofPlatform('Mac');
    };

    observer.observe(document.documentElement, { childList: true, subtree: true });
    initUA(); removeSpecificScript();
    GM_registerMenuCommand('移除内嵌脚本设置 ⚙️', showSettings);
})();
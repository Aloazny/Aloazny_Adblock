// ==UserScript==
// @name         标签页面管理精简版
// @namespace    https://viayoo.com/jcdamz
// @description  管理链接跳转：默认内同外新，新标签白名单强制新开，禁新标列表强制同页，支持拦截劫持。
// @version      1.0
// @author       Via & Gemini
// @match        *://*/*
// @license      MIT
// @run-at       document-start
// @icon         data:image/png;base64,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
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    const KEY = 'page_manager_configs';
    const defaultSettings = {
        activeTab: 1,
        newTab: { enabled: true, list: '', stopProp: 'off', stopList: '' },
        removeNewTab: { enabled: true, list: '' }
    };

    let settings = GM_getValue(KEY, defaultSettings);
    settings = { ...defaultSettings, ...settings, 
        newTab: { ...defaultSettings.newTab, ...settings.newTab },
        removeNewTab: { ...defaultSettings.removeNewTab, ...settings.removeNewTab }
    };
    const currentHost = location.hostname;
    let shadowRoot = null;

    const isInternalLink = (url) => {
        try {
            const targetHost = new URL(url, document.baseURI || location.href).hostname;
            return targetHost === location.hostname;
        } catch (e) { return true; }
    };

    const checkMatch = (listStr) => {
        const currentUrl = location.href;
        const lines = listStr.split('\n').map(l => l.trim()).filter(Boolean);
        for (let line of lines) {
            try {
                if (line.startsWith('/') && line.lastIndexOf('/') > 0) {
                    const lastSlashIndex = line.lastIndexOf('/');
                    const regex = new RegExp(line.slice(1, lastSlashIndex), line.slice(lastSlashIndex + 1));
                    if (regex.test(currentUrl)) return true;
                } else if (currentUrl.includes(line)) return true;
            } catch (e) {}
        }
        return false;
    };

    window.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || !link.href || !/^https?:\/\//i.test(link.href)) return;
        const isInternal = isInternalLink(link.href);
        const forceNew = checkMatch(settings.newTab.list);
        const forceSame = checkMatch(settings.removeNewTab.list);
        if (forceSame) {
            if (link.target === '_blank') link.removeAttribute('target');
        } else if (forceNew || !isInternal) {
            e.preventDefault();
            window.open(link.href, '_blank');
            const nT = settings.newTab;
            const isStopMatched = (nT.stopList || '').split('\n').includes(currentHost);
            if (nT.stopProp === 'all' || (nT.stopProp === 'match' && forceNew && isStopMatched)) {
                e.stopPropagation();
            }
        } else if (isInternal) {
            if (link.target === '_blank') link.removeAttribute('target');
            if (e.ctrlKey || e.metaKey) { e.preventDefault(); location.href = link.href; }
        }
    }, true);
    
    const setClipboard = (text, successCallback) => {
        const done = () => { if (successCallback) successCallback(); else alert('已复制'); };
        if (typeof GM_setClipboard !== 'undefined') { GM_setClipboard(text); done(); }
        else {
            const tx = document.createElement("textarea"); tx.value = text; tx.style.position = "fixed"; tx.style.left = "-9999px";
            document.body.appendChild(tx); tx.select(); try { document.execCommand('copy'); done(); } catch (err) {}
            document.body.removeChild(tx);
        }
    };

    function createUI() {
        if (shadowRoot) return;
        const container = document.createElement('div');
        container.style.cssText = 'position:fixed;top:0;left:0;z-index:2147483647;';
        document.documentElement.appendChild(container);
        shadowRoot = container.attachShadow({ mode: 'closed' });
        const style = document.createElement('style');
        style.textContent = `
            .mask { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; animation: fade 0.3s; font-family:system-ui,-apple-system; }
            .panel { background:rgba(255,255,255,0.9); width:340px; border-radius:30px; padding:20px; box-shadow:0 20px 40px rgba(0,0,0,0.2); position:relative; }
            .header { margin-bottom: 15px; padding-bottom: 12px; border-bottom: 1px solid rgba(0,0,0,0.05); }
            .domain { font-size: 18px; font-weight: 700; color: #1C2526; }
            .url-bar { position: relative; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.03); padding: 6px 10px; border-radius: 10px; margin-top:8px; }
            .url-text { font-size: 11px; color: #888; white-space: nowrap; overflow: hidden; flex: 1; }
            .copy-btn { font-size: 10px; background: #fff; border: 1px solid #ddd; padding: 2px 6px; border-radius: 6px; cursor: pointer; color: #007AFF; }
            .copy-menu { position: absolute; right: 0; top: 0; bottom: 0; background: #fff; display: flex; align-items: center; gap: 4px; padding: 0 8px; border-radius: 10px; transform: translateX(100%); opacity: 0; pointer-events: none; transition: 0.3s; z-index: 3; box-shadow: -10px 0 15px rgba(0,0,0,0.05); }
            .copy-menu.show { transform: translateX(0); opacity: 1; pointer-events: auto; }
            .menu-item { font-size: 10px; padding: 4px 8px; border-radius: 6px; cursor: pointer; background: #f0f0f0; border: none; }
            .nav { display:flex; gap:5px; margin-bottom:15px; background:rgba(0,0,0,0.05); padding:5px; border-radius:15px; }
            .nav-item { flex:1; padding:8px; text-align:center; font-size:11px; cursor:pointer; border-radius:10px; transition:0.3s; font-weight:600; color:#666; }
            .nav-item.active { background:#fff; color:#007AFF; box-shadow:0 2px 8px rgba(0,0,0,0.1); }
            .section { display:none; flex-direction:column; gap:12px; animation: slide 0.3s; }
            .section.active { display:flex; }
            .row { display:flex; justify-content:space-between; align-items:center; }
            .label { font-size:13px; font-weight:600; color:#333; }
            .switch-group { display:flex; gap:4px; background: rgba(0,0,0,0.05); padding: 3px; border-radius: 10px; }
            .btn { border:none; padding:5px 9px; border-radius:7px; cursor:pointer; font-size:10px; background:transparent; color: #555; }
            .btn.active { background:#fff; color:#007AFF !important; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .btn-group { display:flex; gap:8px; margin-top:8px; }
            textarea { width:100%; height:110px; border-radius:12px; border:1px solid #ddd; padding:10px; box-sizing:border-box; font-family:monospace; font-size:11px; resize:none; }
            .save-btn { width:100%; background:#007AFF; color:#fff; border:none; padding:12px; border-radius:15px; font-weight:bold; cursor:pointer; margin-top:15px; }
            @keyframes fade { from { opacity:0; } to { opacity:1; } }
            @keyframes slide { from { transform:translateX(10px); opacity:0; } to { transform:translateX(0); opacity:1; } }
            @media (prefers-color-scheme: dark) {
                .panel { background:rgba(30,30,30,0.9); color:#fff; }
                .label, .domain { color:#ddd; }
                textarea { background:#222; border-color:#444; color:#eee; }
                .nav-item.active { background:#444; color:#0A84FF; }
                .url-bar { background: rgba(255,255,255,0.05); }
                .copy-btn { background: #333; border-color: #555; }
                .copy-menu { background: #2c2c2e; }
                .menu-item { background: #3a3a3c; color: #eee; }
                .btn.active { background:#444; color:#0A84FF !important; }
            }
        `;
        
        shadowRoot.appendChild(style);
        const mask = document.createElement('div');
        mask.className = 'mask';
        const panel = document.createElement('div');
        panel.className = 'panel';

        const render = () => {
            const nT = settings.newTab;
            const isStopMatched = (nT.stopList || '').split('\n').includes(currentHost);
            panel.innerHTML = `
                <div class="header">
                    <span class="domain">${currentHost}</span>
                    <div class="url-bar">
                        <div class="url-text">${location.href}</div>
                        <button class="copy-btn" data-action="open-menu">复制</button>
                        <div class="copy-menu" id="copy-menu">
                            <button class="menu-item" data-action="copy-type" data-type="domain">域名</button>
                            <button class="menu-item" data-action="copy-type" data-type="clean">URL</button>
                            <button class="menu-item" data-action="copy-type" data-type="regex">正则</button>
                        </div>
                    </div>
                </div>
                <div class="nav">
                    <div class="nav-item ${settings.activeTab===1?'active':''}" data-tab="1">新标签</div>
                    <div class="nav-item ${settings.activeTab===2?'active':''}" data-tab="2">禁新标</div>
                    <div class="nav-item ${settings.activeTab===4?'active':''}" data-tab="4">备份</div>
                </div>
                <div class="content-wrapper">
                    <div class="section ${settings.activeTab===1?'active':''}">
                        <div class="row">
                            <span class="label">拦截劫持</span>
                            <div class="switch-group">
                                <button class="btn ${nT.stopProp==='all'?'active':''}" data-action="setProp" data-val="all">全局</button>
                                <button class="btn ${nT.stopProp==='match' && isStopMatched ?'active':''}" data-action="setProp" data-val="match">匹配</button>
                                <button class="btn ${nT.stopProp==='off' || (nT.stopProp==='match' && !isStopMatched) ?'active':''}" data-action="setProp" data-val="off">关闭</button>
                            </div>
                        </div>
                        <span class="label">新标签白名单 (强制新标签)</span>
                        <textarea data-key="newTab" placeholder="域名或正则">${nT.list}</textarea>
                    </div>
                    <div class="section ${settings.activeTab===2?'active':''}">
                        <span class="label">禁新标白名单 (强制同页)</span>
                        <textarea data-key="removeNewTab" placeholder="域名或正则">${settings.removeNewTab.list}</textarea>
                    </div>
                    <div class="section ${settings.activeTab===4?'active':''}">
                        <span class="label">配置 JSON</span>
                        <textarea id="io-area">${JSON.stringify(settings)}</textarea>
                        <div class="btn-group">
                            <button class="btn" data-action="import" style="flex:1;background:#34C759;color:#fff;font-weight:bold;padding:10px">导入配置</button>
                            <button class="btn" data-action="export" style="flex:1;background:#8E8E93;color:#fff;font-weight:bold;padding:10px">导出配置</button>
                        </div>
                    </div>
                </div>
                <button class="save-btn" data-action="save">保存并刷新</button>
            `;
        };

        panel.addEventListener('click', (e) => {
            const target = e.target;
            const action = target.dataset.action || target.closest('[data-action]')?.dataset.action;
            if (target.closest('.nav-item')) { settings.activeTab = parseInt(target.closest('.nav-item').dataset.tab); render(); return; }
            if (!action) { shadowRoot.getElementById('copy-menu')?.classList.remove('show'); return; }
            if (action === 'open-menu') {
                e.stopPropagation();
                shadowRoot.getElementById('copy-menu').classList.toggle('show');
            } else if (action === 'setProp') {
                const val = target.dataset.val;
                settings.newTab.stopProp = val;
                let sList = (settings.newTab.stopList || '').split('\n').map(l => l.trim()).filter(Boolean);
                if (val === 'match') { if(!sList.includes(currentHost)) sList.push(currentHost); }
                else if (val === 'off') { sList = sList.filter(l => l !== currentHost); }
                settings.newTab.stopList = sList.join('\n');
                render();
            } else if (action === 'copy-type') {
                const type = target.dataset.type;
                let textToCopy = currentHost;
                if (type === 'clean') {
                    try {
                        const url = new URL(location.href);
                        const paramsToKeep = ['id', 'pg', 'p'];
                        const searchParams = new URLSearchParams();
                        url.searchParams.forEach((v, k) => { if (paramsToKeep.includes(k.toLowerCase()) || k.length < 3) searchParams.append(k, v); });
                        url.search = searchParams.toString();
                        textToCopy = url.toString();
                    } catch (e) { textToCopy = location.href; }
                } else if (type === 'regex') {
                    textToCopy = `/${location.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\//g, '\\/')}/`;
                }
                setClipboard(textToCopy, () => {
                    const btn = shadowRoot.querySelector('[data-action="open-menu"]');
                    btn.textContent = '已复制';
                    setTimeout(() => btn.textContent = '复制', 1500);
                    shadowRoot.getElementById('copy-menu').classList.remove('show');
                });
            } else if (action === 'export') {
                const configStr = shadowRoot.getElementById('io-area').value;
                setClipboard(configStr, () => {
                    const btn = e.target;
                    const oldText = btn.textContent;
                    btn.textContent = '已复制';
                    setTimeout(() => btn.textContent = oldText, 1500);
                });
            } else if (action === 'import') {
                try { settings = JSON.parse(shadowRoot.getElementById('io-area').value); render(); } catch(err) { alert('格式错误'); }
            } else if (action === 'save') { 
                GM_setValue(KEY, settings); 
                location.reload(); 
            }
        });

        panel.addEventListener('input', (e) => {
            const key = e.target.dataset.key;
            if (key) settings[key].list = e.target.value;
        });

        mask.onclick = (e) => { if(e.target === mask) { shadowRoot = null; container.remove(); } };
        render(); mask.appendChild(panel); shadowRoot.appendChild(mask);
    }

    GM_registerMenuCommand("页面管理设置 🛠️", createUI);
})();
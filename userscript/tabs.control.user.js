// ==UserScript==
// @name         标签页面管理
// @namespace    https://viayoo.com/jcdamz
// @description  管理链接跳转行为（新标签/同页）、禁止页面重载、黑白名单切换，需要GM环境，非GM环境目前不考虑匹配。
// @version      1.2
// @author       Via & Gemini
// @match        *://*/*
// @license       MIT
// @icon         data:image/png;base64,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
// @run-at       document-start
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
        newTab: { enabled: true, mode: 'white', list: '' },
        removeNewTab: { enabled: false, mode: 'white', list: '' },
        preventReload: { enabled: false, mode: 'white', list: '' }
    };

    let settings = GM_getValue(KEY, defaultSettings);
    let shadowRoot = null;

    const checkMatch = (config) => {
        if (!config.enabled) return false;
        const currentUrl = location.href;
        const lines = config.list.split('\n').map(l => l.trim()).filter(Boolean);
        let isMatched = false;
        for (let line of lines) {
            try {
                if (line.startsWith('/') && line.endsWith('/')) {
                    const parts = line.slice(1, -1).split('/');
                    const flags = parts.length > 1 ? parts.pop() : '';
                    const regex = new RegExp(parts.join('/'), flags);
                    if (regex.test(currentUrl)) { isMatched = true; break; }
                } else if (currentUrl.includes(line)) { isMatched = true; break; }
            } catch (e) { console.error('Regex error:', e); }
        }
        return config.mode === 'white' ? isMatched : !isMatched;
    };

    if (checkMatch(settings.newTab)) {
        window.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && /^https?:\/\//i.test(link.href)) {
                e.preventDefault();
                window.open(link.href, '_blank');
            }
        }, true);
    }

    if (checkMatch(settings.removeNewTab)) {
        let timer = null;
        const cleanTags = () => {
            document.querySelectorAll('a[target="_blank"]').forEach(a => a.removeAttribute('target'));
        };
        const throttledClean = () => {
            if (timer) return;
            timer = requestAnimationFrame(() => {
                cleanTags();
                timer = null;
            });
        };
        cleanTags();
        new MutationObserver(throttledClean).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['target'] });
    }

    if (checkMatch(settings.preventReload)) {
        const freeze = (obj, prop, value) => {
            try { Object.defineProperty(obj, prop, { configurable: false, writable: false, value: value }); } catch (e) {}
        };
        freeze(document, 'visibilityState', 'visible');
        freeze(document, 'hidden', false);
        window.addEventListener('visibilitychange', e => e.stopImmediatePropagation(), true);
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) { console.log('Loaded from BFCache'); }
        }, true);
    }
    
    const setClipboard = (text, successCallback) => {
        const done = () => {
            if (successCallback) successCallback();
            else alert('已复制到剪切板');
        };
        if (typeof GM_setClipboard !== 'undefined') {
            GM_setClipboard(text);
            done();
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
        } else {
            fallbackCopy(text, done);
        }
        function fallbackCopy(str, cb) {
            const textArea = document.createElement("textarea");
            textArea.value = str; textArea.style.position = "fixed"; textArea.style.left = "-9999px"; textArea.style.top = "0";
            document.body.appendChild(textArea); textArea.focus(); textArea.select();
            try {
                document.execCommand('copy'); cb();
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
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
            .mask { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.4); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; animation: fade 0.3s; pointer-events:auto; font-family:system-ui,-apple-system; }
            .panel { background:rgba(255,255,255,0.9); width:340px; border-radius:30px; padding:20px; box-shadow:0 20px 40px rgba(0,0,0,0.2); position:relative; overflow:hidden; }
            .header { margin-bottom: 18px; padding-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,0.05); }
            .domain { font-size: 18px; font-weight: 700; color: #1C2526; margin-bottom: 4px; display: block; }
            .url-bar { display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.03); padding: 6px 10px; border-radius: 10px; overflow: hidden; }
            .url-text { font-size: 11px; color: #888; white-space: nowrap; overflow: hidden; flex: 1; position: relative; }
            .url-scroll { display: inline-block; padding-left: 0; white-space: nowrap; animation: scroll-linear 10s linear infinite; }
            .url-scroll:hover { animation-play-state: paused; }
            @keyframes scroll-linear { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .copy-btn { font-size: 10px; background: #fff; border: 1px solid #ddd; padding: 2px 6px; border-radius: 6px; cursor: pointer; color: #007AFF; z-index: 1; }
            .status-indicators { display: flex; gap: 6px; margin-top: 10px; }
            .dot { width: 12px; height: 12px; border-radius: 4px; background: rgba(0,0,0,0.05); transition: 0.3s; position: relative; }
            .dot.active { background: #34C759; box-shadow: 0 0 8px rgba(52, 199, 89, 0.4); }
            .dot::after { content: attr(data-tip); position: absolute; top: 18px; left: 50%; transform: translateX(-50%); font-size: 9px; color: #999; white-space: nowrap; opacity: 0; transition: 0.2s; }
            .dot:hover::after { opacity: 1; }
            .nav { display:flex; gap:5px; margin-bottom:15px; background:rgba(0,0,0,0.05); padding:5px; border-radius:15px; }
            .nav-item { flex:1; padding:8px; text-align:center; font-size:12px; cursor:pointer; border-radius:10px; transition:0.3s; font-weight:600; color:#666; }
            .nav-item.active { background:#fff; color:#007AFF; box-shadow:0 2px 8px rgba(0,0,0,0.1); }
            .content-wrapper { transition: 0.3s ease; }
            .section { display:none; flex-direction:column; gap:12px; animation: slide 0.3s; }
            .section.active { display:flex; }
            .row { display:flex; justify-content:space-between; align-items:center; }
            .label { font-size:14px; font-weight:600; color:#333; }
            .switch-group { display:flex; gap:8px; }
            .btn { border:none; padding:6px 12px; border-radius:8px; cursor:pointer; font-size:12px; transition:0.2s; background:#eee; color: #555; }
            .btn-mode.active { background:#007AFF; color:#fff !important; }
            .btn-toggle.on { background:#34C759; color:#fff !important; }
            textarea { width:100%; height:100px; border-radius:12px; border:1px solid #ddd; padding:10px; box-sizing:border-box; font-family:monospace; font-size:12px; resize:none; transition:0.3s; }
            textarea:focus { outline:none; border-color:#007AFF; box-shadow:0 0 0 3px rgba(0,122,255,0.1); }
            textarea.error { border-color:#ff4d4f; background:#fff1f0; }
            textarea.conflict-highlight { border-color: #FF9500; box-shadow: 0 0 0 3px rgba(255,149,0,0.2); animation: shake 0.4s; }
            .footer { margin-top:15px; display:flex; flex-direction:column; gap:8px; }
            .save-btn { background:#007AFF; color:#fff; border:none; padding:12px; border-radius:15px; font-weight:bold; cursor:pointer; }
            .btn-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 5px; }
            .import-btn { background:#34C759; color:#fff; border:none; padding:8px; border-radius:10px; font-weight:bold; cursor:pointer; }
            .export-btn { background:#8E8E93; color:#fff; border:none; padding:8px; border-radius:10px; font-weight:bold; cursor:pointer; }
            .conflict-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,59,48,0.95); color: #fff; z-index: 100; display: none; flex-direction: column; align-items: center; justify-content: center; padding: 30px; box-sizing: border-box; text-align: center; backdrop-filter: blur(5px); }
            .conflict-layer.show { display: flex; animation: fade 0.3s; }
            .conflict-msg { font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
            @keyframes fade { from { opacity:0; } to { opacity:1; } }
            @keyframes slide { from { transform:translateX(10px); opacity:0; } to { transform:translateX(0); opacity:1; } }
            @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
            @media (prefers-color-scheme: dark) {
                .panel { background:rgba(30,30,30,0.9); color:#fff; }
                .label, .domain { color:#ddd; }
                textarea { background:#222; border-color:#444; color:#eee; }
                .nav-item { color: #aaa; }
                .nav-item.active { background:#444; color:#0A84FF; }
                .btn { background: #444; color: #bbb; }
                .btn-mode.active, .btn-toggle.on { color: #fff; }
                .url-bar { background: rgba(255,255,255,0.05); }
                .copy-btn { background: #333; border-color: #555; color: #0A84FF; }
            }
        `;
        shadowRoot.appendChild(style);
        const mask = document.createElement('div');
        mask.className = 'mask';
        const panel = document.createElement('div');
        panel.className = 'panel';

        const getCleanUrl = () => {
            try {
                const url = new URL(location.href);
                const paramsToKeep = ['id', 'pg', 'p'];
                const searchParams = new URLSearchParams();
                url.searchParams.forEach((value, key) => {
                    if (paramsToKeep.includes(key.toLowerCase()) || key.length < 3) {
                        searchParams.append(key, value);
                    }
                });
                url.search = searchParams.toString();
                return url.toString();
            } catch (e) { return location.href; }
        };

        const render = () => {
            const currentUrl = location.href;
            panel.innerHTML = `
                <div class="header">
                    <span class="domain">${location.hostname}</span>
                    <div class="url-bar">
                        <div class="url-text">
                            <div class="url-scroll">${currentUrl} &nbsp;&nbsp; ${currentUrl} &nbsp;&nbsp;</div>
                        </div>
                        <button class="copy-btn" data-action="copy">复制</button>
                    </div>
                    <div class="status-indicators">
                        <div class="dot ${checkMatch(settings.newTab)?'active':''}" data-tip="新标签"></div>
                        <div class="dot ${checkMatch(settings.removeNewTab)?'active':''}" data-tip="禁新标"></div>
                        <div class="dot ${checkMatch(settings.preventReload)?'active':''}" data-tip="禁重载"></div>
                    </div>
                </div>
                <div class="nav">
                    <div class="nav-item ${settings.activeTab===1?'active':''}" data-tab="1">新标签</div>
                    <div class="nav-item ${settings.activeTab===2?'active':''}" data-tab="2">禁新标</div>
                    <div class="nav-item ${settings.activeTab===3?'active':''}" data-tab="3">禁重载</div>
                    <div class="nav-item ${settings.activeTab===4?'active':''}" data-tab="4">备份</div>
                </div>
                <div class="content-wrapper">
                    ${[1,2,3].map(id => {
                        const configKey = id === 1 ? 'newTab' : (id === 2 ? 'removeNewTab' : 'preventReload');
                        const data = settings[configKey];
                        return `
                        <div class="section ${settings.activeTab===id?'active':''}" id="sec-${id}">
                            <div class="row">
                                <span class="label">功能开关</span>
                                <button class="btn btn-toggle ${data.enabled?'on':''}" data-action="toggle" data-key="${configKey}">
                                    ${data.enabled ? '已开启' : '已关闭'}
                                </button>
                            </div>
                            <div class="row">
                                <span class="label">列表模式</span>
                                <div class="switch-group">
                                    <button class="btn btn-mode ${data.mode==='black'?'active':''}" data-action="setMode" data-key="${configKey}" data-mode="black">黑名单</button>
                                    <button class="btn btn-mode ${data.mode==='white'?'active':''}" data-action="setMode" data-key="${configKey}" data-mode="white">白名单</button>
                                </div>
                            </div>
                            <span class="label">匹配列表</span>
                            <textarea placeholder="www.example.com\n/pattern/i" data-action="list" data-key="${configKey}">${data.list}</textarea>
                        </div>`;
                    }).join('')}
                    <div class="section ${settings.activeTab===4?'active':''}" id="sec-4">
                        <span class="label">数据导出/导入</span>
                        <textarea id="io-area" placeholder="在此处粘贴配置JSON进行导入">${JSON.stringify(settings)}</textarea>
                        <div class="btn-group-row">
                            <button class="import-btn" data-action="import">导入配置</button>
                            <button class="export-btn" data-action="export">复制配置</button>
                        </div>
                    </div>
                </div>
                <div id="conflict-layer" class="conflict-layer">
                    <div style="font-size:40px;margin-bottom:10px;">⚠️</div>
                    <div class="conflict-msg" id="conflict-msg"></div>
                    <div class="footer" style="width:100%">
                        <button class="save-btn" style="background:#fff;color:#FF3B30" id="fix-btn">去修改冲突</button>
                        <button class="btn" style="background:transparent;color:#fff;border:1px solid #fff" data-action="closeConflict">忽略并保存</button>
                    </div>
                </div>
                <div class="footer">
                    <button class="save-btn" data-action="save">保存并刷新页面</button>
                </div>
            `;
        };

        const handleConflict = (msg, tabId, key) => {
            const layer = shadowRoot.getElementById('conflict-layer');
            const msgEl = shadowRoot.getElementById('conflict-msg');
            const fixBtn = shadowRoot.getElementById('fix-btn');
            msgEl.textContent = msg;
            layer.classList.add('show');
            fixBtn.onclick = () => {
                layer.classList.remove('show');
                settings.activeTab = tabId;
                render();
                setTimeout(() => {
                    const tx = shadowRoot.querySelector(`textarea[data-key="${key}"]`);
                    if (tx) { tx.classList.add('conflict-highlight'); tx.focus(); }
                }, 100);
            };
        };

        panel.addEventListener('click', (e) => {
            const target = e.target;
            const action = target.dataset.action || target.closest('[data-action]')?.dataset.action;
            const tab = target.closest('.nav-item');
            if (tab) {
                settings.activeTab = parseInt(tab.dataset.tab);
                render();
                return;
            }
            if (!action) return;
            const key = target.dataset.key || target.closest('[data-key]')?.dataset.key;

            if (action === 'toggle') {
                settings[key].enabled = !settings[key].enabled;
                render();
            } else if (action === 'setMode') {
                settings[key].mode = target.dataset.mode;
                render();
            } else if (action === 'copy') {
                setClipboard(getCleanUrl(), () => {
                    target.textContent = '已复制';
                    setTimeout(() => target.textContent = '复制', 1500);
                });
            } else if (action === 'export') {
                setClipboard(JSON.stringify(settings), () => {
                    target.textContent = '已复制';
                    setTimeout(() => target.textContent = '复制配置', 1500);
                });
            } else if (action === 'import') {
                try {
                    const val = shadowRoot.getElementById('io-area').value;
                    const parsed = JSON.parse(val);
                    settings = { ...defaultSettings, ...parsed };
                    render();
                } catch(err) { alert('配置解析失败！'); }
            } else if (action === 'closeConflict') {
                GM_setValue(KEY, settings);
                location.reload();
            } else if (action === 'save') {
                if (settings.newTab.enabled && settings.removeNewTab.enabled && settings.newTab.mode === settings.removeNewTab.mode) {
                    const listA = settings.newTab.list.split('\n').map(l => l.trim()).filter(Boolean);
                    const listB = settings.removeNewTab.list.split('\n').map(l => l.trim()).filter(Boolean);
                    const intersection = listA.filter(x => listB.includes(x));
                    if (intersection.length > 0) {
                        handleConflict(`规则 [${intersection[0]}] 在"新标签"与"禁新标"中存在逻辑冲突（同为${settings.newTab.mode === 'white' ? '白' : '黑'}名单）。`, 1, 'newTab');
                        return;
                    }
                }
                GM_setValue(KEY, settings);
                location.reload();
            }
        });

        panel.addEventListener('input', (e) => {
            if (e.target.tagName === 'TEXTAREA' && e.target.dataset.key) {
                const key = e.target.dataset.key;
                settings[key].list = e.target.value;
                e.target.classList.remove('conflict-highlight');
            }
        });

        mask.onclick = (e) => { if(e.target === mask) { shadowRoot = null; container.remove(); } };
        render();
        mask.appendChild(panel);
        shadowRoot.appendChild(mask);
    }

    GM_registerMenuCommand("页面管理设置 🛠️", createUI);
})();

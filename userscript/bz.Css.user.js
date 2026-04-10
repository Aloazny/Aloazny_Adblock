// ==UserScript==
// @name         B仔 Css隐藏规则日志
// @namespace    http://bzbrowser.com/
// @version      1.1
// @license      MIT
// @description  检测哪些Css规则在B仔浏览器上生效，并输出匹配日志。
// @author       Copilot & Grok & Gemini
// @run-at       document-end
// @match        *://*/*
// @icon        data:image/webp;base64,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
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const currentDomain = location.hostname || 'unknown';
    const CONFIG = {
        STORAGE: {
            SETTINGS: 'bz_css_configs',
            ENABLED: 'floatingButtonEnabled'
        },
        CSS_PATH: '/adb.css-bzbrowser',
        IDLE_TIME: 3000,
        BATCH_SIZE: 100
    };

    let settings = typeof GM_getValue !== 'undefined' ? GM_getValue(CONFIG.STORAGE.SETTINGS, { floatEnabled: true }) : { floatEnabled: true };
    let activeRulesCache = [];
    let shadowRoot = null, container = null;

    const UI_CSS = `
    .mask { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.3); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:2147483646; display:flex; align-items:center; justify-content:center; animation: fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1); pointer-events: auto; touch-action: none; }
    .panel { background:rgba(255,255,255,0.9); border:1px solid rgba(255,255,255,0.4); border-radius:28px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); padding:24px; display:flex; flex-direction:column; gap:14px; width:92%; max-width:450px; max-height:82vh; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; box-sizing:border-box; position:relative; overflow:hidden; touch-action: auto; }
    .title { margin:0 0 4px 0; font-size:19px; font-weight:700; color:#1d1d1f; text-align:center; letter-spacing:-0.02em; }
    .list-container { flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:12px; padding-right:4px; scroll-behavior: smooth; }
    .list-container::-webkit-scrollbar { width:4px; }
    .list-container::-webkit-scrollbar-thumb { background:rgba(0,0,0,0.1); border-radius:10px; }
    .rule-card { background:rgba(255,255,255,0.6); border-radius:16px; padding:14px; cursor:pointer; transition:all 0.4s cubic-bezier(0.22, 1, 0.36, 1); border:1px solid rgba(0,0,0,0.05); position:relative; display:flex; flex-direction:column; }
    .rule-card:hover { transform: translateY(-2px); background:#fff; box-shadow: 0 10px 20px rgba(0,0,0,0.05); border-color: rgba(0,122,255,0.2); }
    .rule-line { font-family:"SF Mono",SFMono-Regular,Consolas,monospace; font-size:13px; white-space:nowrap; overflow-x:auto; padding-bottom:8px; scrollbar-width: none; line-height:1.4; }
    .rule-line::-webkit-scrollbar { display: none; }
    .rule-badge { position:absolute; bottom:8px; right:10px; background:rgba(0,122,255,0.08); color:#007AFF; font-size:11px; padding:2px 8px; border-radius:8px; font-weight:600; pointer-events:none; transition: opacity 0.3s; }
    .rule-content { margin-top:10px; display:none; flex-direction:column; gap:10px; border-top:1px solid rgba(0,0,0,0.06); padding-top:14px; animation: slide-up 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
    .rule-card.expanded .rule-content { display:flex; }
    .rule-card.expanded .rule-badge { opacity: 0; }
    .hl-domain { color: #ff8c00; font-weight: 600;}
    .hl-sep { color: #007bff; font-weight: 700; }
    .hl-selector { color: #808080; }
    .hl-url { color: #ff0000; font-weight: 600; }
    .hl-pseudo { color: #d197d9; font-weight: 600; }
    .hl-paren { color: #deb887; }
    .btn-group { display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
    button { border:none; border-radius:14px; padding:10px; cursor:pointer; font-size:13px; font-weight:600; transition:all 0.3s cubic-bezier(0.22, 1, 0.36, 1); background:#f2f2f7; color:#1d1d1f; }
    button:active { transform: scale(0.96); }
    button.primary { background:#007AFF; color:#fff; width: 100%; margin-top: 6px; box-shadow: 0 4px 12px rgba(0,122,255,0.3); }
    button.copy-btn { background:#007AFF; color:white; }
    button.allow-btn { background:#ff9500; color:white; }
    
    .auth-settings-panel { position:relative; background:rgba(255,255,255,0.85); border-radius:28px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); padding:24px; display:flex; flex-direction:column; gap:12px; width:300px; animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); border:1px solid rgba(255,255,255,0.4); touch-action: auto; }
    .card-slider-wrapper { position:relative; width:100%; overflow:hidden; margin-bottom:4px; border-radius:18px; }
    .card-slider { display:flex; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .result-card-mini { min-width:100%; box-sizing:border-box; background:rgba(255,255,255,0.5); border-radius:18px; padding:18px; display:flex; flex-direction:column; align-items:center; border:1px solid rgba(0,0,0,0.05); }
    .mini-title { font-size:14px; font-weight:800; color:#007AFF; margin-bottom:4px; }
    .mini-desc { font-size:12px; color:#666; text-align:center; line-height:1.4; }
    .dots { display:flex; justify-content:center; gap:5px; margin-top:8px; }
    .dot { width:6px; height:6px; border-radius:50%; background:rgba(0,0,0,0.1); transition: 0.3s; }
    .dot.active { background:#007AFF; width:12px; border-radius:3px; }
    .auth-settings-panel button.menu-btn { border:none; border-radius:14px; padding:14px; cursor:pointer; font-size:14px; transition: all 0.2s; display:flex; align-items:center; justify-content:space-between; font-weight:600; background:#fff; color:#007AFF; box-shadow:0 4px 12px rgba(0,122,255,0.1); width:100%; box-sizing:border-box; }
    .btn-close { margin-top:6px; background:none !important; color:#888 !important; box-shadow:none !important; justify-content:center !important; }

    @media (prefers-color-scheme: dark) {
        .panel { background:rgba(28,28,30,0.9); border-color:rgba(255,255,255,0.1); color:#fff; }
        .title { color:#fff; }
        .rule-card { background:rgba(44,44,46,0.6); border-color:rgba(255,255,255,0.05); }
        .rule-card:hover { background:rgba(58,58,60,0.8); border-color:rgba(0,122,255,0.4); }
        .rule-badge { background:rgba(255,255,255,0.1); color:#0a84ff; }
        .hl-selector { color: #d1d1d6; }
        button { background:#3a3a3c; color:#fff; }
        .auth-settings-panel { background:rgba(30,30,30,0.85); border-color:rgba(255,255,255,0.1); }
        .result-card-mini { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.05); }
        .auth-settings-panel button.menu-btn { background:#2c2c2e; color:#0A84FF; }
        .mini-desc { color:#aaa; }
    }
    @keyframes fade-in { from { opacity:0; } to { opacity:1; } }
    @keyframes slide-up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slide-in { from { opacity:0; transform: translateY(20px) scale(0.95); } to { opacity:1; transform: translateY(0) scale(1); } }
    
    .float-btn { position:fixed; right:0; top:60%; width:36px; height:54px; background:rgba(255, 255, 255, 0.3); border-radius:20px 0 0 20px; z-index:2147483645; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 8px 32px rgba(0, 0, 0, 0.15); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); border:1px solid rgba(255,255,255,0.4); border-right:none; color:#1d1d1f; font-size:13px; font-weight:700; user-select:none; touch-action:none; pointer-events: auto; }
    .float-btn.idle { opacity:0.4; transform:translateX(18px); filter: grayscale(0.5); }
    .pop { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
    @keyframes popIn { from { transform:scale(0.8); opacity:0; } to { transform:scale(1); opacity:1; } }
    `;

    const ensureShadow = () => {
        if (shadowRoot) return;
        container = document.createElement('div');
        container.id = 'bz-css-logger-manager';
        container.style.cssText = 'position:fixed;top:0;left:0;z-index:2147483647;pointer-events:none;';
        document.documentElement.appendChild(container);
        shadowRoot = container.attachShadow({ mode: 'closed' });
        const style = document.createElement('style');
        style.textContent = UI_CSS;
        shadowRoot.appendChild(style);
    };

    const showToast = (msg) => {
        if (window.bzhome?.toast) { window.bzhome.toast(msg); return; }
        ensureShadow();
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:80vh;left:50vw;transform:translate(-50%,-50%);background:rgba(255,255,255,0.4);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:12px 24px;border-radius:20px;box-shadow:0 8px 32px rgba(0,0,0,0.1);color:#1C2526;font-size:14px;font-weight:500;z-index:2147483647;opacity:0;transition:opacity 0.3s;pointer-events:none;border:1px solid rgba(255,255,255,0.2);';
        toast.textContent = msg;
        shadowRoot.appendChild(toast);
        requestAnimationFrame(() => toast.style.opacity = '1');
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    const Core = {
        splitSelectors(cssText) {
            const selectors = new Set();
            let current = '', inBlock = false, bracketDepth = 0, parenDepth = 0, inQuote = false, quoteChar = null;
            for (let i = 0; i < cssText.length; i++) {
                const char = cssText[i];
                if (inQuote) { current += char; if (char === quoteChar) inQuote = false; continue; }
                if (char === '"' || char === "'") { inQuote = true; quoteChar = char; current += char; continue; }
                if (inBlock) { if (char === '}') inBlock = false; continue; }
                if (char === '[') bracketDepth++; if (char === ']') bracketDepth--;
                if (char === '(') parenDepth++; if (char === ')') parenDepth--;
                if (char === '{' && bracketDepth === 0 && parenDepth === 0 && !inQuote) {
                    if (current.trim()) selectors.add(current.trim());
                    current = ''; inBlock = true; continue;
                }
                if (char === ',' && bracketDepth === 0 && parenDepth === 0 && !inQuote && !inBlock) {
                    if (current.trim()) selectors.add(current.trim());
                    current = '';
                } else { current += char; }
            }
            return Array.from(selectors).filter(s => s && !s.includes('!important') && !s.startsWith('@'));
        },
        async checkActiveSelectors(cssText) {
            const selectors = this.splitSelectors(cssText);
            const activeMap = new Map();
            for (let i = 0; i < selectors.length; i += CONFIG.BATCH_SIZE) {
                const batch = selectors.slice(i, i + CONFIG.BATCH_SIZE);
                batch.forEach(selector => {
                    try {
                        const count = document.querySelectorAll(selector).length;
                        if (count > 0 && !activeMap.has(selector)) activeMap.set(selector, count);
                    } catch (e) {}
                });
                await new Promise(r => setTimeout(r, 0));
            }
            return Array.from(activeMap.entries()).map(([selector, count]) => ({ selector, count }));
        }
    };

    const UI = {
        highlightAdRule(rule) {
            const match = rule.match(/^(.*?)(###?)(.*)$/);
            if (!match) return `<span>${rule}</span>`;
            let rest = match[3].replace(/("(.*?)")/g, '<span class="hl-url">"$2"</span>').replace(/(:(?:has|not|is|where|nth-child|hover|focus|active))(\(.*?\))?/g, '<span class="hl-pseudo">$1</span><span class="hl-paren">$2</span>');
            return `<span class="hl-domain">${match[1]}</span><span class="hl-sep">${match[2]}</span><span class="hl-selector">${rest}</span>`;
        },
        copyRule(selector, isAllow) {
            let text = `${location.hostname}##${selector}`;
            if (isAllow) text = text.replace('###', '#@##').replace('##', '#@#');
            navigator.clipboard.writeText(text).then(() => showToast('已复制规则'));
        },
        showPanel(activeRules) {
            ensureShadow();
            const mask = document.createElement('div');
            mask.className = 'mask';
            mask.onclick = (e) => { if (e.target === mask) mask.remove(); };
            const panel = document.createElement('div');
            panel.className = 'panel pop';
            panel.onclick = (e) => e.stopPropagation();
            const title = document.createElement('div');
            title.className = 'title';
            title.textContent = `生效规则 (${activeRules.length})`;
            const list = document.createElement('div');
            list.className = 'list-container';
            activeRules.forEach(r => {
                const card = document.createElement('div');
                card.className = 'rule-card';
                const fullRule = `${location.hostname}##${r.selector}`;
                card.innerHTML = `
                    <div class="rule-line">${this.highlightAdRule(fullRule)}</div>
                    <div class="rule-badge">${r.count}</div>
                    <div class="rule-content">
                        <div class="btn-group">
                            <button class="copy-btn">复制拦截</button>
                            <button class="allow-btn">复制放行</button>
                        </div>
                    </div>
                `;
                card.onclick = (e) => { if (e.target.tagName !== 'BUTTON') card.classList.toggle('expanded'); };
                card.querySelector('.copy-btn').onclick = () => this.copyRule(r.selector, false);
                card.querySelector('.allow-btn').onclick = () => this.copyRule(r.selector, true);
                list.appendChild(card);
            });
            const closeBtn = document.createElement('button');
            closeBtn.className = 'primary';
            closeBtn.textContent = '关闭界面';
            closeBtn.onclick = () => mask.remove();
            panel.append(title, list, closeBtn);
            mask.appendChild(panel);
            shadowRoot.appendChild(mask);
        }
    };

    const renderSettings = () => {
        if (shadowRoot?.querySelector('.auth-settings-mask')) return;
        ensureShadow();
        const mask = document.createElement('div');
        mask.className = 'mask auth-settings-mask';
        mask.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        const panel = document.createElement('div');
        panel.className = 'auth-settings-panel';
        panel.onclick = (e) => e.stopPropagation();
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'card-slider-wrapper';
        const slider = document.createElement('div');
        slider.className = 'card-slider';
        const dotsCont = document.createElement('div');
        dotsCont.className = 'dots';

        let currIdx = 0;
        const updateSlider = (index) => {
            currIdx = index;
            slider.style.transform = `translateX(-${currIdx * 100}%)`;
            Array.from(dotsCont.children).forEach((d, i) => d.className = 'dot' + (i === currIdx ? ' active' : ''));
        };

        if (activeRulesCache.length === 0) {
            const emptyCard = document.createElement('div');
            emptyCard.className = 'result-card-mini';
            emptyCard.innerHTML = `<div class="mini-title">暂无缓存数据</div><div class="mini-desc">请先运行检测或在当前页面扫描</div>`;
            slider.appendChild(emptyCard);
        } else {
            activeRulesCache.forEach((r, i) => {
                const card = document.createElement('div');
                card.className = 'result-card-mini';
                card.style.minWidth = '100%';
                card.innerHTML = `
                    <h2>${currentDomain}</h2>
                    <div class="mini-title">规则 #${i + 1} (匹配: ${r.count})</div>
                    <div style="font-family:monospace;font-size:11px;color:#666;word-break:break-all;text-align:center;height:40px;overflow-y:auto;margin:8px 0;width:100%;">${r.selector}</div>
                    <div style="display:flex;gap:8px;width:100%;">
                        <button class="mini-copy-btn" style="flex:1;padding:6px;font-size:12px;background:#007AFF;color:white;border-radius:10px;border:none;">拦截</button>
                        <button class="mini-allow-btn" style="flex:1;padding:6px;font-size:12px;background:#FF9500;color:white;border-radius:10px;border:none;">放行</button>
                    </div>`;
                card.querySelector('.mini-copy-btn').onclick = () => UI.copyRule(r.selector, false);
                card.querySelector('.mini-allow-btn').onclick = () => UI.copyRule(r.selector, true);
                slider.appendChild(card);
                const dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.style.cursor = 'pointer';
                dot.onclick = () => updateSlider(i);
                dotsCont.appendChild(dot);
            });
        }

        let startX = 0;
        sliderWrapper.ontouchstart = (e) => startX = e.touches[0].clientX;
        sliderWrapper.ontouchend = (e) => {
            if (activeRulesCache.length <= 1) return;
            let diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currIdx < activeRulesCache.length - 1) updateSlider(currIdx + 1);
                else if (diff < 0 && currIdx > 0) updateSlider(currIdx - 1);
            }
        };

        const btnCheck = document.createElement('button');
        btnCheck.className = 'menu-btn';
        btnCheck.innerHTML = `<span>立即检测当前页面</span> 🔍`;
        btnCheck.onclick = () => { mask.remove(); runCheck(); };
        const btnFloat = document.createElement('button');
        btnFloat.className = 'menu-btn';
        btnFloat.innerHTML = `<span>右侧悬浮按钮</span> <small>${settings.floatEnabled ? 'ON' : 'OFF'}</small>`;
        btnFloat.onclick = () => {
            settings.floatEnabled = !settings.floatEnabled;
            GM_setValue(CONFIG.STORAGE.SETTINGS, settings);
            GM_setValue(CONFIG.STORAGE.ENABLED, settings.floatEnabled);
            btnFloat.querySelector('small').textContent = settings.floatEnabled ? 'ON' : 'OFF';
            showToast(settings.floatEnabled ? '悬浮按钮已开启' : '悬浮按钮已关闭');
        };
        const close = document.createElement('button');
        close.className = 'btn-close';
        close.textContent = '保存并返回';
        close.onclick = () => {
            if (GM_getValue(CONFIG.STORAGE.ENABLED) !== settings.floatEnabled) location.reload();
            else mask.remove();
        };
        sliderWrapper.appendChild(slider);
        panel.append(sliderWrapper, dotsCont, btnCheck, btnFloat, close);
        mask.appendChild(panel);
        mask.onclick = () => mask.remove();
        shadowRoot.appendChild(mask);
    };

    const runCheck = async () => {
        showToast('正在扫描...');
        const cssUrl = `${window.location.protocol}//${window.location.hostname}${CONFIG.CSS_PATH}`;
        try {
            const resp = await fetch(cssUrl, { cache: 'no-cache' });
            if (!resp.ok) throw new Error();
            const cssText = await resp.text();
            const activeRules = await Core.checkActiveSelectors(cssText);
            activeRulesCache = activeRules;
            if (activeRules.length > 0) UI.showPanel(activeRules);
            else showToast('未发现生效规则');
        } catch (e) {
            showToast('获取规则失败');
        }
    };

    const initFloatBtn = () => {
        ensureShadow();
        const floatBtn = document.createElement('div');
        floatBtn.className = 'float-btn';
        floatBtn.innerHTML = `CSS`;
        
        let idleTimer;
        const resetIdle = () => {
            floatBtn.classList.remove('idle');
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                if (!shadowRoot.querySelector('.mask')) floatBtn.classList.add('idle');
            }, CONFIG.IDLE_TIME);
        };

        let isDragging = false, startY, startTop, moved = false;
        floatBtn.ontouchstart = (e) => {
            isDragging = true; moved = false;
            startY = e.touches[0].clientY;
            startTop = floatBtn.offsetTop;
            floatBtn.style.transition = 'none';
            resetIdle();
        };
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moved = (Math.abs(e.touches[0].clientY - startY) > 5);
            floatBtn.style.top = (startTop + e.touches[0].clientY - startY) + 'px';
        }, { passive: false });
        window.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            floatBtn.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
            floatBtn.style.top = Math.max(50, Math.min(window.innerHeight - 50, floatBtn.offsetTop)) + 'px';
            floatBtn.style.right = '0px';
            resetIdle();
        });
        floatBtn.onclick = () => { if (!moved) runCheck(); };
        shadowRoot.appendChild(floatBtn);
        resetIdle();
    };

    if (typeof GM_registerMenuCommand !== 'undefined') {
        GM_registerMenuCommand('CSS 隐藏规则设置 🛠️', renderSettings);
    }

    if (GM_getValue(CONFIG.STORAGE.ENABLED, true)) initFloatBtn();
})();
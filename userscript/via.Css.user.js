// ==UserScript==
// @name         Via Css隐藏规则日志(高斯模糊)
// @namespace    https://viayoo.com/
// @version      1.1
// @license      MIT
// @description  检测哪些Css规则在Via上生效，并输出匹配日志。支持动态检测开关。
// @author       Copilot & Grok & Gemini
// @run-at       document-end
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    const CONFIG = {
        STORAGE: {
            ENABLED: 'floatingButtonEnabled',
            DYNAMIC: 'dynamicObserverEnabled'
        },
        CSS_PATH: '/via_inject_blocker.css',
        IDLE_TIME: 3000,
        BATCH_SIZE: 100
    };

    const UI_CSS = `
    .mask { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.3); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:2147483646; display:flex; align-items:center; justify-content:center; animation: fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1); pointer-events: auto; }
    .panel { background:rgba(255,255,255,0.9); border:1px solid rgba(255,255,255,0.4); border-radius:28px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); padding:24px; display:flex; flex-direction:column; gap:14px; width:92%; max-width:450px; max-height:82vh; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; box-sizing:border-box; position:relative; overflow:hidden; }
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
    @media (prefers-color-scheme: dark) {
        .panel { background:rgba(28,28,30,0.9); border-color:rgba(255,255,255,0.1); color:#fff; }
        .title { color:#fff; }
        .rule-card { background:rgba(44,44,46,0.6); border-color:rgba(255,255,255,0.05); }
        .rule-card:hover { background:rgba(58,58,60,0.8); border-color:rgba(0,122,255,0.4); }
        .rule-badge { background:rgba(255,255,255,0.1); color:#0a84ff; }
        .hl-selector { color: #d1d1d6; }
        button { background:#3a3a3c; color:#fff; }
        .rule-content { border-top-color:rgba(255,255,255,0.1); }
    }
    @keyframes fade-in { from { opacity:0; } to { opacity:1; } }
    @keyframes slide-up { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
    .float-btn { position:fixed; right:0; top:60%; width:36px; height:54px; background:rgba(255, 255, 255, 0.3); border-radius:20px 0 0 20px; z-index:2147483645; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 8px 32px rgba(0, 0, 0, 0.15); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px); transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); border:1px solid rgba(255,255,255,0.4); border-right:none; color:#1d1d1f; font-size:13px; font-weight:700; user-select:none; touch-action:none; }
    .float-btn.idle { opacity:0.4; transform:translateX(18px); filter: grayscale(0.5); }
    @media (prefers-color-scheme: dark) { .float-btn { background:rgba(44,44,46,0.5); color:#fff; border-color:rgba(255,255,255,0.1); } }
    .pop { animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
    @keyframes popIn { from { transform:scale(0.8); opacity:0; } to { transform:scale(1); opacity:1; } }
    `;

    const Core = {
        splitSelectors(cssText) {
            const selectors = [];
            let current = '', inBlock = false, bracketDepth = 0, parenDepth = 0, inQuote = false, quoteChar = null;
            for (let i = 0; i < cssText.length; i++) {
                const char = cssText[i];
                if (inQuote) { current += char; if (char === quoteChar) inQuote = false; continue; }
                if (char === '"' || char === "'") { inQuote = true; quoteChar = char; current += char; continue; }
                if (inBlock) { if (char === '}') inBlock = false; continue; }
                if (char === '[') bracketDepth++; if (char === ']') bracketDepth--;
                if (char === '(') parenDepth++; if (char === ')') parenDepth--;
                if (char === '{' && bracketDepth === 0 && parenDepth === 0 && !inQuote) {
                    if (current.trim()) selectors.push(current.trim());
                    current = ''; inBlock = true; continue;
                }
                if (char === ',' && bracketDepth === 0 && parenDepth === 0 && !inQuote && !inBlock) {
                    if (current.trim()) selectors.push(current.trim());
                    current = '';
                } else { current += char; }
            }
            if (current.trim() && !inBlock) selectors.push(current.trim());
            return selectors.filter(s => s && !s.includes('!important') && !s.startsWith('@'));
        },

        async checkActiveSelectors(cssText) {
            const selectors = this.splitSelectors(cssText);
            const activeRules = [];
            for (let i = 0; i < selectors.length; i += CONFIG.BATCH_SIZE) {
                const batch = selectors.slice(i, i + CONFIG.BATCH_SIZE);
                batch.forEach(selector => {
                    try {
                        const count = document.querySelectorAll(selector).length;
                        if (count > 0) activeRules.push({ selector, count });
                    } catch (e) {}
                });
                await new Promise(r => setTimeout(r, 0));
            }
            return activeRules;
        }
    };

    const UI = {
        container: null,
        shadow: null,

        ensureShadow() {
            if (this.container) return;
            this.container = document.createElement('div');
            this.container.id = 'via-css-logger-container';
            document.documentElement.appendChild(this.container);
            this.shadow = this.container.attachShadow({ mode: 'closed' });
            const style = document.createElement('style');
            style.textContent = UI_CSS;
            this.shadow.appendChild(style);
        },

       highlightAdRule(rule) {
         const match = rule.match(/^(.*?)(###?)(.*)$/);
           if (!match) return `<span>${rule}</span>`;
           let rest = match[3].replace(/("(.*?)")/g, '<span class="hl-url">"$2"</span>').replace(/(:(?:has|not|is|where|nth-child|hover|focus|active))(\(.*?\))?/g, '<span class="hl-pseudo">$1</span><span class="hl-paren">$2</span>');
          return `<span class="hl-domain">${match[1]}</span><span class="hl-sep">${match[2]}</span><span class="hl-selector">${rest}</span>`;
        },

        copyRule(rule, isAllow) {
            let text = `${window.location.hostname}##${rule}`;
            if (isAllow) {
                text = text.replace('###', '#@##').replace('##', '#@#');
            }
            navigator.clipboard.writeText(text).then(() => {
                if (window.via?.toast) window.via.toast('已复制到剪贴板');
            });
        },

        showPanel(activeRules) {
            this.ensureShadow();
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
                const fullRule = `${window.location.hostname}##${r.selector}`;
                
                card.innerHTML = `
                    <div class="rule-line">${this.highlightAdRule(fullRule)}</div>
                    <div class="rule-badge">${r.count}</div>
                    <div class="rule-content">
                        <div class="btn-group">
                            <button class="copy-btn" data-type="block">复制拦截</button>
                            <button class="allow-btn" data-type="allow">复制放行</button>
                        </div>
                    </div>
                `;

                card.onclick = (e) => {
                    if (e.target.tagName === 'BUTTON') return;
                    card.classList.toggle('expanded');
                };

                card.querySelectorAll('button').forEach(btn => {
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        this.copyRule(r.selector, btn.classList.contains('allow-btn'));
                    };
                });
                list.appendChild(card);
            });

            const closeBtn = document.createElement('button');
            closeBtn.className = 'primary';
            closeBtn.textContent = '关闭界面';
            closeBtn.onclick = () => mask.remove();

            panel.append(title, list, closeBtn);
            mask.appendChild(panel);
            this.shadow.appendChild(mask);
        },

        initFloatBtn() {
            this.ensureShadow();
            const floatBtn = document.createElement('div');
            floatBtn.className = 'float-btn';
            floatBtn.innerHTML = `CSS`;
            
            let idleTimer;
            const resetIdle = () => {
                floatBtn.classList.remove('idle');
                clearTimeout(idleTimer);
                idleTimer = setTimeout(() => {
                    if (!this.shadow.querySelector('.mask')) floatBtn.classList.add('idle');
                }, CONFIG.IDLE_TIME);
            };

            let isDragging = false, startY, startTop, moved = false;

            floatBtn.ontouchstart = (e) => {
                isDragging = true;
                moved = false;
                startY = e.touches[0].clientY;
                startTop = floatBtn.offsetTop;
                floatBtn.style.transition = 'none';
                resetIdle();
            };

            window.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                moved = (Math.abs(e.touches[0].clientY - startY) > 5);
                let moveY = e.touches[0].clientY - startY;
                floatBtn.style.top = (startTop + moveY) + 'px';
            }, { passive: false });

            window.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;
                floatBtn.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
                let finalTop = Math.max(50, Math.min(window.innerHeight - 50, floatBtn.offsetTop));
                floatBtn.style.top = finalTop + 'px';
                floatBtn.style.right = '0px';
                resetIdle();
            });

            floatBtn.onclick = () => {
                if (moved) return;
                window.dispatchEvent(new CustomEvent('via-check-css'));
            };

            this.shadow.appendChild(floatBtn);
            resetIdle();
        }
    };


    const App = {
        async runCheck() {
            if (window.via?.toast) window.via.toast('正在扫描...');
            const cssUrl = `http://${window.location.hostname}${CONFIG.CSS_PATH}`;
            try {
                const resp = await fetch(cssUrl, { cache: 'no-cache' });
                if (!resp.ok) throw new Error('无法加载CSS文件');
                const cssText = await resp.text();
                const activeRules = await Core.checkActiveSelectors(cssText);
                if (activeRules.length > 0) {
                    UI.showPanel(activeRules);
                } else if (window.via?.toast) {
                    window.via.toast('未发现生效规则');
                }
            } catch (e) {
                console.error(e);
                if (window.via?.toast) window.via.toast('获取规则失败');
            }
        },

        init() {
            GM_registerMenuCommand('手动检测CSS', () => this.runCheck());
            GM_registerMenuCommand('切换悬浮按钮', () => {
                const val = !GM_getValue(CONFIG.STORAGE.ENABLED, true);
                GM_setValue(CONFIG.STORAGE.ENABLED, val);
                location.reload();
            });

            if (GM_getValue(CONFIG.STORAGE.ENABLED, true)) {
                UI.initFloatBtn();
            }

            window.addEventListener('via-check-css', () => this.runCheck());
        }
    };

    App.init();
})();


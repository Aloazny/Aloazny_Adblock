// ==UserScript==
// @name         网页加载分析(改)
// @version      2.0
// @description  测试网页加载速度并显示加载最慢的三个网址的域名，二改添加了对Via浏览器toast的调用，添加高斯模糊效果。
// @description:en Test the webpage loading speed and display the domain names of the three slowest loading URLs.
// @match        *://*/*
// @run-at       document-start
// @author       yzcjd & nobody
// @author2      Lama AI 辅助
// @namespace    https://scriptcat.org/zh-CN/users/157252
// @exclude      *://*.cloudflare.com/*
// @exclude      *://*.recaptcha.net/*
// @license      MIT
// @icon       data:image/png;base64,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
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    const currentDomain = location.hostname || 'unknown';
    const KEY_SETTINGS = 'network_test_configs';
    let settings = typeof GM_getValue !== 'undefined' ? GM_getValue(KEY_SETTINGS, { useBlur: true, domainDisabled: {}, hideDelay: 2.6 }) : { useBlur: true, domainDisabled: {}, hideDelay: 2.6 };
    const isEnabled = !settings.domainDisabled[currentDomain];
    let shadowRoot = null, container = null;
    let finalResult = { time: 0, slow: [] };

    const ensureShadow = () => {
        if (shadowRoot) return;
        container = document.createElement('div');
        container.id = 'network-test-interceptor';
        container.style.cssText = 'position:fixed;top:0;left:0;z-index:2147483647;pointer-events:none;';
        document.documentElement.appendChild(container);
        shadowRoot = container.attachShadow({ mode: 'closed' });
    };

    if (typeof GM_registerMenuCommand !== 'undefined') {
        GM_registerMenuCommand('网页测试设置 🚀', () => {
            if (shadowRoot?.querySelector('.auth-settings-mask')) return;
            ensureShadow();
            const mask = document.createElement('div'), panel = document.createElement('div');
            mask.className = 'auth-settings-mask';
            panel.className = 'auth-settings-panel';
            const css = `
                .auth-settings-mask { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.3); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:2147483646; display:flex; align-items:center; justify-content:center; animation: settings-fade-in 0.3s ease; pointer-events:auto; }
                .auth-settings-panel { position:relative; background:rgba(255,255,255,0.85); border-radius:28px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); padding:24px; display:flex; flex-direction:column; gap:12px; min-width:280px; font-family:system-ui,-apple-system,sans-serif; animation: settings-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); border:1px solid rgba(255,255,255,0.4); }
                .result-display { background:rgba(255,255,255,0.5); border-radius:18px; padding:18px; margin-bottom:4px; display:flex; flex-direction:column; align-items:center; gap:8px; border:1px solid rgba(0,0,0,0.05); }
                .auth-settings-panel button { border:none; border-radius:14px; padding:16px; cursor:pointer; font-size:14px; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; justify-content:space-between; font-weight:600; background:#fff; color:#007AFF; box-shadow:0 4px 12px rgba(0,122,255,0.1); width:100%; box-sizing:border-box; }
                .auth-settings-panel button:active { transform: scale(0.96); }
                .btn-status.enabled { background:#f6ffed; color:#52c41a; box-shadow:0 4px 12px rgba(82,196,26,0.1); }
                .btn-status.disabled { background:#fff1f0; color:#ff4d4f; box-shadow:0 4px 12px rgba(255,77,79,0.1); }
                .slider-box { background:rgba(255,255,255,0.5); padding:14px; border-radius:14px; display:flex; flex-direction:column; gap:8px; border:1px solid rgba(0,0,0,0.03); }
                .slider-header { display:flex; justify-content:space-between; font-size:13px; font-weight:600; color:#444; }
                input[type=range] { width:100%; cursor:pointer; accent-color:#007AFF; margin: 4px 0; }
                .btn-close { margin-top:6px; background:none; color:#888 !important; border:none; font-size:13px; cursor:pointer; text-align:center; font-weight:500; box-shadow:none !important; justify-content:center !important; }
                @media (prefers-color-scheme: dark) {
                    .auth-settings-panel { background:rgba(30,30,30,0.85); border:1px solid rgba(255,255,255,0.1); }
                    .result-display { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.05); }
                    .auth-settings-panel button { background:#2c2c2e; color:#0A84FF; }
                    .btn-status.enabled { background:#162312; color:#30d158; }
                    .btn-status.disabled { background:#2c1515; color:#ff6961; }
                    .slider-box { background:rgba(255,255,255,0.05); }
                    .slider-header { color:#aaa; }
                }
                @keyframes settings-fade-in { from { opacity:0; } to { opacity:1; } }
                @keyframes settings-slide-in { from { opacity:0; transform: translateY(20px) scale(0.95); } to { opacity:1; transform: translateY(0) scale(1); } }
            `;
            const style = document.createElement('style'); style.textContent = css; shadowRoot.appendChild(style);
            const save = () => GM_setValue(KEY_SETTINGS, settings);
            const resultBox = document.createElement('div');
            resultBox.className = 'result-display';
            const getTimeColor = (ms) => ms < 500 ? '#34C759' : (ms < 1500 ? '#FF9500' : '#FF3B30');
            resultBox.innerHTML = `
                <div style="font-size:24px;font-weight:800;color:${getTimeColor(finalResult.time)};margin-bottom:2px;">${finalResult.time.toFixed(0)}ms</div>
                <div style="font-size:12px;color:#888;text-align:center;line-height:1.6;">
                    ${finalResult.slow.map(s => `<div>${s.d} <b style="color:#666;font-family:monospace;">${s.t}ms</b></div>`).join('')}
                </div>`;
            const btnBlur = document.createElement('button');
            const updateBlurUI = () => { btnBlur.innerHTML = `<span>启用高斯模糊效果</span> <small>${settings.useBlur ? 'ON' : 'OFF'}</small>`; };
            updateBlurUI();
            btnBlur.onclick = () => { settings.useBlur = !settings.useBlur; updateBlurUI(); save(); };
            const btnSite = document.createElement('button');
            const updateSiteUI = () => { 
                const disabled = settings.domainDisabled[currentDomain];
                btnSite.className = `btn-status ${disabled ? 'disabled' : 'enabled'}`;
                btnSite.innerHTML = `<span>在本站进行测试</span> <small>${disabled ? '已禁用' : '运行中'}</small>`; 
            };
            updateSiteUI();
            btnSite.onclick = () => { 
                if (settings.domainDisabled[currentDomain]) delete settings.domainDisabled[currentDomain];
                else settings.domainDisabled[currentDomain] = true;
                updateSiteUI(); save(); 
            };
            const sliderBox = document.createElement('div');
            sliderBox.className = 'slider-box';
            sliderBox.innerHTML = `<div class="slider-header"><span>设置弹窗消失速度</span><b id="delay-val">${settings.hideDelay === 0 ? '手动点击' : settings.hideDelay.toFixed(1) + 's'}</b></div>
                                   <input type="range" min="0" max="10" step="0.1" value="${settings.hideDelay}">`;
            const slider = sliderBox.querySelector('input');
            const delayVal = sliderBox.querySelector('#delay-val');
            slider.oninput = () => {
                const val = parseFloat(slider.value);
                settings.hideDelay = val;
                delayVal.textContent = val === 0 ? '手动点击' : val.toFixed(1) + 's';
                save();
            };
            const close = document.createElement('button');
            close.className = 'btn-close'; close.textContent = '保存并刷新页面';
            close.onclick = () => location.reload();
            panel.append(resultBox, btnBlur, btnSite, sliderBox, close);
            mask.appendChild(panel);
            shadowRoot.appendChild(mask);
            mask.onclick = (e) => { if(e.target === mask) mask.remove(); };
        });
    }

    if (!isEnabled || /\.user\.js($|\?)/i.test(location.href)) return;

    const startTime = performance.now();
    const slowestRequests = new Set();
    const networkObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            slowestRequests.add({ name: entry.name, duration: entry.duration });
            if (slowestRequests.size > 3) {
                const sorted = Array.from(slowestRequests).sort((a, b) => b.duration - a.duration);
                slowestRequests.clear();
                sorted.slice(0, 3).forEach(req => slowestRequests.add(req));
            }
        });
    });
    networkObserver.observe({ entryTypes: ['resource'] });
    window.addEventListener('load', () => {
        networkObserver.disconnect();
        const timeElapsed = performance.now() - startTime;
        const sorted = Array.from(slowestRequests).sort((a, b) => b.duration - a.duration);
        finalResult = {
            time: timeElapsed,
            slow: sorted.map(r => ({ d: new URL(r.name).hostname, t: r.duration.toFixed(0) }))
        };
        const getTimeColor = (ms) => ms < 500 ? '#34C759' : (ms < 1500 ? '#FF9500' : '#FF3B30');
        const mainColor = getTimeColor(timeElapsed);
        if (window.via && typeof window.via.toast === 'function' && !settings.useBlur) {
            const networkInfo = sorted.map(req => `Slow: ${new URL(req.name).hostname} (${req.duration.toFixed(0)}ms)`).join('\n');
            window.via.toast(`Time: ${timeElapsed.toFixed(0)}ms\n${networkInfo}`);
            return;
        }
        ensureShadow();
        const networkInfoHTML = sorted.length ? sorted.map((req) => {
            try {
                const url = new URL(req.name);
                return `slow: ${url.hostname} (${req.duration.toFixed(0)}ms)<br>`;
            } catch {
                return `slow: Invalid URL (${req.duration.toFixed(0)}ms)<br>`;
            }
        }).join('') : '[none]';
        const loadTimeElement = document.createElement('div');
        loadTimeElement.style.cssText = 'position:fixed;top:85vh;left:50vw;transform:translate(-50%,-50%);background:rgba(255,255,255,0.3);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:12px 20px;border-radius:22px;box-shadow:0 6px 24px rgba(0,0,0,0.15);white-space:nowrap;width:auto;max-width:90vw;pointer-events:auto;color:#1C2526;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:15px;font-weight:500;text-align:center;border:1px solid rgba(255,255,255,0.25);opacity:0;transition:opacity 0.3s ease-in-out;cursor:pointer;';
        if (!settings.useBlur) {
            loadTimeElement.style.background = 'rgba(240, 240, 240, 0.85)';
            loadTimeElement.style.backdropFilter = 'none';
            loadTimeElement.style.webkitBackdropFilter = 'none';
        }
        loadTimeElement.innerHTML = `<h2 style="margin:0;font-size:16px;font-weight:600;color:${mainColor};">Time: ${timeElapsed.toFixed(2)}ms</h2>${networkInfoHTML}`;
        shadowRoot.appendChild(loadTimeElement);
        requestAnimationFrame(() => { loadTimeElement.style.opacity = '1'; });
        const closeRes = () => {
            loadTimeElement.style.transition = 'opacity 0.1s';
            loadTimeElement.style.opacity = '0';
            setTimeout(() => loadTimeElement.remove(), 100);
        };
        loadTimeElement.onclick = closeRes;
        if (settings.hideDelay > 0) {
            setTimeout(() => {
                if (loadTimeElement.parentNode) closeRes();
            }, settings.hideDelay * 1000);
        }
    });
})();


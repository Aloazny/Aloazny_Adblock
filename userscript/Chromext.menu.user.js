// ==UserScript==
// @name         ChromeXt脚本菜单提取器
// @namespace    ChromeXt.GodMode
// @version      1.4
// @description  通过劫持Array原型链，提取ChromeXt脚本菜单，会在页面右侧生成一个"CX"的悬浮图标开启。
// @author       Aloazny
// @match        *://*/*
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAT7SURBVGiB1ZpRaBxFAIa/m8sl1166SWzTJJcNHkRDuYd4wYoFQeJDT6Eq0UCqKD4cDfq4L74ptA+CYB7yIlQKQrVijDScUKtYwQipLYiYfSlVUqK2l5ombW9N7kxIcuvD3tHLNbczm7s08YPhjt1/Zv6Z2Z2ZnRkfmycCPAY8nv99GNgPtEnizQBzwJ+ACfyS//2jAi9K1AOvAGPAbcCucrgNJIHXgVA1jR8CzgDZLTBdLmSBT/N5b5oAMATkHqDx0pADPsh78cRe4OI2Gi8NF/OelOgBpneA6dIwDRyQmd8FXNoBZsuFn/Iey/L+DjApC8eLDfuK/vcAPwN+txK6EY/Hicfj6LqOpmlEo1FWjh1lLayzGqgl7Q/wzcwt3jv37WazAFjGGXd+Ky3ASeBNr6npuo5hGMTjcTRNu+/+yrGj913z7Q7xd6vOq2fPcf32Ha9ZAnwEvAX3ChAGppA8X6UYhkEikdjQeIGNClDAtzuEua+N/o8/85ItwL/Ao0BK5C+8iAfzmqZx/vx5DMNwNS/Dzmbo/muKq2/007H3IS9RdwEvABQK0KcaMxqNMjExQTQa9ZKhK/6ZG/zwVIy+gz1eovWBUwABPKESQ9M0RkZGKqr1ctjZDEPhJi8tcRAQAugGpLG20nwBO5vhwpFnVOV7gW6B4oQpkUhU9bEph3/mBmOJ11TlMYHC8KzrOolEoiJjXuiev6n6KB0QQLtMVWlv4xU7m+Hzl4+oSDtrgA6ZKh6PezKgaRqhUIja2lq4cJnla79jjX3BP999rZxG62xKRdYhgEY3RbkRdiOEELS1tdHU1OSYz1PX2cX+t9+l4+QniPo9SmnZ2QzvPP+cTNYogCY3hZfab2lpWWe8lLrOLtqHPlRO7+nWZpmkSQB1bgpd15Uy0zTN1XyBus4utGeVnm/CuRVpcgIIyoypEAqpf4c3vFR+flRMzaq0AEFpC6j2/Sq1X6Cus0tJ55+5IU3Kh/ORUJZwOKyUWSql1Gt4xufzud4XOB8IZVlZkTYjAFeuXFE2pYppmjLJsgCW3BS5XE4ps9HRUTVXHkin0zLJkrQF1tbWlDI7depU1VthcnJSJlkWwF03xdKSawOto7+/v6qFGB8fl0nu+oDLwJNuqtbWVoQQbpJ1DAwMMDg4WNHs1bIsGhtdJwkAPwrgukzlpRXAeR8OHz5Me7t0nliWZDKpIpsVwDWZyrIs5Ze5GliWhWEYKtJpAVyVqWzbJpPJVGxMleHhYZUeCOCqD4gBv6qom5ubCQS8LRR7HeBM0yQWi6nKe3w4g1kGyZwInFGxpaXF0wvtpQCWZRGJRFRr/w7QLHDW4L9XiWHbNvPz81vyPliWRW9vr6p5cHrPXKEqlT+VVldXmZ2dVZ5iqGCaJpFIRGXgKuZLuLewdRbJlKIY27aZm5tjYWGhotawLIsTJ04Qi8W81Dw4Xr8CqMlfmANO43Fxd2FhgcXFRRoaGggGg8rvhmVZJJNJDMPwarzAafIziOK5aifOAu+mCQaDBINB/H4/QggCgQCpVArTNEmn00xOTjI+Pq46SLnxCGXGr+Ns/waGpw2OUoI42zjbbbJcuIRCd78P51HabrOlYSrvTYn/9TZrgQDOJvN2b3QPsYmN7mIO4Wz7P+ijBmeo8KhBKXtwDmIk2brDHmM4B0rqVU25r1m4s9Fxm2acDUM3bgK3qNJxm/8A2JAp2ALrPTkAAAAASUVORK5CYII=
// @homepageURL  https://scriptcat.org/zh-CN/users/157252
// @grant        none
// @license     GPL-3.0
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    let captured = new Set();
    const methods = ['push', 'splice', 'fill', 'unshift'];
    methods.forEach(method => {
        const original = Array.prototype[method];
        Array.prototype[method] = function(...args) {
            const result = original.apply(this, args);
            args.forEach(arg => {
                if (arg && typeof arg === 'object' && 'title' in arg && 'listener' in arg) {
                    captured.add(arg);
                }
            });
            return result;
        };
    });

    function deepScan() {
        Object.getOwnPropertySymbols(window).forEach(sym => {
            try {
                const val = window[sym];
                if (val && val.commands && Array.isArray(val.commands)) {
                    val.commands.forEach(cmd => captured.add(cmd));
                }
            } catch (e) {}
        });
        return Array.from(captured);
    }

    const initUI = () => {
        if (document.getElementById('cx-v5-container')) return;
        const host = document.createElement('div');
        host.id = 'cx-v5-container';
        host.style = 'position:fixed;top:50%;right:0;z-index:2147483647;user-select:none;touch-action:none;';
        const shadow = host.attachShadow({mode: 'open'});
        document.body.appendChild(host);
        const getTheme = () => {
            const isDarkAPI = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const bodyStyle = window.getComputedStyle(document.body);
            const htmlStyle = window.getComputedStyle(document.documentElement);
            let bgColor = bodyStyle.backgroundColor || htmlStyle.backgroundColor;
            const isDarkColor = (color) => {
                const rgb = color.match(/\d+/g);
                if (!rgb || rgb.length < 3) return isDarkAPI;
                const brightness = (rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114);
                return brightness < 128;
            };
            const isTransparent = bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent';
            const dark = isTransparent ? isDarkAPI : isDarkColor(bgColor);
            return {
                bg: dark ? 'rgba(32, 32, 32, 0.75)' : 'rgba(255, 255, 255, 0.75)',
                item: dark ? 'rgba(55, 55, 55, 0.5)' : 'rgba(245, 245, 245, 0.5)',
                text: dark ? '#ffffff' : '#000000',
                accent: dark ? '#60cdff' : '#0078d4',
                border: dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
                idleBg: dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
            };
        };
        const updateThemeVars = () => {
            const theme = getTheme();
            Object.keys(theme).forEach(key => {
                host.style.setProperty(`--cx-${key}`, theme[key]);
            });
        };
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --cx-bg: rgba(255, 255, 255, 0.75);
                --cx-item-bg: rgba(255, 255, 255, 0.5);
                --cx-text: #000;
                --cx-accent: #0078d4;
                --cx-border: rgba(0, 0, 0, 0.1);
                --cx-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
            }
            #btn {
                position: absolute; right: 0; transform: translateY(-50%);
                width: 32px; height: 50px; 
                background: var(--cx-accent);
                color: #ffffff; border-radius: 18px 0 0 18px; 
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; font: bold 12px "Segoe UI", system-ui; 
                box-shadow: inset 0 1px 1px rgba(255,255,255,0.3), var(--cx-shadow);
                backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.2); border-right: none;
                transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                opacity: 1;
            }
            #btn.idle {
                background: var(--cx-idleBg) !important;
                color: var(--cx-text) !important;
                opacity: 0.25;
                backdrop-filter: blur(9px);
                box-shadow: none;
                border-color: var(--cx-border);
            }
            #btn:hover, #btn:active { 
                width: 45px; filter: brightness(1.1); opacity: 1 !important;
                background: var(--cx-accent) !important;
                color: #ffffff !important;
                backdrop-filter: blur(15px) !important;
                box-shadow: inset 0 1px 1px rgba(255,255,255,0.3), var(--cx-shadow);
            }
            .panel-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.4); display: flex; align-items: center;
                justify-content: center; backdrop-filter: blur(12px);
                animation: fadeIn 0.25s ease; touch-action: none;
            }
            .content {
                width: 88%; max-width: 440px; max-height: 75vh; 
                background: var(--cx-bg); border: 1px solid rgba(255,255,255,0.2); 
                border-radius: 26px; padding: 18px; 
                box-shadow: var(--cx-shadow), inset 0 0 0 1px var(--cx-border);
                backdrop-filter: blur(40px) saturate(180%);
                display: grid; grid-template-columns: 1fr; gap: 12px;
                overflow-y: auto; scrollbar-width: none;
                animation: zoomIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .content::-webkit-scrollbar { display: none; }
            @media (min-width: 768px) { .content { max-width: 620px; grid-template-columns: 1fr 1fr; } }
            .item {
                padding: 16px; background: var(--cx-item-bg); color: var(--cx-text);
                border-radius: 14px; font: 600 15px "Segoe UI", system-ui;
                text-align: center; cursor: pointer; border: 1px solid var(--cx-border);
                box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                transition: all 0.25s ease; display: flex; align-items: center; justify-content: center;
            }
            .item:hover { 
                background: var(--cx-accent); color: #fff; 
                transform: translateY(-4px) scale(1.025);
                box-shadow: 0 10px 20px rgba(0,0,0,0.15);
            }
            .item:active { transform: scale(0.95); }
            .close-btn {
                grid-column: 1 / -1; position: sticky; bottom: -18px; 
                margin: 10px -18px -18px -18px; padding: 16px;
                background: var(--cx-bg); border-top: 1px solid var(--cx-border);
                text-align: center; color: var(--cx-accent); font: bold 14px system-ui;
                cursor: pointer; border-radius: 0 0 26px 26px;
                backdrop-filter: blur(10px);
            }
            @keyframes fadeIn { from { opacity: 0; } }
            @keyframes zoomIn { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `;
        shadow.appendChild(style);
        updateThemeVars();
        const btn = document.createElement('div');
        btn.id = 'btn';
        btn.textContent = 'CX';
        shadow.appendChild(btn);
        let idleTimer;
        const resetIdle = () => {
            btn.classList.remove('idle');
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                if (!shadow.querySelector('.panel-overlay')) btn.classList.add('idle');
            }, 3000);
        };
        resetIdle();
        let isDragging = false, startY, startTop;
        btn.ontouchstart = (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;
            startTop = host.offsetTop;
            btn.style.transition = 'none';
            resetIdle();
        };
        window.ontouchmove = (e) => {
            if (!isDragging) return;
            let moveY = e.touches[0].clientY - startY;
            host.style.top = (startTop + moveY) + 'px';
        };
        window.ontouchend = () => {
            if (!isDragging) return;
            isDragging = false;
            btn.style.transition = 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
            let finalTop = Math.max(50, Math.min(window.innerHeight - 50, host.offsetTop));
            host.style.top = finalTop + 'px';
            resetIdle();
        };
        btn.onmouseenter = resetIdle;
        btn.onclick = () => {
            if (isDragging) return;
            const menus = deepScan();
            if (menus.length === 0) return alert("未发现脚本菜单。");
            renderPanel(menus, shadow, resetIdle);
        };
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeVars);
        }
    };

    function renderPanel(menus, shadow, onBtnRestore) {
        if (shadow.querySelector('.panel-overlay')) return;
        const html = document.documentElement;
        const oldOverflow = html.style.overflow;
        const oldMargin = html.style.marginRight;
        const scrollBarWidth = window.innerWidth - html.clientWidth;
        html.style.overflow = 'hidden';
        if (scrollBarWidth > 0) html.style.marginRight = scrollBarWidth + 'px';
        const overlay = document.createElement('div');
        overlay.className = 'panel-overlay';
        const content = document.createElement('div');
        content.className = 'content';
        content.onclick = (e) => e.stopPropagation();
        overlay.addEventListener('touchmove', (e) => {
            if (!content.contains(e.target)) e.preventDefault();
        }, { passive: false });
        const closePanel = () => {
            html.style.overflow = oldOverflow;
            html.style.marginRight = oldMargin;
            overlay.remove();
            onBtnRestore();
        };
        menus.forEach((cmd) => {
            const item = document.createElement('div');
            item.className = 'item';
            item.innerText = typeof cmd.title === 'function' ? cmd.title() : cmd.title;
            item.onclick = (e) => { 
                e.stopPropagation(); 
                closePanel();
                setTimeout(() => cmd.listener(), 50); 
            };
            content.appendChild(item);
        });
        const close = document.createElement('div');
        close.className = 'close-btn';
        close.innerText = "关闭";
        close.onclick = closePanel;
        content.appendChild(close);
        overlay.appendChild(content);
        overlay.onclick = closePanel;
        shadow.appendChild(overlay);
    }

    if (document.readyState !== 'loading') initUI();
    else window.addEventListener('DOMContentLoaded', initUI);
})();

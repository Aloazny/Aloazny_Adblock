// ==UserScript==
// @name         bilinovel反检测
// @namespace    https://viayoo.com/zt6kh2
// @version      1.8
// @description  移除www.bilinovel.com和www.linovelib.com的Adblock检测，移除复制限制。
// @author       Aloazny
// @match        http*://*.bilinovel.*/*
// @match        https://www.bilinovel.com/*
// @match        https://www.linovelib.com/*
// @icon         data:image/png;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANzd+ACqq+0AiInnAHx85QB3d+UAdHTlEXR05UR0dOV1dHTll3R05aZ0dOWmdHTlmHR05XZ0dOVGdHTlE3R05QB0dOUAdXXlAHZ25QCPj+kA+/v/AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ax8jzAHd54gBCQ9kAKSnVNSEh1ZsfH9XmHx/V/x8f1f8fH9X/Hx/V/x8f1f8fH9X/Hx/V/x8f1f8fH9XoHx/Vnx8f1TghIdUAIiLVAEtL3AD4+P8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDQ0fUAeHrjGTU12J4kJNX9JSXW/yoq1/8qKtf/KirX/yoq1/8qKtf/KSnW/ygo1v8oKNb/KCjW/ygo1v8oKNb/KCjW/igo1qMqK9YdU1PdAPn5/wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKWm7UMyMtjhJybW/0ND3P9BQdv/KirX/yoq1/8rK9f/IyPV/yMj1f8oKNb/LCzX/y8v2P8wMNj/MTHY/zEx2P8wMNj/Ly/Y/yoq1+VRUd1J+fn/AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC7u/NUKyvW+SEh1f87O9r/8vL+/97e+v8uLtf/KCjW/yIi1f9/f+f/x8f1/9TU9//c3Pn/4eH6/+Tk+v/k5Pr/5OT6/+Tk+v/i4vr/39/5/+Hh+vz+/v9c////AP///wD///8A////AP///wD///8A////AP///wD///8Ay8v2QCoq1vklJdX/JSXV/0hI3P//////7e39/zMz2P8nJ9b/Hx/U/8XF9f////////////////////////////////////////////////////////////////z///9H////AP///wD///8A////AP///wD///8A////AOXl+xY4ONnjGxvT/yUl1v8fH9T/UFDe///////u7v3/NjbZ/ycn1v8lJdb/Y2Pi/4iI6f+Li+n/jo7q/5GR6v+Li+n/u7vz////////////q6vv/4mJ6f+IiOn/goLn/3d35ulub+MbaWniAKKi7QD///8A////APj4/gD09P0AnJzsnEdH3P9MTN3/Q0Pb/zIy2P9fX+H///////Dw/v8xMdj/GhrT/yEh1f8jI9X/HR3U/x0d1P8dHdT/HR3U/xAQ0f9wcOT///////////9TU97/FBTS/x0d1P8eHtT/Hh7U/yMj1aYcHdQAcnLkAP///wD///8A5OX5ANzd+C3////8//////7+///4+P7/7+/8/+zs/P///////Pz//8DA8/+mpu7/dXXl/yYm1v8qKtf/KirX/yoq1/8qKtf/Hx/U/3V15f///////////1lZ3/8iItX/KirX/yoq1/8qKtf/KirX/x8f1DV0dOUA////AP///wCusO4AiInnmPX1/v/+/v/////////////////////////////////////////////l5fv/JibV/ykp1v8qKtf/KirX/yoq1/8fH9T/cHDk////////////VFTf/yIi1f8qKtf/KirX/yoq1/8qKtf/Hx/UoXR05QD///8A////AKCh7AwtLdfnPz/a/0xM3f9YWN//ZGTi/2ho4/+goO3///////v7//+Wluv/iorp/3V15f8nJ9b/KirX/yoq1/8qKtf/KSnX/x4e1P9lZeL///////////9ISNz/HBzT/yIi1f8hIdX/IyPV/yoq1/8fH9TtdHTlEf///wD///8Al5jrPR8f1P8lJdb/JCTV/yIi1f8gINX/FBTS/2dn4v//////9vb//zY22P8YGNP/ICDV/ysr1/8mJtb/Hh7U/yEh1f8mJtb/JSXV/2Vl4v///////f3//2Vl4v9OTt3/WVng/11d4P9SUt7/KSnW/x8f1P90dOVG////AP///wCGhuhuHh7U/yoq1/8pKdf/KCjW/ycn1v8bG9T/bm7j///////39///PDza/x8f1f8nJ9b/JSXW/0xM3f+lpe7/vb3z/9DQ9//e3vn/7u78/////////////v7//////////////////+jo/P8tLdf/HR3U/3R05Xj///8A////AH9/55AaGtP/Hx/U/yUl1v8sLNf/MzPY/y4u1/98fOb///////j4//9bW+D/Q0Pb/zY22f8eHtT/amrj//////////////////////////////////////////////////b2/v/p6fv/x8f1/zIy2P8dHdT/dHTlmv///wD///8AdnblnkBA2/+ysvH/zMz2/93d+f/n5/v/7u78//f3/v////////////39///+/v//nZ3t/xoa0/85Odn/pKTu/6io7/+fn+3/lJTr/4iI6f97e+b/bGzj/11d4P9OTt7/QEDb/zMz2P8qKtf/KirX/x8f1P90dOWo////AP///wB2duWeOjrZ/////////////////////////////////////////////Pz///b2/v+pqe//GhrT/1NT3/9jY+L/FBTS/x0d1P8dHdT/HR3U/x4e1P8fH9X/ISHV/yMj1f8lJdb/JyfW/ygo1v8pKdb/Hx/U/3R05af///8A////AICA548TE9L/ubny////////////lZXr/01N3f+Dg+j///////Pz/v9TU97/PDza/yws1/9lZeL///////////9nZ+L/HR3U/ysr1/8qKtf/KirX/yoq1/8qKtf/KirX/yoq1/8jI9X/JCTV/yco1v8eHtP/dHTlmf///wD///8AkJHqbRMT0v9oaOL///////////+srPD/DAzQ/1lZ4P//////7+/9/zAw2P8iItX/JCTV/zs72v/b2/n///////Ly/f9NTd3/ICDU/ysr1/8qKtf/KirX/ysr1/8nJ9b/HR3U/0lJ3P+5ufL/n5/t/xYW0v90dOV2////AP///wCysvA7ICDU/y0t1//h4fr///////Pz/v81Ndn/TEzd//T0/f/b2/n/MDDY/ygo1v8rK9f/ISHU/0tL3f/y8v3//////9/g+v83N9n/JCTV/ysr1/8qKtf/Hx/U/zAw1/+Wluv/9vb+////////////TU3d/2xs40T///8A////ANrb+As5OdnlFxfT/4+P6v///////////3195/8ZGdP/ODjZ/zQ02f8jI9X/IyPV/yYm1v8rK9f/HR3U/29v5P///////////8XF9f8nJ9b/JyfW/yUl1v9iYuL/3Nz5/////////////////6Wl7v8sLNfrcnLkD////wD///8A+vv+AICB55QaGtP/S0vd//b2/v//////zs73/0JC2/9ISNz/S0vd/09P3v9PT97/PDza/ygo1v8qKtf/HR3U/5eX7P///////////6Oj7v8UFNL/cnLk/////////////////9nZ+P9iYuH/HR3U/x4f1J16euYA////AP///wD///8A8/P9KtfX+Pvj4/r//Pz//////////////Pz///7+//////////////////+oqO//Hh7U/yoq1/8oKNb/JCTV/76+8////////////3d35f8vL9f/4+P7//b2/v+Pj+r/Li7X/x8f1P8oKNb9MzPXMYSE5wD///8A////AP///wD///8A////l//////////////////////////////////////+/v//+Pj+/6Sk7v8fH9T/KirX/yoq1/8kJNX/NDTY/93d+f//////+Pj//0xM3f89Pdr/S0vd/x0d1P8nJ9b/IyPV/0FC2aBnaN4An6DrAP///wD///8A////AP///wD///8Tnp7t321t4//a2vn//////+rq/P9gYOH/U1Pe/0xM3f9CQtv/MzPY/ykp1v8qKtf/KirX/ysr1/8gINT/Tk7d//T0/v//////39/6/yws1/8fH9T/KyvX/yMj1f89Pdrlw8TyF9HT9ADh4vgA////AP///wD///8A////AP///wDIyPU6GBjT9m5u5P///////f3//1BQ3v8aGtP/JCTV/yUl1v8oKNb/KirX/yoq1/8qKtf/KirX/yoq1/8bG9P/bGzj//z8////////sLDx/yAg1P8kJNX/KirW+cjI9UH///8A////AP///wD///8A////AP///wD///8A////AP///wDDxPRNNTbZ9dvb+f//////q6vw/x4e1P8qKtf/KirX/yoq1/8pKdb/Hh7U/x4e1P8gINX/JCTV/ykp1v8lJdX/o6Pu////////////bGzj/yEh1Pi7u/NV////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDJyfU8rKzw29jY+P93d+X/JSXV/yoq1/8qKtf/KCjW/zMz2P+Vlev/qqrv/7m58v/JyfX/2Nj4/+Xl+//u7vz////////////g4PrgtLTxQv///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD5+f8Ujo7qlSEh1PkhIdX/JyfW/yoq1/8nJ9b/NDTY//v7///////////////////////////////////////7////mv39/xjn6PoA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD+/v8At7nwLmJi4JIwMNfgISHV/x4e1P8ZGdP/iIjp/62t8P+kpO7/mZns/42N6f+BgefigoLmlubm+zH///8A+Pj/AN7f+AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APr6/gDq6/oA2dn3ALm68Qygoe07iorpa39/5410dOWdcnLknXJy5I52duVtgIDmPYSF5w6TlOkA6ur7AP///wD7+/8A7Oz7AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A///////gB///gAH//gAAf/wAAD/4AAAf8AAAD+AAAAfgAAAHwAAAA8AAAAOAAAABgAAAAYAAAAGAAAABgAAAAYAAAAGAAAABgAAAAYAAAAGAAAABwAAAA8AAAAPgAAAH4AAAB/AAAA/4AAAf/AAAP/4AAH//gAH//+AH//////8=
// @run-at       document-start
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let closeTimer = null;
    const RECOVERY_STYLE = 'display:block!important;visibility:visible!important;opacity:1!important;position:static!important;transform:none!important;filter:none!important;clip:auto!important;clip-path:none!important;width:auto!important;height:auto!important;pointer-events:auto!important;';
    const BLOCK_REGEX = /hairlie-top|whitelist|AdBlock|dialog|detect|白名单|屏蔽|检测到|浏览体验|内容无法显示|Guard\/AdBl/i;
    const TARGET_SELECTORS = ['#acontent', '#TextContent', '#volumes', '#volume-list', '.module-header'];
    const CLOSE_SELECTORS = ['#close-btn', '.fc-close', '.close-icon'];
    const TARGET_HIDDEN_SELECTORS = ['.hairlie-top', '.fc-ab-root', '.fc-dialog-content', '.csgo', 'ins.adsbygoogle', 'div[class^="fc-"]', 'a[href*="whitelist"]']

    const forceShow = (el) => {
        if (!el || el.dataset.shadowed) return;
        if (el.getAttribute('style') !== RECOVERY_STYLE) {
            domProtector.disconnect();
            el.removeAttribute('style');
            el.style.cssText = RECOVERY_STYLE;
            startObserve();
        }
    };

    const protectWithShadow = (originalNode) => {
        if (!originalNode || originalNode.dataset.shadowed || originalNode.textContent.trim().length < 50) return;
        const host = document.createElement('div');
        host.id = 'shadow-content-protector';
        host.style.cssText = 'position:relative!important;display:block!important;width:100%!important;z-index:1!important;';
        const shadow = host.attachShadow({mode: 'closed'});
        document.querySelectorAll('link[rel="stylesheet"]').forEach(css => shadow.appendChild(css.cloneNode(true)));
        const contentClone = originalNode.cloneNode(true);
        contentClone.id = 'shadow-inner-content';
        const innerStyle = document.createElement('style');
        innerStyle.textContent = `
            :host { display: block!important; }
            #shadow-inner-content { display: block!important; visibility: visible!important; position: static!important; transform: none!important; opacity: 1!important; }
            .csgo, .co, ins, script, [href*="whitelist"], .hairlie-top { display: none !important; height: 0 !important; }
            p { margin: 1em 0; line-height: 1.8; }
        `;
        shadow.appendChild(innerStyle);
        shadow.appendChild(contentClone);
        originalNode.dataset.shadowed = 'true';
        originalNode.style.cssText = 'position:absolute!important;top:-9999px!important;visibility:hidden!important;pointer-events:none!important;';
        originalNode.parentNode.insertBefore(host, originalNode);
    };

    const checkAndBlock = (node) => {
        if (node && node.nodeType === 1) {
            if (BLOCK_REGEX.test(node.textContent) || BLOCK_REGEX.test(node.innerHTML) || BLOCK_REGEX.test(node.id + node.className)) {
                return true;
            }
        }
        return false;
    };

    ['appendChild', 'insertBefore'].forEach(method => {
        const original = Node.prototype[method];
        Node.prototype[method] = function(...args) {
            if (checkAndBlock(args[0])) return args[0];
            return original.apply(this, args);
        };
    });

    Object.defineProperty(window, 'anra', { value: () => {}, writable: false });
    document.writeln = new Proxy(document.writeln, {
        apply: (target, thisArg, args) => BLOCK_REGEX.test(args[0]) ? null : target.apply(thisArg, args)
    });

    window.unlockScroll = function() {
        if (!document.body) return;
        if (!document.getElementById('scroll-unlocker-style')) {
            const style = document.createElement('style');
            style.id = 'scroll-unlocker-style';
            style.textContent = `html, body { overflow: auto!important; -webkit-overflow-scrolling: touch!important; position: relative!important; } body.no-scroll, body.modal-open, body.scroll-locked { overflow: auto!important; }.modal-backdrop, .van-overlay, .am-modal-mask { display: none!important; }`;
            (document.head || document.documentElement).appendChild(style);
        }
        document.documentElement.style.overflow = 'visible';
        document.body.style.overflow = 'visible';
    };

    const restoreCopy = () => {
        const events = ['copy', 'selectstart', 'contextmenu', 'dragstart'];
        events.forEach(e => document.addEventListener(e, ev => ev.stopImmediatePropagation(), true));
        events.forEach(e => {
            Object.defineProperty(document, 'on' + e, { get: () => null, configurable: true });
        });
    };

    const handleCloseBtn = () => {
        if (closeTimer) return;
        closeTimer = setTimeout(() => {
            CLOSE_SELECTORS.forEach(selector => {
                const btn = document.querySelector(selector);
                if (btn && (btn.tagName === 'BUTTON' || btn.tagName === 'A' || btn.onclick || btn.getAttribute('role') === 'button')) {
                    btn.style.setProperty('display', 'flex', 'important');
                    btn.click();
                }
            });
            closeTimer = null;
        }, 50);
    };

    const domProtector = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    const isClose = CLOSE_SELECTORS.some(s => node.matches(s) || (node.querySelector && node.querySelector(s)));
                    if (isClose) handleCloseBtn();
                    const isTarget = TARGET_SELECTORS.some(s => node.matches(s));
                    if (isTarget) { forceShow(node); domProtector.observe(node, { attributes: true, attributeFilter: ['style', 'class'] }); }
                    if (node.tagName === 'STYLE' && BLOCK_REGEX.test(node.textContent)) node.remove();
                    if (BLOCK_REGEX.test(node.id + node.className)) node.style.display = 'none';
                });
            } else if (mutation.type === 'attributes') {
                const target = mutation.target;
                if (CLOSE_SELECTORS.some(s => target.matches(s))) {
                    handleCloseBtn();
                } else {
                    const style = window.getComputedStyle(target);
                    if (style.display === 'none' || style.visibility === 'hidden' || target.offsetHeight < 10) {
                        forceShow(target);
                        if (target.offsetHeight < 10) protectWithShadow(target);
                    }
                }
            }
        }
    });

    const startObserve = () => {
        domProtector.observe(document.documentElement, { childList: true, subtree: true });
        TARGET_SELECTORS.forEach(s => {
            const el = document.querySelector(s);
            if (el) domProtector.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
        });
    };

    const init = () => {
        startObserve(); restoreCopy(); unlockScroll();
        const baseStyle = document.createElement('style');
        baseStyle.textContent = `
            ${TARGET_SELECTORS.join(', ')} { display: block!important; visibility: visible!important; transform: none!important; }
            ${TARGET_HIDDEN_SELECTORS.join(', ')} { display: none!important; }
            ${CLOSE_SELECTORS.join(', ')} { display: flex!important; visibility: visible!important; opacity: 1!important; }
        `;
        (document.head || document.documentElement).appendChild(baseStyle);
        setInterval(() => {
            unlockScroll();
            handleCloseBtn();
            TARGET_SELECTORS.forEach(selector => {
                const el = document.querySelector(selector);
                if (el && !el.dataset.shadowed) {
                    const rect = el.getBoundingClientRect();
                    if (rect.height < 10) protectWithShadow(el);
                    else forceShow(el);
                }
            });
        }, 1000);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
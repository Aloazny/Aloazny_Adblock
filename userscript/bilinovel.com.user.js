// ==UserScript==
// @name         bilinovel反检测
// @namespace    https://viayoo.com/zt6kh2
// @version      1.9
// @description  移除www.bilinovel.com和www.linovelib.com的Adblock检测，移除复制限制。
// @author       Aloazny
// @match        http*://*.bilinovel.*/*
// @match        https://www.bilinovel.com/*
// @match        https://www.linovelib.com/*
// @icon         data:image/webp;base64,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
// @run-at       document-start
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let closeTimer = null;
    const RECOVERY_STYLE = 'display:block!important;visibility:visible!important;opacity:1!important;position:static!important;transform:none!important;filter:none!important;clip:auto!important;clip-path:none!important;width:auto!important;height:auto!important;pointer-events:auto!important;';
    const BLOCK_REGEX = /hairlie-top|whitelist|AdBlock|dialog|detect|白名单|屏蔽|检测到|浏览体验|内容无法显示|Guard\/AdBl/i;
    const TARGET_SELECTORS = ['#acontent', '#TextContent', '#volumes', '#volume-list', '.content', '.atitle', '.module-header', '.section_title'];
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
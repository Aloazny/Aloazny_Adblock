// ==UserScript==
// @name         bilinovel反检测
// @namespace    https://viayoo.com/zt6kh2
// @version      1.3
// @description  移除www.bilinovel.com和www.linovelib.com的Adblock检测，移除复制限制。
// @author       Aloazny
// @match        http*://*.bilinovel.*/*
// @match        https://www.bilinovel.com/*
// @match        https://www.linovelib.com/*
// @icon         https://www.bilinovel.com/favicon.ico
// @run-at       document-start
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const RECOVERY_STYLE = 'display:block!important;visibility:visible!important;opacity:1!important;position:static!important;transform:none!important;filter:none!important;clip:auto!important;clip-path:none!important;width:auto!important;height:auto!important;pointer-events:auto!important;';

    const forceShow = (el) => {
        if (!el || el.dataset.shadowed) return;
        if (el.getAttribute('style') !== RECOVERY_STYLE) {
            domProtector.disconnect();
            el.removeAttribute('style');
            el.style.cssText = RECOVERY_STYLE;
            const prev = el.previousElementSibling;
            if (prev && !/atitle|section_title|h1|h2/i.test(prev.tagName + prev.className)) {
                prev.style.setProperty('display', 'none', 'important');
            }
            domProtector.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
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

    const domProtector = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    if (node.tagName === 'STYLE') {
                        if (/AdGuard|AdBlock|屏蔽|whitelist/i.test(node.textContent)) {
                            node.remove();
                        }
                    }
                    if (node.id === 'acontent' || node.id === 'TextContent' || node.id === 'volumes' || node.id === 'volume-list') {
                        forceShow(node);
                    }
                    if (node.matches?.('a[href*="whitelist"], .hairlie-top, .csgo, ins.adsbygoogle') || 
                        node.querySelector?.('a[href*="whitelist"]') || 
                        (node.tagName === 'DIV' && /whitelist|白名单|屏蔽/i.test(node.innerHTML))) {
                        node.style.setProperty('display', 'none', 'important');
                    }
                });
            } else if (mutation.type === 'attributes') {
                const target = mutation.target;
                if (target.id === 'acontent' || target.id === 'TextContent' || target.id === 'volumes' || target.id === 'volume-list') {
                    const style = window.getComputedStyle(target);
                    if (style.transform !== 'none' || style.display === 'none' || style.visibility === 'hidden' || target.offsetHeight < 10) {
                        forceShow(target);
                        if (target.offsetHeight < 10) protectWithShadow(target);
                    }
                }
            }
        }
    });

    const restoreCopy = () => {
        const events = ['copy', 'selectstart', 'contextmenu', 'dragstart'];
        events.forEach(e => document.addEventListener(e, e => e.stopImmediatePropagation(), true));
        ['oncopy', 'onselectstart', 'oncontextmenu', 'ondragstart'].forEach(prop => {
            Object.defineProperty(document, prop, { get: () => null, configurable: true });
        });
    };

    const init = () => {
        domProtector.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
        restoreCopy();
        const baseStyle = document.createElement('style');
        baseStyle.textContent = `
            #acontent, #TextContent, #volumes, #volume-list { display: block!important; visibility: visible!important; transform: none!important; position: static!important; }
            .hairlie-top, div[style*="z-index:9999"], a[href*="whitelist"], .csgo, ins.adsbygoogle { display: none!important; visibility: hidden!important; height: 0!important; overflow: hidden!important; pointer-events: none!important; }
        `;
        (document.head || document.documentElement).appendChild(baseStyle);
        const check = () => {
            document.querySelectorAll('#acontent, #TextContent, #volumes, #volume-list').forEach(el => {
                if (el.dataset.shadowed) return;
                forceShow(el);
                const rect = el.getBoundingClientRect();
                if (rect.height < 10 || window.getComputedStyle(el).transform !== 'none') {
                    protectWithShadow(el);
                }
            });
            document.querySelectorAll('a[href*="whitelist"]').forEach(a => {
                const container = a.closest('div');
                if (container) container.style.setProperty('display', 'none', 'important');
                else a.style.setProperty('display', 'none', 'important');
            });
        };
        setInterval(check, 1000);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    Object.defineProperty(window, 'anra', { value: () => {}, writable: false });
    document.writeln = new Proxy(document.writeln, {
        apply: function(target, thisArg, args) {
            if (/hairlie-top|whitelist|AdBlock|屏蔽/i.test(args[0])) return;
            return target.apply(thisArg, args);
        }
    });
})();
// ==UserScript==
// @name         4khd 广告屏蔽
// @namespace    https://viayoo.com
// @version      0.50
// @description  移除4khd广告，兼容原生和GM环境。
// @author       Via
// @license      MIT
// @match        *://*.4khd.com/*
// @match        *://*.xxtt.ink/*
// @match        *://*.uuss.uk/*
// @match        *://*.ssuu.uk/*
// @icon         data:image/png;base64,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
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const hasGM = typeof GM_addStyle === 'function' && typeof unsafeWindow !== 'undefined';
    const win = hasGM ? unsafeWindow : window;
    const doc = document;

    const AD_SELECTORS = '.exo_wrapper,.popup,.centbtd,.exo-native-widget,.exo-native-widget-outer-container,ins[data-processed="true"],.popup-iframe,ins.adsbynetwork,.wb-contai';
    const BLOCK_PATTERNS = [/magsrv|pemsrv|ad-provider\.js|disabley|ad-provider|exoclick|ads?[0-9]*\.|popunder|venor|popup|fxuuid|jduuid|linkSens|uuid/i];

    let lastDomain = location.hostname;

    const cleanStorage = () => {
        ['storedResult', 'inData', 'extranks', 'Better', 'linkSens', 'jduuid', 'adshsi'].forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });
        ['adsie', 'jduuid'].forEach(name => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${location.hostname}`;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${location.hostname}`;
        });
    };

    const checkDomainChange = () => {
        const currentDomain = location.hostname;
        if (currentDomain !== lastDomain) {
            cleanStorage();
            lastDomain = currentDomain;
        }
    };

    if (hasGM) {
        GM_addStyle(`${AD_SELECTORS}{display:none !important}`);
    } else {
        const style = doc.createElement('style');
        style.textContent = `${AD_SELECTORS}{display:none !important}`;
        (doc.head || doc.documentElement).appendChild(style);
    }

    ['AdProvider', 'adConfig', 'popMagic', 'exoJsPop101', 'exoclick'].forEach(prop => {
        Object.defineProperty(win, prop, { value: [], writable: false });
    });
    Object.defineProperty(win, 'popMagic', { value: {}, writable: false });
    Object.defineProperty(win, 'getCookie', { value: () => '', writable: false });

    location.reload = () => false;

    const shouldBlock = url => url && BLOCK_PATTERNS.some(p => p.test(url));

    window.fetch = new Proxy(window.fetch, {
        apply(target, thisArg, args) {
            const url = args[0]?.url || args[0];
            return shouldBlock(url) ? Promise.resolve(new Response()) : target.apply(thisArg, args);
        }
    });

    XMLHttpRequest.prototype.open = new Proxy(XMLHttpRequest.prototype.open, {
        apply(target, thisArg, args) {
            return shouldBlock(args[1]) ? (thisArg._blocked = true) : target.apply(thisArg, args);
        }
    });

    XMLHttpRequest.prototype.send = new Proxy(XMLHttpRequest.prototype.send, {
        apply(target, thisArg, args) {
            return thisArg._blocked ? undefined : target.apply(thisArg, args);
        }
    });

    window.open = new Proxy(window.open, {
        apply(target, thisArg, args) {
            return shouldBlock(args[0]) ? null : target.apply(thisArg, args);
        }
    });

    win.addEventListener = new Proxy(win.addEventListener, {
        apply(target, thisArg, args) {
            const [type, listener] = args;
            if (type === 'click' || type === 'load') {
                const code = listener.toString();
                if (code.includes('popMagic') || code.includes('pemsrv') || code.includes('splash.php') || code.includes('popunder')) {
                    return;
                }
            }
            return target.apply(thisArg, args);
        }
    });

    doc.querySelector = new Proxy(doc.querySelector, {
        apply(target, thisArg, [selector]) {
            return selector === "[disable-devtool-auto]" ? null : target.apply(thisArg, arguments);
        }
    });

    doc.createElement = new Proxy(doc.createElement, {
        apply(target, thisArg, [tagName]) {
            const el = target.apply(thisArg, arguments);
            if (tagName.toLowerCase() === 'iframe') {
                Object.defineProperty(el, 'src', { set() {} });
            }
            if (tagName.toLowerCase() === 'a') {
                el.click = () => {};
            }
            return el;
        }
    });

    window.debugger = function() {};
    Object.defineProperty(window, 'debugger', {
        get: () => function() {},
        set: () => {}
    });

    document.addEventListener('contextmenu', e => e.stopImmediatePropagation(), true);
    document.addEventListener('selectstart', e => e.stopImmediatePropagation(), true);
    ['copy', 'cut', 'paste'].forEach(evt => {
        document.addEventListener(evt, e => e.stopImmediatePropagation(), true);
    });

    window.DisableDevtool = undefined;

    const originalEval = window.eval;
    window.eval = code => {
        if (typeof code === 'string' && (code.includes('disable-devtool') || code.includes('DisableDevtool'))) return;
        return originalEval.call(window, code);
    };

    const originalFunction = window.Function;
    window.Function = (...args) => {
        const body = args[args.length - 1];
        if (typeof body === 'string' && (body.includes('disable-devtool') || body.includes('DisableDevtool'))) return () => {};
        return originalFunction(...args);
    };

    const scriptRemovalObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.tagName === 'SCRIPT') {
                    const content = node.textContent || node.innerText || '';
                    const src = node.src || '';
                    if ( content.includes('disable-devtool') ||
                        content.includes('DisableDevtool') ||
                        content.includes('popMagic') ||
                        content.includes('fxuuid') ||
                        content.includes('jduuid') ||
                        content.includes('uuid') ||
                        content.includes('linkSens') ||
                        src.includes('pemsrv.com') ||
                        src.includes('magsrv.com')
                    ) {
                        node.remove();
                    }
                }
            });
        });
    });
    scriptRemovalObserver.observe(document.documentElement, { childList: true, subtree: true });

    const clean = () => {
        doc.querySelectorAll(AD_SELECTORS).forEach(el => el.remove());
        doc.querySelectorAll('iframe').forEach(iframe => {
            if (shouldBlock(iframe.src) || getComputedStyle(iframe).position === 'fixed') iframe.remove();
        });
        cleanStorage();
    };

    const urlObserver = new MutationObserver(checkDomainChange);
    if (doc.body) {
        urlObserver.observe(doc.body, { childList: true, subtree: true, attributes: true });
    }

    win.addEventListener('popstate', checkDomainChange);
    win.addEventListener('hashchange', checkDomainChange);

    const originalPushState = history.pushState;
    history.pushState = function() {
        originalPushState.apply(this, arguments);
        setTimeout(checkDomainChange, 0);
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function() {
        originalReplaceState.apply(this, arguments);
        setTimeout(checkDomainChange, 0);
    };

    new MutationObserver(clean).observe(doc, { childList: true, subtree: true, attributes: true });
    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', clean);
    } else {
        clean();
    }
})();
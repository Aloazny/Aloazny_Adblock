// ==UserScript==
// @name         4khd 广告屏蔽
// @namespace    https://viayoo.com
// @version      2.4
// @description  移除4khd广告，兼容原生和GM环境。
// @author       Via
// @license      MIT
// @match        *://*.4khd.com/*
// @match        *://*.xxtt.ink/*
// @match        *://*.uuss.uk/*
// @match        *://*.ssuu.uk/*
// @icon         data:image/webp;base64,UklGRioEAABXRUJQVlA4WAoAAAAwAAAAHwAAHwAASUNDUBgCAAAAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOEzrAQAALx/ABxAf4zaSJEmp6pm5W/HAUuxGQ/ofN1xFkqRYecz3QAA//3LYwPtiZodtGzkS7dndz6H/Zo9JJEmS09nzbKyM48cOXQDIZbP+69yextx3+jyT78O5ba9shZ7set4fewzc18msfj5D+74JFH/5/0zn8v+r1fESGOjXRW0135dAKuXzlM7U7yuJ4C8EQgA/IdAEIBSqcsSm0FCoEDFUqnLE0Gh3qnY3nhQqlQqhiCWWWNqdqmxaBGI8lZsY7a7dlANVNlU5dl+qGOOlbMufSjFeYkHE0g4tCkCQJEm18vbj7u5aPNzl4fD9/8UX97n/JZj3ZYMLRPRfYdu2jbq3ivaKwDT0DgMAAAAAwGBfkwlM6wxAtZW5NlP/l7xiYwf4xZ5+X4bG8I3/z+yBtbagBivWWrvJkrUqkE3uLcZiWkQ+VGBbRGSfNRERUYe3XFgtZSq3YdW8v8ZjrmoiNq5jp4QxvqIoii4qQPikArtKyU0rwaUKnPhwpAJJH85V4DDGdz6fzxcrcqcCW2WXVeLsR0ReFqrl8f75Vw849X23K893/cyozrFz7kEF1p1zbodl55wa3KRWAQAAAAAAAAAAAAAAAAAAAADw/rfz3gz4pvF2X7oSE35psiZonvJJ0y0mMLWdo9XWRrrrTAAA
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const hasGM = typeof GM_addStyle === 'function' && typeof unsafeWindow !== 'undefined';
    const win = hasGM ? unsafeWindow : window;
    const doc = document;

    const AD_SELECTORS = '.centbtd,.exo-native-widget,.exo-native-widget-outer-container,.exo-video-slider-container-wrapper,.exo_wrapper,.popup,.popup-iframe,.wb-contai,div[class*="exo-"],div[id*="exo-"],iframe[src*="exoclick"],iframe[src*="magsrv"],iframe[src*="pemsrv"],ins.adsbynetwork,ins[data-processed="true"]';
    const BLOCK_REGEX = /magsrv|interstitial|pemsrv|disabley|ad-provider|exo(-|_)|ads?[0-9]*\.|popunder|venor|popup|fxuuid|jduuid|linkSens|uuid|splash\.php/i;
    const PROTECT_REGEX = /popMagic|pemsrv|splash\.php|exoJsPop|BetterJsPop|disable-devtool|DisableDevtool|exoclick|magsrv/i;

    const currentHostname = location.hostname;
    const fuzzyDomain = currentHostname.replace(/\d+/g, '').replace(/\.+$/, '');

    function initStorageLock() {
        const PROTECT_KEYS = new Set(['inData', 'inData2', 'requestClosed', 'BetterJsPop_lastOpenedAt']);
        const COOKIE_BLOCK_RE = /fxuuid|jduuid|adsie/i;
        const WIN_PROPS = ['DisableDevtool', 'AdProvider', 'adConfig', 'popMagic', 'exoJsPop101', 'exoclick', 'exoJsPop'];
        const hostname = location.hostname;
        const expired = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        ['fxuuid', 'jduuid', 'adsie'].forEach(name => {
            doc.cookie = name + expired;
            doc.cookie = name + expired + "; domain=" + hostname;
            doc.cookie = name + expired + "; domain=." + hostname;
        });
        const orgGet = Storage.prototype.getItem;
        const orgSet = Storage.prototype.setItem;
        Storage.prototype.getItem = function(key) {
            if (key === 'inData') return 'true';
            if (key === 'inData2') return '0';
            if (key === 'BetterJsPop_lastOpenedAt') return '9999999999';
            return orgGet.apply(this, arguments);
        };
        Storage.prototype.setItem = function(key, value) {
            if (PROTECT_KEYS.has(key)) return;
            return orgSet.apply(this, arguments);
        };
        const cookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
        if (cookieDesc?.configurable) {
            Object.defineProperty(doc, 'cookie', {
                get: () => cookieDesc.get.call(doc),
                set: (val) => {
                    if (COOKIE_BLOCK_RE.test(val)) return;
                    cookieDesc.set.call(doc, val);
                },
                configurable: true
            });
        }
        WIN_PROPS.forEach(p => {
            Object.defineProperty(win, p, {
                value: null,
                writable: false,
                configurable: false
            });
        });
    }

    function initElementHijack() {
        const checkAndBlock = (node) => {
            if (node && node.nodeType === 1) {
                const id = node.id || '';
                const cls = typeof node.className === 'string' ? node.className : '';
                const tagName = node.tagName;
                if (node.dataset.viaAdclean || id === 'img-btn-style' || cls.includes('image-wrapper') || cls.includes('img-button-container')) {
                    return false;
                }
                const isExo = (typeof id === 'string' && id.startsWith('exo')) || (cls.startsWith('exo'));
                if (isExo || (tagName === 'SCRIPT' && BLOCK_REGEX.test(node.src + node.textContent))) {
                    return true;
                }
                if (BLOCK_REGEX.test(id + cls)) {
                    return true;
                }
            }
            return false;
        };
        ['appendChild', 'insertBefore'].forEach(method => {
            const original = Node.prototype[method];
            Node.prototype[method] = function(...args) {
                if (checkAndBlock(args[0])) {
                    return args[0];
                }
                return original.apply(this, args);
            };
        });
        ['write', 'writeln'].forEach(method => {
            doc[method] = new Proxy(doc[method], {
                apply: (target, thisArg, args) => {
                    if (args[0] && BLOCK_REGEX.test(args[0])) return null;
                    return target.apply(thisArg, args);
                }
            });
        });
    }

    function initAdBlocker() {
        const css = `${AD_SELECTORS}{display:none!important;visibility:hidden!important;width:0!important;height:0!important;opacity:0!important;pointer-events:none!important;}`;
        if (hasGM) GM_addStyle(css);
        const randomClass = 'via-clean-' + Math.random().toString(36).substring(2, 10);
        const enhancedCss = `${AD_SELECTORS}{display:none!important;visibility:hidden!important;width:0!important;height:0!important;opacity:0!important;pointer-events:none!important;} .${randomClass}{display:none!important;}`;
        function injectStyle(useRandom = false) {
            const selector = useRandom ? `.${randomClass}` : 'style[data-via-adclean]';
            if (doc.querySelector(selector)) return;
            const style = doc.createElement('style');
            if (useRandom) style.className = randomClass;
            else style.dataset.viaAdclean = 'true';
            style.textContent = useRandom ? enhancedCss : css;
            const target = doc.head || doc.documentElement;
            if (target) {
                Node.prototype.appendChild.call(target, style);
            }
        }
        function earlyInject() { injectStyle(false); injectStyle(true);}
        if (doc.documentElement) {
            earlyInject();
        } else {
            doc.addEventListener('readystatechange', () => { if (doc.readyState !== 'loading') earlyInject(); }, { once: true });
            doc.addEventListener('DOMContentLoaded', earlyInject, { once: true });
        }
        function aggressiveClean() { const ads = doc.querySelectorAll(AD_SELECTORS); if (ads.length === 0) return; ads.forEach(el => { el.remove(); }); }
        setInterval(aggressiveClean, 500);
    }

    function checkExternal(href) {
        try {
            const url = new URL(href, location.href);
            if (url.pathname.includes('splash.php') || url.search.includes('link.php')) return true;
            return !url.hostname.includes('4khd') && !url.hostname.includes(fuzzyDomain);
        } catch (e) {
            return false;
        }
    }

    function initEventListeners() {
        const blockExternalLinks = (e) => {
            const a = e.target.closest('a, area');
            if (a?.href && checkExternal(a.href)) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        };
        doc.addEventListener('click', blockExternalLinks, true);
        doc.addEventListener('mouseover', blockExternalLinks, true);
        doc.addEventListener('touchstart', blockExternalLinks, true);
    }

    function initNetworkInterceptors() {
        win.open = new Proxy(win.open, {
            apply: (t, th, args) => (args[0] && (BLOCK_REGEX.test(args[0]) || checkExternal(args[0]))) ? null : Reflect.apply(t, th, args)
        });
        win.fetch = new Proxy(win.fetch, {
            apply: (t, th, args) => {
                const url = args[0]?.url || args[0];
                if (typeof url === 'string' && BLOCK_REGEX.test(url)) {
                    return Promise.resolve(new Response('', {
                        status: 200,
                        statusText: 'OK'
                    }));
                }
                return Reflect.apply(t, th, args);
            }
        });
        const orgOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(_, url) {
            if (typeof url === 'string' && BLOCK_REGEX.test(url)) {
                this._blocked = true;
                return;
            }
            return orgOpen.apply(this, arguments);
        };
        const orgSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function() {
            if (this._blocked) {
                this.dispatchEvent(new Event('load'));
                this.dispatchEvent(new Event('readystatechange'));
                return;
            }
            return orgSend.apply(this, arguments);
        };
    }

    function initMutationObserver() {
        const observer = new MutationObserver(muts => {
            muts.forEach(mut => {
                mut.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    if (node.tagName === 'SCRIPT') {
                        if (PROTECT_REGEX.test(node.textContent + node.src)) {
                            node.remove();
                        }
                    }
                });
            });
        });
      observer.observe(doc.documentElement, { childList: true, subtree: true });
    }

    function addImageButtons() {
        const css = `
            .img-button-container{position:absolute;bottom:15px;right:10px;display:flex;gap:8px;z-index:999!important}
            .img-btn{padding:8px 16px;border:1px solid rgba(255,255,255,0.25);border-radius:16px;cursor:pointer;font-size:13px;font-weight:600;backdrop-filter:blur(16px);background:rgba(255,255,255,0.3);color:#1C2526;transition:all 0.2s;font-family:sans-serif;outline:none;border:none}
            .img-btn:hover{background:rgba(255,255,255,0.4);transform:translateY(-1px)}
            .image-wrapper{position:relative!important;display:inline-block!important;max-width:100%}
            @media (prefers-color-scheme:dark){.img-btn{background:rgba(40,40,40,0.3);color:#f0f0f0}}
        `;
        const injectGlobalStyle = () => {
            if (doc.getElementById('img-btn-style')) return;
            const style = doc.createElement('style');
            style.id = 'img-btn-style';
            style.dataset.viaAdclean = 'true';
            style.textContent = css;
            const target = doc.head || doc.documentElement;
            if (target) Node.prototype.appendChild.call(target, style);
        };
        const processImages = () => {
            injectGlobalStyle();
            const links = doc.querySelectorAll('#basicExample a.imageLink');
            if (links.length === 0) return;
            links.forEach(link => {
                if (link.parentElement && link.parentElement.classList.contains('image-wrapper')) return;
                const wrapper = doc.createElement('div');
                wrapper.className = 'image-wrapper';
                wrapper.dataset.viaAdclean = 'true';
                const container = doc.createElement('div');
                container.className = 'img-button-container';
                container.dataset.viaAdclean = 'true';
                const btn = doc.createElement('button');
                btn.className = 'img-btn';
                btn.dataset.viaAdclean = 'true';
                btn.textContent = '打开';
                const img = link.querySelector('img');
                const url = link.href || img?.src || img?.dataset?.src;
                btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); const a = doc.createElement('a'); a.href = url; a.click(); };
                const parent = link.parentNode;
                if (parent) {
                    Node.prototype.insertBefore.call(parent, wrapper, link);
                    Node.prototype.appendChild.call(wrapper, link);
                    Node.prototype.appendChild.call(container, btn);
                    Node.prototype.appendChild.call(wrapper, container);
                }
            });
        };
        processImages();
        setInterval(processImages, 600);
    }

    function initAll() {
        initElementHijack();
        initAdBlocker();
        initStorageLock();
        initEventListeners();
        initNetworkInterceptors();
        initMutationObserver();
        addImageButtons();
    }

    if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }
})();
// ==UserScript==
// @name         解决某垃圾小说站
// @namespace  https://viayoo.com/enpza9
// @version      1.2
// @description  解决某垃圾小说站，章节截断，恶意转跳问题。
// @author       Aloazny
// @include      http*://*/book/*/*.html
// @include      http*://*/book/*/catalog/*
// @icon         data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAoUpQA/ePEARXzxAEt88QBOd/EAWHXxAF918QBjdfEAXHXxAFF38QBJd/EAQnfxAD948QALFagAAAAAAAAAAAAQJLIwiNn/MIHE/z2U1v9CtPr/AKP//wCc//8An///AJz//0Kz//9gufn/YrX6/y+Y/P8ADiC0AAAAAAAAAAAAAABVb3uf/+br7/+SpLr/PFmH/wBuwf8AkP//AIz//wCL//+01Ov///Lj///77P99hKD/AAAAVgAAAAAAAAAAAAAAGHl2cvjj8v//O0/X/wAl0/8AIpH/AGKb/wCZ9P8Anf//r9r1//328P////7/enh1+AAAABcAAAAAAAAAAAAAABqCgHn3ytX7/wAWy/8AHsr/ADDU/wAolv8BX4j/AIvY/7Xl/////fj//////318e/cAAAAYAAAAAAAAAAAAAAAOe3t69/38//9qd93/AB7M/wAs0v8AL9D/ATGe/wBrkv+Xucj//Pr4//////9+fn33AAAADAAAAAAAAAAyAAAAe3t6ePP////////+/2V02/8AIMv/ADra/wAuy/8AMqP/f56n/8zHxP/z8/T/gH588gAAAHkAAAAzACI+3gBUoP+CgH/+//////////+5+///AFnZ/wAhyf8ASOP/ACvF/0NJpP/Gxb//5OLe/3d3dv4AVqH/ACA+2QAMGaQAiP3/MaX0/+Xt+v//////4/z//5fq//9cb9X/ACHH/wBV6/8AJr7/Sk6l/7/Iz/8oluH/AG/6/wAIG6YAAAAjADFm+ACR//8fqfz/0uL5/////////////////2lv0P8AHsP/E2bv/5qdwf+ToJ3/C3Dn/wAgc/QAAAApAAAAAAAAAD0ALV/tAI39/w+s/f+31/j/////////////////b27K/5SWv//8+un/28/K/3dakf8AAACSAAAAAAAAAAAAAAAAAAAALAAkSuQAlPb/A7b//53K9////////////6HR+P+Fpaf/2szH/50/3/9vAMP/NgBb+gEAAVcAAAAAAAAAAAAAAAAAAAAeACA31QCg6/8AxP//h8H1/4fC9f8AwP//C4zd/3dTfv92AM7/gQDa/4MA3v8bAC3XAAAAAAAAAAAAAAAAAAAAAAAAABIAHCnCAKjf/wDW//8A0P//AJnh/wAaLsAAAABnOQBg/4AA2f91AMb/DAAVogAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAATGbIAsdf/AKXX/wATG7UAAAAKAAAAAAAAAFEaACzQCQAPowAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAA4QoQAOEKEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAFwRIABYVyAAWNhgAFUZYABAFWAAVJEAABBSQAAREEAAFhJAABCRYABVVPAAE5B4AA9QfAAUwD4EEVS/D9PRg==
// @run-at       document-start
// @license      MIT
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    // 设定不修改UA的网址
    const EXCLUDE_URLS = ['haimazw.com', 'haimazw.cc', '360lele.cc'];
    // 设置移除内嵌广告脚本关键词
    const DEFAULT_KEYWORDS = [
      'isDebug', 'antiDebug', 'disableDebugger', 'blockDeveloperTools', '</\'+\'s\'+\'c\'+\'ri\'+\'pt\'+\'>\');', '<\\/\'+\'s\'+\'c\'+\'ri\'+\'pt\'+\'>\');', 'zz.bdstatic.com', 'histats.com', 'hm.baidu.com', 'pc.stgowan.com'
    ];

    const regexes = DEFAULT_KEYWORDS.map(k => {
        try {
            let pattern = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\ /g, '[\\s\\n\\r]*').replace(/ /g, '[\\s\\n\\r]*').replace(/\\\)\\\{/g, '\\s*\\)\\s*\\{').replace(/\\\)\\\;/g, '\\s*\\)\\s*\\;');
            return new RegExp(pattern);
        } catch (e) {
            return { test: () => false };
        }
    });

    function isAdScriptContent(content) {
        if (!content) return false;
        return regexes.some(reg => reg.test(content));
    }

    function removeMatchedScripts() {
        document.querySelectorAll('script').forEach(script => {
            const content = script.innerHTML || script.textContent;
            if (content && isAdScriptContent(content)) {
                script.type = 'text/prevented';
                script.textContent = '';
                script.remove();
            }
        });
    }

    function unlock_catalog() {
        if (!location.pathname.includes('/catalog/')) return;
        const target = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
        const a = target.setInterval, b = target.setTimeout;
        target.setInterval = (h, d, ...args) => a(h, d >= 1 ? 1 : d, ...args);
        target.setTimeout = (h, d, ...args) => b(h, d >= 1 ? 1 : d, ...args);
        Object.defineProperty(target, "setInterval", { configurable: false, writable: false });
        Object.defineProperty(target, "setTimeout", { configurable: false, writable: false });
        if (target.requestAnimationFrame) {
            target.requestAnimationFrame = (cb) => {
                cb(performance.now());
                return 0;
            };
            Object.defineProperty(target, "requestAnimationFrame", { configurable: false, writable: false });
        }
        const o = new MutationObserver(() => {
            const btn = document.querySelector('button[id^="unlock-"]');
            if (btn && !btn.disabled) {
                btn.click();
                const mask = document.querySelector('div[id^="mask-"]');
                if (mask) mask.remove();
                o.disconnect();
            }
        });
        o.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    }
    unlock_catalog();

    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeName === 'SCRIPT') {
                    const content = node.innerHTML || node.textContent;
                    if (content && isAdScriptContent(content)) {
                        node.type = 'text/prevented';
                        node.textContent = '';
                        node.remove();
                    } else {
                        const obs = new MutationObserver(() => {
                            const laterContent = node.innerHTML || node.textContent;
                            if (laterContent && isAdScriptContent(laterContent)) {
                                node.type = 'text/prevented';
                                node.textContent = '';
                                node.remove();
                                obs.disconnect();
                            }
                        });
                        obs.observe(node, { childList: true, characterData: true, subtree: true });
                        setTimeout(() => obs.disconnect(), 5000);
                    }
                }
            });
        });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    removeMatchedScripts();

    const spoofPlatform = (p = 'Mac') => {
        const s = new Proxy(navigator, {
            get(t, k) {
                if (k === 'platform') return p;
                let v = Reflect.get(t, k);
                return typeof v === 'function' ? v.bind(t) : v;
            },
            getOwnPropertyDescriptor: (t, k) =>
                k === 'platform'
                    ? { value: p, writable: false, configurable: true, enumerable: true }
                    : Object.getOwnPropertyDescriptor(t, k)
        });
        const f = () => {
            try {
                if (Object.getOwnPropertyDescriptor(navigator, 'platform')) {
                    navigator.__defineGetter__('platform', () => p);
                } else {
                    Object.defineProperty(navigator, 'platform', {
                        get: () => p, configurable: true, enumerable: true
                    });
                }
                Object.defineProperty(window, 'navigator', { value: s, writable: false, configurable: true });
                Object.defineProperty(Navigator.prototype, 'platform', {
                    get: () => p, configurable: true, enumerable: true
                });
                Object.freeze(window.navigator);
            } catch (e) {}
        };
        const i = String.prototype.indexOf;
        String.prototype.indexOf = function(v) {
            if (this === p) {
                if (['Win', 'Linux', 'X11'].includes(v)) return -1;
                if (v === p) return 0;
            }
            return i.apply(this, arguments);
        };
        f();
    };

    function checkAndSpoofUA() {
        const currentHost = location.hostname;
        let gmExcludeList = [];
        if (typeof GM_getValue !== 'undefined' && typeof GM_registerMenuCommand !== 'undefined') {
            gmExcludeList = GM_getValue('exclude_ua_list', []);
        }
        const isExclude = EXCLUDE_URLS.some(url => currentHost.includes(url)) || gmExcludeList.includes(currentHost);
        if (typeof GM_registerMenuCommand !== 'undefined') {
            GM_registerMenuCommand(isExclude ? `恢复UA修改 (当前: ${currentHost})` : `在此域名禁用UA修改`, () => {
                let list = GM_getValue('exclude_ua_list', []);
                if (list.includes(currentHost)) {
                    list = list.filter(host => host !== currentHost);
                } else {
                    list.push(currentHost);
                }
                GM_setValue('exclude_ua_list', list);
                location.reload();
            });
        }
        if (!isExclude) {
            spoofPlatform('Mac');
            const checkRBG = () => {
                if (document.querySelector('.RBGsectionOne') && document.querySelector('.RBGsectionTwo') && document.querySelector('.RBGsectionThree')) {
                    let list = GM_getValue('exclude_ua_list', []);
                    if (!EXCLUDE_URLS.some(url => currentHost.includes(url)) && !list.includes(currentHost)) {
                        list.push(currentHost);
                        GM_setValue('exclude_ua_list', list);
                        location.reload();
                    }
                }
            };
            if (document.readyState === 'loading') {
                window.addEventListener('DOMContentLoaded', checkRBG);
            } else {
                checkRBG();
            }
        }
    }
    checkAndSpoofUA();

    let decryptTimer = null;
    let attemptCount = 0;

    function d_inline(a, b) {
        if (typeof CryptoJS === 'undefined') return '';
        b = CryptoJS.MD5(b).toString();
        var d = CryptoJS.enc.Utf8.parse(b.substring(0, 16));
        var e = CryptoJS.enc.Utf8.parse(b.substring(16));
        return CryptoJS.AES.decrypt(a, e, { iv: d, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
    }

    function tryDecrypt() {
        if (decryptTimer) return;
        decryptTimer = setInterval(() => {
            attemptCount++;
            if (attemptCount > 100) {
                clearInterval(decryptTimer);
                return;
            }

            const selectors = ['.RBGsectionThree-content', '#chaptercontent', '#content', '.content'];
            let contentDiv = null;
            for (let sel of selectors) {
                contentDiv = document.querySelector(sel);
                if (contentDiv) break;
            }
            if (!contentDiv) return;

            let decryptFn = window.php_decrypt_js || window.d;
            let encrypted = window.c;
            const scripts = document.querySelectorAll('script:not([src])');

            for (let s of scripts) {
                const text = s.textContent;
                const inlineMatch = text.match(/\$\(['"]#?([a-z0-9]+)['"]\)\.html\(d\(['"]([A-Za-z0-9+/=]{50,})['"]\s*,\s*['"]([a-f0-9]{32})['"]\)\)/);
                if (inlineMatch) {
                    let target = document.getElementById(inlineMatch[1]) || contentDiv;
                    if (target && !target.getAttribute('data-decrypted')) {
                        const content = d_inline(inlineMatch[2], inlineMatch[3]);
                        if (content && content.length > 10) {
                            target.innerHTML = content;
                            target.setAttribute('data-decrypted', 'true');
                            target.id = 'chaptercontent';
                        }
                    }
                }
                if (!encrypted) {
                    const match = text.match(/(?:var|window)\s+c\s*=\s*"([A-Za-z0-9+/=]{100,})"/);
                    if (match) encrypted = match[1];
                }
            }

            if (typeof decryptFn !== 'function') {
                for (let key in window) {
                    if (key.toLowerCase().includes('decrypt') && typeof window[key] === 'function') {
                        decryptFn = window[key];
                        break;
                    }
                }
            }

            if (typeof decryptFn !== 'function' || (!encrypted && !contentDiv.getAttribute('data-decrypted'))) {
                return;
            }

            if (!encrypted) return;
            try {
                const decryptedHtml = decryptFn(encrypted);
                if (!decryptedHtml || decryptedHtml.length < 10) return;
                if (contentDiv.getAttribute('data-decrypted')) {
                    clearInterval(decryptTimer);
                    return;
                }
                const currentText = contentDiv.innerText.substring(0, 50).trim();
                if (decryptedHtml.includes(currentText)) {
                    contentDiv.innerHTML = decryptedHtml;
                } else {
                    contentDiv.innerHTML += decryptedHtml;
                }
                contentDiv.setAttribute('data-decrypted', 'true');
                const cleanup = () => {
                    const moreContent = contentDiv.querySelector('#morecontent');
                    if (moreContent) moreContent.remove();
                    const keywords = [ '小说推荐：', '看后求收藏', '第一时间更新', '转载请注明来源：', '天才一秒记住【', '退出阅读模式即可', '更多内容加载中', '本站只支持手机浏览器访问', '若您看到此段落，代表章节内容加载失败', 'Loading...', '未加载完' ];
                    contentDiv.querySelectorAll('p').forEach(p => {
                        const text = p.innerText;
                        const style = p.getAttribute('style') || '';
                        if (keywords.some(k => text.includes(k)) || style.includes('color:orange') || style.includes('color:blue')) {
                            p.remove();
                        }
                    });
                };
                cleanup();
                clearInterval(decryptTimer);
            } catch (e) {
                console.error('[解密脚本] 运行异常：', e);
            }
        }, 100);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryDecrypt);
    } else {
        tryDecrypt();
    }
})();
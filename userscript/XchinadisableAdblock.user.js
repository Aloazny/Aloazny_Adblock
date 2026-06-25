// ==UserScript==
// @name        Xchina disable popup
// @namespace   http://tampermonkey.net/
// @version      2.1
// @description 绕过xChina弹窗检测
// @author      Aloazny && Grok
// @license     MIT
// @run-at      document-start
// @match      *://xchina.com/*
// @match      *://*.xchina.com/*
// @match      *://*xchina*/*
// @include     *://*xchina*/*
// @include     *://*.1909.me/*
// @include     *://1909.me/*
// @include     *://*.8se.me/*
// @include     *://8se.me/*
// @include     *://*.crxs.me/*
// @include     *://crxs.me/*
// @include     *://*.litu100.xyz/*
// @include     *://litu100.xyz/*
// @include     *://*.shise.me/*
// @include     *://shise.me/*
// @include     *://*.xbbs.me/*
// @include     *://xbbs.me/*
// @include     *://*.xbookcn.org/*
// @include     *://xbookcn.org/*
// @icon       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsSAAALEgHS3X78AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAIKSURBVFiF1ZexSxtRHMc/d2B0MBoJUpw8hKZTIZA/oNc/oLTg5tK4nJukUCh0aYcOduvYZGhT6JbFEimO10HrYFAREQKm51KXSBouS+JwHV6Cjd673JlLjn6XhB+/e59P3uW9d6fQjZPHAAwgw2hTqdsU5l9SAlC68HwXPrbYbUoz66wpzkdeobAxTngvpxe8V5w8Z8BSFALtKxpqVHCAyQnm1KjgvfxnAsk0PDHBcMRnLOHepz2DFeu6L5mWDqk4eRxf8FhCDBqbva5Vv4CZ7e9LZUH/3F+7+AFl3XVY/zPwINsPB0g9h7jmDQdYeCQddvj/QCrrDQe4PApBwNp0rz/MiXssgwP8zIUgYFtgfbtdj83C8oH8OnMVfpshCABUi4HaMVcHXhNMwNqE1nlo8OACAMcfQoPfTcBjUwkKDy6gF8Xa94pstQwt4AcOYsMKXcAvHMS+EKpAEDjA9KI4jEIRyLyVwztNcRi5JeX/NsgF4hpk3sjhZR12c+L7zWhP+w+pOwl4/YrdHFweQuePfF8YWsC23Os317nbmu80oX44pEC1KB4kemmdw9bj20DbElL/9pV1MTs+MviJKJmGyYTniQaIKY9rg/sCC4w4KlCLCl5v0VCbbQpRCXzdo6Ym1inYbfGmOs5sn1B7UaKiAHMA+68x7t/DmJka7avarzqNTzvU3n2nAvAXteumoVQH+scAAAAASUVORK5CYII=
// @grant       unsafeWindow
// @grant       GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    const w = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    const d = document;
    w.__ad_free = true;

// 修改Cookie值
const COOKIE_MODIFY = `__ss_pv_done=1
__ss_pv_c=0
clicked_cpc_131=1
clicked_cpt_*=1
clicked_modal=1
showed_adscarat_shuffle_box=1`.trim().split('\n').map(l=>l.trim());

// Css样式注入
const baseCSS =`
.block-overlay,
.modal-alert,
.z-gate-mask,
[class*="-mask"],
.adblock-overlay
{display:none!important;z-index:-999!important;opacity:0!important;pointer-events:none!important}
body {overflow:auto!important;position:static!important}
`.trim();

const hideCSS = `
.a-media.ex-728-90,
.ad,
.exo-mobile-im-container,
.exo-native-widget,
.exoclick_300x250,
.exoclick_300x500,
.google-adsbygoogle,
.media,
.outer-banner,
.photos > div.item > div > a[target="_blank"],
.photos > div.item > div[class^="exoclick_"],
.push-bottom,
.push-bottom-container[clickmode="cpt"],
.push-bottom-container[key] > .push-bottom,
.push-slider[key^="clicked_cpt"],
.push-top,
.push-top-container > .push-top[key],
.slider-ad,
.z-300x250,
.z-300x500,
[adid],
[class*="exoclick_"],
[class*="fa-ban"],
[class^="exo-"],
[class^="photoMask"],
[class^="playerMask"],
[class^="z-gate"],
[href="#"]:not([data-page]),
[id^="exo-"],
[id^="z-extra"],
[src^="https://xchina.click/"],
a[clickmode="ad"],
a[clickmode="cpt"],
a[href*="//go.mnaspm.com"],
a[href*="/xchina.fun/redirect/ad"],
a[href*="xchina.click/prepare."],
a[href^="https://xchina.app"],
a[href^="https://xchina.click/"],
div.ex-300-250,
div.item > div.a-media,
div.list > div.item.auto-height,
div.media > a > img[src*="xchina"],
div.recommendation_widget,
div[linkurl^="https://xchina.click/"],
div[url^="https://xchina.click/"],
iframe[src*=".magsrv.com/"],
iframe[width="728"][height="90"],
ins.adsbygoogle[data-ad-slot],
script[src$="/ad-provider.js"] + ins
{display:none!important}
`.trim();

    const imgCSS = `div.media > a > img[src^="https://upload.xchina.biz/ad/"] {display:none!important}\ndiv.media > a > img[src^="https://upload.xchina.biz/ad/"] ~ * {display:none!important}`.trim();
    const cssContents = [baseCSS, hideCSS, imgCSS], styleIds = ['xchina-base', 'xchina-hide', 'xchina-img'], injectedStyles = new Set();
    const f = { detected: false, details: { first: false, second: false }, timestamp: Date.now() };
    const c = Document.prototype.createElement;

    (function handleDataPersistence() {
        const domain = '.' + location.hostname.split('.').slice(-2).join('.'), secure = location.protocol==='https:'?';secure':'', expires = new Date(Date.now()+31536e6).toUTCString();
        const fixMap = {};
        const wildcards = [];
        COOKIE_MODIFY.forEach(l => {
            const [k, v] = l.split('=');
            if (k.includes('*')) { wildcards.push({ reg: new RegExp('(^|; )' + k.replace(/\*/g, '[^=;]+') + '=[^;]*', 'g'), val: v }); } 
            else { fixMap[k] = v; }
        });
        const apply = (s) => {
            let res = s || "";
            for (const k in fixMap) {
                const r = new RegExp('(^|; )' + k + '=[^;]*', 'g');
                if (r.test(res)) { res = res.replace(r, '$1' + k + '=' + fixMap[k]); } 
                else { res += (res ? '; ' : '') + k + '=' + fixMap[k]; }
            }
            wildcards.forEach(p => {
                res = res.replace(p.reg, (m, g1) => {
                    const kn = m.trim().split('=')[0].replace(';','').trim();
                    return (m.startsWith(';') ? '; ' : '') + kn + '=' + p.val;
                });
            });
            return res;
        };
        const cookieDesc = Object.getOwnPropertyDescriptor(Document.prototype,'cookie')||Object.getOwnPropertyDescriptor(HTMLDocument.prototype,'cookie');
        if (cookieDesc && cookieDesc.configurable) {
            Object.defineProperty(d, 'cookie', {
                get: function() { return apply(cookieDesc.get.call(this)); },
                set: function(v) { cookieDesc.set.call(this, apply(v)); },
                configurable: true
            });
        }
        const realFetch = w.fetch;
        w.fetch = function(input, init) {
            const url = typeof input === 'string' ? input : input.url || '';
            if (/recordDetect|adblock|detect/i.test(url)) return Promise.resolve(new Response('{"success":true}', {status: 200, headers: {'Content-Type': 'application/json'}}));
            return realFetch.apply(this, arguments);
        };
    })();

    (function handleVisualCleanup() {
        const ensureCSS = () => {
            cssContents.forEach((css, i) => {
                if (!injectedStyles.has(styleIds[i])) {
                    const existing = d.getElementById(styleIds[i]);
                    if (!existing) {
                        const s = Object.assign(d.createElement('style'), { textContent: css, id: styleIds[i] });
                        (d.head || d.documentElement).appendChild(s); injectedStyles.add(styleIds[i]);
                    }
                }
            });
        };
        ensureCSS();
        new MutationObserver((m) => {
            m.forEach((record) => { record.removedNodes.forEach((node) => { if (node.nodeType === 1 && node.tagName === 'STYLE' && styleIds.includes(node.id)) setTimeout(ensureCSS, 10); }); });
            ensureCSS();
            d.querySelectorAll('.block-overlay,[class*="block"][class*="overlay"],[class*="-mask"],[id*="-mask"]').forEach(e => e.remove());
        }).observe(d.documentElement, { childList: true, subtree: true });
    })();

    (function handleDomReady() {
        const injectBait = () => {
            ['ad-banner', 'ads', 'adunit', 'advertisement'].forEach(cls => {
                if (!d.querySelector('.' + cls)) {
                    const bait = c.call(d, 'div'); bait.className = cls;
                    bait.setAttribute('style', 'display:block!important;visibility:visible!important;opacity:0.01!important;position:absolute!important;top:-1000px!important;left:-1000px!important;width:1px!important;height:1px!important;z-index:-1!important;pointer-events:none!important;');
                    (d.body || d.documentElement).appendChild(bait);
                }
            });
        };
        d.addEventListener('DOMContentLoaded', () => {
            injectBait();
            d.querySelectorAll('[class$="article"]').forEach(el => { if (el.querySelector('.media > a > img[src^="https://upload.xchina.biz/ad/"]')) el.style.display = 'none'; });
            d.querySelectorAll('div.item').forEach(el => { if (el.querySelector('div[class*="x"][class*="00"][class*="50"]')) el.style.display = 'none'; });
            d.querySelectorAll('div.media').forEach(el => { if (el.querySelector('a > img[src*="xchina"]')) el.style.display = 'none'; });
            d.querySelectorAll('.photos > div.item').forEach(el => { if (el.querySelector('div > a[target="_blank"]') || el.querySelector('div[class^="exoclick_"]')) el.style.display = 'none'; });
            d.querySelectorAll('div').forEach(el => {
                const child = el.firstElementChild;
                if (child && child === el.lastElementChild && child.querySelector && child.querySelector('.media img[src*="/ad/"]')) el.style.display = 'none';
            });
        }, false);
    })();
})();

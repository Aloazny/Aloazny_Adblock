// ==UserScript==
// @name         修改 Yandex 搜索引擎的 cookie
// @namespace    https://scriptcat.org/zh-CN/users/157252
// @author        Aloazny && Gemini
// @version      1.4.2
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAO8SURBVGiBzZo9aBxHFMd/tiMsIRO2VGHQKoEoTcI2dgxutnY+7kjlctUJ2STbRO2dS3dqQiDGsJVLs+Ai6nSqEpFCCw5BBiVaoUbG2DdnSLjCZl3MrrS3H9Luztyd/vC4u7l57/3f7Myb2Zm5hB58CnwF3AJuxt+L8Ecsf8af/2ry3whXgRXgORA1lOeAA8xMkvg88CNwpEA8K0fAD7HtseEasA680kg8K6+An2JfWvElEI6ReFYOgGVd5L8G/p8g+UQGwHeq5O8B76ZAPpF3yPHWCO4UiWfFrUv+W+D9BSCeyHugXZX8MvDfBSCdFUHBwL6U+f0xsAN8Xhad4zgsLi6OlG1vb9Pr9c5slSwsy6LVao2UHR4e4nneWWp7yFn+bVmFLue0hOu6URZbW1u1W9TzvJwd13Wr6HbLyH8GDM8zYBhGJITIObdtuzJ50zRz+kKIyDCMKvpD4HpC+nIqgDXk+uZMCCHY2NjIlbtu9UThOE6uzPM8hBBV1K8C97OFBjUmK8Mwci0YRVFkmmYl3X6/30g3Ja+BuXQAqzWUS/uw53nn6jmOk9Pzfb9JVlpNBxDUNVDUj6u0ZBiGSuMnJUFCfqGBculT6Ha7pfXb7XaufhAEjXzHsgByhmtkwLbtHKF+v1+aTXq9Xq6+4zgqAbQBHioYKCRVlM+LulwYhirko5g7mypGirrFwcGBcnerKJsA+4pGCgdmumuUpd2KE9dZsg9wrBpAUWrc3d09+b/b7eb+r5JyK8gxVFg+NH0KSXosWnrUnLjKZPgRmuB5Hp1OZ6Ss0+kQBAHtdn4pH4ahLtcINDyBskWeZVk6Wrq0C11BTsmGaisMh0NmZ2exbXukfG5uDt/3Vc2X4SUoptG0NF1eKMjmFeAL4LaO5hBCsLS0hGVZI+WDwaD2G1tFPAW4i8ZWKXoKRRObJmkDmLoN+74/qcG8cBm5ZfhX9ad2PoIgyJWZpqnTBUjOx8kr5WPd1rPIjgsN+BlO34k94I1uD2NEH3gCpwEI4NHU6NTHr8R7Q+ldiV+mw6URTrimAzgEHkyeS208QHIFRgMAuev1YqJ06uFvMjtz2QAAWsg9oouGAfB9tjC7uZvgG+BZU0+maebyfhiGqkvoO8BvdRQu0gHHWpOIQR7vTPuI6V5T8gnuIHPupMm/jX1rwTLy6HNS5PeQ2/1acQ15CD3ug+51xnDQncZ87ER5OyYlR8jxNtarBlnMIC9qqF72WEHhskfZPFAXnyCv2tyIP2+V1NsBfkdet9kB/lF1/AHARK9LUX9T5wAAAABJRU5ErkJggg==
// @description  自用脚本，为 Yandex 搜索选择性地注入 Cookie。
// @include      *://*.yandex.*/*
// @include      *://yandex.*/*
// @include      *://ya.ru/*
// @run-at       document-start
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const COOKIE_ENTRIES = {
        'receive-cookie-deprecation': '1',
        'gpb': 'yandex_gid.90#ygo.84%3A90#ygu.0',
        'yandex_gid': '90',
        'my': 'YysBWjoBASYBAScCAAMA',
        'is_gdpr': '0',
        'is_gdpr_b': 'CI2uORC1sQIoAg',
        'yp': '1791549732.dlp.2#2106045888.pcs.0#1822221835.sp.shst:1:shsh:1:family:0#1806453741.sz.904x407x3#1791290546.szm.3:904x407:407x904:0#1790858600.ygo.134:90#1793277800.ygu.0'
    };

    const EXPIRY_DAYS = 3650;
    const COOKIE_DEBUG = true;
    const cookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

    function getDomain() {
        const host = window.location.hostname;
        const parts = host.split('.');
        const idx = parts.findIndex(p => p === 'yandex' || p === 'ya');
        return idx !== -1 ? '.' + parts.slice(idx).join('.') : (parts.length <= 2 ? '.' + host : '.' + parts.slice(-2).join('.'));
    }

    function setCookieInternal(name, value, domain) {
        const expires = new Date(Date.now() + EXPIRY_DAYS * 86400000).toUTCString();
        const isSec = window.location.protocol === 'https:';
        const str = `${name}=${value}; domain=${domain}; path=/; expires=${expires}; ${isSec ? 'SameSite=None; secure' : 'SameSite=Lax'}`;
        try {
            if (cookieDesc && cookieDesc.set) {
                cookieDesc.set.call(document, str);
            } else {
                document.cookie = str;
            }
            return true;
        } catch (e) {
            if (COOKIE_DEBUG) console.error(`Set ${name} failed:`, e);
            return false;
        }
    }

    const IC_VALUE = '1u3fRSk3owFAcvPR07piypWqQcnJ5jH9EXQafb4DElcQUfP0e/iq6UGa7YPstXIyr2Blk7VDQ6Ne+AC/D7UdF4UM5h8=';
    const IC_CACHE_AHEAD_SECONDS = 2592000;

    function initLocalStorage() {
        let storeCount = 0;
        let icValue = IC_VALUE;
        try {
            const raw = localStorage.getItem('ic');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed && parsed.value) {
                    icValue = parsed.value;
                }
            }
        } catch (e) {
            if (COOKIE_DEBUG) console.error('Parse existing ic failed:', e);
        }
        const entries = {
            'advanced-captcha-state': 'image',
            'ic': JSON.stringify({
                value: icValue,
                cache_timestamp: Math.floor(Date.now() / 1000) + IC_CACHE_AHEAD_SECONDS
            })
        };
        try {
            for (const [k, v] of Object.entries(entries)) {
                if (localStorage.getItem(k) !== v) {
                    localStorage.setItem(k, v);
                    storeCount++;
                }
            }
        } catch (e) {
            if (COOKIE_DEBUG) console.error('Init localStorage failed:', e);
        }
        if (COOKIE_DEBUG && storeCount > 0) console.log(`[Cookie脚本] Updated ${storeCount} localStorage items`);
    }

    function init() {
        const domain = getDomain();
        const current = Object.fromEntries(document.cookie.split(';').map(c => c.trim().split('=')).filter(p => COOKIE_ENTRIES.hasOwnProperty(p[0])));

        let count = 0;
        for (const [k, v] of Object.entries(COOKIE_ENTRIES)) {
            if (current[k] !== v && setCookieInternal(k, v, domain)) {
                count++;
            }
        }
        if (cookieDesc && cookieDesc.configurable) {
            Object.defineProperty(document, 'cookie', {
                get: () => cookieDesc.get.call(document),
                set: (val) => {
                    const name = val.split('=')[0].trim();
                    if (COOKIE_ENTRIES.hasOwnProperty(name)) {
                        if (COOKIE_DEBUG) console.log(`[Lock] Blocked attempt to modify: ${name}`);
                        return;
                    }
                    cookieDesc.set.call(document, val);
                },
                configurable: true
            });
        }
        if (COOKIE_DEBUG && count > 0) console.log(`[Cookie脚本] Updated ${count} items on ${domain}`);
        initLocalStorage();
    }

    try { init(); } catch (e) { if (COOKIE_DEBUG) console.error(e); }
})();
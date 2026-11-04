// ==UserScript==
// @name         修改 Yandex 搜索引擎的 cookie
// @namespace    https://scriptcat.org/zh-CN/users/157252
// @author       Aloazny && Gemini
// @version      1.6.0
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAO8SURBVGiBzZo9aBxHFMd/tiMsIRO2VGHQKoEoTcI2dgxutnY+7kjlctUJ2STbRO2dS3dqQiDGsJVLs+Ai6nSqEpFCCw5BBiVaoUbG2DdnSLjCZl3MrrS3H9Luztyd/vC4u7l57/3f7Myb2Zm5hB58CnwF3AJuxt+L8Ecsf8af/2ry3whXgRXgORA1lOeAA8xMkvg88CNwpEA8K0fAD7HtseEasA680kg8K6+An2JfWvElEI6ReFYOgGVd5L8G/p8g+UQGwHeq5O8B76ZAPpF3yPHWCO4UiWfFrUv+W+D9BSCeyHugXZX8MvDfBSCdFUHBwL6U+f0xsAN8Xhad4zgsLi6OlG1vb9Pr9c5slSwsy6LVao2UHR4e4nneWWp7yFn+bVmFLue0hOu6URZbW1u1W9TzvJwd13Wr6HbLyH8GDM8zYBhGJITIObdtuzJ50zRz+kKIyDCMKvpD4HpC+nIqgDXk+uZMCCHY2NjIlbtu9UThOE6uzPM8hBBV1K8C97OFBjUmK8Mwci0YRVFkmmYl3X6/30g3Ja+BuXQAqzWUS/uw53nn6jmOk9Pzfb9JVlpNBxDUNVDUj6u0ZBiGSuMnJUFCfqGBculT6Ha7pfXb7XaufhAEjXzHsgByhmtkwLbtHKF+v1+aTXq9Xq6+4zgqAbQBHioYKCRVlM+LulwYhirko5g7mypGirrFwcGBcnerKJsA+4pGCgdmumuUpd2KE9dZsg9wrBpAUWrc3d09+b/b7eb+r5JyK8gxVFg+NH0KSXosWnrUnLjKZPgRmuB5Hp1OZ6Ss0+kQBAHtdn4pH4ahLtcINDyBskWeZVk6Wrq0C11BTsmGaisMh0NmZ2exbXukfG5uDt/3Vc2X4SUoptG0NF1eKMjmFeAL4LaO5hBCsLS0hGVZI+WDwaD2G1tFPAW4i8ZWKXoKRRObJmkDmLoN+74/qcG8cBm5ZfhX9ad2PoIgyJWZpqnTBUjOx8kr5WPd1rPIjgsN+BlO34k94I1uD2NEH3gCpwEI4NHU6NTHr8R7Q+ldiV+mw6URTrimAzgEHkyeS208QHIFRgMAuev1YqJ06uFvMjtz2QAAWsg9oouGAfB9tjC7uZvgG+BZU0+maebyfhiGqkvoO8BvdRQu0gHHWpOIQR7vTPuI6V5T8gnuIHPupMm/jX1rwTLy6HNS5PeQ2/1acQ15CD3ug+51xnDQncZ87ER5OyYlR8jxNtarBlnMIC9qqF72WEHhskfZPFAXnyCv2tyIP2+V1NsBfkdet9kB/lF1/AHARK9LUX9T5wAAAABJRU5ErkJggg==
// @description  自用脚本，为 Yandex 搜索选择性地注入 Cookie+localStorage，并自动补充搜索参数。
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
		'is_gdpr_b': 'CJfjLxCWpQMoAg',
		'yp': '1825211731.sp.shst:1:shsh:1:family:0#1809443773.szm.3:904x407:407x827:0#1793848521.ygo.21320:90#1796267721.ygu.0#2109035801.pcs.0#1794539763.dlp.1#1809443766.sz.904x407x3'
	};

	const EXPIRY_DAYS = 3650;
	const COOKIE_DEBUG = true;
	const cookieDesc = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

	const YANDEX_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAO8SURBVGiBzZo9aBxHFMd/tiMsIRO2VGHQKoEoTcI2dgxutnY+7kjlctUJ2STbRO2dS3dqQiDGsJVLs+Ai6nSqEpFCCw5BBiVaoUbG2DdnSLjCZl3MrrS3H9Luztyd/vC4u7l57/3f7Myb2Zm5hB58CnwF3AJuxt+L8Ecsf8af/2ry3whXgRXgORA1lOeAA8xMkvg88CNwpEA8K0fAD7HtseEasA680kg8K6+An2JfWvElEI6ReFYOgGVd5L8G/p8g+UQGwHeq5O8B76ZAPpF3yPHWCO4UiWfFrUv+W+D9BSCeyHugXZX8MvDfBSCdFUHBwL6U+f0xsAN8Xhad4zgsLi6OlG1vb9Pr9c5slSwsy6LVao2UHR4e4nneWWp7yFn+bVmFLue0hOu6URZbW1u1W9TzvJwd13Wr6HbLyH8GDM8zYBhGJITIObdtuzJ50zRz+kKIyDCMKvpD4HpC+nIqgDXk+uZMCCHY2NjIlbtu9UThOE6uzPM8hBBV1K8C97OFBjUmK8Mwci0YRVFkmmYl3X6/30g3Ja+BuXQAqzWUS/uw53nn6jmOk9Pzfb9JVlpNBxDUNVDUj6u0ZBiGSuMnJUFCfqGBculT6Ha7pfXb7XaufhAEjXzHsgByhmtkwLbtHKF+v1+aTXq9Xq6+4zgqAbQBHioYKCRVlM+LulwYhirko5g7mypGirrFwcGBcnerKJsA+4pGCgdmumuUpd2KE9dZsg9wrBpAUWrc3d09+b/b7eb+r5JyK8gxVFg+NH0KSXosWnrUnLjKZPgRmuB5Hp1OZ6Ss0+kQBAHtdn4pH4ahLtcINDyBskWeZVk6Wrq0C11BTsmGaisMh0NmZ2exbXukfG5uDt/3Vc2X4SUoptG0NF1eKMjmFeAL4LaO5hBCsLS0hGVZI+WDwaD2G1tFPAW4i8ZWKXoKRRObJmkDmLoN+74/qcG8cBm5ZfhX9ad2PoIgyJWZpqnTBUjOx8kr5WPd1rPIjgsN+BlO34k94I1uD2NEH3gCpwEI4NHU6NTHr8R7Q+ldiV+mw6URTrimAzgEHkyeS208QHIFRgMAuev1YqJ06uFvMjtz2QAAWsg9oouGAfB9tjC7uZvgG+BZU0+maebyfhiGqkvoO8BvdRQu0gHHWpOIQR7vTPuI6V5T8gnuIHPupMm/jX1rwTLy6HNS5PeQ2/1acQ15CD3ug+51xnDQncZ87ER5OyYlR8jxNtarBlnMIC9qqF72WEHhskfZPFAXnyCv2tyIP2+V1NsBfkdet9kB/lF1/AHARK9LUX9T5wAAAABJRU5ErkJggg==';
	const BACK_SOON_PATH = '/portal/back-soon';
	const BACK_SOON_REDIRECT_KEY = 'yandex_back_soon_redirected';

	function isBackSoon() {
		return window.location.pathname === BACK_SOON_PATH;
	}

	function renderBackSoonHelp() {
		if (document.getElementById('yandex-back-soon-host')) return;
		const host = document.createElement('div');
		host.id = 'yandex-back-soon-host';
		const shadow = host.attachShadow({ mode: 'open' });
		const style = `
			:host { --win-blue: #0067c0; --win-bg: linear-gradient(135deg, #dae7ff 0%, #f3f3f3 45%, #f7e9ff 100%); --win-glass: rgba(255, 255, 255, 0.7); --win-border: rgba(255, 255, 255, 0.45); --win-text: #1a1a1a; --win-sub: #5f5f5f; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 2147483647; overflow-y: auto; background: var(--win-bg) fixed; display: block; font-family: "Segoe UI Variable Display", "Segoe UI", "Microsoft YaHei", sans-serif; }
			.wrapper { display: flex; align-items: center; justify-content: center; min-height: 100vh; color: var(--win-text); backdrop-filter: blur(25px) saturate(160%); padding: 24px; box-sizing: border-box; }
			.card { width: 100%; max-width: 480px; background: var(--win-glass); border: 1px solid var(--win-border); border-radius: 12px; padding: 40px; box-shadow: 0 12px 40px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.4); text-align: left; animation: win-enter 0.5s cubic-bezier(0.1, 0.9, 0.2, 1); }
			@keyframes win-enter { from { opacity: 0; transform: scale(1.02) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
			.icon-yandex { width: 44px; height: 44px; margin-bottom: 32px; border-radius: 8px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
			h1 { font-size: 32px; font-weight: 600; margin: 0 0 16px 0; letter-spacing: -0.8px; line-height: 1.1; }
			.desc { font-size: 17px; color: var(--win-sub); line-height: 1.5; margin-bottom: 24px; }
			.suggest { font-size: 15px; color: var(--win-sub); }
			.suggest ul { margin: 0; padding-left: 20px; }
			.suggest li { line-height: 2.1; }
			.suggest a { color: var(--win-blue); text-decoration: none; font-weight: 600; margin: 0 2px; }
			.suggest a:hover { text-decoration: underline; }
			.btn-group { display: flex; gap: 8px; margin-top: 32px; }
			button { border: 1px solid rgba(0,0,0,0.1); padding: 8px 24px; border-radius: 4px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: inherit; outline: none; }
			.btn-secondary { background: rgba(255,255,255,0.5); color: var(--win-text); }
			.btn-secondary:active { background: rgba(0,0,0,0.05); transform: scale(0.97); }
		`;
		const links = [
			{ name: 'yandex.com.tr', url: 'https://yandex.com.tr' },
			{ name: 'yandex.tj', url: 'https://yandex.tj' },
			{ name: 'yandex.tm', url: 'https://yandex.tm' },
			{ name: 'ya.ru', url: 'https://ya.ru' },
			{ name: 'yandex.ru', url: 'https://yandex.ru' }
		];
		const linkHtml = links.map(l => `<a href="${l.url}">${l.name}</a>`).join(' ');
		shadow.innerHTML = `<style>${style}</style>
			<div class="wrapper">
				<div class="card">
					<img class="icon-yandex" src="${YANDEX_ICON}" alt="Yandex">
					<h1>当前站点暂不可用</h1>
					<div class="desc">无法访问此站点，Yandex 返回了“暂不可用”页面。</div>
					<div class="suggest"><ul><li>建议在 ${linkHtml} 上使用。</li></ul></div>
					<div class="btn-group">
						<button class="btn-secondary" id="retryBtn">重新尝试</button>
						<button class="btn-secondary" id="backBtn">返回上一页</button>
					</div>
				</div>
			</div>`;
		const clearState = () => {
			try { sessionStorage.removeItem(BACK_SOON_REDIRECT_KEY); } catch (e) {}
		};
		shadow.getElementById('retryBtn').onclick = () => {
			clearState();
			window.location.href = '/';
		};
		shadow.getElementById('backBtn').onclick = () => {
			clearState();
			history.length > 1 ? history.back() : window.close();
		};
		const tryAppend = () => {
			if (!document.body) { setTimeout(tryAppend, 10); return; }
			document.body.innerHTML = '';
			document.body.appendChild(host);
			shadow.querySelectorAll('.suggest a').forEach(a => {
				a.addEventListener('click', clearState);
			});
		};
		tryAppend();
	}

	function handleBackSoon() {
		if (!isBackSoon()) return false;
		let redirected = false;
		try {
			redirected = sessionStorage.getItem(BACK_SOON_REDIRECT_KEY) === '1';
		} catch (e) {}
		if (!redirected) {
			const ref = document.referrer;
			if (ref) {
				try {
					const u = new URL(ref);
					if (u.hostname && u.hostname !== window.location.hostname) {
						try { sessionStorage.setItem(BACK_SOON_REDIRECT_KEY, '1'); } catch (e) {}
						window.location.replace(u.origin + '/');
						return true;
					}
				} catch (e) {}
			}
		}
		renderBackSoonHelp();
		return true;
	}

	function getDomain() {
		const host = window.location.hostname;
		const parts = host.split('.');
		const idx = parts.findIndex(p => p === 'yandex' || p === 'ya');
		return idx !== -1 ? '.' + parts.slice(idx).join('.') : (parts.length <= 2 ? '.' + host : '.' + parts.slice(-2).join('.'));
	}

	function ensureLrParam() {
		const url = new URL(window.location.href);
		if (!url.searchParams.has('text') || url.searchParams.get('lr') === '90') return false;
		url.searchParams.set('lr', '90');
		location.replace(url.toString());
		return true;
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
		if (handleBackSoon()) return;
		if (ensureLrParam()) return;
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
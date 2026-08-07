// ==UserScript==
// @name         应用宝网页下载
// @namespace    https://viayoo.com/vqu5z0
// @version      1.8
// @description  替换应用宝下载按钮，可以在浏览器下载。
// @author       Aloazny
// @icon        https://sj.qq.com/favicon.ico
// @match        https://sj.qq.com/*
// @match        https://a.app.qq.com/o/simple.jsp?*
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const adblockRules = () => {
        const selectors = ['div[component-id="yybn_game_related_game"]', 'div[dt-eid="brand_banner"]', 'div[component-id="YYB_HOME_WECHAT_GAME_RECOMMEND"]'];
        selectors.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el && el.style) {
                    el.style.display = 'none !important';
                    el.remove();
                }
            });
        });
    };

    adblockRules();
    new MutationObserver(adblockRules).observe(document.body, {
        childList: true,
        subtree: true
    });

    const href = location.href;

    if (!href.includes('/appdetail/') && !href.includes('a.app.qq.com/o/simple.jsp?')) {
        const redirectListBtn = el => {
            if (!el || el.hasAttribute('data-hooked')) return;
            const params = el.getAttribute('dt-params');
            if (!params) return;
            const match = params.match(/[?&]pkgname=([^&]+)/);
            if (!match) return;
            const pkgname = match[1];
            const target = `https://sj.qq.com/appdetail/${pkgname}`;
            el.setAttribute('data-hooked', 'true');
            el.style.cursor = 'pointer';
            el.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                location.href = target;
            }, true);
        };

        const handleList = () => {
            // const searchContainers = document.querySelectorAll('[class*="SearchBar"], [class*="searchBar"]');
            document.querySelectorAll('[dt-eid*="common_download"], [dt-eid*="safe_download"]').forEach(el => {
                /* for (const container of searchContainers) {
                        if (container.contains(el)) return;
                    }
                 */
                redirectListBtn(el);
            });
        };

        handleList();
        new MutationObserver(handleList).observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['dt-params', 'dt-eid']
        });
    }

    if (href.includes('sj.qq.com/appdetail/')) {
        const pkg = location.pathname.match(/^\/appdetail\/([^/?]+)/)?.[1];
        if (!pkg) return;
        const target = `https://a.app.qq.com/o/simple.jsp?pkgname=${pkg}`;
        const redirectDetailBtn = el => {
            if (!el || el.hasAttribute('data-hooked')) return;
            el.setAttribute('data-hooked', 'true');
            const t = (el.textContent || '').trim();
            if (t !== '下载' && t !== '电脑' && !t.includes('Apk下载')) {
                if (getComputedStyle(el).position === 'static') {
                    el.style.position = 'relative';
                }
                const mask = document.createElement('div');
                mask.textContent = '浏览器下载';
                mask.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:inherit;color:inherit;font-weight:inherit;font-size:inherit;z-index:5;border-radius:inherit;pointer-events:none;';
                el.appendChild(mask);
            }
            el.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                window.open(target, '_blank');
            }, true);
        };

        const findDetailBtns = () => {
            const list = [];
            document.querySelectorAll('[dt-eid*="download"], [dt-eid*="safe_download"], [dt-eid="pc_yyb_download_button"]').forEach(el => {
                const t = (el.textContent || '').trim();
                if (t.includes('下载') || t.includes('官方') || t.includes('安卓') || t.includes('电脑')) {
                    list.push(el);
                }
            });
            return list;
        };

        const handleDetail = () => {
            if (!document.getElementById('__btnRowFix')) {
                const style = document.createElement('style');
                style.id = '__btnRowFix';
                style.textContent = '[class*="pcDownloadBtnWrapper"]{width:auto!important}[class*="pcDownloadBtnWrapper"]>div{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;gap:12px}[class*="pcDownloadBtnWrapper"] button{width:auto!important;padding:12px 24px!important;border-radius:50px!important;font-size:15px!important;background:color-mix(in srgb,var(--button-pcyyb-bg,#0082FF) 80%,transparent)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important;box-shadow:0 8px 24px rgba(0,0,0,0.08),0 0 0 1px rgba(255,255,255,0.25) inset!important;transition:all 0.25s cubic-bezier(0.1,0.9,0.2,1)!important}[class*="pcDownloadBtnWrapper"] button:hover{transform:translateY(-2px)!important;box-shadow:0 12px 28px rgba(0,0,0,0.12),0 0 0 1px rgba(255,255,255,0.35) inset!important}[class*="pcDownloadBtnWrapper"] button:active{transform:scale(0.98)!important}';
                document.head.appendChild(style);
            }

            findDetailBtns().forEach(el => {
                const t = (el.textContent || '').trim();
                if (t.includes('电脑')) {
                    if (el.hasAttribute('data-pc-hooked')) return;
                    el.setAttribute('data-pc-hooked', 'true');
                    const cloneBtn = el.cloneNode(true);
                    cloneBtn.removeAttribute('data-pc-hooked');
                    const textEl = cloneBtn.querySelector('[class*="desktopText"]');
                    if (textEl) {
                        textEl.textContent = 'Apk下载';
                    } else {
                        cloneBtn.textContent = 'Apk下载';
                    }
                    el.parentNode.insertBefore(cloneBtn, el);
                    redirectDetailBtn(cloneBtn);
                } else if (!t.includes('Apk下载')) {
                    redirectDetailBtn(el);
                }
            });
        };
        handleDetail();

        new MutationObserver(handleDetail).observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
        });

        return;
    }

    if (href.includes('a.app.qq.com/o/simple.jsp?')) {
        const main = document.querySelector('.main-download-btn');
        const sub = document.querySelector('.sub-download-btn');
        const nameEl = document.querySelector('.app-vertical-panel .app-detail-bar > span + span[class]');

        if (!main || !sub) return;
        let appsize = nameEl?.textContent?.trim() || '';
        main.textContent = `下载 ${appsize}`;
        main.classList.remove('weaken-display');
        main.style.fontWeight = 'bold';
        sub.style.display = 'none';

        document.getElementById('yyb-safe-text')?.classList.add('hidden');
        document.getElementById('normal-safe-text')?.classList.remove('hidden');

        const triggerDownload = () => {
            const detail = window.systemData?.appDetail;
            const apkUrl = detail?.apkUrl || "";
            if (!detail || !apkUrl) {
                sub.click();
                return;
            }
            const fileName = `${detail.appName}_${detail.versionName}.apk`;
            const a = document.createElement('a');
            a.href = apkUrl;
            a.download = fileName;
            a.target = '_self';
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        main.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            triggerDownload();
        }, true);

        if (!nameEl?.textContent?.trim()) {
            new MutationObserver(() => {
                const el = document.querySelector('.app-vertical-panel h3');
                if (el?.textContent?.trim()) {
                    const name = el.textContent.trim();
                    main.textContent = `浏览器下载 ${name}`;
                }
            }).observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    function createSearchWidget() {
        const style = document.createElement('style');
        style.textContent = `.search-widget-btn{position:fixed;bottom:100px;right:20px;width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.65);box-shadow:0 8px 32px rgba(0,0,0,0.1),0 1px 0 0 rgba(255,255,255,0.3) inset;border:1px solid rgba(255,255,255,0.4);cursor:pointer;z-index:9999;transition:all 0.3s cubic-bezier(0.1,0.9,0.2,1);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;}.search-widget-btn:hover{transform:scale(1.1);box-shadow:0 12px 40px rgba(0,0,0,0.15);}.search-widget-btn:active{transform:scale(0.95);}.search-widget-icon{width:24px;height:24px;}.search-widget-modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.25);z-index:10000;display:none;align-items:center;justify-content:center;backdrop-filter:blur(20px) saturate(180%);-webkit-backdrop-filter:blur(20px) saturate(180%);}.search-widget-box{background:rgba(255,255,255,0.65);border-radius:12px;padding:25px;box-shadow:0 8px 32px 0 rgba(0,0,0,0.08),0 1px 0 0 rgba(255,255,255,0.3) inset;backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);border:1px solid rgba(255,255,255,0.4);width:90%;max-width:450px;transform:scale(0.96);opacity:0;transition:all 0.2s cubic-bezier(0.1,0.9,0.2,1);}.search-widget-box.active{transform:scale(1);opacity:1;}.search-widget-input{width:100%;padding:12px 18px;border-radius:6px;border:1px solid rgba(0,0,0,0.15);border-bottom:2px solid #0078d4;font-size:16px;outline:none;transition:all 0.2s;background:rgba(255,255,255,0.75);box-shadow:inset 0 1px 2px rgba(0,0,0,0.05);}.search-widget-input:focus{background:rgba(255,255,255,0.95);border-color:rgba(0,0,0,0.1);border-bottom-color:#005a9e;box-shadow:0 0 0 3px rgba(0,120,212,0.15);}.search-widget-submit{margin-top:15px;width:100%;padding:12px;border-radius:6px;background:#0078d4;color:white;border:none;font-size:15px;font-weight:500;cursor:pointer;transition:all 0.2s;box-shadow:0 2px 4px rgba(0,0,0,0.1);}.search-widget-submit:hover{background:#005a9e;box-shadow:0 4px 8px rgba(0,0,0,0.15);}.search-widget-submit:active{transform:scale(0.99);}@media(max-width:768px){.search-widget-btn{width:50px;height:50px;bottom:85px;right:15px;}.search-widget-box{padding:20px;margin:15px;}}`;
        document.head.appendChild(style);
        const btn = document.createElement('button');
        btn.className = 'search-widget-btn';
        btn.innerHTML = `<svg class="search-widget-icon" viewBox="0 0 24 24"><path fill="#0078d4" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>`;
        const modal = document.createElement('div');
        modal.className = 'search-widget-modal';
        modal.innerHTML = `<div class="search-widget-box"><input type="text" class="search-widget-input" placeholder="搜索应用..." autofocus><button class="search-widget-submit">搜索</button></div>`;
        document.body.appendChild(btn);
        document.body.appendChild(modal);
        const box = modal.querySelector('.search-widget-box');
        const input = modal.querySelector('.search-widget-input');
        const submit = modal.querySelector('.search-widget-submit');
        const showModal = () => {
            modal.style.display = 'flex';
            setTimeout(() => box.classList.add('active'), 10);
            setTimeout(() => input.focus(), 50);
        };
        btn.addEventListener('click', showModal);
        const initHook = () => {
            const nativeSearchBar = document.querySelector('[dt-eid="nav_searchcell"]');
            if (nativeSearchBar && !nativeSearchBar.hasAttribute('data-hooked')) {
                nativeSearchBar.setAttribute('data-hooked', 'true');
                const mask = document.createElement('div');
                mask.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:999;cursor:pointer;background:transparent;';
                if (getComputedStyle(nativeSearchBar).position === 'static') {
                    nativeSearchBar.style.position = 'relative';
                }
                nativeSearchBar.appendChild(mask);
                mask.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showModal();
                }, true);
            }
        };
        initHook();
        const observer = new MutationObserver(() => {
            initHook();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                box.classList.remove('active');
                setTimeout(() => modal.style.display = 'none', 200);
            }
        });
        const performSearch = () => {
            const query = input.value.trim();
            if (query) {
                window.location.href = `https://sj.qq.com/search?q=${encodeURIComponent(query)}`;
            }
        };
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
        submit.addEventListener('click', performSearch);
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                btn.style.bottom = '85px';
                btn.style.right = '15px';
            } else {
                btn.style.bottom = '100px';
                btn.style.right = '20px';
            }
        });
    }

    if (window.location.hostname === 'sj.qq.com') {
        createSearchWidget();
    }

})();
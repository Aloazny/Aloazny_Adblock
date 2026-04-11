// ==UserScript==
// @name         Twitter搜索替换
// @namespace    http://viayoo.com/1guhh
// @version      1.4
// @description  自用推特(Twitter)搜索替换，一个简单的搜索过滤器，不用特意去记Twitter高级语法。
// @author       Via
// @match       https://x.com/*
// @exclude     https://x.com/*/status/*/video/*
// @exclude     https://x.com/*/status/*/photo/*
// @exclude     https://x.com/settings
// @exclude     https://x.com/i/*/creators/
// @exclude     https://x.com/i/bookmarks
// @exclude     https://x.com/i/premium-business
// @exclude     https://x.com/*/lists
// @exclude     https://x.com/i/follow_people
// @exclude     https://x.com/i/chat
// @exclude     https://x.com/notifications
// @exclude     https://x.com/i/grok
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @license       MIT
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let filterState = { since: '', until: '', lang: '', include: new Set(), exclude: new Set(), excludeText: '', baseText: '' };
    let history = JSON.parse(localStorage.getItem('ts_search_history') || '[]');

    const css = `
        #ts-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); z-index: 99999; display: none; justify-content: center; align-items: center; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif; overflow: hidden; }
        #ts-modal { width: 92%; max-width: 450px; background: rgba(255, 255, 255, 0.95); border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); color: #1a1a1a; position: relative; overflow: hidden; }
        @media (prefers-color-scheme: dark) { #ts-modal { background: rgba(21, 32, 43, 0.95); color: #f7f9f9; } }
        .ts-view-container { display: flex; width: 200%; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .ts-view { width: 50%; padding: 20px; box-sizing: border-box; }
        .ts-group { margin-bottom: 18px; }
        .ts-label { font-size: 13px; font-weight: 600; color: #71767b; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
        .ts-desc { font-size: 11px; font-weight: 400; color: #71767b; margin-left: 4px; opacity: 0.8; }
        .ts-input { width: 100%; border: 1px solid #cfd9de; border-radius: 12px; padding: 12px; background: transparent; color: inherit; font-size: 15px; box-sizing: border-box; outline: none; }
        .ts-input:focus { border-color: #1d9bf0; }
        .ts-capsules { display: grid; grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); gap: 8px; }
        .ts-cap { padding: 7px 0; text-align: center; border-radius: 8px; border: 1px solid #cfd9de; font-size: 13px; cursor: pointer; transition: 0.2s; background: rgba(0,0,0,0.03); }
        .ts-cap.active-inc { background: #1d9bf0 !important; color: white; border-color: #1d9bf0; }
        .ts-cap.active-exc { background: #f4212e !important; color: white; border-color: #f4212e; }
        .ts-cap.active-lang { background: #00ba7c !important; color: white; border-color: #00ba7c; }
        .ts-dates { display: flex; flex-direction: column; gap: 8px; }
        @media (min-width: 400px) { .ts-dates { flex-direction: row; } }
        #ts-btn-go { width: 100%; background: #1d9bf0; color: white; border: none; padding: 14px; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; margin-top: 10px; }
        #ts-float-trigger { position: fixed; right: 20px; bottom: 80px; width: 48px; height: 48px; background: #1d9bf0; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 9999; cursor: pointer; transition: opacity 0.3s, transform 0.3s; opacity: 1; }
        #ts-float-trigger.ts-fade { opacity: 0.3; }
        #ts-float-trigger.ts-hide { transform: translateY(150px); opacity: 0; }
        .ts-hist-item { padding: 12px; border-bottom: 1px solid rgba(128,128,128,0.2); cursor: pointer; font-size: 14px; word-break: break-all; }
        .ts-hist-item:hover { background: rgba(128,128,128,0.1); }
        .ts-switch-btn { color: #1d9bf0; cursor: pointer; font-size: 12px; white-space: nowrap; }
        @media (prefers-color-scheme: dark) { .ts-cap { background: rgba(255,255,255,0.05); border-color: #3d4144; } }
    `;

    const buildUrl = () => {
        let q = filterState.baseText || "";
        if (filterState.since) q += ` since:${filterState.since}`;
        if (filterState.until) q += ` until:${filterState.until}`;
        if (filterState.lang) q += ` lang:${filterState.lang}`;
        filterState.include.forEach(k => q += ` filter:${k}`);
        filterState.exclude.forEach(k => q += ` -filter:${k}`);
        if (filterState.excludeText) {
            filterState.excludeText.split(/[,，\s]+/).forEach(w => { if(w) q += ` -${w}`; });
        }
        return `https://x.com/search?q=${encodeURIComponent(q.trim())}&src=typed_query`;
    };

    const saveHistory = (query) => {
        if (!query) return;
        history = [query, ...history.filter(i => i !== query)].slice(0, 10);
        localStorage.setItem('ts_search_history', JSON.stringify(history));
    };

    const init = () => {
        const host = document.createElement('div');
        host.id = 'ts-enhancer-host';
        document.body.appendChild(host);
        const shadow = host.attachShadow({ mode: 'open' });
        const styleTag = document.createElement('style');
        styleTag.textContent = css;
        shadow.appendChild(styleTag);
        const overlay = document.createElement('div');
        overlay.id = 'ts-overlay';
        overlay.innerHTML = `
            <div id="ts-modal">
                <div class="ts-view-container" id="ts-slider">
                    <div class="ts-view" id="ts-main-view">
                        <div class="ts-group">
                            <span class="ts-label">搜索关键词 <span class="ts-switch-btn" id="ts-to-hist">查看历史记录 ➔</span></span>
                            <input type="text" id="ts-in-main" class="ts-input" placeholder="输入内容...">
                        </div>
                        <div class="ts-group"><span class="ts-label">快捷过滤 <span class="ts-desc">(筛选/排除/取消)</span></span><div class="ts-capsules" id="ts-cap-box"></div></div>
                        <div class="ts-group"><span class="ts-label">语言限定</span><div class="ts-capsules" id="ts-lang-box"></div></div>
                        <div class="ts-group"><span class="ts-label">时间范围</span><div class="ts-dates"><input type="date" id="ts-in-since" class="ts-input"><input type="date" id="ts-in-until" class="ts-input"></div></div>
                        <div class="ts-group"><span class="ts-label">排除词</span><input type="text" id="ts-in-exc" class="ts-input" placeholder="广告, 抽奖..."></div>
                        <button id="ts-btn-go">执行高级搜索</button>
                    </div>
                    <div class="ts-view" id="ts-hist-view">
                        <div class="ts-group">
                            <span class="ts-label"><span class="ts-switch-btn" id="ts-back-main">⬅ 返回搜索</span><span style="flex:1; text-align:right">历史记录</span></span>
                            <div id="ts-hist-list" style="max-height: 400px; overflow-y: auto; margin-top:10px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        shadow.appendChild(overlay);
        const slider = shadow.getElementById('ts-slider');
        const toggle = (show) => {
            overlay.style.display = show ? 'flex' : 'none';
            if (show) {
                slider.style.transform = 'translateX(0%)';
                const cur = document.querySelector('input[data-testid="SearchBox_Search_Input"]')?.value || "";
                if(cur) shadow.getElementById('ts-in-main').value = cur.replace(/\s(since|until|filter|-filter|lang):[^\s]+/g, '').replace(/\s-[^\s]+/g, '').trim();
                shadow.getElementById('ts-in-main').focus();
            }
        };

        shadow.getElementById('ts-to-hist').onclick = () => {
            slider.style.transform = 'translateX(-50%)';
            const list = shadow.getElementById('ts-hist-list');
            list.innerHTML = history.length ? history.map(h => `<div class="ts-hist-item">${h}</div>`).join('') : '<div style="padding:20px;text-align:center;opacity:0.5;">无历史记录</div>';
            list.querySelectorAll('.ts-hist-item').forEach((el, i) => {
                el.onclick = () => { shadow.getElementById('ts-in-main').value = history[i]; slider.style.transform = 'translateX(0%)'; };
            });
        };
        shadow.getElementById('ts-back-main').onclick = () => slider.style.transform = 'translateX(0%)';

        const options = [['images','图片'], ['videos','视频'], ['replies','回复'], ['links','链接'], ['media','媒体']];
        const box = shadow.getElementById('ts-cap-box');
        options.forEach(([key, label]) => {
            const el = document.createElement('div');
            el.className = 'ts-cap'; el.textContent = label;
            el.onclick = () => {
                if (!filterState.include.has(key) && !filterState.exclude.has(key)) {
                    filterState.include.add(key); el.classList.add('active-inc');
                } else if (filterState.include.has(key)) {
                    filterState.include.delete(key); filterState.exclude.add(key); el.classList.replace('active-inc', 'active-exc');
                } else {
                    filterState.exclude.delete(key); el.classList.remove('active-exc');
                }
            };
            box.appendChild(el);
        });

        const langs = [['zh','中文'], ['ja','日语'], ['en','英语']];
        const lBox = shadow.getElementById('ts-lang-box');
        langs.forEach(([code, label]) => {
            const el = document.createElement('div');
            el.className = 'ts-cap'; el.textContent = label;
            el.onclick = () => {
                lBox.querySelectorAll('.ts-cap').forEach(c => c.classList.remove('active-lang'));
                if (filterState.lang === code) { filterState.lang = ''; }
                else { filterState.lang = code; el.classList.add('active-lang'); }
            };
            lBox.appendChild(el);
        });

        shadow.getElementById('ts-btn-go').onclick = () => {
            filterState.baseText = shadow.getElementById('ts-in-main').value;
            filterState.since = shadow.getElementById('ts-in-since').value;
            filterState.until = shadow.getElementById('ts-in-until').value;
            filterState.excludeText = shadow.getElementById('ts-in-exc').value;
            saveHistory(filterState.baseText);
            window.location.href = buildUrl();
        };

        overlay.onclick = (e) => { if(e.target === overlay) toggle(false); };

        const float = document.createElement('div');
        float.id = 'ts-float-trigger';
        float.innerHTML = `<svg viewBox="0 0 24 24" width="22" fill="white"><path d="M21 19l-5.154-5.154C16.574 12.742 17 11.417 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.417 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"/></svg>`;
        float.onclick = () => toggle(true);
        shadow.appendChild(float);

        let fadeT, lastS = window.scrollY;
        const resetFade = () => {
            float.classList.remove('ts-fade');
            clearTimeout(fadeT);
            fadeT = setTimeout(() => float.classList.add('ts-fade'), 2000);
        };
        window.addEventListener('scroll', () => {
            const curS = window.scrollY;
            float.classList.toggle('ts-hide', curS > lastS && curS > 100);
            lastS = curS;
            resetFade();
        });
        window.addEventListener('mousemove', resetFade);
        window.addEventListener('touchstart', resetFade);
        resetFade();

        const hookSearch = (e) => {
            const target = e.target.closest('input[data-testid="SearchBox_Search_Input"]');
            if (target) {
                e.preventDefault();
                e.stopPropagation();
                target.blur();
                toggle(true);
            }
        };
        document.addEventListener('mousedown', hookSearch, true);
        document.addEventListener('focusin', hookSearch, true);
    };

    init();
})();
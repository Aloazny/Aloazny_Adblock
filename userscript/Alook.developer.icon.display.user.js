// ==UserScript==
// @name         Hide debug Panel
// @name:zh-CN   隐藏调试面板
// @namespace    https://viayoo.com/xr1y5f
// @version      1.1.0
// @description  默认隐藏 #__vconsole / #eruda / #kiss-translator-fab，覆盖内联样式绕过 !important，菜单可切换显示/隐藏/移除。
// @author       Deepseek
// @match        *://*/*
// @run-at       document-start
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @license      MIT
// ==/UserScript==

(function () {
    'use strict';

    // 要移除的样式
    const TARGETS = ['#__vconsole', '#eruda', '#kiss-translator-fab'];
    const LS_KEY = '__dbg_panel_mode__';
    const MODE = { HIDE: 'hide', SHOW: 'show', REMOVE: 'remove' };

    let mode = MODE.HIDE;
    try {
        const v = localStorage.getItem(LS_KEY);
        if (v === MODE.HIDE || v === MODE.SHOW || v === MODE.REMOVE) mode = v;
    } catch (_) {}

    let menuIds  = [];
    let observer = null;
    let pending  = false;

    function query() {
        const list = [];
        for (const sel of TARGETS) {
            try { document.querySelectorAll(sel).forEach(el => list.push(el)); } catch (_) {}
        }
        return list;
    }

    function hideEl(el) {
        if (el.style.getPropertyValue('display') === 'none'
            && el.style.getPropertyPriority('display') === 'important') return;
        el.style.setProperty('display', 'none', 'important');
    }

    function showEl(el) {
        if (el.style.getPropertyValue('display') !== 'none') return;
        if (el.style.getPropertyPriority('display') !== 'important') return;
        el.style.removeProperty('display');
    }

    function applyMode() {
        for (const el of query()) {
            if (mode === MODE.HIDE) { hideEl(el); continue; }
            if (mode === MODE.SHOW) { showEl(el); continue; }
            if (mode === MODE.REMOVE) { try { el.remove(); } catch (_) {} }
        }
    }

    function forceRemove() {
        for (const el of query()) { try { el.remove(); } catch (_) {} }
    }

    function schedule() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => { pending = false; applyMode(); });
    }

    function ensureObserver() {
        if (observer) return;
        observer = new MutationObserver(schedule);
        const root = document.documentElement || document;
        observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    }

    function stopObserver() {
        if (observer) { observer.disconnect(); observer = null; }
    }

    function syncObserver() {
        if (mode === MODE.SHOW) stopObserver();
        else ensureObserver();
    }

    function persist() {
        try { localStorage.setItem(LS_KEY, mode); } catch (_) {}
    }

    function refreshMenu() {
        if (typeof GM_registerMenuCommand !== 'function') return;
        if (typeof GM_unregisterMenuCommand === 'function') {
            for (const id of menuIds) { try { GM_unregisterMenuCommand(id); } catch (_) {} }
        }
        menuIds = [];

        const label = mode === MODE.HIDE   ? '🫥 隐藏中（点此显示）'
                    : mode === MODE.SHOW   ? '👁 显示中（点此隐藏）'
                    :                        '🗑 已移除（点此恢复隐藏）';

        menuIds.push(GM_registerMenuCommand(label, () => {
            mode = (mode === MODE.HIDE) ? MODE.SHOW : MODE.HIDE;
            persist(); applyMode(); syncObserver(); refreshMenu();
        }));

        menuIds.push(GM_registerMenuCommand('🔨 强制移除一次', forceRemove));

        menuIds.push(GM_registerMenuCommand(
            mode === MODE.REMOVE ? '♻️ 退出移除模式' : '🗑 进入移除模式（持续清除）',
            () => {
                if (mode === MODE.REMOVE) {
                    mode = MODE.HIDE;
                    persist(); applyMode(); syncObserver(); refreshMenu();
                } else {
                    mode = MODE.REMOVE;
                    forceRemove();
                    persist(); syncObserver(); refreshMenu();
                }
            }
        ));

        menuIds.push(GM_registerMenuCommand('🔄 刷新页面', () => location.reload()));
    }

    function boot() { applyMode(); syncObserver(); refreshMenu(); }

    if (document.readyState === 'loading') {
        boot();
        document.addEventListener('DOMContentLoaded', applyMode, { once: true });
        window.addEventListener('load', applyMode, { once: true });
    } else {
        boot();
    }
})();
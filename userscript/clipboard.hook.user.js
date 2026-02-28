// ==UserScript==
// @name         复制授权拦截器
// @namespace    https://viayoo.com/
// @version      4.5
// @description  复制必弹窗，2次允许后开始自由复制，3次拒绝永久禁用(变灰，点击灰点恢复变红)，点击小红点恢复，红绿切换自由复制。
// @author       Aloazny & Deepseek
// @match        *://*/*
// @run-at       document-start
// @icon       data:image/png;base64,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
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @license      MIT
// ==/UserScript==

(function () {
    const KEY = 'copyAuth:v4'; if (window[KEY]) return; window[KEY] = true;
    let denyCount = 0, allowCount = 0, enabled = true, freeCopyMode = false, isShowingModal = false;
    const MAX_DENY = 3, AUTO_FREE_AFTER_ALLOW = 2, COPY_TIME_THRESHOLD = 1000, COPY_COUNT_THRESHOLD = 3;
    let copyRecords = [], dot = null, hideTimer = null, shadowRoot = null, container = null;
    const UI_TYPES = ['DEFAULT', 'IOS', 'MIUI', 'EDGE'];
    let currentUI = (typeof GM_getValue !== 'undefined' ? GM_getValue('clipboard_ui_style', 'EDGE') : 'EDGE');
    let editAbortController = null;
    const originalExec = document.execCommand;
    const origWriteText = navigator.clipboard?.writeText;
    const origWrite = navigator.clipboard?.write;

    if (typeof GM_registerMenuCommand !== 'undefined') {
        const updateMenu = () => {
            GM_registerMenuCommand('剪切板设定 🛠️', () => {
                if (shadowRoot?.querySelector('.auth-settings-mask')) return;
                ensureShadow();
                const mask = document.createElement('div'), panel = document.createElement('div');
                mask.className = 'auth-settings-mask';
                panel.className = 'auth-settings-panel';
                const isIgnored = (typeof GM_getValue !== 'undefined' ? GM_getValue('clipboard_ignore_' + location.host, false) : false);
                const css = `
                    .auth-settings-mask { position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.3); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); z-index:2147483646; display:flex; align-items:center; justify-content:center; animation: settings-fade-in 0.3s ease; }
                    .auth-settings-panel { position:relative; background:rgba(255,255,255,0.85); border-radius:28px; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); padding:24px; display:flex; flex-direction:column; gap:12px; min-width:240px; font-family:system-ui,-apple-system,sans-serif; animation: settings-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); border:1px solid rgba(255,255,255,0.4); }
                    .auth-settings-panel button { border:none; border-radius:14px; padding:16px; cursor:pointer; font-size:14px; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); display:flex; align-items:center; justify-content:space-between; font-weight:600; }
                    .auth-settings-panel button:active { transform: scale(0.94); }
                    .btn-ui { background:#fff; color:#007AFF; box-shadow:0 4px 12px rgba(0,122,255,0.1); }
                    .btn-status { background:${isIgnored ? '#fff1f0' : '#f6ffed'}; color:${isIgnored ? '#ff4d4f' : '#52c41a'}; box-shadow:0 4px 12px ${isIgnored ? 'rgba(255,77,79,0.1)' : 'rgba(82,196,26,0.1)'}; }
                    .btn-close { margin-top:6px; background:none; color:#888; border:none; font-size:13px; cursor:pointer; text-align:center; font-weight:500; }
                    .btn-close:hover { color:#444; }
                    @media (prefers-color-scheme: dark) {
                        .auth-settings-panel { background:rgba(30,30,30,0.85); border:1px solid rgba(255,255,255,0.1); box-shadow:0 25px 50px -12px rgba(0,0,0,0.5); }
                        .btn-ui { background:#2c2c2e; color:#0A84FF; box-shadow:0 4px 12px rgba(0,0,0,0.2); }
                        .btn-status { background:${isIgnored ? '#2c1515' : '#162312'}; color:${isIgnored ? '#ff6961' : '#30d158'}; box-shadow:0 4px 12px rgba(0,0,0,0.2); }
                        .btn-close { color:#aaa; }
                        .btn-close:hover { color:#fff; }
                    }
                    @keyframes settings-fade-in { from { opacity:0; } to { opacity:1; } }
                    @keyframes settings-slide-in { from { opacity:0; transform: translateX(120px) scale(0.9); } to { opacity:1; transform: translateX(0) scale(1); } }
                `;
                const style = document.createElement('style'); style.textContent = css; shadowRoot.appendChild(style);
                const btnUI = document.createElement('button');
                btnUI.className = 'btn-ui';
                const updateBtnText = () => { btnUI.innerHTML = `<span>界面风格</span> <small style="opacity:0.6;font-weight:400">${currentUI}</small>`; };
                updateBtnText();
                btnUI.onclick = (e) => {
                    e.stopPropagation();
                    currentUI = UI_TYPES[(UI_TYPES.indexOf(currentUI) + 1) % UI_TYPES.length];
                    if (typeof GM_setValue !== 'undefined') GM_setValue('clipboard_ui_style', currentUI);
                    updateBtnText();
                };
                const btnStatus = document.createElement('button');
                btnStatus.className = 'btn-status';
                const updateStatusText = (ignored) => { btnStatus.innerHTML = `<span>复制授权</span> <small style="font-weight:700">${ignored ? '禁止写入' : '监控中'}</small>`; };
                updateStatusText(isIgnored);
                btnStatus.onclick = (e) => {
                    e.stopPropagation();
                    const currentState = !(typeof GM_getValue !== 'undefined' ? GM_getValue('clipboard_ignore_' + location.host, false) : false);
                    if (typeof GM_setValue !== 'undefined') GM_setValue('clipboard_ignore_' + location.host, currentState);
                    updateStatusText(currentState);
                    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    btnStatus.style.background = currentState ? (isDark ? '#2c1515' : '#fff1f0') : (isDark ? '#162312' : '#f6ffed');
                    btnStatus.style.color = currentState ? (isDark ? '#ff6961' : '#ff4d4f') : (isDark ? '#30d158' : '#52c41a');
                    btnStatus.style.boxShadow = isDark ? '0 4px 12px rgba(0,0,0,0.2)' : `0 4px 12px ${currentState ? 'rgba(255,77,79,0.1)' : 'rgba(82,196,26,0.1)'}`;
                    if (currentState) {
                        enabled = false;
                        restoreAllCopyAPIs();
                        if(dot) { dot.remove(); dot = null; }
                        hideAllModals();
                    } else {
                        enabled = true;
                        hookAPI();
                        hookExec();
                    }
                };
                const btnEdit = document.createElement('button');
                btnEdit.className = 'btn-ui';
                const updateEditBtn = () => {
                    const active = editAbortController !== null;
                    btnEdit.innerHTML = `<span>编辑模式</span> <small style="opacity:0.6;font-weight:400">${active ? 'ON' : 'OFF'}</small>`;
                    btnEdit.style.color = active ? '#FF9500' : '#007AFF';
                };
                updateEditBtn();
                btnEdit.onclick = (e) => {
                    e.stopPropagation();
                    if (editAbortController !== null) {
                        disableContentEdit();
                    } else {
                        enableContentEdit();
                    }
                    updateEditBtn();
                };
                const isUnlockActive = (typeof GM_getValue !== 'undefined' ? GM_getValue('clipboard_unlock_' + location.host, true) : true);
                const btnUnlock = document.createElement('button');
                btnUnlock.className = 'btn-status';
                const updateUnlockUI = (active) => {
                    btnUnlock.innerHTML = `<span>解除复制限制</span> <small style="font-weight:700">${active ? '运行中' : '已禁用'}</small>`;
                    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    btnUnlock.style.background = active ? (isDark ? '#162312' : '#f6ffed') : (isDark ? '#2c1515' : '#fff1f0');
                    btnUnlock.style.color = active ? (isDark ? '#30d158' : '#52c41a') : (isDark ? '#ff6961' : '#ff4d4f');
                };
                updateUnlockUI(isUnlockActive);
                btnUnlock.onclick = (e) => {
                    e.stopPropagation();
                    const newState = !(typeof GM_getValue !== 'undefined' ? GM_getValue('clipboard_unlock_' + location.host, true) : true);
                    if (typeof GM_setValue !== 'undefined') GM_setValue('clipboard_unlock_' + location.host, newState);
                    updateUnlockUI(newState);
                    toggleUnlock(newState);
                };
                const close = document.createElement('button');
                close.className = 'btn-close'; close.textContent = '保存并关闭';
                const cleanup = () => { mask.remove(); style.remove(); };
                close.onclick = cleanup;
                mask.onclick = (e) => { if(e.target === mask) cleanup(); };
                panel.append(btnUI, btnStatus, btnUnlock, btnEdit, close);
                mask.appendChild(panel);
                shadowRoot.appendChild(mask);
            }, { id: 'ui_settings_main' });
        };
        updateMenu();
    }

    const ensureShadow = () => {
        if (shadowRoot) return;
        container = document.createElement('div');
        container.id = 'copy-auth-interceptor';
        container.style.cssText = 'position:absolute;top:0;left:0;z-index:2147483647;';
        document.documentElement.appendChild(container);
        shadowRoot = container.attachShadow({ mode: 'closed' });
    };

    const disableAllCopyAPIs = () => {
        const emptyFunc = () => false;
        const emptyPromise = () => Promise.reject('复制功能已被永久禁用');
        document.execCommand = emptyFunc;
        if (navigator.clipboard) {
            navigator.clipboard.writeText = emptyPromise;
            if (navigator.clipboard.write) navigator.clipboard.write = emptyPromise;
        }
    };

    const restoreAllCopyAPIs = () => {
        if (originalExec) document.execCommand = originalExec;
        if (origWriteText) navigator.clipboard.writeText = origWriteText;
        if (origWrite) navigator.clipboard.write = origWrite;
    };

    const showToast = (msg) => {
        if (window.via && typeof window.via.toast === 'function') {
            window.via.toast(msg);
        } else {
            ensureShadow();
            const t = document.createElement('div');
            t.textContent = msg;
            t.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,.8);color:white;padding:12px 20px;border-radius:8px;z-index:2147483647;font-size:14px;pointer-events:none;';
            shadowRoot.appendChild(t);
            setTimeout(() => t.remove(), 2000);
        }
    };

    const hideAllModals = () => {
        if (!shadowRoot) return;
        const modals = shadowRoot.querySelectorAll('.auth-modal-bg');
        modals.forEach(m => m.remove());
        isShowingModal = false;
    };

    const showConfirm = (msg, txt = '') => {
        if (isShowingModal) return Promise.resolve(false);
        return new Promise(r => { 
            isShowingModal = true; ensureShadow();
            const modal = document.createElement('div'), dialog = document.createElement('div'), title = document.createElement('h3'), pre = document.createElement('div'), btns = document.createElement('div'), allow = document.createElement('button'), deny = document.createElement('button');
            modal.className = 'auth-modal-bg';
            const safeTxt = txt.slice(0, 500);
            const scrollStyle = 'word-break:break-all;white-space:pre-wrap;overflow-y:auto;';
            const commonStyle = document.createElement('style');
            if (currentUI === 'IOS') {
                modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;z-index:2147483647;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);';
                dialog.style.cssText = 'background:rgba(255,255,255,.75);backdrop-filter:blur(25px);-webkit-backdrop-filter:blur(25px);border-radius:13px;width:270px;text-align:center;display:flex;flex-direction:column;box-shadow:0 10px 30px rgba(0,0,0,.15);overflow:hidden;animation:ios-zoom .25s cubic-bezier(0.1, 0.9, 0.2, 1);';
                const content = document.createElement('div');
                content.style.cssText = 'padding:20px 16px;';
                title.style.cssText = 'margin:0;font-size:17px;font-weight:600;color:#000;line-height:1.3;';
                pre.style.cssText = 'margin-top:6px;font-size:13px;color:#000;max-height:120px;display:' + (txt?'block':'none') + ';line-height:1.4;' + scrollStyle;
                btns.style.cssText = 'display:flex;border-top:0.5px solid rgba(0,0,0,.15);height:44px;';
                deny.style.cssText = 'flex:1;background:none;border:none;border-right:0.5px solid rgba(0,0,0,.15);color:#007AFF;font-size:17px;cursor:pointer;';
                allow.style.cssText = 'flex:1;background:none;border:none;color:#007AFF;font-size:17px;font-weight:600;cursor:pointer;';
                commonStyle.textContent = `@keyframes ios-zoom{from{opacity:0;transform:scale(1.15)}to{opacity:1;transform:scale(1)}} @media (prefers-color-scheme: dark) { .auth-modal-bg { background:rgba(0,0,0,.5); } .auth-modal-bg div:first-child { background:rgba(30,30,30,.75) !important; } h3, .auth-modal-bg div div { color:#fff !important; } .auth-modal-bg div div:last-child { border-top-color:rgba(255,255,255,.1) !important; } button { color:#0A84FF !important; border-right-color:rgba(255,255,255,.1) !important; } }`;
                title.textContent = msg; pre.textContent = safeTxt; allow.textContent='允许'; deny.textContent='拒绝';
                content.append(title, pre); btns.append(deny, allow); dialog.append(content, btns);
            } else if (currentUI === 'MIUI') {
                modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.4);display:flex;align-items:flex-end;justify-content:center;z-index:2147483647;padding:20px;box-sizing:border-box;backdrop-filter:blur(4px);';
                dialog.style.cssText = 'background:#fff;border-radius:28px;width:100%;max-width:400px;text-align:left;box-shadow:0 10px 30px rgba(0,0,0,.1);display:flex;flex-direction:column;gap:12px;padding:24px;animation:miui-in .3s cubic-bezier(0.2,0.8,0.2,1);';
                title.style.cssText = 'margin:0;font-size:20px;font-weight:600;color:#1a1a1a;';
                pre.style.cssText = 'margin:4px 0;padding:12px;background:#f2f2f2;border-radius:16px;font-size:14px;color:#666;max-height:150px;display:' + (txt?'block':'none') + ';' + scrollStyle;
                btns.style.cssText = 'display:flex;gap:12px;margin-top:8px;';
                allow.style.cssText = 'flex:1;height:52px;border:none;border-radius:16px;background:#0078FF;color:#fff;font-size:16px;font-weight:600;cursor:pointer;';
                deny.style.cssText = 'flex:1;height:52px;border:none;border-radius:16px;background:#eee;color:#333;font-size:16px;font-weight:600;cursor:pointer;';
                commonStyle.textContent = `@keyframes miui-in{from{transform:translateY(100%)}to{transform:translateY(0)}} @media (min-width: 768px) { .auth-modal-bg { align-items: center !important; padding-bottom: 10vh; } } @media (prefers-color-scheme: dark) { .auth-modal-bg div:first-child { background:#222 !important; } h3 { color:#eee !important; } .auth-modal-bg div div:nth-child(2) { background:#333 !important; color:#bbb !important; } button:last-child { background:#333 !important; color:#aaa !important; } }`;
                title.textContent = msg; pre.textContent = safeTxt; allow.textContent='允许'; deny.textContent='拒绝';
                dialog.append(title, pre, btns); btns.append(allow, deny);
            } else if (currentUI === 'EDGE') {
                modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.4);display:flex;align-items:flex-end;justify-content:center;z-index:2147483647;backdrop-filter:blur(5px);padding-bottom:40px;box-sizing:border-box;';
                dialog.style.cssText = 'background:#fff;border-radius:24px;width:92%;max-width:350px;padding:28px 24px;display:flex;flex-direction:column;gap:20px;box-shadow:0 12px 40px rgba(0,0,0,0.2);animation:edge-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1);box-sizing:border-box;';
                title.style.cssText = 'margin:0;font-size:20px;font-weight:700;color:#1a1a1a;line-height:1.4;text-align:left;';
                pre.style.cssText = 'margin:0;padding:14px;background:#f5f5f5;border-radius:10px;font-size:13px;color:#444;max-height:120px;display:' + (txt?'block':'none') + ';line-height:1.5;' + scrollStyle;
                btns.style.cssText = 'display:flex;flex-direction:column;gap:12px;';
                allow.style.cssText = 'width:100%;height:52px;border:none;border-radius:14px;background:#2F78EE;color:#fff;font-size:16px;font-weight:600;cursor:pointer;';
                deny.style.cssText = 'width:100%;height:52px;border:none;background:none;color:#2F78EE;font-size:16px;font-weight:600;cursor:pointer;';
                commonStyle.textContent = `@keyframes edge-pop{from{opacity:0;transform:translateY(30px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}} @media (min-width: 768px) { .auth-modal-bg { align-items: center !important; padding-bottom: 10vh; } } @media (prefers-color-scheme: dark) { .auth-modal-bg div:first-child { background:#1c1c1c !important; border:1px solid #333; } h3 { color:#eee !important; } .auth-modal-bg div div:nth-child(2) { background:#2b2b2b !important; color:#bbb !important; } }`;
                title.textContent = msg; pre.textContent = safeTxt; allow.textContent='允许复制'; deny.textContent='拒绝复制';
                btns.append(allow, deny); dialog.append(title, pre, btns);
            } else {
                modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:2147483647;backdrop-filter:blur(8px);padding:16px;box-sizing:border-box;';
                dialog.style.cssText = 'background:rgba(255,255,255,.94);border-radius:18px;width:88vw;max-width:420px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.25);display:flex;flex-direction:column;gap:16px;border:1px solid rgba(0,0,0,.06);overflow:hidden;';
                title.style.cssText = 'margin:16px 0 0;padding:0 20px;font-size:18px;font-weight:700;color:#111;line-height:1.3;';
                pre.style.cssText = 'margin:0 20px;padding:14px;background:#f8f8f8;border-radius:12px;font-family:monospace;font-size:13px;color:#111;max-height:160px;display:' + (txt?'block':'none') + ';line-height:1.4;' + scrollStyle;
                btns.style.cssText = 'display:flex;gap:12px;margin:0 20px;padding-bottom:20px;';
                allow.style.cssText = 'flex:1;height:48px;border:none;border-radius:14px;background:#007AFF;color:#fff;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(0,122,255,.35);';
                deny.style.cssText = 'flex:1;height:48px;border:none;border-radius:14px;background:#FF3B30;color:#fff;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 14px rgba(255,59,48,.35);';
                commonStyle.textContent = `@media (prefers-color-scheme: dark) { .auth-modal-bg div:first-child { background:rgba(40,40,40,.94) !important; border-color:rgba(255,255,255,.1) !important; } h3, .auth-modal-bg div div { color:#eee !important; } .auth-modal-bg div div:nth-child(2) { background:#222 !important; } }`;
                title.textContent = msg; pre.textContent = safeTxt; allow.textContent='允许'; deny.textContent='拒绝';
                dialog.append(title, pre, btns); btns.append(deny, allow);
            }
            shadowRoot.appendChild(commonStyle);
            const clean = () => { modal.remove(); commonStyle.remove(); isShowingModal = false; };
            allow.onclick = () => { clean(); r(true); };
            deny.onclick = () => { clean(); r(false); };
            modal.onclick = e => e.target===modal && deny.onclick();
            modal.appendChild(dialog); shadowRoot.appendChild(modal);
        });
    };

    const updateDot = () => { 
        if (!dot) return; 
        dot.style.backgroundColor = freeCopyMode ? '#34C759' : (!enabled ? '#8E8E93' : '#FF3B30');
        clearTimeout(hideTimer);
        if (!freeCopyMode && enabled) {
            hideTimer = setTimeout(() => { 
                if (dot && !freeCopyMode && enabled) { 
                    dot.remove(); 
                    dot = null; 
                } 
            }, 3000);
        }
    };

    const showDot = () => {
        if (dot) { 
            clearTimeout(hideTimer);
            dot.style.opacity = '.8'; 
            dot.style.transform = 'scale(1)'; 
            updateDot();
            return; 
        }
        ensureShadow();
        dot = document.createElement('div');
        dot.style.cssText = 'position:fixed;bottom:45%;right:10px;width:20px;height:20px;border-radius:10px;background:#FF3B30;z-index:2147483647;opacity:0;transform:scale(0);border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);transition:all .3s cubic-bezier(0.34,1.56,0.64,1);cursor:pointer;touch-action:none;';
        shadowRoot.appendChild(dot);
        requestAnimationFrame(() => { dot.style.opacity = '.8'; dot.style.transform = 'scale(1)'; });
        updateDot();
        let taps = 0, timer = null;
        const handleTap = () => {
            taps++; clearTimeout(timer);
            timer = setTimeout(() => {
                if (taps === 1) {
                    if (enabled && !freeCopyMode) { freeCopyMode = true; enabled = true; }
                    else if (freeCopyMode) { freeCopyMode = false; }
                    else { enabled = true; denyCount = 0; restoreAllCopyAPIs(); }
                } else if (taps === 2) { 
                    freeCopyMode = enabled = true; denyCount = 0; restoreAllCopyAPIs();
                }
                updateDot(); taps = 0;
            }, 300);
        };
        dot.onclick = handleTap; dot.ontouchstart = e => { e.preventDefault(); handleTap(); };
    };

    const handleAuth = (txt, successCb, failCb) => {
        if (!recordCopy('api')) return failCb?.();
        if (freeCopyMode) return successCb();
        if (!enabled || denyCount >= MAX_DENY) return failCb?.();
        showDot();
        showConfirm('允许复制内容？', txt).then(ok => {
            if (ok) { successCb(); allowCount++; if (allowCount >= AUTO_FREE_AFTER_ALLOW) freeCopyMode = true; }
            else { 
                denyCount++; 
                if (denyCount >= MAX_DENY) { enabled = false; hideAllModals(); disableAllCopyAPIs(); }
                failCb?.();
            }
            updateDot();
        });
    };

    const recordCopy = (method) => {
        const now = Date.now();
        copyRecords.push({ timestamp: now, method });
        copyRecords = copyRecords.filter(r => now - r.timestamp <= COPY_TIME_THRESHOLD);
        if (copyRecords.length >= COPY_COUNT_THRESHOLD) {
            enabled = false; hideAllModals(); updateDot(); copyRecords = []; disableAllCopyAPIs();
            showToast('检测到恶意复制行为，复制功能已被永久禁用');
            return false;
        }
        return true;
    };

    const hookAPI = () => {
        if (origWriteText) navigator.clipboard.writeText = txt => new Promise((res, rej) => {
            handleAuth(txt, () => origWriteText.call(navigator.clipboard, txt).then(res).catch(rej), () => rej(new Error('Rejected')));
        });
        if (origWrite) navigator.clipboard.write = data => new Promise((res, rej) => {
            const txt = data[0]?.type === 'text/plain' ? data[0].getData('text/plain') : '';
            handleAuth(txt, () => origWrite.call(navigator.clipboard, data).then(res).catch(rej), () => rej(new Error('Rejected')));
        });
    };

    const hookExec = () => {
        document.execCommand = (cmd, ui, val) => {
            if (cmd === 'copy') {
                const sel = window.getSelection().toString();
                if (!sel) return originalExec.apply(document, arguments);
                handleAuth(sel, () => {
                    const ta = document.createElement('textarea'); 
                    ta.value = sel; ta.style.cssText = 'position:fixed;opacity:0;'; 
                    document.body.appendChild(ta); ta.select(); 
                    originalExec.call(document, 'copy'); ta.remove();
                });
                return false;
            }
            return originalExec.apply(document, arguments);
        };
    };
    
    const enableContentEdit = () => {
        if (editAbortController) return;
        editAbortController = new AbortController();
        const { signal } = editAbortController;
        let t = null;
        const start = (e) => {
            const el = e.target;
            if (!['P', 'SPAN', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'LI', 'B', 'FONT'].includes(el.tagName)) return;
            t = setTimeout(() => {
                const parent = el.parentNode;
                if (parent) {
                    Array.from(parent.children).forEach(sibling => {
                        if (sibling.tagName === el.tagName) {
                            sibling.style.userSelect = 'text';
                            sibling.style.webkitUserSelect = 'text';
                        }
                    });
                }
                el.setAttribute('contenteditable', 'true');
                el.focus();
                const bg = el.style.backgroundColor;
                el.style.backgroundColor = 'rgba(255, 255, 0, 0.15)';
                const r = document.createRange();
                r.selectNodeContents(el);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(r);
                el.addEventListener('blur', () => {
                    el.removeAttribute('contenteditable');
                    el.style.backgroundColor = bg;
                }, { once: true });
            }, 800);
        };
        const stop = () => { if (t) clearTimeout(t) };
        document.addEventListener('mousedown', start, { capture: true, signal });
        document.addEventListener('mouseup', stop, { capture: true, signal });
        document.addEventListener('touchstart', start, { capture: true, signal, passive: true });
        document.addEventListener('touchend', stop, { capture: true, signal, passive: true });
    };

    const disableContentEdit = () => {
        if (editAbortController) {
            editAbortController.abort();
            editAbortController = null;
        }
    };

    const toggleUnlock = (active) => {
        if (active) {
            if (document.getElementById('unlock-css-base')) return;
            const s = document.createElement('style');
            s.id = 'unlock-css-base';
            s.innerHTML = '*{user-select:text!important;-webkit-user-select:text!important;-moz-user-select:text!important;-ms-user-select:text!important;}';
            (document.head || document.documentElement).appendChild(s);
            const evs = ['copy', 'cut', 'contextmenu', 'selectstart', 'mousedown', 'beforecopy', 'dragstart'];
            evs.forEach(n => {
                document.addEventListener(n, e => {
                    if(enabled || freeCopyMode || editAbortController) e.stopImmediatePropagation();
                }, { capture: true, passive: false });
                try {
                    Object.defineProperty(document, 'on' + n, { get: () => null, set: () => {}, configurable: true });
                } catch (e) {}
            });
            const opd = Event.prototype.preventDefault;
            Event.prototype.preventDefault = function() {
                if (evs.includes(this.type)) return;
                return opd.apply(this, arguments);
            };
        } else {
            const css = document.getElementById('unlock-css-base');
            if (css) css.remove();
        }
    };

    const setupFrame = iframe => {
        try {
            const doc = iframe.contentDocument, win = doc?.defaultView, frameOrigExec = doc?.execCommand;
            if (!doc || !win || !frameOrigExec) return;
            doc.execCommand = (cmd, ui, val) => {
                if (cmd === 'copy') {
                    const sel = win.getSelection().toString();
                    if (!sel) return frameOrigExec.apply(doc, arguments);
                    handleAuth(sel, () => {
                        const ta = doc.createElement('textarea');
                        ta.value = sel; ta.style.cssText = 'position:fixed;opacity:0;';
                        doc.body.appendChild(ta); ta.select();
                        frameOrigExec.call(doc, 'copy'); ta.remove();
                    });
                    return false;
                }
                return frameOrigExec.apply(doc, arguments);
            };
        } catch(e) {}
    };

    const obs = new MutationObserver(m => {
        for (const r of m) for (const n of r.addedNodes) if (n.nodeType === 1 && n.tagName === 'IFRAME') setupFrame(n);
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    document.querySelectorAll('iframe').forEach(setupFrame);

    const init = () => { 
      const isIgnored = (typeof GM_getValue !== 'undefined' ? GM_getValue('clipboard_ignore_' + location.host, false) : false);
      const isUnlockAllowed = (typeof GM_getValue !== 'undefined' ? GM_getValue('clipboard_unlock_' + location.host, true) : true);
        if (isUnlockAllowed) toggleUnlock(true);
        if (!isIgnored) {
            hookAPI(); 
            hookExec(); 
        } else {
            enabled = false;
        }
    };
    init();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
    else setTimeout(init, 0);
    const prot = setInterval(() => {
        if (navigator.clipboard && navigator.clipboard.writeText === origWriteText) hookAPI();
        if (document.execCommand === originalExec) hookExec();
    }, 1000);
    window.addEventListener('beforeunload', () => clearInterval(prot));
})();
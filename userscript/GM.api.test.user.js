// ==UserScript==
// @name         GM函数简单测试
// @namespace   https://viayoo.com/vmdulj
// @version      4.3
// @description  简单探测+功能测试，当前脚本管理器支持的 GM 函数。
// @author       Aloazny
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAWlBMVEVHcEwiIiUJCQoGBgcCAgMNDQ4UFBYODg8WFhgYGBoaGhwlJCcfHyLlSE0dHSAcHB4hISQTExUnJyoRERP+/v56MTWYNjq2PULTQ0hIJyrU1NV0dHZDQ0Wfn6ELBSEpAAAACHRSTlMA/lY/FnewjSkA8CsAAANySURBVHjarZfbkqMgEIYbgolKkpns9b7/w21NbVXiKVEOy1EgkhmdWasSUfj+hqYbgcAPL/LfBQjIT5ojYJ8JEEGOvvxw91793lxZw13BMEskw1WcQvkVr6+OTLke4HdYx2OKGRKLHsTmP+fN/+A7sXP3/TZecTwR2Ghf9ZwIEb3AW3lArMDhDXnfzENRSDK/2m3nAabzzhfJecGfGSAEAsjwigc1DSOzcYCe+Rq3/gXlPXrFFxM8Cxj+LPqg2MGJD3keJuSefiV8fbcPtarsTKnqs7yyfjP+I4cFT0nJ1cUoPqimjI4ox4OQQgug8pmvW+e4OxsrVZpqnuNBcql7JuPxa778UwQnDEeq/sosn7jG+l+HZ/mRzH+DtALP8jIIuPlT7qo/nuKn0RjN258FHvMTbRN+f3nHXW27kOOdgI8/1QFRJHw53M+mUZ3nrYDjCxblhS6TfTnqtp0aAM7zRsDnj6kdIvtM8/vG+PYFH2ZB5x8y8QfTkZrX3WV0LaSO6SUvE4EefNpc7o9yr+6/dW/K29wix4dVOUogVTGWMF7W8HMPzPrhhnrda4U3zR9ufv5pnvcC8/rTVcC6u1bQrj00hpd4wT3FgeP1eBgDKrRC4IH3NsgzvBXw9gdq44A9jELleFnPzlrwJp0n33+1WMOk8xdxeeDV1Y2fqzCmtxxv0xlmfup1F/Q3ArNWeB4dfR4t7XsfuPwpCmWrkyfzdvT2DzpFry94KzDnHxsqq+BqkFqMaO+YLK9N4HOcf6Z9jTtbyfwSW7UZvrqKWMCuH/JoYpIKE+ghPu2UpDwogbDBcOsPGqoBbO64q5b6xXBqFnySjeH7dRdVNEZ6bFrzPJxy/NyD+PuH7qLG+qNCpdxp97dH14cl732w2D9Mhck/aQJAwsmsM9XtiVc+wAv7LiRs/iLLQ2NHcX6275CX3+/g91ShSgNpBZ8qVItQ/poHebMKl4jH9odW8QBWQcQ8igS+5J2CiO0jEwdsJa8UTlg2Zeq9nV1VVvGqYYtJxDfcRqJcy8OQ+M9UGIG1fOp/W7MzjiXf4tvJF3nzHd7uWoxthr/Bq7QH8NsBqbYVW/kbhyCg3FBs5NsRYgHgemuzxf4YT5ytkdVq/m84dIWjgt4VFKv4fuChLj436oNnyb7gO/H64OlW2W1HXwQ/vH58ev8H1Ai8MwfKCnYAAAAASUVORK5CYII=
// @match        *://*/*
// @grant        GM_info
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant        GM_webRequest
// @grant        GM_getResourceText
// @grant        GM_getResourceURL
// @grant        GM_notification
// @grant        GM_setClipboard
// @grant        GM_openInTab
// @grant        GM_getTab
// @grant        GM_saveTab
// @grant        GM_getTabs
// @grant        GM_closeTab
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_cookie
// @grant        unsafeWindow
// @connect     api.github.com
// @resource    testCSS https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css
// @license      MIT
// @run-at       document-end
// ==/UserScript==

(function () {
    'use strict';

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const gmFunctions = [
        'GM_info', 'GM.info',
        'GM_setValue', 'GM.setValue', 'GM_getValue', 'GM.getValue',
        'GM_deleteValue', 'GM.deleteValue', 'GM_listValues', 'GM.listValues',
        'GM_addValueChangeListener', 'GM.addValueChangeListener',
        'GM_removeValueChangeListener', 'GM.removeValueChangeListener',
        'GM_addStyle', 'GM.addStyle', 'GM_addElement', 'GM.addElement',
        'GM_xmlhttpRequest', 'GM.xmlHttpRequest', 'GM_download', 'GM.download',
        'GM_webRequest', 'GM.webRequest',
        'GM_getResourceText', 'GM.getResourceText',
        'GM_getResourceURL', 'GM.getResourceUrl',
        'GM_notification', 'GM.notification',
        'GM_setClipboard', 'GM.setClipboard',
        'GM_openInTab', 'GM.openInTab',
        'GM_getTab', 'GM.getTab', 'GM_saveTab', 'GM.saveTab',
        'GM_getTabs', 'GM.getTabs',
        'GM_closeTab', 'GM.closeTab',
        'GM_registerMenuCommand', 'GM.registerMenuCommand',
        'GM_unregisterMenuCommand', 'GM.unregisterMenuCommand',
        'GM_cookie', 'GM.cookie',
        'unsafeWindow'
    ];

    const checkGM = (name) => {
        try { return eval(`typeof ${name} !== 'undefined'`); }
        catch { return false; }
    };

    const supported = [];
    const unsupported = [];
    gmFunctions.forEach(n => (checkGM(n) ? supported : unsupported).push(n));

    let managerName = '未知管理器';
    try {
        if (typeof GM_info !== 'undefined' && GM_info && GM_info.scriptHandler) {
            managerName = GM_info.scriptHandler;
        }
    } catch { /* ignore */ }

    const TEST_KEY = '__gm_api_probe__';

    const assert = (expected, actual, message) => {
        if (expected !== actual) {
            const info = `期望 ${JSON.stringify(expected)}, 实际 ${JSON.stringify(actual)}`;
            throw new Error(message ? `${message} - ${info}` : info);
        }
    };

    const testers = {
        'GM_info': async () => {
            if (!GM_info || typeof GM_info !== 'object') throw new Error('不是对象');
            if (!GM_info.scriptHandler) throw new Error('缺少 scriptHandler');
            if (!GM_info.script) throw new Error('缺少 script 对象');
            const v = GM_info.script.version;
            if (!v) throw new Error('缺少 script.version');
            return `${GM_info.scriptHandler} v${v}`;
        },
        'GM_setValue': async () => {
            await GM_setValue(TEST_KEY, 'hello');
            assert('hello', await GM_getValue(TEST_KEY, null), '字符串');
            await GM_setValue(TEST_KEY, 42);
            assert(42, await GM_getValue(TEST_KEY, null), '数字');
            await GM_setValue(TEST_KEY, true);
            assert(true, await GM_getValue(TEST_KEY, null), '布尔');
            const obj = { a: 1, b: [2, 3], c: 'x' };
            await GM_setValue(TEST_KEY, obj);
            assert(JSON.stringify(obj), JSON.stringify(await GM_getValue(TEST_KEY, null)), '对象');
            const arr = [1, 'two', { three: 3 }];
            await GM_setValue(TEST_KEY, arr);
            assert(JSON.stringify(arr), JSON.stringify(await GM_getValue(TEST_KEY, null)), '数组');
            await GM_deleteValue(TEST_KEY);
            return '字符串/数字/布尔/对象/数组 全部通过';
        },
        'GM_getValue': async () => {
            await GM_setValue(TEST_KEY, 'stored');
            assert('stored', await GM_getValue(TEST_KEY, null), '读取已存值');
            const missing = '__nonexistent_' + Date.now();
            assert('default_val', await GM_getValue(missing, 'default_val'), '不存在 key 返回默认值');
            await GM_deleteValue(TEST_KEY);
            return '读取 + 默认值通过';
        },
        'GM_deleteValue': async () => {
            await GM_setValue(TEST_KEY, 'x');
            assert('x', await GM_getValue(TEST_KEY, null), '删除前应存在');
            await GM_deleteValue(TEST_KEY);
            assert('__NONE__', await GM_getValue(TEST_KEY, '__NONE__'), '删除后应不存在');
            return '删除成功';
        },
        'GM_listValues': async () => {
            await GM_setValue(TEST_KEY, 1);
            const list = await GM_listValues();
            await GM_deleteValue(TEST_KEY);
            if (!Array.isArray(list)) throw new Error('未返回数组');
            if (!list.includes(TEST_KEY)) throw new Error('列表不含测试 key');
            return `${list.length} 个 key`;
        },
        'GM_addValueChangeListener': async () => {
            let fired = false;
            let captured = null;
            let id;
            try {
                await GM_setValue(TEST_KEY, 'initial');
                await sleep(50);
                id = await GM_addValueChangeListener(TEST_KEY, (name, oldVal, newVal, remote) => {
                    fired = true;
                    captured = { name, oldVal, newVal, remote };
                });
                await sleep(50);
                await GM_setValue(TEST_KEY, 'changed');
                await sleep(300);
            } finally {
                try {
                    if (id != null && typeof GM_removeValueChangeListener === 'function') {
                        await GM_removeValueChangeListener(id);
                    }
                } catch { /* ignore */ }
                try { await GM_deleteValue(TEST_KEY); } catch { /* ignore */ }
            }
            if (!fired) throw new Error('回调未触发');
            if (!captured) throw new Error('无参数');
            assert(TEST_KEY, captured.name, '参数 name');
            assert('initial', captured.oldVal, '参数 oldVal');
            assert('changed', captured.newVal, '参数 newVal');
            return `参数校验通过 (remote=${captured.remote})`;
        },
        'GM_removeValueChangeListener': async () => {
            let fired = 0;
            const id = await GM_addValueChangeListener(TEST_KEY, () => { fired++; });
            await GM_removeValueChangeListener(id);
            await GM_setValue(TEST_KEY, Date.now());
            await sleep(300);
            await GM_deleteValue(TEST_KEY);
            if (fired > 0) throw new Error('移除后仍触发');
            return '移除生效';
        },
        'GM_addStyle': async () => {
            const cls = '__gm_probe_style_' + Date.now();
            const el = await GM_addStyle(`.${cls}{color:rgb(1,2,3)!important}`);
            const probe = document.createElement('div');
            probe.className = cls;
            probe.textContent = 'x';
            document.body.appendChild(probe);
            const applied = getComputedStyle(probe).color === 'rgb(1, 2, 3)';
            probe.remove();
            if (el && typeof el.remove === 'function') el.remove();
            if (!applied) throw new Error('样式未生效');
            return '样式已注入生效';
        },
        'GM_addElement': async () => {
            const id = '__gm_probe_el_' + Date.now();
            const el = await GM_addElement(document.body, 'div', { id, style: 'display:none' });
            const found = document.getElementById(id);
            if (found) found.remove();
            else if (el && typeof el.remove === 'function') el.remove();
            if (!found) throw new Error('元素未插入');
            return '元素已插入';
        },
        'GM_xmlhttpRequest': async () => {
            const url = 'https://api.github.com/zen';
            return await new Promise((resolve, reject) => {
                const timer = setTimeout(() => reject(new Error('请求超时')), 8000);
                try {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url,
                        timeout: 7000,
                        onload: (r) => {
                            clearTimeout(timer);
                            if (r.status === 200) {
                                const len = (r.responseText || '').length;
                                resolve(`跨域 OK (HTTP ${r.status}, ${len} 字节)`);
                            } else {
                                resolve(`HTTP ${r.status}`);
                            }
                        },
                        onerror: () => { clearTimeout(timer); reject(new Error('请求出错')); },
                        ontimeout: () => { clearTimeout(timer); reject(new Error('超时')); }
                    });
                } catch (e) { clearTimeout(timer); reject(e); }
            });
        },
        'GM_getResourceText': async () => {
            const text = await GM_getResourceText('testCSS');
            if (typeof text !== 'string') throw new Error('未返回字符串');
            if (text.length === 0) throw new Error('返回空字符串（资源可能未加载）');
            return `${text.length} 字节`;
        },
        'GM_getResourceURL': async () => {
            const url = await GM_getResourceURL('testCSS');
            if (typeof url !== 'string') throw new Error('未返回字符串');
            if (!url.startsWith('data:') && !url.startsWith('blob:')) {
                throw new Error(`非 data/blob URL: ${url.slice(0, 30)}`);
            }
            return `${url.startsWith('data:') ? 'data' : 'blob'} URL (${url.length} 字节)`;
        },
        'GM_getTab': async () => await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('回调未返回')), 2500);
            try {
                GM_getTab((tab) => {
                    clearTimeout(timer);
                    if (tab && typeof tab === 'object') resolve('获取到 tab 对象');
                    else resolve('回调返回空');
                });
            } catch (e) { clearTimeout(timer); reject(e); }
        }),
        'GM_saveTab': async () => await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('超时')), 2500);
            try {
                GM_getTab((tab) => {
                    try {
                        GM_saveTab(Object.assign(tab || {}, { __probe: Date.now() }));
                        clearTimeout(timer);
                        resolve('保存成功');
                    } catch (e) { clearTimeout(timer); reject(e); }
                });
            } catch (e) { clearTimeout(timer); reject(e); }
        }),
        'GM_getTabs': async () => await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('超时')), 2500);
            try {
                GM_getTabs((tabs) => {
                    clearTimeout(timer);
                    if (!tabs || typeof tabs !== 'object') reject(new Error('未返回对象'));
                    else resolve(`${Object.keys(tabs).length} 个标签`);
                });
            } catch (e) { clearTimeout(timer); reject(e); }
        }),
        'GM_registerMenuCommand': async () => {
            const id = await GM_registerMenuCommand('__gm_probe_menu_' + Date.now(), () => {});
            try {
                if (typeof GM_unregisterMenuCommand === 'function' && id != null) {
                    await GM_unregisterMenuCommand(id);
                }
            } catch { /* ignore */ }
            if (id == null) throw new Error('未返回 id');
            return `id=${id}`;
        },
        'GM_unregisterMenuCommand': async () => {
            const id = await GM_registerMenuCommand('__gm_probe_menu2_' + Date.now(), () => {});
            await GM_unregisterMenuCommand(id);
            return '注册并注销成功';
        },
        'GM_cookie': async () => {
            if (!GM_cookie || typeof GM_cookie.list !== 'function') throw new Error('无 list 方法');
            return await new Promise((resolve, reject) => {
                const timer = setTimeout(() => reject(new Error('超时')), 3000);
                try {
                    GM_cookie.list({}, (cookies, err) => {
                        clearTimeout(timer);
                        if (err) reject(new Error(err.message || String(err)));
                        else resolve(`${(cookies || []).length} 个 cookie`);
                    });
                } catch (e) { clearTimeout(timer); reject(e); }
            });
        },
        'unsafeWindow': async () => {
            if (typeof unsafeWindow === 'undefined') throw new Error('不存在');
            if (unsafeWindow === window) throw new Error('未隔离（等于 window）');
            return '已隔离于页面 window';
        }
    };

    const manualTesters = {
        'GM_notification': () => GM_notification({ title: 'GM 探测', text: '通知功能正常', timeout: 3000, silent: true }),
        'GM_setClipboard': () => GM_setClipboard('GM probe ' + Date.now(), 'text'),
        'GM_openInTab': () => GM_openInTab('about:blank', { active: false, insert: true, setParent: true }),
        'GM_download': () => GM_download({ url: location.href, name: '__gm_probe.html', saveAs: false })
    };

    const testableFunctions = gmFunctions.filter(n => !n.includes('.'));

    const container = document.createElement('div');
    container.id = 'gm-api-checker';
    container.style.cssText = 'position:fixed;top:0;left:0;z-index:2147483645;pointer-events:none;';
    document.documentElement.appendChild(container);
    const shadowRoot = container.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.textContent = `
        * { box-sizing: border-box; }
        .panel { position: fixed; top: 20px; right: 20px; left: auto; width: 420px; max-width: calc(100vw - 40px); max-height: 85vh; background: rgba(255,255,255,0.72); backdrop-filter: blur(18px) saturate(180%); -webkit-backdrop-filter: blur(18px) saturate(180%); border-radius: 22px; box-shadow: 0 20px 50px -12px rgba(0,0,0,0.28); border: 1px solid rgba(255,255,255,0.5); padding: 18px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 13px; color: #1C2526; display: flex; flex-direction: column; gap: 12px; pointer-events: auto; animation: gmp-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes gmp-in { from { opacity: 0; transform: translateY(-12px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .header { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 10px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .title { font-weight: 700; font-size: 15px; }
        .sub { font-size: 11px; color: #888; margin-top: 2px; }
        .count { font-size: 12px; color: #888; font-weight: 600; font-family: monospace; }
        .body { overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 14px; padding-right: 4px; scrollbar-width: thin; }
        .body::-webkit-scrollbar { width: 4px; }
        .body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }
        .section-title { font-size: 12px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .section-title.ok { color: #34C759; }
        .section-title.no { color: #FF3B30; }
        .section-title .stat { font-weight: 400; font-size: 11px; color: #888; font-family: monospace; margin-left: auto; margin-right: 8px; }
        .section-title .mini-btn { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 9px; border: none; cursor: pointer; background: #007AFF; color: #fff; box-shadow: 0 3px 10px rgba(0,122,255,0.2); transition: transform 0.15s ease; }
        .section-title .mini-btn:active { transform: scale(0.94); }
        .section-title .mini-btn:disabled { opacity: 0.5; cursor: default; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .tag { padding: 4px 9px; border-radius: 9px; font-family: "SF Mono", Consolas, monospace; font-size: 11px; white-space: nowrap; }
        .tag.ok { background: #e6f9ec; color: #1a8a3d; font-weight: 600; }
        .tag.no { background: #f2f2f2; color: #999; text-decoration: line-through; }
        .empty { color: #aaa; font-size: 11px; font-style: italic; }
        .test-list { display: flex; flex-direction: column; border-radius: 14px; background: rgba(255,255,255,0.4); border: 1px solid rgba(0,0,0,0.04); padding: 4px 10px; }
        .test-row { display: flex; align-items: flex-start; gap: 8px; padding: 7px 0; font-size: 12px; border-bottom: 1px dashed rgba(0,0,0,0.06); }
        .test-row:last-child { border-bottom: none; }
        .test-row .icon { flex-shrink: 0; width: 16px; text-align: center; font-size: 12px; line-height: 1.6; }
        .test-row .name { font-family: "SF Mono", Consolas, monospace; font-size: 11.5px; font-weight: 600; flex-shrink: 0; min-width: 128px; line-height: 1.6; }
        .test-row .msg { flex: 1; color: #666; word-break: break-all; line-height: 1.5; font-size: 11.5px; }
        .test-row.pass .msg { color: #1a8a3d; }
        .test-row.fail .msg { color: #d70015; }
        .test-row.running .msg { color: #007AFF; }
        .test-row.skip .msg { color: #aaa; font-style: italic; }
        .test-row .run-manual { flex-shrink: 0; border: none; border-radius: 7px; background: #007AFF; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 8px; cursor: pointer; transition: transform 0.15s ease; }
        .test-row .run-manual:active { transform: scale(0.9); }
        .test-row .run-manual:disabled { opacity: 0.5; cursor: default; }
        .footer { display: flex; gap: 8px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.06); }
        .footer button { flex: 1; border: none; border-radius: 12px; padding: 11px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.15s ease; background: #fff; color: #007AFF; box-shadow: 0 3px 10px rgba(0,122,255,0.12); }
        .footer button:active { transform: scale(0.96); }
        .footer button.close { color: #888; background: #f4f4f4; box-shadow: none; }
        .footer button.copied { color: #34C759; }
        @media (prefers-color-scheme: dark) {
            .panel { background: rgba(28,28,30,0.78); border-color: rgba(255,255,255,0.1); color: #eee; }
            .header, .footer { border-color: rgba(255,255,255,0.08); }
            .tag.ok { background: #162312; color: #30d158; }
            .tag.no { background: #2a2a2c; color: #777; }
            .test-list { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.05); }
            .test-row { border-color: rgba(255,255,255,0.06); }
            .test-row .msg { color: #aaa; }
            .test-row.pass .msg { color: #30d158; }
            .test-row.fail .msg { color: #ff6961; }
            .test-row.running .msg { color: #0A84FF; }
            .footer button { background: #2c2c2e; color: #0A84FF; }
            .footer button.close { background: #2a2a2c; color: #aaa; }
        }
    `;
    shadowRoot.appendChild(style);

    const panel = document.createElement('div');
    panel.className = 'panel';

    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `
        <div>
            <div class="title">GM 函数检测</div>
            <div class="sub">${managerName}</div>
        </div>
        <div class="count">${supported.length} / ${gmFunctions.length}</div>
    `;
    panel.appendChild(header);

    const body = document.createElement('div');
    body.className = 'body';

    const probeSection = document.createElement('div');
    const okHTML = supported.length
        ? supported.map(f => `<span class="tag ok">${f}</span>`).join('')
        : `<span class="empty">无</span>`;
    const noHTML = unsupported.length
        ? unsupported.map(f => `<span class="tag no">${f}</span>`).join('')
        : `<span class="empty">无</span>`;
    probeSection.innerHTML = `
        <div class="section-title ok"><span>🔍 存在性探测</span></div>
        <div class="tags">${okHTML}</div>
        <div class="section-title no" style="margin-top:10px"><span>❌ 不存在 (${unsupported.length})</span></div>
        <div class="tags">${noHTML}</div>
    `;
    body.appendChild(probeSection);

    const testSection = document.createElement('div');
    const testTitle = document.createElement('div');
    testTitle.className = 'section-title ok';
    testTitle.innerHTML = `<span>🧪 真实功能测试</span>`;
    const testStat = document.createElement('span');
    testStat.className = 'stat';
    testTitle.appendChild(testStat);
    const runBtn = document.createElement('button');
    runBtn.className = 'mini-btn';
    runBtn.textContent = '开始测试';
    testTitle.appendChild(runBtn);
    testSection.appendChild(testTitle);

    const testList = document.createElement('div');
    testList.className = 'test-list';
    testSection.appendChild(testList);
    body.appendChild(testSection);

    panel.appendChild(body);

    const footer = document.createElement('div');
    footer.className = 'footer';

    const copyBtn = document.createElement('button');
    copyBtn.textContent = '复制结果';
    copyBtn.onclick = async () => {
        const lines = [
            `管理器: ${managerName}`,
            '',
            `[存在性探测]`,
            `✅ 支持 (${supported.length}): ${supported.join(', ') || '无'}`,
            `❌ 不支持 (${unsupported.length}): ${unsupported.join(', ') || '无'}`,
            '',
            `[真实功能测试]`
        ];
        let pass = 0, fail = 0, skip = 0;
        testableFunctions.forEach(n => {
            const r = testResults.get(n);
            const status = !r ? '未测' : r.status === 'pass' ? '通过' : r.status === 'fail' ? '失败' : r.status === 'running' ? '测试中' : '跳过';
            if (r) {
                if (r.status === 'pass') pass++;
                else if (r.status === 'fail') fail++;
                else if (r.status === 'skip') skip++;
            }
            const msg = r ? r.msg : '';
            lines.push(`[${status}] ${n}${msg ? ' - ' + msg : ''}`);
        });
        lines.push('', `统计: 通过 ${pass} / 失败 ${fail} / 跳过 ${skip}`);
        try {
            await navigator.clipboard.writeText(lines.join('\n'));
            copyBtn.textContent = '已复制 ✓';
            copyBtn.classList.add('copied');
        } catch {
            copyBtn.textContent = '复制失败';
        }
        setTimeout(() => {
            copyBtn.textContent = '复制结果';
            copyBtn.classList.remove('copied');
        }, 1500);
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close';
    closeBtn.textContent = '关闭';
    closeBtn.onclick = () => {
        panel.style.transition = 'opacity 0.15s, transform 0.15s';
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(-10px) scale(0.96)';
        setTimeout(() => container.remove(), 150);
    };

    footer.append(copyBtn, closeBtn);
    panel.appendChild(footer);
    shadowRoot.appendChild(panel);

    const testResults = new Map();
    const rowRefs = new Map();

    const statusMeta = {
        pending: { icon: '⏸', cls: '' },
        running: { icon: '⏳', cls: 'running' },
        pass:    { icon: '✅', cls: 'pass' },
        fail:    { icon: '❌', cls: 'fail' },
        skip:    { icon: '⏭', cls: 'skip' }
    };

    function updateStat() {
        let pass = 0, fail = 0, skip = 0;
        testableFunctions.forEach(n => {
            const r = testResults.get(n);
            if (!r) return;
            if (r.status === 'pass') pass++;
            else if (r.status === 'fail') fail++;
            else if (r.status === 'skip') skip++;
        });
        testStat.textContent = `✅${pass} ❌${fail} ⏭${skip}`;
    }

    function createTestRow(name) {
        const row = document.createElement('div');
        row.className = 'test-row';
        const meta = statusMeta.pending;
        const isManual = !!manualTesters[name];
        row.innerHTML = `
            <span class="icon">${meta.icon}</span>
            <span class="name">${name}</span>
            <span class="msg">待测试</span>
            ${isManual ? '<button class="run-manual" title="手动触发">▶</button>' : ''}
        `;
        if (isManual) {
            const btn = row.querySelector('.run-manual');
            btn.onclick = async () => {
                btn.disabled = true;
                updateTestRow(name, 'running', '执行中...');
                try {
                    await manualTesters[name]();
                    updateTestRow(name, 'pass', '已执行（请查看效果）');
                } catch (e) {
                    updateTestRow(name, 'fail', (e && e.message) || String(e));
                }
                btn.disabled = false;
            };
        }
        rowRefs.set(name, row);
        return row;
    }

    function updateTestRow(name, status, msg) {
        const row = rowRefs.get(name);
        if (!row) return;
        const meta = statusMeta[status] || statusMeta.pending;
        row.className = 'test-row ' + meta.cls;
        row.querySelector('.icon').textContent = meta.icon;
        row.querySelector('.msg').textContent = msg || '';
        testResults.set(name, { status, msg: msg || '' });
        updateStat();
    }

    testableFunctions.forEach(n => testList.appendChild(createTestRow(n)));

    let running = false;

    async function runAllTests() {
        if (running) return;
        running = true;
        runBtn.disabled = true;
        runBtn.textContent = '测试中...';

        for (const name of testableFunctions) {
            if (!supported.includes(name)) {
                updateTestRow(name, 'skip', '函数不存在，跳过');
                continue;
            }
            if (manualTesters[name]) {
                updateTestRow(name, 'skip', '需手动触发 → 点击右侧 ▶');
                continue;
            }
            if (!testers[name]) {
                updateTestRow(name, 'skip', '无自动测试实现');
                continue;
            }
            updateTestRow(name, 'running', '测试中...');
            try {
                const msg = await testers[name]();
                updateTestRow(name, 'pass', msg || 'OK');
            } catch (e) {
                updateTestRow(name, 'fail', (e && e.message) || String(e));
            }
        }

        running = false;
        runBtn.disabled = false;
        runBtn.textContent = '重新测试';
    }

    runBtn.onclick = runAllTests;
    runAllTests();
})();
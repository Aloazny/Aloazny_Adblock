// ==UserScript==
// @name         Twitter评论区过滤
// @namespace    http://viayoo.com/bhivy
// @version      1.1
// @description  自用脚本，过滤推特(Twitter)评论区。
// @author       Via && Deepseek
// @include      https://x.com/*/status/*
// @include      https://x.com/*/media
// @include      https://x.com/*/with_replies
// @match       https://x.com/explore
// @match       https://x.com/home
// @exclude     https://x.com/*/status/*/video/*
// @exclude     https://x.com/*/status/*/photo/*
// @icon         https://abs.twimg.com/favicons/twitter.ico
// @license       MIT
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const api = {
        getValue: (key, def) => {
            if (typeof GM_getValue !== 'undefined') return GM_getValue(key, def);
            const val = localStorage.getItem(key);
            return val === null ? def : JSON.parse(val);
        },
        setValue: (key, val) => {
            if (typeof GM_setValue !== 'undefined') { GM_setValue(key, val); } 
            else { localStorage.setItem(key, JSON.stringify(val)); }
        },
        setClipboard: (text) => {
            if (typeof GM_setClipboard !== 'undefined') { GM_setClipboard(text); } 
            else { navigator.clipboard.writeText(text); }
            alert('配置已复制');
        }
    };

    let config = api.getValue('filterConfig', { badUsers: [], badWords: ["/有(哥哥|弟弟).*线(上|下)(约|吗)/i","/^[\\p{Emoji}\\n]+$/u","/^(线上|线下)?(蹲|找)一?个(男|女)?(长期|临时|温柔)?(固炮|搭子|主人|哥哥|弟弟|主|[Ss])/","/^(?=.*我是真人)(?=.*线(上|下)(的|吗))/","/dd个?线下的(姐姐|弟弟|哥哥|妹妹).?/i","/有没有离(得|的)近(得|的)$/","/急需?(一个|一位|找)(主人|爸爸|固炮|搭子).?$/","/(主人|爸爸)快来(领|找)我.?$/","/^线下dd$/","/^..找..(主人|主|爸爸|固炮|搭子)$/","/小(狗|🐶|[Mm])在线(等|找)个?(主人|主|爸爸|固炮|搭子|调|你).?/","/小(狗|🐶|[Mm])想(和|跟)(大家|主人|主|爸爸|固炮|搭子|调|你)玩.?/","/^有?万达广场附近的吗$/","/^(男大|女大)大?(哥哥|弟弟|姐姐|妹妹)快?来$/","/^谁来当我(主人|爸爸|狗狗|小狗|骚母狗).?$/","/(同城|附近).*(满足|草|操|艹)我/","/(同城|附近).*(男大|女大|体育生|母狗)$/","/^(小|母)狗求(主人|爸爸|哥哥)(抱抱|操|艹|草|抱走)/","/^有没有(单男|母狗|骚逼).?$/"] });

    const createUI = () => {
        const container = document.createElement('div');
        container.id = 'tf-plugin';
        document.body.appendChild(container);
        const shadow = container.attachShadow({ mode: 'closed' });
        const style = document.createElement('style');
        style.textContent = `
            #mask { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: none; z-index: 999998; backdrop-filter: blur(4px); }
            #fab { position: fixed; right: 0; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; background: rgba(255, 255, 255, 0.6); color: #000; border-radius: 21px 0 0 21px; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: -2px 0 12px rgba(0,0,0,0.1); z-index: 999997; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); padding-left: 4px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.3); border-right: none; }
            #fab.idle { opacity: 0.3; transform: translateY(-50%) translateX(25px); }
            #fab svg { width: 22px; height: 22px; fill: currentColor; }
            #panel { display: none; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 340px; max-width: 85vw; max-height: 80vh; background: rgba(255,255,255,0.75); backdrop-filter: blur(12px); border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); z-index: 999999; padding: 24px; font-family: -apple-system, system-ui; color: #0f1419; border: 1px solid rgba(255,255,255,0.3); overflow-y: auto; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
            .header h3 { margin: 0; font-size: 19px; font-weight: 800; }
            .close-btn { cursor: pointer; padding: 4px; border-radius: 50%; transition: background 0.2s; }
            .close-btn:hover { background: rgba(0,0,0,0.1); }
            label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; color: #536471; }
            textarea { width: 100%; height: 100px; border: 1px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.5); border-radius: 12px; padding: 12px; margin-bottom: 16px; box-sizing: border-box; resize: none; font-size: 14px; outline: none; transition: all 0.2s; }
            textarea:focus { border-color: #1d9bf0; background: #fff; box-shadow: 0 0 0 3px rgba(29,155,240,0.1); }
            .btn-group { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            button { padding: 12px; border-radius: 12px; border: none; font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 13px; }
            .save { background: #1d9bf0; color: #fff; grid-column: span 2; margin-bottom: 4px; }
            .save:hover { background: #1a8cd8; transform: translateY(-1px); }
            .copy, .import { background: rgba(15,20,25,0.05); color: #0f1419; }
            .copy:hover, .import:hover { background: rgba(15,20,25,0.1); }
        `;
        const html = `
            <div id="mask"></div>
            <div id="fab">
                <svg viewBox="0 0 24 24"><path d="M21 4H3c-.55 0-1 .45-1 1v1.59c0 .53.21 1.04.59 1.41l6.41 6.41V20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-5.59l6.41-6.41c.38-.37.59-.88.59-1.41V5c0-.55-.45-1-1-1zM4 6h16v1.17L13.17 14H10.83L4 7.17V6z"/></svg>
            </div>
            <div id="panel">
                <div class="header">
                    <h3>过滤设置</h3>
                    <div class="close-btn" id="closeX">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </div>
                </div>
                <label>屏蔽用户 ID</label>
                <textarea id="users" placeholder="@username">${config.badUsers.join('\n')}</textarea>
                <label>关键词或正则</label>
                <textarea id="words" placeholder="/有(哥哥|弟弟)/i">${config.badWords.join('\n')}</textarea>
                <div class="btn-group">
                    <button class="save" id="saveBtn">保存并应用</button>
                    <button class="import" id="importBtn">导入规则</button>
                    <button class="copy" id="copyBtn">导出规则</button>
                </div>
            </div>
        `;

        shadow.appendChild(style);
        const div = document.createElement('div');
        div.innerHTML = html;
        shadow.appendChild(div);

        const panel = shadow.getElementById('panel');
        const fab = shadow.getElementById('fab');
        const mask = shadow.getElementById('mask');
        let hideTimer;

        const toggleUI = (show) => {
            panel.style.display = show ? 'block' : 'none';
            mask.style.display = show ? 'block' : 'none';
            if (!show) resetTimer();
        };

        const resetTimer = () => {
            fab.classList.remove('idle');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                if (panel.style.display !== 'block') fab.classList.add('idle');
            }, 3000);
        };

        fab.onclick = () => toggleUI(true);
        shadow.getElementById('closeX').onclick = () => toggleUI(false);
        mask.onclick = () => toggleUI(false);

        fab.onmouseenter = () => fab.classList.remove('idle');
        fab.onmouseleave = resetTimer;
        resetTimer();

        shadow.getElementById('saveBtn').onclick = () => {
            const users = shadow.getElementById('users').value.split('\n').map(s => s.trim()).filter(s => s);
            const words = shadow.getElementById('words').value.split('\n').map(s => s.trim()).filter(s => s);
            api.setValue('filterConfig', { badUsers: users, badWords: words });
            location.reload();
        };

        shadow.getElementById('copyBtn').onclick = () => api.setClipboard(JSON.stringify(config));
        shadow.getElementById('importBtn').onclick = () => {
            const json = prompt("请粘贴导出的 JSON 规则：");
            if (json) {
                try {
                    const parsed = JSON.parse(json);
                    if (parsed.badUsers && parsed.badWords) {
                        api.setValue('filterConfig', parsed);
                        location.reload();
                    }
                } catch (e) { alert("格式错误"); }
            }
        };
    };

    const checkText = (el, rules) => {
        const textContainer = el.querySelector('[data-testid="tweetText"]');
        if (!textContainer) return false;
        const fullText = textContainer.innerText || textContainer.textContent || "";
        return rules.some(r => {
            try {
                if (r.startsWith('/') && r.lastIndexOf('/') > 0) {
                    const lastSlashIndex = r.lastIndexOf('/');
                    const pattern = r.substring(1, lastSlashIndex);
                    const flags = r.substring(lastSlashIndex + 1);
                    return new RegExp(pattern, flags).test(fullText);
                }
                return new RegExp(r).test(fullText);
            } catch(e) {
                return fullText.includes(r);
            }
        });
    };

    const processNode = (tweet) => {
        const textContainer = tweet.querySelector('[data-testid="tweetText"]');
        if (!textContainer && !config.badUsers.length) return;
        if (tweet.dataset.filtered === "true" && tweet.style.display === 'none') return;
        const avatar = tweet.querySelector('[data-testid^="UserAvatar-Container-"]');
        const userId = avatar ? '@' + avatar.getAttribute('data-testid').replace('UserAvatar-Container-', '') : null;
        const nameContainer = tweet.querySelector('[data-testid="User-Name"]');
        const userName = nameContainer ? nameContainer.innerText.split('\n')[0] : null;
        const shouldHide = config.badUsers.some(u => {
            const target = u.toLowerCase();
            return (userId && userId.toLowerCase() === target) || (userName && userName.toLowerCase().includes(target));
        }) || checkText(tweet, config.badWords);
        if (shouldHide) {
            tweet.style.display = 'none';
        }
        if (textContainer || shouldHide) {
            tweet.dataset.filtered = "true";
        }
    };

    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            m.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.matches('article[data-testid="tweet"]')) processNode(node);
                    else node.querySelectorAll('article[data-testid="tweet"]').forEach(processNode);
                }
            });
        }
    });

    const checkReady = setInterval(() => {
        if (document.querySelector('main')) {
            clearInterval(checkReady);
            createUI();
            observer.observe(document.body, { childList: true, subtree: true });
            document.querySelectorAll('article[data-testid="tweet"]').forEach(processNode);
        }
    }, 1000);
})();
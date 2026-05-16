// ==UserScript==
// @name         Twitter自用增强
// @namespace    http://viayoo.com/bhivy
// @version      2.9
// @description  自用脚本，干掉部分机械人发言，过滤推特(Twitter)评论区，去广告，尝试解锁敏感限制。
// @author       Via && Deepseek
// @match       https://x.com/*
// @exclude     https://x.com/*/status/*/video/*
// @exclude     https://x.com/*/status/*/photo/*
// @exclude     https://x.com/*/status/*/mediaViewer*
// @exclude     https://x.com/settings
// @exclude     https://x.com/i/*/creators/
// @exclude     https://x.com/i/bookmarks
// @exclude     https://x.com/i/premium-business
// @exclude     https://x.com/*/lists
// @exclude     https://x.com/i/follow_people
// @exclude     https://x.com/i/chat
// @exclude     https://x.com/notifications
// @exclude     https://x.com/i/grok
// @icon         data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA0pJREFUWAntVk1oE1EQnnlJbFK3KUq9VJPYWgQVD/5QD0qpfweL1YJQoZAULBRPggp6kB78PQn14kHx0jRB0UO9REVFb1YqVBEsbZW2SbVS0B6apEnbbMbZ6qbZdTempqCHPAjvzcw3P5mdmfcAiquYgX+cAVwu/+5AdDMQnSPCHUhQA0hf+Rxy2OjicIvzm+qnKhito0qpb2wvJhWeJgCPP7oPELeHvdJ1VSGf3eOPnSWga0S0Qo9HxEkEusDBuNjbEca8G291nlBxmgDc/ukuIvAJxI6wr+yKCsq1ewLxQ2lZfpQLo8oQ4ZXdCkfnACrGWpyDCl+oQmVn5xuVPU102e2P3qoJkFOhzVb9S7KSnL5jJs/mI+As01PJFPSlZeFSZZoAGBRXBZyq9lk5NrC+e7pJ5en30c+JWk59pZ5vRDOuhAD381c/H/FKz1SMNgCE16rg505r5TT0uLqme93d0fbq+1SeLSeU83Ke0RHYFPGVPcjQfNDUwIa7M665+dQAEEjZoMwZMcEF9RxIDAgBQ2mCcqJ0Z0b+h4MNbZ4RnyOSDbNmE2iRk5jCNgIIckFoZAs4IgfLGrlKGjkzS16iwj6pV9I4mUvCPf73JVytH9nRJj24QHrqU8NCIWrMaGqAC+Ut/3ZzAS63cx4v2K/x/IvQBOCwWzu5KmJGwEJ5PIgeG9nQBDDcXPpFoDjJ7ThvBC6EZxXWkJG+JgAFwGM4KBAOcibeGCn8FQ/hyajXPmSk+1sACogn4hYk7OdiHDFSWipPkPWSmY6mCzIghEEuxJvcEYUvxIdhX2mvmSHDDPBF9AJRnDZTyp+P40671JYLbxiAohDxSTfQIg4oNxgPzCWPHaWQBViOf2jGqVwBaEaxGbAqOFMrp+SefC8eNhoFIY5lXzpmtnMGUB2IbU3JdIqVW9m5zcxINn/hAYKiIexdaTh4srHKORMAP0b28PNgJyGt5gvHzQVYx91QpVcwpRFl/p63HSR1DLbid1OcTpAJQOG7u+KH+aI5Qwj13IsamU5vkUSIc8uGLDa8OtoivV8U5HcydFLtT7hlSDVy2nfxI2Ibg9awuVU8IeJAOMF5m2B6jFs1tM5R9rS3GRP5uSuiihn4DzPwA7z7GDH+43gqAAAAAElFTkSuQmCC
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
        }
    };

    const DEFAULT_CONFIG = { 
        badUsers: [".约炮‍","@ruantang992","@xiaonm88","MrMinstrel","chu男无偿","上门服务","上门破处","免费破处","同城上门","同城无偿","听主人的话","处男免费","处男无偿","宇宙第一骚","寻固炮","寻男大固炮","想找单男","找个搭子","找个男大弟弟","母狗找主人","每晚准时大秀","每晚准时色播","约.炮.‍","约炮.‍"], 
        badWords: ["/(?:dd?|个?|线上|线下)+的?(?:姐姐|弟弟|哥哥|妹妹).{0,6}/i","/(?:主人|爸爸)快来(?:领|找)我.{0,6}$/","/(?:同城|附近).*(?:满足|草|操|艹|男大|女大|体育生|母狗)/","/(?:喜欢我|颠勺|大|这个骚货|线下我就曰|线下骚货)+/","/(?:她好(瑟|色|骚|[Ss][Aa][Oo])|我不行了|刷了半天|就她的主页能打)+/","/(?:小|母)狗(?:求|要|想|主人|爸爸|哥哥|抱抱|操|艹|草|抱走){2,}/","/(?:急需?|找)(?:一个|一位)?(?:主人|爸爸|固炮|搭子).{0,6}$/","/(?:推特|第一骚)\\@.+/","/^(?:来|有)个(?:真人|单男|母狗|骚逼).+一下/","/^(?:男大|女大)大?(?:哥哥|弟弟|姐姐|妹妹)快?来$/","/^(?:线上|线下)?(?:蹲|找)一?个(?:男|女)?(?:长期|疼人|临时|温柔)?(?:固炮|搭子|主人|爸爸|哥哥|弟弟|主|[Ss])/","/^(?=.*我是真人)(?=.*线[上下][的吗])/","/^..找..(?:主人|主|爸爸|固炮|搭子).{0,6}$/","/^[\\p{Emoji}\\n]+$/u","/^刚(?:分手|被|操|做|完|艹|草)+想被(?:操|艹|草|爱).{0,4}/","/^有?万达广场附近的吗$/","/^有没有(?:单男|母狗|骚逼).{0,6}$/","/^线下[Dd][Dd]$/","/^谁来当我(?:主人|爸爸|狗狗|小狗|骚母狗).{0,6}$/","/pan\\.(?:quark\\.cn|xunlei\\.com)|drive\\.uc\\.cn/","/小(?:狗|🐶|[Mm])(?:在线|想[和跟])(?:等|找|大家|主人|主|爸爸|固炮|搭子|调|你).{0,6}/","/有(哥哥|弟弟).*线(上|下)(约|吗)/i","/有没有离[得的]近[得的].{0,4}$/","/比她(?:骚|好看)的没/","/线下(?:骚|[Ss][Aa][Oo]|比她|货)+/","@designksh1","@ruantang992","@xiaonm88"] 
    };

    let config = api.getValue('filterConfig', DEFAULT_CONFIG);

    const compileRules = (words) => words.map(r => {
        try {
            if (r.startsWith('/') && r.lastIndexOf('/') > 0) {
                const lastSlashIndex = r.lastIndexOf('/');
                return new RegExp(r.substring(1, lastSlashIndex), r.substring(lastSlashIndex + 1));
            }
            return new RegExp(r);
        } catch (e) { return null; }
    }).filter(Boolean);

    let compiledRules = compileRules(config.badWords);

    const PROCESSED_TWEETS = new WeakSet();
    const FILTER_CACHE = new Map();

    const cleanText = (text) => {
        if (!text) return "";
        return text.replace(/[\u0000-\u001F\u007F-\u009F\u00AD\u061C\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u200D\u200C\u180E\u202F\u205F\u2060\uFE00-\uFE0F]/g, '').trim();
    };

    const isSpamBot = (tweetTextEl, tweetNode) => {
        if (!tweetTextEl) return false;
        const pureText = cleanText(tweetTextEl.innerText || "");
        const nameEl = tweetNode?.querySelector('[data-testid="User-Name"]');
        const nickName = nameEl ? cleanText(nameEl.innerText.split(/[\n·]/)[0]) : "";
        const nameEmojiEls = nameEl ? nameEl.querySelectorAll('img[src*="emoji"]') : [];
        const tweetEmojiEls = tweetTextEl.querySelectorAll('img[src*="emoji"]');
        const spamEmojiList = ["⬆️","🍓","🌸","💊","👠","💎","💯","🍆","🍑","🚪","🅱️","🔞","❤"];
        let nameEmojiCount = 0;
        for (let img of nameEmojiEls) { if (spamEmojiList.includes(img.getAttribute('alt'))) nameEmojiCount++; }
        const nameSpamStrict = /(?:约[ .]?炮|chu男|破处|处男|寻|找|蹲|求|想找|一个)(?:免费|无偿|单男|固炮|搭子|主[人子]|哥哥|弟弟|男大|女大|线上|线下)|(?:每晚|准时)(?:大秀|色播|直播)|(?:母狗|骚货|第一骚|体育生|女大|男大)(?:求|找|寻|固炮|搭子|主[人子])|[(\uff08](?:饥渴|处女|寂寞|男大来)|(?:附近的|来|DD)/i;
        const nameSpamSuspect = /(?:同城|附近|蹲|约|无|真实|免费|偿|个|丝丝|小猫|茜茜|萝莉|学姐|乔|欣|萌|成人|限制|破除|破限|AI|上门|速配|服务|满足|线下|联系|野战|安排|哥哥|弟弟|男大|女大|单男|体育生){2,}/i;
        if (nickName) {
            if (nameSpamStrict.test(nickName)) return true;
            if (nameEmojiCount > 0 && nameSpamSuspect.test(nickName)) return true;
        }
        let totalSpamEmojiCount = nameEmojiCount;
        for (let img of tweetEmojiEls) { if (spamEmojiList.includes(img.getAttribute('alt'))) totalSpamEmojiCount++; }
        if (totalSpamEmojiCount >= 6) return true;
        const hasPunctuation = /[\u3002\uff0c\uff1f\uff01\uff1b\uff1a\u3001.?!,;:]/.test(pureText);
        if (tweetEmojiEls.length > 0 && !hasPunctuation && pureText.length < 4) return true;
        const specialSymbols = /[𖬺༄𖫹𖬚✫꙳⸝𖨋༺꙼꙽༻ꦿ⬆↑⇑ꪕꜥ꩕ꦼꥏ⦹⦸ꥎꦾ꩔Ꜥꪑ⧉ꥐ꧀꩖꧎ꧏ꧑꩗꧁❀©ꥑ]/g;
        const symbolMatches = pureText.match(specialSymbols);
        if (symbolMatches && symbolMatches.length >= 3) return true;
        return false;
    };

    const twitterContentUnblocker = (() => {
        const TARGET_ENDPOINTS = ['UserTweets', 'TweetDetail', 'SearchTimeline', 'HomeTimeline'];
        const rewriteResponse = (rawText) => {
            try {
                return rawText
                    .replace(/"possibly_sensitive":\s*true/g, '"possibly_sensitive":false')
                    .replace(/"profile_interstitial_type":\s*"sensitive_media"/g, '"profile_interstitial_type":""')
                    .replace(/"mediaVisibilityResults":/g, '"mediaVisibilityResults_bypass":');
            } catch (e) { return rawText; }
        };
        return () => {
            const XHR = XMLHttpRequest.prototype;
            const send = XHR.send;
            const open = XHR.open;
            XHR.open = function(method, url) { this._url = url; return open.apply(this, arguments);};
            XHR.send = function() {
                if (this._url && TARGET_ENDPOINTS.some(ep => this._url.includes(ep))) {
                    const responseTextGetter = Object.getOwnPropertyDescriptor(XHR, 'responseText').get;
                    Object.defineProperty(this, 'responseText', {
                        get: function() {
                            const originalText = responseTextGetter.call(this);
                            return typeof originalText === 'string' ? rewriteResponse(originalText) : originalText;
                        },
                        configurable: true
                    });
                }
                return send.apply(this, arguments);
            };
        };
    })();

    const twitterAdCleaner = (() => {
        const PROCESSED_NODES = new WeakSet();
        const AD_SELECTORS = ["div[data-testid='placementTracking']", "button[aria-label='Grok actions']", "aside[role='complementary']"];
        const isAdText = (t) => ['Promoted', '广告', '推廣', '広告', 'Sponsorisé'].includes(t);
        const processNode = (node) => {
            if (!node || node.nodeType !== 1 || PROCESSED_NODES.has(node)) return;
            try {
                if (node.getAttribute('data-testid') === 'cellInnerDiv') {
                    const hasAdSignal = node.querySelector(AD_SELECTORS[0]);
                    const adLabel = Array.from(node.querySelectorAll('article span')).find(s => isAdText(s.textContent));
                    if (hasAdSignal || adLabel) {
                        node.style.setProperty('display', 'none', 'important');
                        PROCESSED_NODES.add(node);
                        return;
                    }
                }
                if (node.matches?.(AD_SELECTORS[1]) || node.matches?.(AD_SELECTORS[2])) {
                    const isGrok = node.matches(AD_SELECTORS[1]);
                    const isAdSidebar = node.innerText && isAdText(node.innerText.split('\n')[0]);
                    if (isGrok || isAdSidebar) {
                        node.style.display = 'none';
                    }
                }
            } catch (e) {}
        };
        return () => {
            const observer = new MutationObserver((m) => {
                requestAnimationFrame(() => m.forEach(mu => mu.addedNodes.forEach(processNode)));
            });
            observer.observe(document.body, { childList: true, subtree: true });
            document.querySelectorAll('div[data-testid="cellInnerDiv"]').forEach(processNode);
        };
    })();

    const quickFilterUI = (tweetData, tweetNode) => {
        const existing = document.getElementById('tf-quick-panel');
        if (existing) existing.remove();
        const box = document.createElement('div');
        box.id = 'tf-quick-panel';
        const shadow = box.attachShadow({mode: 'closed'});
        const style = document.createElement('style');
        style.textContent = `
            :host { position: fixed; inset: 0; z-index: 1000000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); font-family: -apple-system, system-ui; }
            .card { background: white; width: 320px; padding: 20px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
            @media (prefers-color-scheme: dark) { .card { background: #15202b; color: white; } }
            h4 { margin: 0 0 15px 0; font-size: 16px; }
            .opt { background: rgba(128,128,128,0.1); padding: 10px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; font-size: 13px; word-break: break-all; border: 1px solid transparent; }
            .opt:hover { border-color: #1d9bf0; background: rgba(29,155,240,0.1); }
            textarea { width: 100%; height: 60px; margin-top: 5px; border-radius: 8px; border: 1px solid #ccc; padding: 5px; font-size: 12px; resize: none; box-sizing: border-box; }
            .btns { display: flex; gap: 8px; margin-top: 15px; }
            button { flex: 1; padding: 8px; border-radius: 20px; border: none; font-weight: bold; cursor: pointer; }
            .add { background: #1d9bf0; color: white; }
            .cancel { background: #eee; color: #333; }
        `;
        const cleanVal = cleanText(tweetData.text);
        const regexVal = `/${cleanVal.substring(0, 10).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*/`;
        
        const getFilterName = (name) => {
            if (!name) return "";
            const parts = name.split(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\u200D/);
            if (parts.length <= 1) return name;
            let maxPart = "";
            for (let i = 0; i < parts.length; i++) {
                const p = parts[i].trim();
                if (p.length >= maxPart.length) maxPart = p;
            }
            return maxPart || name;
        };
        const filterName = getFilterName(tweetData.userName);

        shadow.appendChild(style);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>快速过滤</h4>
            <div class="opt" id="addU">屏蔽用户ID: <b>${tweetData.userId}</b></div>
            <div class="opt" id="addN">屏蔽名称: <b>${filterName}</b></div>
            <div class="opt" id="addR">提取正则: <code>${regexVal}</code></div>
            <div class="label">自定义规则:</div>
            <textarea id="customR">${cleanVal}</textarea>
            <div class="btns">
                <button class="cancel" id="cbtn">取消</button>
                <button class="add" id="abtn">确认添加</button>
            </div>
        `;
        shadow.appendChild(card);
        document.body.appendChild(box);
        const close = () => box.remove();
        shadow.getElementById('cbtn').onclick = close;
        shadow.getElementById('addU').onclick = () => { shadow.getElementById('customR').value = tweetData.userId; shadow.getElementById('abtn').click(); };
        shadow.getElementById('addN').onclick = () => { 
            const val = filterName;
            config.badUsers.push(val);
            api.setValue('filterConfig', config);
            if (tweetNode) tweetNode.style.setProperty('display', 'none', 'important');
            close();
        };
        shadow.getElementById('addR').onclick = () => { shadow.getElementById('customR').value = regexVal; shadow.getElementById('abtn').click(); };
        shadow.getElementById('abtn').onclick = () => {
            const val = shadow.getElementById('customR').value.trim();
            if (val.startsWith('@')) {
                config.badUsers.push(val);
            } else {
                config.badWords.push(val);
                compiledRules = compileRules(config.badWords);
            }
            api.setValue('filterConfig', config);
            if (tweetNode) tweetNode.style.setProperty('display', 'none', 'important');
            close();
        };
    };
    
    const addFilterBtn = (tweet, data) => {
        const group = tweet.querySelector('div[role="group"]:last-child');
        if (!group || group.querySelector('.tf-qbtn')) return;
        const insert = () => {
            const btn = document.createElement('div');
            const reference = group.firstElementChild;
            btn.className = (reference ? reference.className : 'css-175oi2r r-18u37iz r-1h0z5md r-13awgt0') + ' tf-qbtn';
            btn.style = 'display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0.6;';
            btn.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10.32 12.56L4.12 4H19.88L13.68 12.56V19.64L10.32 21.44V12.56ZM3 2H21L12 14.5V22L8 20V14.5L3 2Z"/></svg>';
            btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); quickFilterUI(data, tweet); };
            group.appendChild(btn);
        };
        if (group.children.length > 0) {
            insert();
        } else {
            setTimeout(insert, 150);
        }
    };

    const processFilterNode = (tweet) => {
        if (!tweet || PROCESSED_TWEETS.has(tweet)) return;
        const textEl = tweet.querySelector('[data-testid="tweetText"]');
        const tweetLink = tweet.querySelector('a[href*="/status/"]');
        const tweetId = tweetLink ? tweetLink.getAttribute('href').split('/status/')[1]?.split('?')[0] : null;
        const avatar = tweet.querySelector('[data-testid^="UserAvatar-Container-"]');
        const userId = avatar ? '@' + avatar.getAttribute('data-testid').replace('UserAvatar-Container-', '') : null;
        const nameContainer = tweet.querySelector('[data-testid="User-Name"]');
        const userName = nameContainer ? nameContainer.innerText.split('\n')[0] : null;
        const rawText = textEl ? textEl.innerText : "";

        if (tweetId && FILTER_CACHE.get(tweetId)) {
            tweet.style.setProperty('display', 'none', 'important');
            PROCESSED_TWEETS.add(tweet); return;
        }

        const isSpam = isSpamBot(textEl, tweet);
        const shouldHide = isSpam || config.badUsers.some(u => {
            const t = u.toLowerCase();
            return (userId && userId.toLowerCase() === t) || (userName && userName.toLowerCase().includes(t));
        }) || (textEl && compiledRules.some(r => r.test(cleanText(rawText))));
        if (shouldHide) {
            tweet.style.setProperty('display', 'none', 'important');
            if (tweetId) {
                FILTER_CACHE.set(tweetId, true);
                if (FILTER_CACHE.size > 1000) {
                    const firstKey = FILTER_CACHE.keys().next().value;
                    FILTER_CACHE.delete(firstKey);
                }
            }
        } else {
            addFilterBtn(tweet, { userId, userName, text: rawText });
        }
        PROCESSED_TWEETS.add(tweet);
    };

    const filterObserver = new MutationObserver((mutations) => {
        if (shouldExclude()) return;
        requestAnimationFrame(() => {
            for (let i = 0; i < mutations.length; i++) {
                mutations[i].addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        const tweet = node.matches('article[data-testid="tweet"]') ? node : node.querySelector('article[data-testid="tweet"]');
                        if (tweet) processFilterNode(tweet);
                        else if (node.getAttribute?.('data-testid') === 'cellInnerDiv') {
                            setTimeout(() => { const r = node.querySelector('article[data-testid="tweet"]'); if (r) processFilterNode(r); }, 100);
                        }
                    }
                });
            }
        });
    });

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
            #panel { display: none; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 340px; max-width: 85vw; max-height: 80vh; background: rgba(255,255,255,0.75); backdrop-filter: blur(12px); border-radius: 20px; z-index: 999999; padding: 24px; border: 1px solid rgba(255,255,255,0.3); overflow-y: auto; font-family: -apple-system, system-ui; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
            .header h3 { margin: 0; font-size: 18px; font-weight: 800; }
            .close-btn { cursor: pointer; padding: 4px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
            .close-btn:hover { background: rgba(0,0,0,0.1); }
            label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 5px; color: #536471; }
            textarea { width: 100%; height: 80px; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 10px; margin-bottom: 10px; box-sizing: border-box; resize: none; outline: none; transition: all 0.2s; background: rgba(255,255,255,0.5); }
            textarea:focus { border-color: #1d9bf0; background: #fff; box-shadow: 0 0 0 3px rgba(29,155,240,0.1); }
            .btn-group { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            button { padding: 10px; border-radius: 10px; border: none; font-weight: bold; cursor: pointer; transition: all 0.2s; }
            .save { background: #1d9bf0; color: #fff; grid-column: span 2; }
            .save:hover { background: #1a8cd8; transform: translateY(-1px); }
            .reset { background: #f4212e; color: #fff; grid-column: span 2; }
            .reset:hover { background: #dc1f29; }
            @media (prefers-color-scheme: dark) {
                #fab { background: rgba(0, 0, 0, 0.6); color: #fff; }
                #panel { background: rgba(21, 32, 43, 0.85); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
                .close-btn:hover { background: rgba(255,255,255,0.1); }
                label { color: #8b98a5; }
                textarea { background: rgba(0,0,0,0.3); color: #fff; }
                textarea:focus { background: rgba(0,0,0,0.5); }
            }
        `;
        shadow.appendChild(style);
        const div = document.createElement('div');
        div.innerHTML = `<div id="mask"></div><div id="fab"><svg viewBox="0 0 24 24" width="22"><path fill="currentColor" d="M21 4H3c-.55 0-1 .45-1 1v1.59c0 .53.21 1.04.59 1.41l6.41 6.41V20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-5.59l6.41-6.41c.38-.37.59-.88.59-1.41V5c0-.55-.45-1-1-1zM4 6h16v1.17L13.17 14H10.83L4 7.17V6z"/></svg></div>
            <div id="panel"><div class="header"><h3>过滤设置</h3><div class="close-btn" id="closeX"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></div></div><label>屏蔽用户 ID</label><textarea id="users" placeholder="@username">${config.badUsers.join('\n')}</textarea>
            <label>关键词或正则</label><textarea id="words" placeholder="/正则/i">${config.badWords.join('\n')}</textarea>
            <div class="btn-group"><button class="save" id="saveBtn">保存并应用</button>
            <button id="importBtn">导入规则</button><button id="copyBtn">导出规则</button>
            <button class="reset" id="resetBtn">恢复默认规则</button></div></div>`;
        shadow.appendChild(div);

        const panel = shadow.getElementById('panel'), fab = shadow.getElementById('fab'), mask = shadow.getElementById('mask');
        let hideTimer;

        const resetTimer = () => {
            fab.classList.remove('idle');
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => { if (panel.style.display !== 'block') fab.classList.add('idle'); }, 3000);
        };

        const toggleUI = (show) => {
            panel.style.display = show ? 'block' : 'none';
            mask.style.display = show ? 'block' : 'none';
            if (!show) resetTimer();
        };

        const updateVisibility = () => { container.style.display = shouldExclude() ? 'none' : 'block'; };

        fab.onclick = () => toggleUI(true);
        mask.onclick = () => toggleUI(false);
        shadow.getElementById('closeX').onclick = () => toggleUI(false);
        fab.onmouseenter = () => fab.classList.remove('idle');
        fab.onmouseleave = resetTimer;
        shadow.getElementById('saveBtn').onclick = () => {
            config.badUsers = shadow.getElementById('users').value.split('\n').map(s => s.trim()).filter(s => s);
            config.badWords = shadow.getElementById('words').value.split('\n').map(s => s.trim()).filter(s => s);
            api.setValue('filterConfig', config); location.reload();
        };
        shadow.getElementById('copyBtn').onclick = () => { api.setClipboard(JSON.stringify(config)); alert('已复制'); };
        shadow.getElementById('resetBtn').onclick = () => { if(confirm("确定要重置所有规则吗？")){ api.setValue('filterConfig', DEFAULT_CONFIG); location.reload(); } };
        shadow.getElementById('importBtn').onclick = () => {
            const j = prompt("请粘贴导出的 JSON 规则：");
            if (j) {
                try {
                    const p = JSON.parse(j);
                    if (p.badUsers || p.badWords) {
                        const newData = {
                            badUsers: Array.isArray(p.badUsers) ? p.badUsers : [],
                            badWords: Array.isArray(p.badWords) ? p.badWords : []
                        };
                        api.setValue('filterConfig', newData);
                        location.reload();
                    } else {
                        alert("规则格式不匹配（需包含badUsers或badWords）");
                    }
                } catch (e) {
                    alert("JSON解析失败，请检查格式");
                }
            }
        };
        window.addEventListener('popstate', updateVisibility);
        document.addEventListener('click', () => setTimeout(updateVisibility, 500));
        resetTimer();
        updateVisibility();
    };

    const shouldExclude = (() => {
        const ex = /https:\/\/x\.com\/(?:.*\/status\/.*\/(?:video|photo|mediaViewer.*)|settings|i\/.*\/creators\/|i\/bookmarks|i\/premium-business|.*\/lists|i\/follow_people|i\/chat|notifications|i\/grok)/;
        let lastUrl = ''; let lastResult = false;
        return () => {
            const curr = location.href; if (curr === lastUrl) return lastResult;
            lastUrl = curr; lastResult = ex.test(curr);
            if (lastResult) filterObserver.disconnect();
            else filterObserver.observe(document.body, { childList: true, subtree: true });
            return lastResult;
        };
    })();

    twitterContentUnblocker();
    const checkReady = setInterval(() => {
        const main = document.querySelector('main');
        if (main) { clearInterval(checkReady); createUI(); twitterAdCleaner(); if (!shouldExclude()) document.querySelectorAll('article[data-testid="tweet"]').forEach(processFilterNode); }
    }, 1000);
})();
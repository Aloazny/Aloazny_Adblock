// ==UserScript==
// @name         搜索引擎工具栏(改)
// @namespace    https://github.com/examplecode/useful-user-scripts
// @homepageURL  https://scriptcat.org/zh-CN/users/157252
// @author       examplecode && Aloazny && Gemini
// @version      6.5
// @description  二改@examplecode的搜索脚本，感谢@examplecode，添加MD3配色+高斯模糊+编辑/添加搜索引擎功能+搜索栏切换顶部底部+搜索框，保留原本的X浏览器搜索引擎读取，排序等功能。
// @match        *://*/*
// @icon          data:image/png;base64,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
// @license       MIT
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_EX_getSearchEngines
// @grant        GM_xmlhttpRequest
// @connect      suggestion.baidu.com
// @connect      suggestqueries.google.com
// @connect      api.bing.com
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_KEY = 'quick_search_bar_final';
    const THEME_KEY = 'quick_search_theme_v2';
    const LAYOUT_KEY = 'quick_search_layout_v1';
    const queryParams = ["q", "s", "p", "wd", "word", "keyword", "text", "query", "key", "result", "searchWord", "search-result" ];
    const longSignals = ['search', 'search-result', 'category', 'find', 'query', 'result', 'tags', 'tag'];
    const strictSignals = ['s', 'k', 'p'];

    const defaultTheme = { primary: '#6750a4', opacity: 0.7, blur: 18, themeStyle: 'MIUIX' };
    const defaultLayout = { pos: 'bottom', offset: 24, autoHide: false, showInput: false, inputStyle: 1, shrinkMode: false, historyLimit: 100, showSuggest: true };
    const HISTORY_KEY = 'quick_search_history_v1';
    const defaultEngines = [
        { name: '必应', host: 'bing.com', url: 'https://www.bing.com/search?q=%s' },
        { name: 'Yandex', host: 'yandex', url: 'https://yandex.com/search/touch/?text=%s' },
        { name: 'Google', host: 'google', url: 'https://www.google.com/search?q=%s' },
        { name: '百度', host: 'baidu.com', url: 'https://www.baidu.com/s?word=%s' },
        { name: 'ScriptCat', host: 'scriptcat.org', url: 'https://scriptcat.org/zh-CN/search?keyword=%s' },
        { name: '4Khd', host: '/(4khd|xxtt|ssuu|uuss)\\.(com|ink|uk)/', url: 'https://www.4khd.com/search/%s' },
        { name: '纳米AI', host: 'n.cn', url: 'https://www.n.cn/search/?q=%s&src=ec_vivo_1001' }
    ];

    const storage = {
        save: (engines, deletedIds) => {
            const data = {
                custom: engines.filter(e => e.isCustom),
                order: engines.map(e => e.id),
                hidden: engines.filter(e => !e.visible).map(e => e.id),
                deleted: deletedIds || [],
                pathRules: saved.pathRules || {},
                cache: engines.map(e => ({ name: e.name, host: e.host, url: e.url, id: e.id, visible: e.visible, isCustom: e.isCustom, pathRule: (saved.pathRules && saved.pathRules[e.host]) || '' }))
            };
            if (typeof GM_setValue !== 'undefined') GM_setValue(STORAGE_KEY, data);
            else localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        },
        load: () => {
            let data;
            if (typeof GM_getValue !== 'undefined') data = GM_getValue(STORAGE_KEY);
            else { try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch(e) {} }
            return data || { custom: [], order: [], hidden: [], deleted: [], pathRules: {}, cache: null };
        },
        themeSave: (val) => {
            if (typeof GM_setValue !== 'undefined') GM_setValue(THEME_KEY, val);
            else localStorage.setItem(THEME_KEY, JSON.stringify(val));
            applyTheme();
        },
        themeLoad: () => {
            let data;
            if (typeof GM_getValue !== 'undefined') data = GM_getValue(THEME_KEY);
            else { try { data = JSON.parse(localStorage.getItem(THEME_KEY)); } catch(e) {} }
            return data || defaultTheme;
        },
        layoutSave: (val) => {
            if (typeof GM_setValue !== 'undefined') GM_setValue(LAYOUT_KEY, val);
            else localStorage.setItem(LAYOUT_KEY, JSON.stringify(val));
        },
        layoutLoad: () => {
            let data;
            if (typeof GM_getValue !== 'undefined') data = GM_getValue(LAYOUT_KEY);
            else { try { data = JSON.parse(localStorage.getItem(LAYOUT_KEY)); } catch(e) {} }
            return data || defaultLayout;
        },
        getStableId: (name, host) => {
            let str = (name || '') + '|' + (host || '');
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
            }
            return 'se_' + Math.abs(hash).toString(36);
        }
    };
    
    const repairData = () => {
        let logs = [];
        let sData = storage.load();
        if (!sData || typeof sData !== 'object' || Array.isArray(sData)) {
            sData = { custom: [], order: [], hidden: [], deleted: [], pathRules: {}, cache: null };
            logs.push("基础存储结构异常，已初始化");
        } else {
            if (!Array.isArray(sData.custom)) { sData.custom = []; logs.push("修复 custom 列表"); }
            if (!Array.isArray(sData.order)) { sData.order = []; logs.push("修复 order 列表"); }
            if (!Array.isArray(sData.hidden)) { sData.hidden = []; logs.push("修复 hidden 列表"); }
            if (!Array.isArray(sData.deleted)) { sData.deleted = []; logs.push("修复 deleted 列表"); }
            if (!sData.pathRules || typeof sData.pathRules !== 'object') { sData.pathRules = {}; logs.push("修复 pathRules 结构"); }
        }
        storage.save((sData.cache || []), sData.deleted);
        let tData = storage.themeLoad();
        let tFixed = false;
        if (!tData || typeof tData !== 'object') {
            tData = { ...defaultTheme };
            tFixed = true;
        } else {
            for (let key in defaultTheme) {
                if (tData[key] === undefined) { tData[key] = defaultTheme[key]; tFixed = true; }
            }
        }
        if (tFixed) { storage.themeSave(tData); logs.push("补全了主题缺失参数"); }
        let lData = storage.layoutLoad();
        let lFixed = false;
        if (!lData || typeof lData !== 'object' || Array.isArray(lData)) {
            lData = { ...defaultLayout };
            lFixed = true;
        } else {
            for (let key in defaultLayout) {
                if (lData[key] === undefined) { lData[key] = defaultLayout[key]; lFixed = true; }
            }
        }
        if (lFixed) { storage.layoutSave(lData); logs.push("补全了布局缺失参数"); }
        if (logs.length > 0) {
            alert("🛠 数据修复完成（已尝试保留原有设置）：\n" + logs.join("\n") + "\n\n页面即将刷新。");
            location.reload();
        } else {
            alert("✅ 未检测到异常数据。");
        }
    };
    
    if (typeof GM_registerMenuCommand !== 'undefined') {
        GM_registerMenuCommand("🔍 检查并修复数据", repairData);
        GM_registerMenuCommand("⚙️ 脚本设置中心", showManager);
        const createTempHost = () => {
            const host = document.createElement('div');
            host.style.cssText = 'position:absolute;top:-999px;left:-999px;width:0;height:0;overflow:hidden;';
            const shadow = host.attachShadow({mode: 'closed'});
            document.body.appendChild(host);
            return { 
                shadow, 
                destroy: () => document.body.removeChild(host) 
            };
        };
        GM_registerMenuCommand("📤 导出备份 (JSON)", () => {
            const config = { 
                [STORAGE_KEY]: storage.load(), 
                [THEME_KEY]: storage.themeLoad(), 
                [LAYOUT_KEY]: storage.layoutLoad() 
            };
            const { shadow, destroy } = createTempHost();
            const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `search_bar_backup_${Date.now()}.json`;
            shadow.appendChild(a);
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(a.href);
                destroy();
            }, 100);
        });
        GM_registerMenuCommand("📥 导入备份 (覆盖)", () => {
            const { shadow, destroy } = createTempHost();
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) { destroy(); return; }
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const data = JSON.parse(ev.target.result);
                        if (data[THEME_KEY]) storage.themeSave(data[THEME_KEY]);
                        if (data[LAYOUT_KEY]) storage.layoutSave(data[LAYOUT_KEY]);
                        if (data[STORAGE_KEY]) {
                            const d = data[STORAGE_KEY];
                            d.cache = null;
                            if (typeof GM_setValue !== 'undefined') GM_setValue(STORAGE_KEY, d);
                            else localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
                        }
                        alert("导入成功，页面即将刷新");
                        location.reload();
                    } catch (err) { 
                        alert('导入失败：无效的 JSON 格式'); 
                    } finally {
                        destroy();
                    }
                };
                reader.readAsText(file);
            };
            shadow.appendChild(input);
            input.click();
        });
    }

    let theme = storage.themeLoad();
    let layout = storage.layoutLoad();

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        let r = parseInt(hex.substring(0, 2), 16), g = parseInt(hex.substring(2, 4), 16), b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        const contrastColor = brightness > 150 ? '#000000' : '#ffffff';
        return { rgb: `${r}, ${g}, ${b}`, contrast: contrastColor };
    }

    const shadowHost = document.createElement('div');
    shadowHost.id = 'qs-shadow-root';
    shadowHost.style.cssText = 'position:absolute;z-index:2147483647;';
    const shadow = shadowHost.attachShadow({mode: 'open'});
    
    function applyTheme() {
        const styleId = 'qs-static-styles';
        let el = shadow.getElementById(styleId) || document.createElement('style');
        el.id = styleId;
        const themeData = hexToRgb(theme.primary);
        const isMIUI = theme.themeStyle === 'MIUIX';
        const config = isMIUI ? { radius: '100px', btnRadius: '100px', cardRadius: '32px', border: '0.5px solid rgba(255,255,255,0.4)', saturate: '210%', shadow: '0 8px 32px rgba(0,0,0,0.1)' } : { radius: '16px', btnRadius: '12px', cardRadius: '24px', border: '1px solid rgba(0,0,0,0.1)', saturate: '150%', shadow: '0 4px 12px rgba(0,0,0,0.1)' };

        el.innerHTML = `
            :host {
                --qs-pri: ${theme.primary};
                --qs-pri-rgb: ${themeData.rgb};
                --qs-on-pri: ${themeData.contrast}; 
                --qs-bg: rgba(255, 255, 255, ${theme.opacity});
                --qs-blur: ${theme.blur}px;
                --qs-radius: ${config.radius};
                --qs-btn-radius: ${config.btnRadius};
                --qs-card-radius: ${config.cardRadius};
                --qs-border: ${config.border};
                --qs-saturate: ${config.saturate};
                --qs-shadow: ${config.shadow};
            }
            #qs-manager-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.3);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:2147483647;display:flex;justify-content:center;align-items:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif; }
            .qs-card { background:rgba(255,255,255,0.85);backdrop-filter:saturate(var(--qs-saturate)) blur(25px);-webkit-backdrop-filter:saturate(var(--qs-saturate)) blur(25px);width:92%;max-width:440px;max-height:80vh;border-radius:var(--qs-card-radius);box-shadow:0 20px 50px rgba(0,0,0,0.15);display:flex;flex-direction:column;overflow:hidden;border:var(--qs-border);color:#1c1b1f;transition: border-radius 0.3s ease;box-sizing:border-box; }
            .qs-bar { position:fixed; left:50%; transform:translateX(-50%); z-index:2147483646; background:var(--qs-bg); backdrop-filter:saturate(var(--qs-saturate)) blur(var(--qs-blur)); -webkit-backdrop-filter:saturate(var(--qs-saturate)) blur(var(--qs-blur)); display:flex; overflow-x:auto; padding:10px 14px; gap:8px; border-radius:var(--qs-radius); box-shadow:var(--qs-shadow); border:var(--qs-border); max-width:92vw; scrollbar-width:none; align-items:center; transition:transform 0.3s, opacity 0.3s, border-radius 0.3s; scroll-behavior:smooth; box-sizing:border-box; }
            .qs-bar::-webkit-scrollbar { display:none; }
            .qs-btn { padding:10px 18px; border-radius:var(--qs-btn-radius); text-decoration:none; font-size:14px; white-space:nowrap; font-weight:600; flex-shrink:0; transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s; border:none; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; box-sizing:border-box; }
            .qs-btn:active { transform: scale(0.92); }
            .qs-btn-active { background:var(--qs-pri); color:var(--qs-on-pri); }
            .qs-btn-flat { background:rgba(0,0,0,0.04); color:#1d1b20; }
            .qs-main-input { border:none; outline:none; font-size:13px; font-weight:500; transition: width 0.3s, background 0.3s; box-sizing:border-box; }
            .se-item-container { margin-bottom: 10px; border-radius: 20px; border: 1px solid rgba(0,0,0,0.03); background: rgba(255,255,255,0.6); box-sizing:border-box; }
            .se-item { display: flex; align-items: center; padding: 14px 16px; cursor: pointer; box-sizing:border-box; }
            .btn-icon { width: 36px; height: 36px; border-radius: 12px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #49454f; font-size:18px; box-sizing:border-box; }
            .toggle-box { width: 44px; height: 24px; background: #e7e0ec; border-radius: 20px; position: relative; transition: 0.3s; margin-right: 12px; flex-shrink:0; }
            .toggle-box.active { background: var(--qs-pri); }
            .toggle-circle { width: 18px; height: 18px; background: #fff; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: 0.3s; }
            .toggle-box.active .toggle-circle { left: 23px; }
            .edit-form { max-height: 0; opacity: 0; padding: 0 16px; overflow:hidden; transition: all 0.3s ease; box-sizing:border-box; }
            .edit-form.open { max-height: 400px; opacity: 1; padding: 10px 16px 20px; }
            .qs-input-field { width:100% !important; display:block !important; padding:14px; border-radius:12px; border:1px solid rgba(0,0,0,0.1) !important; background:#ffffff !important; color:#000000 !important; outline:none; font-size:14px; box-sizing:border-box !important; }
            .qs-input-field::placeholder { color: #888 !important; }
            #m-list::-webkit-scrollbar { display:none; }
            #mask { position:fixed;inset:0;background:rgba(0,0,0,0.2);backdrop-filter:blur(${theme.blur}px);-webkit-backdrop-filter:blur(${theme.blur}px);z-index:2147483640;display:none; }
            #box { position:fixed; ${layout.pos === 'top' ? 'top:'+(parseInt(layout.offset)+60)+'px' : 'bottom:'+(parseInt(layout.offset)+60)+'px'}; left:50%; transform:translateX(-50%); width:90vw; max-width:400px; z-index:2147483641; display:none; flex-wrap:wrap; gap:8px; padding:10px; box-sizing:border-box; }
            .item { padding:8px 16px; background:rgba(255,255,255,0.8); backdrop-filter:blur(10px); border-radius:${isMIUI?'100px':'12px'}; font-size:13px; color:#1d1b20; cursor:pointer; border:1px solid rgba(0,0,0,0.05); transition:0.2s; box-shadow:0 2px 8px rgba(0,0,0,0.05); }
            .item:hover { background:var(--qs-pri); color:var(--qs-on-pri); }
            .item.his { border-color:rgba(var(--qs-pri-rgb), 0.3); }
        `;
        if (!el.parentNode) shadow.appendChild(el);
    }

    const updateSuggestStyle = () => {
        applyTheme();
        if(!shadow.getElementById('mask')){
            const m = document.createElement('div'); m.id = 'mask';
            const b = document.createElement('div'); b.id = 'box';
            shadow.appendChild(m);
            shadow.appendChild(b);
        }
    };

    function normalizeUrl(url) {
        return url ? url.replace(/%keywords%/g, '%s').trim() : '';
    }

    let xEngines = [];
    if (typeof GM_EX_getSearchEngines === 'function') {
        try {
            const list = JSON.parse(GM_EX_getSearchEngines());
            if (Array.isArray(list)) {
                xEngines = list.map(e => ({ name: e.name || '未知', host: e.host || '', url: normalizeUrl(e.url || '') }));
            }
        } catch (e) {}
    }

    let saved = storage.load();
    
    const suggestApi = {
        baidu: (s) => `https://suggestion.baidu.com/su?wd=${encodeURIComponent(s)}&p=3&ie=utf-8&oe=utf-8`,
        google: (s) => `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(s)}`,
        bing: (s) => `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(s)}`,
        fetch: (s, type) => {
            return new Promise((resolve) => {
                if (typeof GM_xmlhttpRequest === 'undefined') return resolve([]);
                GM_xmlhttpRequest({
                    method: "GET", url: suggestApi[type](s), timeout: 1200, onload: (res) => {
                        try {
                            if (type === 'baidu') { const match = res.responseText.match(/\[.*\]/); resolve(match ? JSON.parse(match[0]) : []); }
                            else if (type === 'google' || type === 'bing') { const data = JSON.parse(res.responseText); resolve(data[1] || []); }
                        } catch (e) { resolve([]); }
                    }, onerror: () => resolve([]), ontimeout: () => resolve([])
                });
            });
        },
        fetchAll: async (s, onUpdate) => {
            let results = { google: [], bing: [], baidu: [] };
            const combine = () => {
                const { google: g, bing: i, baidu: b } = results;
                if (g.length) return [...new Set([...g.slice(0, 10), ...i.slice(0, 5), ...b.slice(0, 3)])];
                if (i.length) return [...new Set([...i.slice(0, 10), ...b.slice(0, 6)])];
                return b;
            };
            ['google', 'bing', 'baidu'].forEach(async (type) => {
                const data = await suggestApi.fetch(s, type);
                if (data && data.length > 0) {
                    results[type] = data;
                    onUpdate(combine());
                }
            });
        }
    };

    const historyManager = {
        get: () => { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch(e) { return []; } },
        add: (s) => {
            if (!s || s.startsWith('http')) return;
            let h = historyManager.get();
            h = [s, ...h.filter(i => i !== s)].slice(0, layout.historyLimit || 100);
            localStorage.setItem(HISTORY_KEY, JSON.stringify(h));
        }
    };

    //域名识别
    const TLDS_SORTED = "AAA|AARP|ABB|ABBOTT|ABBVIE|ABC|ABLE|ABOGADO|ABUDHABI|AC|ACADEMY|ACCENTURE|ACCOUNTANT|ACCOUNTANTS|ACO|ACTOR|AD|ADS|ADULT|AE|AEG|AERO|AETNA|AF|AFL|AFRICA|AG|AGAKHAN|AGENCY|AI|AIG|AIRBUS|AIRFORCE|AIRTEL|AKDN|AL|ALIBABA|ALIPAY|ALLFINANZ|ALLSTATE|ALLY|ALSACE|ALSTOM|AM|AMAZON|AMERICANEXPRESS|AMERICANFAMILY|AMEX|AMFAM|AMICA|AMSTERDAM|ANALYTICS|ANDROID|ANQUAN|ANZ|AO|AOL|APARTMENTS|APP|APPLE|AQ|AQUARELLE|AR|ARAB|ARAMCO|ARCHI|ARMY|ARPA|ART|ARTE|AS|ASDA|ASIA|ASSOCIATES|AT|ATHLETA|ATTORNEY|AU|AUCTION|AUDI|AUDIBLE|AUDIO|AUSPOST|AUTHOR|AUTO|AUTOS|AW|AWS|AX|AXA|AZ|AZURE|BA|BABY|BAIDU|BANAMEX|BAND|BANK|BAR|BARCELONA|BARCLAYCARD|BARCLAYS|BAREFOOT|BARGAINS|BASEBALL|BASKETBALL|BAUHAUS|BAYERN|BB|BBC|BBT|BBVA|BCG|BCN|BD|BE|BEATS|BEAUTY|BEER|BERLIN|BEST|BESTBUY|BET|BF|BG|BH|BHARTI|BI|BIBLE|BID|BIKE|BING|BINGO|BIO|BIZ|BJ|BLACK|BLACKFRIDAY|BLOCKBUSTER|BLOG|BLOOMBERG|BLUE|BM|BMS|BMW|BN|BNPPARIBAS|BO|BOATS|BOEHRINGER|BOFA|BOM|BOND|BOO|BOOK|BOOKING|BOSCH|BOSTIK|BOSTON|BOT|BOUTIQUE|BOX|BR|BRADESCO|BRIDGESTONE|BROADWAY|BROKER|BROTHER|BRUSSELS|BS|BT|BUILD|BUILDERS|BUSINESS|BUY|BUZZ|BV|BW|BY|BZ|BZH|CA|CAB|CAFE|CAL|CALL|CALVINKLEIN|CAM|CAMERA|CAMP|CANON|CAPETOWN|CAPITAL|CAPITALONE|CAR|CARAVAN|CARDS|CARE|CAREER|CAREERS|CARS|CASA|CASE|CASH|CASINO|CAT|CATERING|CATHOLIC|CBA|CBN|CBRE|CC|CD|CENTER|CEO|CERN|CF|CFA|CFD|CG|CH|CHANEL|CHANNEL|CHARITY|CHASE|CHAT|CHEAP|CHINTAI|CHRISTMAS|CHROME|CHURCH|CI|CIPRIANI|CIRCLE|CISCO|CITADEL|CITI|CITIC|CITY|CK|CL|CLAIMS|CLEANING|CLICK|CLINIC|CLINIQUE|CLOTHING|CLOUD|CLUB|CLUBMED|CM|CN|CO|COACH|CODES|COFFEE|COLLEGE|COLOGNE|COM|COMMBANK|COMMUNITY|COMPANY|COMPARE|COMPUTER|COMSEC|CONDOS|CONSTRUCTION|CONSULTING|CONTACT|CONTRACTORS|COOKING|COOL|COOP|CORSICA|COUNTRY|COUPON|COUPONS|COURSES|CPA|CR|CREDIT|CREDITCARD|CREDITUNION|CRICKET|CROWN|CRS|CRUISE|CRUISES|CU|CUISINELLA|CV|CW|CX|CY|CYMRU|CYOU|CZ|DAD|DANCE|DATA|DATE|DATING|DATSUN|DAY|DCLK|DDS|DE|DEAL|DEALER|DEALS|DEGREE|DELIVERY|DELL|DELOITTE|DELTA|DEMOCRAT|DENTAL|DENTIST|DESI|DESIGN|DEV|DHL|DIAMONDS|DIET|DIGITAL|DIRECT|DIRECTORY|DISCOUNT|DISCOVER|DISH|DIY|DJ|DK|DM|DNP|DO|DOCS|DOCTOR|DOG|DOMAINS|DOT|DOWNLOAD|DRIVE|DTV|DUBAI|DUPONT|DURBAN|DVAG|DVR|DZ|EARTH|EAT|EC|ECO|EDEKA|EDU|EDUCATION|EE|EG|EMAIL|EMERCK|ENERGY|ENGINEER|ENGINEERING|ENTERPRISES|EPSON|EQUIPMENT|ER|ERICSSON|ERNI|ES|ESQ|ESTATE|ET|EU|EUROVISION|EUS|EVENTS|EXCHANGE|EXPERT|EXPOSED|EXPRESS|EXTRASPACE|FAGE|FAIL|FAIRWINDS|FAITH|FAMILY|FAN|FANS|FARM|FARMERS|FASHION|FAST|FEDEX|FEEDBACK|FERRARI|FERRERO|FI|FIDELITY|FIDO|FILM|FINAL|FINANCE|FINANCIAL|FIRE|FIRESTONE|FIRMDALE|FISH|FISHING|FIT|FITNESS|FJ|FK|FLICKR|FLIGHTS|FLIR|FLORIST|FLOWERS|FLY|FM|FO|FOO|FOOD|FOOTBALL|FORD|FOREX|FORSALE|FORUM|FOUNDATION|FOX|FR|FREE|FRESENIUS|FRL|FROGANS|FRONTIER|FTR|FUJITSU|FUN|FUND|FURNITURE|FUTBOL|FYI|GA|GAL|GALLERY|GALLO|GALLUP|GAME|GAMES|GAP|GARDEN|GAY|GB|GBIZ|GD|GDN|GE|GEA|GENT|GENTING|GEORGE|GF|GG|GGEE|GH|GI|GIFT|GIFTS|GIVES|GIVING|GL|GLASS|GLE|GLOBAL|GLOBO|GM|GMAIL|GMBH|GMO|GMX|GN|GODADDY|GOLD|GOLDPOINT|GOLDPOINT|GOLF|GOODYEAR|GOOG|GOOGLE|GOP|GOT|GOV|GP|GQ|GR|GRAINGER|GRAPHICS|GRATIS|GREEN|GRIPE|GROCERY|GROUP|GS|GT|GU|GUCCI|GUGE|GUIDE|GUITARS|GURU|GW|GY|HAIR|HAMBURG|HANGOUT|HAUS|HBO|HDFC|HDFCBANK|HEALTH|HEALTHCARE|HELP|HELSINKI|HERE|HERMES|HIPHOP|HISAMITSU|HITACHI|HIV|HK|HKT|HM|HN|HOCKEY|HOLDINGS|HOLIDAY|HOMEDEPOT|HOMEGOODS|HOMES|HOMESENSE|HONDA|HORSE|HOSPITAL|HOST|HOSTING|HOT|HOTELS|HOTMAIL|HOUSE|HOW|HR|HSBC|HT|HU|HUGHES|HYATT|HYUNDAI|IBM|ICBC|ICE|ICU|ID|IE|IEEE|IFM|IKANO|IL|IM|IMAMAT|IMDB|IMMO|IMMOBILIEN|IN|INC|INDUSTRIES|INFINITI|INFO|ING|INK|INSTITUTE|INSURANCE|INSURE|INT|INTERNATIONAL|INTUIT|INVESTMENTS|IO|IPIRANGA|IQ|IR|IRISH|IS|ISMAILI|IST|ISTANBUL|IT|ITAU|ITV|JAGUAR|JAVA|JCB|JE|JEEP|JETZT|JEWELRY|JIO|JLL|JM|JMP|JNJ|JO|JOBS|JOBURG|JOT|JOY|JP|JPMORGAN|JPRS|JUEGOS|JUNIPER|KAUFEN|KDDI|KE|KERRYHOTELS|KERRYPROPERTIES|KFH|KG|KH|KI|KIA|KIDS|KIM|KINDLE|KITCHEN|KIWI|KM|KN|KOELN|KOMATSU|KOSHER|KP|KPMG|KPN|KR|KRD|KRED|KUOKGROUP|KW|KY|KYOTO|KZ|LA|LACAIXA|LAMBORGHINI|LAMER|LAND|LANDROVER|LANXESS|LASALLE|LAT|LATINO|LATROBE|LAW|LAWYER|LB|LC|LDS|LEASE|LECLERC|LEFRAK|LEGAL|LEGO|LEXUS|LGBT|LI|LIDL|LIFE|LIFEINSURANCE|LIFESTYLE|LIGHTING|LIKE|LILLY|LIMITED|LIMO|LINCOLN|LINK|LIVE|LIVING|LK|LLC|LLP|LOAN|LOANS|LOCKER|LOCUS|LOL|LONDON|LOTTE|LOTTO|LOVE|LPL|LPLFINANCIAL|LR|LS|LT|LTD|LTDA|LU|LUNDBECK|LUXE|LUXURY|LV|LY|MA|MADRID|MAIF|MAISON|MAKEUP|MAN|MANAGEMENT|MANGO|MAP|MARKET|MARKETING|MARKETS|MARRIOTT|MARSHALLS|MATTEL|MBA|MC|MCKINSEY|MD|ME|MED|MEDIA|MEET|MELBOURNE|MEME|MEMORIAL|MEN|MENU|MERCKMSD|MG|MH|MIAMI|MICROSOFT|MIL|MINI|MINT|MIT|MITSUBISHI|MK|ML|MLB|MLS|MM|MMA|MN|MO|MOBI|MOBILE|MODA|MOE|MOI|MOM|MONASH|MONEY|MONSTER|MORMON|MORTGAGE|MOSCOW|MOTO|MOTORCYCLES|MOV|MOVIE|MP|MQ|MR|MS|MSD|MT|MTN|MTR|MU|MUSEUM|MUSIC|MV|MW|MX|MY|MZ|NA|NAB|NAGOYA|NAME|NAVY|NBA|NC|NE|NEC|NET|NETBANK|NETFLIX|NETWORK|NEUSTAR|NEW|NEWS|NEXT|NEXTDIRECT|NEXUS|NF|NFL|NG|NGO|NHK|NI|NICO|NIKE|NIKON|NINJA|NISSAN|NISSAY|NL|NO|NOKIA|NORTON|NOW|NOWRUZ|NOWTV|NP|NR|NRA|NRW|NTT|NU|NYC|NZ|OBI|OBSERVER|OFFICE|OKINAWA|OLAYAN|OLAYANGROUP|OLLO|OM|OMEGA|ONE|ONG|ONL|ONLINE|OOO|OPEN|ORACLE|ORANGE|ORG|ORGANIC|ORIGINS|OSAKA|OTSUKA|OTT|OVH|PA|PAGE|PANASONIC|PARIS|PARS|PARTNERS|PARTS|PARTY|PAY|PCCW|PE|PET|PF|PFIZER|PG|PH|PHARMACY|PHD|PHILIPS|PHONE|PHOTO|PHOTOGRAPHY|PHOTOS|PHYSIO|PICS|PICTET|PICTURES|PID|PIN|PING|PINK|PIONEER|PIZZA|PK|PL|PLACE|PLAY|PLAYSTATION|PLUMBING|PLUS|PM|PN|PNC|POHL|POKER|POLITIE|PORN|POST|PR|PRAXI|PRESS|PRIME|PRO|PROD|PRODUCTIONS|PROF|PROGRESSIVE|PROMO|PROPERTIES|PROPERTY|PROTECTION|PRU|PRUDENTIAL|PS|PT|PUB|PW|PWC|PY|QA|QPON|QUEBEC|QUEST|RACING|RADIO|RE|READ|REALESTATE|REALTOR|REALTY|RECIPES|RED|REDUMBRELLA|REHAB|REISE|REISEN|REIT|RELIANCE|REN|RENT|RENTALS|REPAIR|REPORT|REPUBLICAN|REST|RESTAURANT|REVIEW|REVIEWS|REXROTH|RICH|RICHARDLI|RICOH|RIL|RIO|RIP|RO|ROCKS|RODEO|ROGERS|ROOM|RS|RSVP|RU|RUGBY|RUHR|RUN|RW|RWE|RYUKYU|SA|SAARLAND|SAFE|SAFETY|SAKURA|SALE|SALON|SAMSCLUB|SAMSUNG|SANDVIK|SANDVIKCOROMANT|SANOFI|SAP|SARL|SAS|SAVE|SAXO|SB|SBI|SBS|SC|SCB|SCHAEFFLER|SCHMIDT|SCHOLARSHIPS|SCHOOL|SCHULE|SCHWARZ|SCIENCE|SCOT|SD|SE|SEARCH|SEAT|SECURE|SECURITY|SEEK|SELECT|SENER|SERVICES|SEVEN|SEW|SEX|SEXY|SFR|SG|SH|SHANGRILA|SHARP|SHELL|SHIA|SHIKSHA|SHOES|SHOP|SHOPPING|SHOUJI|SHOW|SI|SILK|SINA|SINGLES|SITE|SJ|SK|SKI|SKIN|SKY|SKYPE|SL|SLING|SM|SMART|SMILE|SN|SNCF|SO|SOCCER|SOCIAL|SOFTBANK|SOFTWARE|SOHU|SOLAR|SOLUTIONS|SONG|SONY|SOY|SPA|SPACE|SPORT|SPOT|SR|SRL|SS|ST|STADA|STAPLES|STAR|STATEBANK|STATEFARM|STC|STCGROUP|STOCKHOLM|STORAGE|STORE|STREAM|STUDIO|STUDY|STYLE|SU|SUCKS|SUPPLIES|SUPPLY|SUPPORT|SURF|SURGERY|SUZUKI|SV|SWATCH|SWISS|SX|SY|SYDNEY|SYSTEMS|SZ|TAB|TAIPEI|TALK|TAOBAO|TARGET|TATAMOTORS|TATAR|TATTOO|TAX|TAXI|TC|TCI|TD|TDK|TEAM|TECH|TECHNOLOGY|TEL|TEMASEK|TENNIS|TEVA|TF|TG|TH|THD|THEATER|THEATRE|TIAA|TICKETS|TIENDA|TIPS|TIRES|TIROL|TJ|TJMAXX|TJX|TK|TKMAXX|TL|TM|TMALL|TN|TO|TODAY|TOKYO|TOOLS|TOP|TORAY|TOSHIBA|TOTAL|TOURS|TOWN|TOYOTA|TOYS|TR|TRADE|TRADE|TRAINING|TRAVEL|TRAVELERS|TRAVELERSINSURANCE|TRUST|TRV|TT|TUBE|TUI|TUNES|TUSHU|TV|TVS|TW|TZ|UA|UBANK|UBS|UG|UK|UNICOM|UNIVERSITY|UNO|UOL|UPS|US|UY|UZ|VA|VACATIONS|VANA|VANGUARD|VC|VE|VEGAS|VENTURES|VERISIGN|VERSICHERUNG|VET|VG|VI|VIAJES|VIDEO|VIG|VIKING|VILLAS|VIN|VIP|VIRGIN|VISA|VISION|VIVA|VIVO|VLAANDEREN|VN|VODKA|VOLVO|VOTE|VOTING|VOTO|VOYAGE|VU|WALES|WALMART|WALTER|WANG|WANGGOU|WATCH|WATCHES|WEATHER|WEATHERCHANNEL|WEBCAM|WEBER|WEBSITE|WED|WEDDING|WEIBO|WEIR|WF|WHOSWHO|WIEN|WIKI|WILLIAMHILL|WIN|WINDOWS|WINE|WINNERS|WME|WOLTERSKLUWER|WOODSIDE|WORK|WORKS|WORLD|WOW|WS|WTC|WTF|XBOX|XEROX|XIHUAN|XIN|XN--11B4C3D|XN--1CK2E1B|XN--1QQW23A|XN--2SCRJ9C|XN--30RR7Y|XN--3BST00M|XN--3DS443G|XN--3E0B707E|XN--3HCRJ9C|XN--3PXU8K|XN--42C2D9A|XN--45BR5CYL|XN--45BRJ9C|XN--45Q11C|XN--4DBRK0CE|XN--4GBRIM|XN--54B7FTA0CC|XN--55QW42G|XN--55QX5D|XN--5SU34J936BGSG|XN--5TZM5G|XN--6FRZ82G|XN--6QQ986B3XL|XN--80ADXHKS|XN--80AO21A|XN--80AQECDR1A|XN--80ASEHDB|XN--80ASWG|XN--8Y0A063A|XN--90A3AC|XN--90AE|XN--90AIS|XN--9DBQ2A|XN--9ET52U|XN--9KRT00A|XN--B4W605FERD|XN--BCK1B9A5DRE4C|XN--C1AVG|XN--C2BR7G|XN--CCK2B3B|XN--CCKWCXETD|XN--CG4BKI|XN--CLCHC0EA0B2G2A9GCD|XN--CZR694B|XN--CZRS0T|XN--CZRU2D|XN--D1ACJ3B|XN--D1ALF|XN--E1A4C|XN--ECKVDTC9D|XN--EFVY88H|XN--FCT429K|XN--FHBEI|XN--FIQ228C5HS|XN--FIQ64B|XN--FIQS8S|XN--FIQZ9S|XN--FJQ720A|XN--FLW351E|XN--FPCRJ9C3D|XN--FZC2C9E2C|XN--FZYS8D69UVGM|XN--G2XX48C|XN--GCKR3F0F|XN--GECRJ9C|XN--GK3AT1E|XN--H2BREG3EVE|XN--H2BRJ9C|XN--H2BRJ9C8C|XN--HXT814E|XN--I1B6B1A6A2E|XN--IMR513N|XN--IO0A7I|XN--J1AEF|XN--J1AMH|XN--J6W193G|XN--JLQ480N2RG|XN--JVR189M|XN--KCRX77D1X4A|XN--KPRW13D|XN--KPRY57D|XN--KPUT3I|XN--L1ACC|XN--LGBBAT1AD8J|XN--MGB9AWBF|XN--MGBA3A3EJT|XN--MGBA3A4F16A|XN--MGBA7C0BBN0A|XN--MGBAAM7A8H|XN--MGBAB2BD|XN--MGBAH1A3HJKRD|XN--MGBAI9AZGQP6J|XN--MGBAYH7GPA|XN--MGBBH1A|XN--MGBBH1A71E|XN--MGBC0A9AZCG|XN--MGBCA7DZDO|XN--MGBCPQ6GPA1A|XN--MGBERP4A5D4AR|XN--MGBGU82A|XN--MGBI4ECEXP|XN--MGBPL2FH|XN--MGBT3DHD|XN--MGBTX2B|XN--MGBX4CD0AB|XN--MIX891F|XN--MK1BU44C|XN--MXTQ1M|XN--NGBC5AZD|XN--NGBE9E0A|XN--NGBRX|XN--NODE|XN--NQV7F|XN--NQV7FS00EMA|XN--NYQY26A|XN--O3CW4H|XN--OGBPF8FL|XN--OTU796D|XN--P1ACF|XN--P1AI|XN--PGBS0DH|XN--PSSY2U|XN--Q7CE6A|XN--Q9JYB4C|XN--QCKA1PMC|XN--QXA6A|XN--QXAM|XN--RHQV96G|XN--ROVU88B|XN--RVC1E0AM3E|XN--S9BRJ9C|XN--SES554G|XN--T60B56A|XN--TCKWE|XN--TIQ49XQYJ|XN--UNUP4Y|XN--VERMGENSBERATER-CTB|XN--VERMGENSBERATUNG-PWB|XN--VHQUV|XN--VUQ861B|XN--W4R85EL8FHU5DNRA|XN--W4RS40L|XN--WGBH1C|XN--WGBL6A|XN--XHQ521B|XN--XKC2AL3HYE2A|XN--XKC2DL3A5EE0H|XN--Y9A3AQ|XN--YFRO4I67O|XN--YGBI2AMMX|XN--ZFR164B|XXX|XYZ|YACHTS|YAHOO|YAMAXUN|YANDEX|YE|YODOBASHI|YOGA|YOKOHAMA|YOU|YOUTUBE|YT|YUN|ZA|ZAPPOS|ZARA|ZERO|ZIP|ZM|ZONE|ZUERICH|ZW".split('|').sort((a, b) => b.length - a.length).join('|');
    const FILE_EXTS_REG = /\.(?:zip|7z|rar|tar|gz|bz2|xz|7zip|iso|apk|exe|doc|docx|xls|xlsx|ppt|pptx|pdf|epub|mobi|azw3|chm|txt|md|jpg|jpeg|png|gif|webp|bmp|svg|psd|ai|mp4|mpg|mkv|avi|mov|wmv|flv|webm|mp3|ogg|flac|wav|js|css|prop|url|mht|html|php|py|sh|lua|json|xml|yaml|sql|ps|ts|m4a|rmvb|torrent|cue|ass|srt|ttf|otf|woff)$/i;
    const PROTOCOL_PREFIX_REG = /^(https?:\/\/|ftp:\/\/|www\.)/i;
    const TLD_MATCH_REG = new RegExp(`^(${TLDS_SORTED})$`, 'i');

    function checkUrl(s) {
        const str = s.trim();
        if (/\s/.test(str)) return null;
        const protocolMatch = str.match(PROTOCOL_PREFIX_REG);
        if (!protocolMatch && !str.includes('.')) return null;
        const urlPath = str.split(/[?#]/)[0];
        if (FILE_EXTS_REG.test(urlPath) && !protocolMatch) return null;
        const hasProtocol = /^(https?:\/\/|ftp:\/\/)/i.test(str);
        const domain = str.replace(PROTOCOL_PREFIX_REG, '').split(/[/?#]/)[0].toLowerCase();
        if (!/^[a-z0-9.-]+$/.test(domain)) return null;
        const parts = domain.split('.');
        const tld = parts[parts.length - 1];
        if (TLD_MATCH_REG.test(tld) && parts.length > 1 && parts[0] !== '') return hasProtocol ? str : (str.toLowerCase().startsWith('www.') ? 'https://' + str : 'https://' + str);
        return hasProtocol ? str : null;
    }

    function initEngines() {
        if (!saved.pathRules) saved.pathRules = {};
        const currentXCount = (typeof xEngines !== 'undefined') ? xEngines.length : 0;
        if (saved.cache && saved.cache.length > 0 && saved._lastXCount === currentXCount) return saved.cache;
        let pool = [];
        (saved.custom || []).forEach(e => pool.push({...e, isCustom: true}));
        defaultEngines.forEach(e => pool.push({...e, isCustom: false}));
        if (typeof xEngines !== 'undefined') xEngines.forEach(e => pool.push({...e, isCustom: false}));
        let map = new Map();
        const seenUrls = new Set(), seenRegs = new Set();
        pool.forEach(e => {
            const urlKey = (e.url || '').toLowerCase(), host = (e.host || '').trim(), isRegExp = host.startsWith('/') && host.endsWith('/');
            let shouldAdd = false;
            if (isRegExp) { if (!seenRegs.has(host)) { seenRegs.add(host); shouldAdd = true; } } 
            else if (urlKey && !seenUrls.has(urlKey)) { seenUrls.add(urlKey); shouldAdd = true; }
            if (shouldAdd) {
                let id = e.id || storage.getStableId(e.name, e.host), finalId = id, suffix = 1;
                while (map.has(finalId)) finalId = id + '_' + (suffix++);
                map.set(finalId, { ...e, id: finalId, visible: !(saved.hidden || []).includes(finalId) });
            }
        });
        let list = Array.from(map.values()).filter(e => !(saved.deleted || []).includes(e.id));
        if (saved.order && saved.order.length > 0) {
            const orderMap = new Map(saved.order.map((id, i) => [id, i]));
            list.sort((a, b) => (orderMap.get(a.id) ?? 999) - (orderMap.get(b.id) ?? 999));
        }
        saved._lastXCount = currentXCount;
        if (list.length > 0) storage.save(list, saved.deleted);
        return list;
    }

    let allEngines = initEngines().map(e => { const h = (e.host || '').trim(); if (h.startsWith('/') && h.endsWith('/')) { try { const p = h.slice(1, -1); e._matchFn = s => new RegExp(p, 'i').test(s); } catch(err) { e._matchFn = s => s.toLowerCase().includes(h.toLowerCase()); } } else { e._matchFn = s => s.toLowerCase().includes(h.toLowerCase()); } return e; });

    function showManager() {
        if (shadow.getElementById('qs-manager-overlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'qs-manager-overlay';
        const card = document.createElement('div');
        card.className = 'qs-card';
        card.innerHTML = `
            <div style="padding:28px 24px 20px;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <div>
                        <div style="font-size:24px;font-weight:600;letter-spacing:-0.5px;">搜索设置</div>
                        <div style="font-size:14px;color:#49454f;margin-top:6px;opacity:0.8;">管理排序与引擎列表</div>
                    </div>
                    <div style="display:flex;gap:8px;">
                        <div id="m-data-btn" style="cursor:pointer;font-size:20px;padding:8px;background:rgba(var(--qs-pri-rgb),0.1);border-radius:12px;color:var(--qs-pri);">💾</div>
                        <div id="m-ocd-btn" style="cursor:pointer;font-size:20px;padding:8px;background:rgba(var(--qs-pri-rgb),0.1);border-radius:12px;color:var(--qs-pri);">🧩</div>
                        <div id="m-theme-btn" style="cursor:pointer;font-size:20px;padding:8px;background:rgba(var(--qs-pri-rgb),0.1);border-radius:12px;color:var(--qs-pri);">🎨</div>
                    </div>
                </div>
                <div id="m-theme-panel" style="display:none;margin-top:16px;padding:16px;background:rgba(var(--qs-pri-rgb),0.05);border-radius:20px;border:1px solid rgba(var(--qs-pri-rgb),0.1);">
                   <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;justify-content:center;">${['#6750a4', '#1d1b20', '#0061a4', '#006d39', '#ba1a1a', '#ffb400'].map(c => `<div class="theme-dot" data-color="${c}" style="width:30px;height:30px;border-radius:50%;background:${c};cursor:pointer;border:2px solid ${theme.primary.toLowerCase()===c?'#fff':'transparent'};box-shadow:0 2px 5px rgba(0,0,0,0.1);"></div>`).join('')}</div>
                 <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;background:rgba(255,255,255,0.5);padding:8px;border-radius:12px;border:1px solid rgba(0,0,0,0.05);">
                     <div style="position:relative;width:36px;height:36px;overflow:hidden;border-radius:8px;border:1px solid rgba(0,0,0,0.1);"> <input type="color" id="t-custom-color" value="${theme.primary}" style="position:absolute;top:-5px;left:-5px;width:50px;height:50px;padding:0;border:none;cursor:pointer;background:none;"></div>
                     <input type="text" id="t-hex-input" value="${theme.primary}" placeholder="#HEX" style="flex:1;background:transparent;border:none;outline:none;font-size:14px;font-family:monospace;color:var(--qs-pri);font-weight:600;">
                     <span style="font-size:11px;opacity:0.5;font-weight:600;">HEX</span>
                 </div>
                 <div id="t-style-switch" style="cursor:pointer;margin-bottom:16px;padding:12px;background:var(--qs-pri);color:var(--qs-on-pri);border-radius:14px;text-align:center;font-weight:600;font-size:13px;box-shadow:0 4px 12px rgba(var(--qs-pri-rgb),0.2);">✨ 当前风格: ${theme.themeStyle || 'MIUIX'}</div>
                   <div style="font-size:12px;opacity:0.7;margin-bottom:4px;display:flex;justify-content:space-between;"> <span>透明度</span><span id="v-opacity">${Math.round(theme.opacity*100)}%</span> </div>
                    <input type="range" id="t-opacity" min="10" max="100" value="${theme.opacity*100}" style="width:100%;accent-color:var(--qs-pri);margin-bottom:12px;">
                      <div style="font-size:12px;opacity:0.7;margin-bottom:4px;display:flex;justify-content:space-between;"> <span>高斯模糊</span><span id="v-blur">${theme.blur}px</span> </div>
                    <input type="range" id="t-blur" min="0" max="50" value="${theme.blur}" style="width:100%;accent-color:var(--qs-pri);">   
                  <button id="t-reset" style="width:100%;margin-top:12px;padding:8px;border:none;background:none;color:var(--qs-pri);font-weight:600;font-size:12px;cursor:pointer;opacity:0.8;">恢复默认配色</button>
                </div>
                 <div id="m-ocd-panel" style="display:none;margin-top:16px;padding:16px;background:rgba(var(--qs-pri-rgb),0.05);border-radius:20px;border:1px solid rgba(var(--qs-pri-rgb),0.1);font-size:13px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <span>布局位置</span>
                          <button id="l-pos-toggle" style="padding:6px 16px;border-radius:10px;border:none;background:var(--qs-pri);color:var(--qs-on-pri);font-weight:600;cursor:pointer;font-size:12px;min-width:60px;">
                            ${layout.pos === 'top' ? '↑靠上' : '靠下↓'}
                          </button>
                    </div>
                    <div style="margin-bottom:12px;">
                        <div style="display:flex;justify-content:space-between;opacity:0.7;margin-bottom:4px;">
                            <span>边距 (px)</span><span id="l-offset-val">${layout.offset}</span>
                        </div>
                        <input type="range" id="l-offset" min="0" max="200" value="${layout.offset}" style="width:100%;accent-color:var(--qs-pri);">
                    </div>
                    <div style="display:flex;gap:10px;margin-bottom:12px;">
                        <button id="l-hide" style="flex:1;padding:10px;border-radius:12px;border:none;background:${layout.autoHide?'var(--qs-pri)':'rgba(0,0,0,0.05)'};color:${layout.autoHide?'var(--qs-on-pri)':'#49454f'};font-weight:600;cursor:pointer;font-size:12px;">${layout.autoHide?'✅':'🚫'} 滑动隐藏</button>
                        <button id="l-input" style="flex:1;padding:10px;border-radius:12px;border:none;background:${layout.showInput?'var(--qs-pri)':'rgba(0,0,0,0.05)'};color:${layout.showInput?'var(--qs-on-pri)':'#49454f'};font-weight:600;cursor:pointer;font-size:12px;">${layout.showInput?'✅':'🚫'} 搜索框</button>
                    </div>
                    <div style="display:flex;gap:10px;margin-bottom:12px;">
                        <button id="l-shrink" style="flex:1;padding:10px;border-radius:12px;border:none;background:${layout.shrinkMode?'var(--qs-pri)':'rgba(0,0,0,0.05)'};color:${layout.shrinkMode?'var(--qs-on-pri)':'#49454f'};font-weight:600;cursor:pointer;font-size:12px;">${layout.shrinkMode?'✅':'🚫'} 贴边收缩</button>
                        <button id="l-suggest" style="flex:1;padding:10px;border-radius:12px;border:none;background:${layout.showSuggest?'var(--qs-pri)':'rgba(0,0,0,0.05)'};color:${layout.showSuggest?'var(--qs-on-pri)':'#49454f'};font-weight:600;cursor:pointer;font-size:12px;">${layout.showSuggest?'✅':'🚫'} 搜索建议</button>
                    </div>
                    <div id="m-style-cycle" style="cursor:pointer;font-size:12px;padding:10px;background:var(--qs-pri);color:var(--qs-on-pri);border-radius:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 2px 8px rgba(var(--qs-pri-rgb),0.2);">🔍搜索框样式 ${layout.inputStyle || 1}</div>
                    <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;opacity:0.8;"> <span>历史记录上限</span> <input type="number" id="l-his-limit" value="${layout.historyLimit || 100}" style="width:60px;padding:4px;border-radius:6px;border:1px solid rgba(0,0,0,0.1);text-align:center;"></div>
                 </div>
                <div id="m-data-panel" style="display:none;margin-top:16px;padding:16px;background:rgba(var(--qs-pri-rgb),0.05);border-radius:20px;border:1px solid rgba(var(--qs-pri-rgb),0.1);font-size:13px;">
                    <div style="display:flex;gap:10px;margin-bottom:12px;">
                        <button id="d-export" style="flex:1;padding:10px;border-radius:12px;border:none;background:var(--qs-pri);color:var(--qs-on-pri);font-weight:600;cursor:pointer;font-size:12px;">导出配置</button>
                        <button id="d-import" style="flex:1;padding:10px;border-radius:12px;border:none;background:var(--qs-pri);color:var(--qs-on-pri);font-weight:600;cursor:pointer;font-size:12px;">导入配置</button>
                    </div>
                    <div id="d-import-opts" style="display:none;padding:12px;background:rgba(255,255,255,0.5);border-radius:14px;border:1px solid rgba(0,0,0,0.05);">
                        <div style="margin-bottom:10px;font-weight:600;text-align:center;">发现冲突，请选择导入方式：</div>
                            <div style="font-size:11px;color:#666;line-height:1.5;margin-bottom:12px;padding:0 4px;opacity:0.8;">
                                 • <b>合并：</b>保留当前所有配置，仅追加文件中独有的搜索引擎，且不改变当前主题颜色。<br>
                                 • <b>覆盖：</b>清空当前所有配置，完全还原为文件中的状态（含引擎列表、排序及主题配色）。
                            </div>
                        <div style="display:flex;gap:8px;">
                            <button id="d-merge" style="flex:1;padding:8px;border-radius:8px;border:none;background:#6750a4;color:#fff;font-size:11px;cursor:pointer;">保留现有+合并新项</button>
                            <button id="d-cover" style="flex:1;padding:8px;border-radius:8px;border:none;background:#ba1a1a;color:#fff;font-size:11px;cursor:pointer;">完全覆盖旧数据</button>
                        </div>
                    </div>
                    <input type="file" id="d-file" accept=".json,.txt,.bin,application/json,text/json,text/plain" style="display:none;">
                </div>
             </div>
            <div id="m-list" style="flex:1;overflow-y:auto;padding:0 16px 12px;scrollbar-width:none;"></div>
            <div id="m-add-form" style="display:none;padding:24px;background:rgba(var(--qs-pri-rgb),0.06);margin:0 16px 16px;border-radius:24px;border:1px solid rgba(var(--qs-pri-rgb),0.1);">
                <input id="in-name" class="qs-input-field" placeholder="名称" style="margin-bottom:12px;">
                <input id="in-host" class="qs-input-field" placeholder="匹配域名 (bilibili.com)" style="margin-bottom:12px;">
                <input id="in-url" class="qs-input-field" placeholder="链接 (含 %s)" style="margin-bottom:16px;">
                <div style="display:flex;gap:12px;">
                    <button id="in-confirm" class="qs-btn qs-btn-active" style="flex:1;border-radius:12px;">添加</button>
                    <button id="in-cancel" class="qs-btn qs-btn-flat" style="flex:1;border-radius:12px;">取消</button>
                </div>
            </div>
            <div style="padding:16px 20px 24px;display:flex;gap:10px;align-items:center;border-top:1px solid rgba(0,0,0,0.05);">
                <button id="m-add-btn" class="qs-btn" style="height:48px;padding:0 20px;background:rgba(var(--qs-pri-rgb),0.35);color:var(--qs-on-pri);border-radius:16px;">+ 新增</button>
                <button id="m-reset-btn" class="qs-btn" style="height:48px;padding:0 16px;background:transparent;color:var(--qs-pri);border-radius:16px;">还原默认</button>
                <button id="m-close" class="qs-btn qs-btn-active" style="height:48px;margin-left:auto;padding:0 28px;border-radius:16px;">完成</button>
            </div>
        `;
        overlay.appendChild(card);
        shadow.appendChild(overlay);
        
        let pendingData = null;
        const applyImport = (isMerge) => {
            if (!pendingData) return;
            if (isMerge) {
                if (pendingData[STORAGE_KEY]) {
                    const local  = storage.load();
                    const remote = pendingData[STORAGE_KEY];
                    const localCustomIds = new Set(local.custom.map(e => e.id));
                    const newCustom = remote.custom.filter(nc => !localCustomIds.has(nc.id));
                    const mergedCustom = [...local.custom, ...newCustom];
                    const mergedOrder = [ ...local.order, ...remote.order.filter(id => !local.order.includes(id))];
                    const mergedHidden  = [...new Set([...(local.hidden  || []), ...(remote.hidden  || [])])];
                    const mergedDeleted = [...new Set([...(local.deleted || []), ...(remote.deleted || [])])];
                    const mergedPathRules = { ...(local.pathRules || {}), ...(remote.pathRules || {}) };
                    const merged = {
                        custom  : mergedCustom,
                        order   : mergedOrder,
                        hidden  : mergedHidden,
                        deleted : mergedDeleted,
                        pathRules: mergedPathRules,
                        cache   : null
                    };
                    if (typeof GM_setValue !== 'undefined') GM_setValue(STORAGE_KEY, merged);
                    else localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
                }
            } 
            else {
                if (pendingData[THEME_KEY]) storage.themeSave(pendingData[THEME_KEY]);
                if (pendingData[LAYOUT_KEY]) storage.layoutSave(pendingData[LAYOUT_KEY]);
                if (pendingData[STORAGE_KEY]) {
                    const d = pendingData[STORAGE_KEY];
                    d.cache = null;
                    if (typeof GM_setValue !== 'undefined') GM_setValue(STORAGE_KEY, d);
                    else localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
                }
            }
            location.reload();
        };

        const themeBtn = card.querySelector('#m-theme-btn'), themePanel = card.querySelector('#m-theme-panel');
        const ocdBtn = card.querySelector('#m-ocd-btn'), ocdPanel = card.querySelector('#m-ocd-panel');
        const hexInput = card.querySelector('#t-hex-input'), colorPicker = card.querySelector('#t-custom-color');
        const opacitySlider = card.querySelector('#t-opacity'), blurSlider = card.querySelector('#t-blur');
        const styleCycleBtn = card.querySelector('#m-style-cycle');
        const styleSwitch = card.querySelector('#t-style-switch');
        const updateAll = () => { storage.themeSave(theme); applyTheme(); };
        const dataBtn = card.querySelector('#m-data-btn'), dataPanel = card.querySelector('#m-data-panel');
        const fileInput = card.querySelector('#d-file'), importOpts = card.querySelector('#d-import-opts');

        hexInput.oninput = (e) => { if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) { theme.primary = e.target.value; colorPicker.value = e.target.value; updateAll(); } };
        hexInput.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); hexInput.blur(); updateAll(); } };
        colorPicker.oninput = (e) => { theme.primary = e.target.value; hexInput.value = e.target.value; updateAll(); };
        opacitySlider.oninput = (e) => { theme.opacity = e.target.value / 100; card.querySelector('#v-opacity').innerText = e.target.value + '%'; updateAll(); };
        blurSlider.oninput = (e) => { theme.blur = e.target.value; card.querySelector('#v-blur').innerText = e.target.value + 'px'; updateAll(); };
        fileInput.onchange = (e) => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (ev) => { try { pendingData = JSON.parse(ev.target.result); importOpts.style.display = 'block'; } catch (err) { alert('无效的JSON文件'); } }; reader.readAsText(file); };
        themeBtn.onclick = () => { [ocdPanel, dataPanel].forEach(p => p.style.display = 'none'); themePanel.style.display = themePanel.style.display === 'none' ? 'block' : 'none'; };
        ocdBtn.onclick = () => { [themePanel, dataPanel].forEach(p => p.style.display = 'none'); ocdPanel.style.display = ocdPanel.style.display === 'none' ? 'block' : 'none'; };
        dataBtn.onclick = () => { [themePanel, ocdPanel].forEach(p => p.style.display = 'none'); dataPanel.style.display = dataPanel.style.display === 'none' ? 'block' : 'none'; };
        styleCycleBtn.onclick = () => { layout.inputStyle = ((parseInt(layout.inputStyle) || 1) % 3) + 1; storage.layoutSave(layout); styleCycleBtn.innerText = `🔍搜索框样式 ${layout.inputStyle}`; styleCycleBtn.style.transform = 'scale(0.95)'; styleCycleBtn.style.transition = 'transform 0.1s'; setTimeout(() => { styleCycleBtn.style.transform = 'scale(1)'; }, 100); };
        styleSwitch.onclick = () => { theme.themeStyle = (theme.themeStyle === 'MIUIX' ? 'MD3' : 'MIUIX'); styleSwitch.innerText = `✨ 当前风格: ${theme.themeStyle}`; updateAll(); applyTheme(); styleSwitch.style.transform = 'scale(0.95)'; styleSwitch.style.transition = 'transform 0.2s'; setTimeout(() => styleSwitch.style.transform = 'scale(1)', 150); };

        card.querySelectorAll('.theme-dot').forEach(dot => { dot.onclick = () => { theme.primary = dot.dataset.color; hexInput.value = theme.primary; colorPicker.value = theme.primary; updateAll(); overlay.remove(); showManager(); }; });
        card.querySelector('#t-reset').onclick = () => { theme = {...defaultTheme}; updateAll(); overlay.remove(); showManager(); };
        card.querySelector('#l-pos-toggle').onclick = (e) => { layout.pos = layout.pos === 'top' ? 'bottom' : 'top'; storage.layoutSave(layout); e.target.innerText = layout.pos === 'top' ? '↑靠上' : '靠下↓'; };
        card.querySelector('#l-offset').oninput = (e) => { layout.offset = e.target.value; card.querySelector('#l-offset-val').innerText = layout.offset; storage.layoutSave(layout); };
        card.querySelector('#d-merge').onclick = () => applyImport(true);
        card.querySelector('#d-cover').onclick = () => applyImport(false);
        card.querySelector('#d-import').onclick = () => fileInput.click();
        card.querySelector('#d-export').onclick = () => { const config = { [STORAGE_KEY]: storage.load(), [THEME_KEY]: storage.themeLoad(), [LAYOUT_KEY]: storage.layoutLoad() }; const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `search_bar_config_${new Date().getTime()}.json`; a.click(); };
        card.querySelector('#l-his-limit').onchange = (e) => { layout.historyLimit = parseInt(e.target.value) || 100; storage.layoutSave(layout); };

        const updateLayoutBtn = (id, active, text) => {
            const btn = card.querySelector(id);
            btn.innerText = (active ? '✅' : '🚫') + text;
            btn.style.background = active ? 'var(--qs-pri)' : 'rgba(0,0,0,0.05)';
            btn.style.color = active ? 'var(--qs-on-pri)' : '#49454f';
            btn.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        };
        const toggleLayout = (e, key, id, text, extraLogic) => {
            e.stopPropagation();
            const btn = e.currentTarget;
            layout[key] = !layout[key];
            if (extraLogic) extraLogic();
            storage.layoutSave(layout);
            updateLayoutBtn(id, layout[key], text);
            btn.style.transform = 'scale(0.92)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);
        };
        card.querySelector('#l-input').onclick = (e) => toggleLayout(e, 'showInput', '#l-input', ' 搜索框');
        card.querySelector('#l-hide').onclick = (e) => toggleLayout(e, 'autoHide', '#l-hide', ' 滑动隐藏', () => { if (layout.autoHide) { layout.shrinkMode = false; updateLayoutBtn('#l-shrink', false, ' 贴边收缩模式'); } });
        card.querySelector('#l-shrink').onclick = (e) => toggleLayout(e, 'shrinkMode', '#l-shrink', ' 贴边收缩模式', () => { if (layout.shrinkMode) { layout.autoHide = false; updateLayoutBtn('#l-hide', false, ' 滑动隐藏'); } });
        card.querySelector('#l-suggest').onclick = (e) => toggleLayout(e, 'showSuggest', '#l-suggest', ' 搜索建议');

       const render = () => {
            const list = card.querySelector('#m-list');
            list.innerHTML = '';
            allEngines.forEach((e, i) => {
                const currentRule = (saved.pathRules && saved.pathRules[e.host]) ? saved.pathRules[e.host] : '';
                const container = document.createElement('div');
                container.className = 'se-item-container';
                container.innerHTML = `
                    <div class="se-item">
                        <div class="toggle-box ${e.visible ? 'active' : ''}"><div class="toggle-circle"></div></div>
                        <div style="flex:1;overflow:hidden;">
                            <div style="font-size:15px;font-weight:600;">${e.name}</div>
                            <div style="font-size:11px;opacity:0.6;">${e.host}</div>
                        </div>
                        <div style="display:flex;gap:2px;">
                            <button class="up btn-icon">↑</button>
                            <button class="down btn-icon">↓</button>
                            <button class="del btn-icon" style="color:#ba1a1a;">✕</button>
                        </div>
                    </div>
                    <div class="edit-form">
                        <input class="ed-name qs-input-field" value="${e.name}" style="padding:8px;margin-bottom:8px;border-radius:8px;">
                        <input class="ed-host qs-input-field" value="${e.host}" style="padding:8px;margin-bottom:8px;border-radius:8px;">
                        <input class="ed-url qs-input-field" value="${e.url}" style="padding:8px;margin-bottom:8px;border-radius:8px;">
                        <input class="ed-path qs-input-field" value="${currentRule}" placeholder="路径规则 (例如 /zidian/)" style="padding:8px;margin-bottom:8px;border-radius:8px;border-color:var(--qs-pri) !important;${currentRule ? '' : 'display:none;'}">
                        <button class="ed-save qs-btn qs-btn-active" style="width:100%;padding:10px;border-radius:8px;">保存修改</button>
                    </div>
                `;
                container.querySelector('.se-item').onclick = (ev) => { if (!ev.target.closest('.btn-icon') && !ev.target.closest('.toggle-box')) container.querySelector('.edit-form').classList.toggle('open'); };
                container.querySelector('.toggle-box').onclick = () => { e.visible = !e.visible; storage.save(allEngines, saved.deleted); render(); };
                container.querySelector('.up').onclick = () => { if (i > 0) { [allEngines[i], allEngines[i - 1]] = [allEngines[i - 1], allEngines[i]]; storage.save(allEngines, saved.deleted); render(); } };
                container.querySelector('.down').onclick = () => { if (i < allEngines.length - 1) { [allEngines[i], allEngines[i + 1]] = [allEngines[i + 1], allEngines[i]]; storage.save(allEngines, saved.deleted); render(); } };
                container.querySelector('.del').onclick = () => { saved.deleted.push(e.id); allEngines.splice(i, 1); storage.save(allEngines, saved.deleted); render(); };
                container.querySelector('.ed-save').onclick=()=>{const n=container.querySelector('.ed-name').value.trim(),h=container.querySelector('.ed-host').value.trim(),u=normalizeUrl(container.querySelector('.ed-url').value.trim()),p=container.querySelector('.ed-path').value.trim().replace(/%(s|keywords)%?/gi, '');if(n&&h&&u.includes('%s')){if(p){if(!saved.pathRules)saved.pathRules={};saved.pathRules[h]=p}else if(saved.pathRules){delete saved.pathRules[h]}const newId=(n===e.name&&h===e.host)?e.id:storage.getStableId(n,h);Object.assign(e,{name:n,host:h,url:u,id:newId,isCustom:true});storage.save(allEngines,saved.deleted);render()}else{alert('请检查输入')}};
                list.appendChild(container);
            });
        };

        const addForm = card.querySelector('#m-add-form'), inName = card.querySelector('#in-name'), inHost = card.querySelector('#in-host'), inUrl = card.querySelector('#in-url');
        inUrl.oninput=()=>{try{const u=inUrl.value.trim();if(!u)return;const f=new URL(u.startsWith('http')?u:'https://'+u).hostname.replace(/^(www\.|m\.)/i,'');if(!inHost.value)inHost.value=f;if(!inName.value){const r=f.split('.')[0];inName.value=r.charAt(0).toUpperCase()+r.slice(1)}}catch(e){}};
        card.querySelector('#in-confirm').onclick=()=>{const u=normalizeUrl(inUrl.value);let n=inName.value.trim(),h=inHost.value.trim();if(!u.includes('%s'))return alert('URL必须包含%s');if(allEngines.some(e=>e.host===h&&e.name===n))return alert('已存在');try{const p1=u.split('%s')[0],m=p1.match(/([\/|?|&][^\/|?|&]+)$/);if(m){const s=m[1].replace(/%(s|keywords)%?/gi, '');if(s.length>1&&!longSignals.some(l=>s.includes(l))&&!strictSignals.some(t=>s==='/'+t)){if(!saved.pathRules)saved.pathRules={};saved.pathRules[h]=s}}else{const tU=new URL(u.replace('%s','pk')),pA=tU.pathname.split('/'),i=pA.indexOf('pk');if(i>0){const s=pA[i-1];if(s&&!longSignals.includes(s)&&!strictSignals.includes(s)){if(!saved.pathRules)saved.pathRules={};saved.pathRules[h]='/'+s+'/'}}}}catch(e){}const ne={name:n,host:h,url:u,id:storage.getStableId(n,h),visible:true,isCustom:true};if(h.startsWith('/')&&h.endsWith('/')){try{const p=h.slice(1,-1);ne._matchFn=s=>new RegExp(p,'i').test(s)}catch(e){ne._matchFn=s=>s.toLowerCase().includes(h.toLowerCase())}}else{ne._matchFn=s=>s.toLowerCase().includes(h.toLowerCase())}allEngines.push(ne);storage.save(allEngines,saved.deleted);addForm.style.display='none';render()};
        card.querySelector('#m-add-btn').onclick = () => { addForm.style.display = 'block'; inName.value = inHost.value = inUrl.value = ''; };
        card.querySelector('#in-cancel').onclick = () => addForm.style.display = 'none';
        card.querySelector('#m-reset-btn').onclick=()=>{if(confirm('确定还原？')){saved={custom:[],order:[],hidden:[],deleted:[]};allEngines=initEngines();storage.save(allEngines,[]);render()}};render();
        card.querySelector('#m-close').onclick=()=>{location.reload()};
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    }
    
    const currentEngine = allEngines.filter(e => e.visible).find(e => e.host && e._matchFn(location.host.toLowerCase()));
    const isMatchedHost = !!currentEngine;

    const query = (() => {
        if (!isMatchedHost) return null;
        let result = null;
        try {
            const url = new URL(location.href);
            if (url.pathname === '/' && !url.search && !url.hash) return null;
            const fullPath = url.pathname + url.search + url.hash;
            const customRule = saved.pathRules ? saved.pathRules[currentEngine.host] : null;
            let hasFoundByRule = false;
            if (customRule) {
                const cleanRule = customRule.replace(/%(s|keywords)%?/gi, '');
                const ruleIdx = fullPath.toLowerCase().indexOf(cleanRule.toLowerCase());
                if (ruleIdx !== -1) {
                    let part = fullPath.substring(ruleIdx + cleanRule.length).split(/[&?]/)[0];
                    if (part) {
                        if (/\.(html|php|jsp|asp|htm)$/i.test(part) && /-\d+\./.test(part)) {
                            part = part.replace(/-(\d+)\./, '.');
                        }
                        const allSignals = [...longSignals, ...strictSignals];
                        const pieces = part.split('/').filter(p => p && !allSignals.includes(p.toLowerCase()));
                        result = pieces[0] || part;
                        if (result) hasFoundByRule = true;
                    }
                }
            }
            let hasParam = false;
            if (!result) {
                for (const p of queryParams) {
                    const reg = new RegExp(`[?&]${p}=([^&]+)`, 'i');
                    const match = (location.search + location.hash).match(reg);
                    if (match && match[1]) {
                        result = decodeURIComponent(match[1].replace(/\+/g, ' ')).trim();
                        hasParam = true;
                        break;
                    }
                }
            }
            const pathLower = url.pathname.toLowerCase();
            const hasPathSignal = longSignals.some(sig => pathLower.includes('/' + sig + '/') || pathLower.endsWith('/' + sig)) || strictSignals.some(sig => pathLower.includes('/' + sig + '/'));
            if (!result && hasPathSignal) {
                const pathParts = url.pathname.split('/').filter(p => p.length > 0);
                const allSignals = [...longSignals, ...strictSignals];
                const sigIdx = pathParts.findIndex(p => allSignals.includes(p.toLowerCase()));
                let targetPart = (sigIdx !== -1 && pathParts[sigIdx + 1]) ? pathParts[sigIdx + 1] : pathParts[pathParts.length - 1];
                if (targetPart) {
                    if (/\.(html|php|jsp|asp|htm)$/i.test(targetPart) && /-\d+\./.test(targetPart)) {
                        targetPart = targetPart.replace(/-(\d+)\./, '.');
                    }
                    let cleanPart = decodeURIComponent(targetPart).split(/[?&#/]/)[0].replace(/\.(html|php|jsp|asp|htm)$/i, '');
                    if (cleanPart && !/^\d+$/.test(cleanPart) && !allSignals.includes(cleanPart.toLowerCase()) && !cleanPart.includes('.')) {
                        result = targetPart;
                    }
                }
            }
            if (result) {
                result = decodeURIComponent(result).split(/[?&#/]/)[0].replace(/^[?&=/]+/g, '').replace(/\.(html|php|jsp|asp|htm)$/i, '').replace(/^-+|-+$/g, '').trim();
                const allSignals = [...longSignals, ...strictSignals];
                if (!hasFoundByRule && !hasParam && (/^\d+$/.test(result) || allSignals.includes(result.toLowerCase()) || result.includes('.'))) result = null;
            }
            if (!result || result === '') {
                if (hasFoundByRule || hasParam || hasPathSignal) {
                    const searchInput = document.querySelector('input[name="wd"], input[name="q"], input[name="search"], input.keyword, input#wdInput, input#txtKeywords, input[type="search"]');
                    if (searchInput && searchInput.value && searchInput.value.trim() !== '') {
                        result = searchInput.value.trim();
                    }
                }
            }
        } catch (e) { console.warn("关键词提取错误:", e); }
        return (result && result.trim() !== '') ? result : null;
    })();

    if (query && isMatchedHost) {
        applyTheme();
        updateSuggestStyle();
        document.body.appendChild(shadowHost);
        requestAnimationFrame(() => {
            const bar = document.createElement('div');
            bar.className = 'qs-bar';
            bar.style[layout.pos === 'top' ? 'top' : 'bottom'] = `${layout.offset}px`;
            const getBestMatched = () => allEngines.filter(e => e.visible && e.host && e._matchFn(location.host.toLowerCase())).map(e => { let s = (e.host === location.host.toLowerCase() ? 1000 : (!e.host.includes('/') ? 500 : 0)), u; try { u = new URL(e.url); const path = location.pathname.toLowerCase(); const targetPath = u.pathname.toLowerCase(); if (targetPath !== '/') { if (path === targetPath || path.startsWith(targetPath + '/')) s += 800; else if (path.includes(targetPath.replace(/\/$/, ''))) s += 400; } u.searchParams.forEach(v => { const f = v.replace(/%s|%keywords%/g, '').trim().toLowerCase(); if (f && decodeURIComponent(location.href.toLowerCase()).includes(f)) s += 600; }); } catch(err) {} return { e, s: s + (allEngines.length - allEngines.indexOf(e)) }; }).sort((a, b) => b.s - a.s)[0]?.e;
            const bestMatched = getBestMatched();
            const showSuggest = async val => { if (!layout.showSuggest) return; const mask = shadow.getElementById('mask'), box = shadow.getElementById('box'); if (!val) { mask.style.display = box.style.display = 'none'; return; } let his = historyManager.get().filter(h => h.includes(val)).slice(0, 8); const render = (items) => { box.innerHTML = ''; if (items.length > 0) { mask.style.display = 'block'; box.style.display = 'flex'; items.slice(0, 26).forEach(item => { const div = document.createElement('div'); div.className = 'item ' + (item.c || ''); div.textContent = item.t; div.onclick = (e) => { e.preventDefault(); e.stopPropagation(); doSearch(bestMatched || allEngines[0], item.t) }; box.appendChild(div) }) } else { mask.style.display = 'block'; box.style.display = 'flex'; box.innerHTML = '<div class="item">联想中...</div>' } }; let initialItems = his.map(h => ({ t: h, c: 'his' })); render(initialItems); suggestApi.fetchAll(val, (sug) => { render([...sug.map(s => ({ t: s, c: '' })).reverse(), ...initialItems]) }); };
            const syncInputs = (val) => { bar.querySelectorAll('.qs-main-input').forEach(el => { if (el.value !== val) el.value = val; });};
            const doSearch = (targetEngine, keyword) => { if (!keyword) return; const urlLink = checkUrl(keyword); if (urlLink) { window.location.href = urlLink; return; } historyManager.add(keyword); let targetUrl = targetEngine.url; if (targetUrl.includes('custom_browser_search')) { const p = new URLSearchParams(new URL(targetUrl).search); targetUrl = decodeURIComponent(p.get('url')); } let isExactPage = false; if (targetEngine._matchFn && targetEngine._matchFn(location.host.toLowerCase())) { try { const u = new URL(targetUrl); if (location.pathname.toLowerCase().includes(u.pathname.toLowerCase().replace('%s', '').replace('%keywords%', ''))) isExactPage = true; } catch(e) { isExactPage = true; } } if (isExactPage) { try { if (query) { const variations = [query, encodeURIComponent(query), encodeURIComponent(query).replace(/%20/g, '+'), encodeURIComponent(query).replace(/\*/g, '%2A')]; const pattern = variations.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).filter((v, i, a) => a.indexOf(v) === i).join('|'); const reg = new RegExp(pattern, 'g'); const nextUrl = location.href.replace(reg, encodeURIComponent(keyword).replace(/%20/g, '+')); if (nextUrl !== location.href) { const uObj = new URL(nextUrl); uObj.searchParams.delete('first'); uObj.searchParams.delete('p'); uObj.searchParams.delete('start'); targetUrl = uObj.toString(); } else { targetUrl = targetUrl.replace(/%s/g, encodeURIComponent(keyword).replace(/%20/g, '+')).replace(/%keywords%/g, encodeURIComponent(keyword).replace(/%20/g, '+')); } } else { targetUrl = targetUrl.replace(/%s/g, encodeURIComponent(keyword).replace(/%20/g, '+')).replace(/%keywords%/g, encodeURIComponent(keyword).replace(/%20/g, '+')); } } catch(e) { targetUrl = targetUrl.replace(/%s/g, encodeURIComponent(keyword).replace(/%20/g, '+')).replace(/%keywords%/g, encodeURIComponent(keyword).replace(/%20/g, '+')); } } else { targetUrl = targetUrl.replace(/%s/g, encodeURIComponent(keyword).replace(/%20/g, '+')).replace(/%keywords%/g, encodeURIComponent(keyword).replace(/%20/g, '+')); } const norm = u => decodeURIComponent(u.replace(/\+/g, '%20')); if (norm(window.location.href) === norm(targetUrl)) return; window.location.href = targetUrl; };
            const curStyle = layout.inputStyle || 1;

            if (curStyle === 3 && layout.showInput) {
                const input = document.createElement('input');
                input.className = 'qs-main-input';
                input.value = query;
                input.placeholder = "搜索...";
                input.style.cssText = `width:80px;padding:8px 14px;border-radius:100px;background:rgba(var(--qs-pri-rgb),0.08);color:#1d1b20;flex-shrink:0;`;
                input.onfocus = () => { input.style.width = '130px'; input.style.background = 'rgba(var(--qs-pri-rgb),0.15)'; showSuggest(input.value); };
                input.onblur = () => { setTimeout(() => { shadow.getElementById('mask').style.display = shadow.getElementById('box').style.display = 'none'; input.style.width = '80px'; input.style.background = 'rgba(var(--qs-pri-rgb),0.08)'; }, 200); };
                input.oninput = (ev) => { syncInputs(ev.target.value); showSuggest(ev.target.value); };
                input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopImmediatePropagation(); doSearch(bestMatched || allEngines[0], e.target.value.trim()); } };
                bar.appendChild(input);
            }

            allEngines.filter(e => e.visible).forEach(e => {
                const isBest = bestMatched && e.id === bestMatched.id;
                let longPressTimer;
                const startLongPress = (ev) => { 
                    longPressTimer = setTimeout(() => { 
                        ev.preventDefault(); 
                        ev.stopImmediatePropagation(); 
                        showManager(); 
                        longPressTimer = null;
                    }, 600); 
                };
                const cancelLongPress = () => { if(longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; } };
                if (isBest && layout.showInput) {
                    if (curStyle === 1) {
                        const wrapper = document.createElement('div');
                        wrapper.style.cssText = `display:flex;align-items:center;background:var(--qs-pri);border-radius:100px;padding:3px;gap:4px;flex-shrink:0;`;
                        wrapper.setAttribute('data-active', 'true');
                        const input = document.createElement('input');
                        input.className = 'qs-main-input';
                        input.value = query;
                        input.style.cssText = `width:90px;padding:7px 12px;border-radius:100px;background:rgba(255,255,255,0.2);color:var(--qs-on-pri);`;
                        input.oninput = (ev) => { syncInputs(ev.target.value); showSuggest(ev.target.value); };
                        input.onfocus = () => { input.style.width = '140px'; showSuggest(input.value); };
                        input.onblur = () => { setTimeout(() => { shadow.getElementById('mask').style.display = shadow.getElementById('box').style.display = 'none'; input.style.width = '90px'; }, 200); };
                        input.onkeydown = (e_ev) => { if (e_ev.key === 'Enter') { e_ev.preventDefault(); e_ev.stopImmediatePropagation(); doSearch(e, input.value.trim()); } };
                        const label = document.createElement('span');
                        label.textContent = e.name;
                        label.style.cssText = `padding:0 14px 0 8px;color:var(--qs-on-pri);font-size:14px;font-weight:600;white-space:nowrap;cursor:pointer;`;
                        label.onclick = (ev) => { if(!longPressTimer && longPressTimer !== null) return; ev.preventDefault(); ev.stopImmediatePropagation(); const val = input.value.trim(); doSearch(e, val); };
                        label.onmousedown = label.ontouchstart = startLongPress;
                        label.onmouseup = label.onmouseleave = label.ontouchend = cancelLongPress;
                        wrapper.append(input, label);
                        bar.appendChild(wrapper);
                        return;
                    } else if (curStyle === 2) {
                        const input = document.createElement('input');
                        input.className = 'qs-main-input';
                        input.value = query;
                        input.style.cssText = `width:80px;padding:8px 14px;border-radius:100px;border:1.5px solid var(--qs-pri);background:rgba(var(--qs-pri-rgb),0.1);color:#1d1b20;flex-shrink:0;margin-right:2px;`;
                        input.oninput = (ev) => { syncInputs(ev.target.value); showSuggest(ev.target.value); };
                        input.onfocus = () => { input.style.width = '130px'; showSuggest(input.value); };
                        input.onblur = () => { setTimeout(() => { shadow.getElementById('mask').style.display = shadow.getElementById('box').style.display = 'none'; input.style.width = '80px'; }, 200); };
                        input.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopImmediatePropagation(); doSearch(bestMatched || allEngines[0], e.target.value.trim()); } };
                        bar.appendChild(input);
                    }
                }
                const btn = document.createElement('a');
                btn.className = `qs-btn ${isBest ? 'qs-btn-active' : 'qs-btn-flat'}`;
                btn.textContent = e.name;
                btn.href = 'javascript:void(0);';
                if (isBest) btn.setAttribute('data-active', 'true');
                btn.onclick = (ev) => { if(!longPressTimer && longPressTimer !== null) return; ev.preventDefault(); ev.stopImmediatePropagation(); const inputEl = bar.querySelector('.qs-main-input'); const currentVal = inputEl ? inputEl.value.trim() : query; doSearch(e, currentVal); };
                btn.onmousedown = btn.ontouchstart = startLongPress;
                btn.onmouseup = btn.onmouseleave = btn.ontouchend = cancelLongPress;
                bar.appendChild(btn);
            });

            const setBtn = document.createElement('div');
            setBtn.innerHTML = '⚙️';
            setBtn.style.cssText = 'width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgba(0,0,0,0.04);border-radius:50%;flex-shrink:0;margin-left:4px;';
            setBtn.onclick = showManager;
            bar.append(setBtn);
            shadow.appendChild(bar);
            setTimeout(() => {
                const activeEl = bar.querySelector('[data-active="true"]');
                if (activeEl) bar.scrollLeft = activeEl.offsetLeft - (bar.offsetWidth / 2) + (activeEl.offsetWidth / 2);
            }, 100);

            if (layout.autoHide || layout.shrinkMode) {
                let lastY = window.scrollY, isShrunk = false;
                const applyState = (s) => { isShrunk = s; if (layout.shrinkMode) {
                    bar.style.cssText += `transition:all .4s cubic-bezier(0.4,0,0.2,1);max-width:${s?'120px':'92vw'};padding-right:${s?'12px':'8px'};transform:translateX(calc(-50% + ${s?'200px':'0px'}));border-radius:${s?'30px 0 0 30px':'var(--qs-radius)'};`;
                    Array.from(bar.children).forEach(item => { const isCore = item.classList.contains('qs-main-input') || item.classList.contains('qs-btn-active') || item.getAttribute('data-active') === 'true';
                        item.style.display = s ? (isCore ? '' : 'none') : (item.innerText === '⚙️' ? 'flex' : '');
                        if (item.classList.contains('qs-main-input') || item.tagName === 'INPUT') item.style.width = item.style.minWidth = s ? '70px' : ''; });
                    if (s) bar.scrollLeft = 0; else setTimeout(() => { const a = bar.querySelector('[data-active="true"]'); if (a) bar.scrollTo({left: a.offsetLeft - bar.offsetWidth/2 + a.offsetWidth/2, behavior: 'smooth'}); }, 400);
                } else { bar.style.transform = s ? `translateX(-50%) translateY(${layout.pos === 'bottom' ? '180%' : '-180%'})` : 'translateX(-50%) translateY(0)'; bar.style.opacity = s ? '0' : '1'; }};
                bar.onclick = (e) => { if (isShrunk && layout.shrinkMode) { applyState(false); e.stopPropagation(); }};
                window.addEventListener('scroll', () => { const curY = window.scrollY; if (Math.abs(curY - lastY) > 15) { applyState(curY > lastY && curY > 60); lastY = curY; } }, { passive: true });
            }
        });
    }
})();
// ==UserScript==
// @name         移除广告内嵌脚本
// @namespace   https://greasyfork.org/zh-CN/users/1373566
// @version      1.4.9.1.2
// @license      MIT
// @description  这是一个由AI生成的脚本，通过关键词匹配来移除网页中的内嵌广告脚本。不能保证100%成功，可以在脚本菜单中管理排除的网页和关键词，脚本已经内置一些常见的关键词，若还有广告，可以自行添加Math.random，platform，navigator，new Function，new Date()尝试去除。
// @author       copilot & cheatgpt
// @match        http*://*/*
// @exclude      *://*.github.com/*
// @exclude      *://github.com/*
// @exclude      *://scriptcat.org/*
// @exclude      *://greasyfork.org/*
// @exclude      *://*.google.*/*
// @exclude      *://x.com/*
// @exclude      *://twitter.com/*
// @exclude      *://*.bing.*/*
// @exclude      *://*.baidu.*/*
// @exclude      *://*.yandex.*/*
// @exclude      *://*.iqiyi.com/*
// @exclude      *://*.qq.com/*
// @exclude      *://*.v.qq.com/*
// @exclude      *://*.sohu.com/*
// @exclude      *://*.mgtv.com/*
// @exclude      *://*.ifeng.com/*
// @exclude      *://*.pptv.com/*
// @exclude      *://*.sina.com.cn/*
// @icon          data:image/png;base64,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
// @grant        GM_registerMenuCommand
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const STORAGE_KEYS = {
        REMOVE_AD_SCRIPTS_KEYWORDS: 'removeAdScriptsKeywords',
        EXCLUDE_SITES: 'excludeSites'
    };
    const DEFAULT_KEYWORDS = [
        'htmlAds',
        '_ffc1();',
        '_ffc2();',
        '_ffc3();',
        '_ffc4();',
        '_ffp();',
        'kbbaidu1();',
        'kbbaidu2();',
        'kbbaidu3();',
        'html5player.checkVideoAds',
        'ads_codes',
        '{return void 0!==b[a]?b[a]:a}).join("")}',
        '-${scripts[randomIndex]}',
        '-${scripts[Math.random()',
        '"https://"+Date.parse(new Date())+',
        '"https://"+(new Date().getDate())+',
        'https://hongosi.xn--',
        'https://{randomstr}.',
        'new Function(t)()',
        'new Function(b)()',
        'new Function(c)()',
        'new Function(t);',
        'new Function(b);',
        'new Function(c);',
        'new Function(\'d\',e)',
        'new Function(document[',
        'function updateCarousel()',
        'Math.floor(2147483648 * Math.random());',
        'Math.floor(Math.random()*url.length)',
        'Math.floor(Math.random() * urls.length)',
        'new Date()[\'getTime\']()',
        'Math.floor(((new Date()).getTime()',
        '&&navigator[',
        '=navigator;',
        'navigator.platform){setTimeout(function',
        'disableDebugger',
        'blockDeveloperTools',
        '["Date"]())[\'getTime\']()',
        '</\'+\'s\'+\'c\'+\'ri\'+\'pt\'+\'>\');',
        '<\\/\'+\'s\'+\'c\'+\'ri\'+\'pt\'+\'>\');',
        'class=\\"zdhf\\"',
        '(\'#htmlContenthtml\').html',
        'D.createElement(\'span\');',
        'class=\\"app_tj\\"',
        'window.$m(',
        'jsjiami.com.v4',
        'histats.com',
        'mainCell:".bd",effect:"leftLoop"',
        '/invoke.js">',
        'function|getDate',
        'parseInt(Math[\'random\']',
        'pc.stgowan.com'
    ];
    let keywords = getFromLocalStorage(STORAGE_KEYS.REMOVE_AD_SCRIPTS_KEYWORDS, DEFAULT_KEYWORDS);
    let excludeList = getFromLocalStorage(STORAGE_KEYS.EXCLUDE_SITES, []);
    let removedScriptsInfo = [];

    function getFromLocalStorage(key, defaultValue) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error getting data from localStorage for key ${key}:`, error);
            return defaultValue;
        }
    }

    function saveToLocalStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error saving data to localStorage for key ${key}:`, error);
        }
    }

    function removeSpecificScript() {
        if (excludeList.includes(window.location.hostname)) {
            console.log('Current site is excluded:', window.location.hostname);
            return;
        }

        document.querySelectorAll('script').forEach(script => {
            const matchedKeywords = keywords.filter(keyword => script.innerHTML.includes(keyword));
            if (matchedKeywords.length > 0) {
                removedScriptsInfo.push({
                    keywords: matchedKeywords,
                    content: script.innerHTML
                });
                script.remove();
                console.log('Removed script:', script);
            }
        });
    }

    function createStyledElement(tagName, styles) {
        const element = document.createElement(tagName);
        Object.assign(element.style, styles);
        return element;
    }

    function createMenu(floatButton) {

        const menuContainer = createStyledElement('div', {
            position: 'fixed',
            right: '10px',
            bottom: '70px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '14px',
            padding: '12px',
            zIndex: '2147483647',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease'
        });

        menuContainer.style.transform = 'scale(0.8)';
        menuContainer.style.opacity = '0';

        setTimeout(() => {
            menuContainer.style.transform = 'scale(1)';
            menuContainer.style.opacity = '1';
        }, 50);

        const menuItems = [{
                text: '排除当前网址',
                action: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    manageSite('exclude');
                }
            },
            {
                text: '拦截当前网址',
                action: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    manageSite('add');
                }
            },
            {
                text: '添加关键词',
                action: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    addKeyword();
                }
            },
            {
                text: '显示关键词',
                action: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    showKeywords();
                }
            },
            {
                text: '编辑关键词',
                action: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    editKeywords();
                }
            },
            {
                text: '移除脚本日志',
                action: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    showRemovedScriptsInfo();
                }
            },
            {
                text: '网页内嵌脚本查看',
                action: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    showInlineScripts();
                }
            }
        ];

        menuItems.forEach(item => {

            const button = createStyledElement('button', {
                padding: '10px',
                margin: '4px 0',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#000',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
            button.textContent = item.text;
            button.onmouseenter = () => {
                button.style.transform = 'scale(1.03)';
            };
            button.onmouseleave = () => {
                button.style.transform = 'scale(1)';
            };
            button.onclick = item.action;
            menuContainer.appendChild(button);
        });

        return menuContainer;
    }

    function createFloatButton() {

        const floatButton = createStyledElement('div', {
            position: 'fixed',
            right: '15px',
            bottom: '15px',
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '28px',
            zIndex: '2147483647',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#000',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
        floatButton.textContent = '移';

        let menu = null;
        let isMenuVisible = false;
        let clickCount = 0;
        let clickTimer = null;

        floatButton.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            clickCount++;

            floatButton.style.transform = 'scale(0.9)';
            setTimeout(() => {
                floatButton.style.transform = 'scale(1)';
            }, 100);

            if (clickCount === 1) {
                if (!menu) {
                    menu = createMenu(floatButton);
                    document.body.appendChild(menu);
                }

                isMenuVisible = !isMenuVisible;
                menu.style.display = isMenuVisible ? 'block' : 'none';

                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 500);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                floatButton.style.display = 'none';
                if (menu) {
                    menu.style.display = 'none';
                }
                clickCount = 0;
            }
        };

        return floatButton;
    }

    function addKeyword() {
        const newKeyword = prompt('请输入要添加的关键词:');
        if (newKeyword) {
            keywords.push(newKeyword);
            saveToLocalStorage(STORAGE_KEYS.REMOVE_AD_SCRIPTS_KEYWORDS, keywords);
            alert('关键词已添加: ' + newKeyword);
        }
    }

    function showKeywords() {
        alert('当前关键词:\n' + keywords.join('\n'));
    }

    function showRemovedScriptsInfo() {
        if (removedScriptsInfo.length === 0) {
            alert('没有移除任何脚本。');
            return;
        }
        let info = '移除的脚本信息:\n\n';
        removedScriptsInfo.forEach((infoItem, index) => {
            info += `脚本 ${index + 1}:\n匹配关键词: ${infoItem.keywords.join(', ')}\n脚本内容:\n${infoItem.content.slice(0,750)}\n\n`;
        });
        alert(info);
    }

    function manageSite(operation) {
        const currentSite = window.location.hostname;
        if (operation === 'exclude') {
            if (!excludeList.includes(currentSite)) {
                excludeList.push(currentSite);
                saveToLocalStorage(STORAGE_KEYS.EXCLUDE_SITES, excludeList);
                alert('当前网址已排除: ' + currentSite);
            } else {
                alert('当前网址已在排除列表中');
            }
        } else if (operation === 'add') {
            if (excludeList.includes(currentSite)) {
                excludeList = excludeList.filter(site => site !== currentSite);
                saveToLocalStorage(STORAGE_KEYS.EXCLUDE_SITES, excludeList);
                alert('当前网址已从排除列表中移除: ' + currentSite);
            } else {
                alert('当前网址不在排除列表中');
            }
        }
    }

    function editKeywords() {
        const overlay = createStyledElement('div', {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: '9998',
            transition: 'opacity 0.3s ease'
        });


        const editorContainer = createStyledElement('div', {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '2147483647',
            width: '90vw',
            maxWidth: '500px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease'
        });


        editorContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
        editorContainer.style.opacity = '0';


        setTimeout(() => {
            editorContainer.style.transform = 'translate(-50%, -50%) scale(1)';
            editorContainer.style.opacity = '1';
        }, 50);


        const editor = createStyledElement('textarea', {
            width: '100%',
            height: '300px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#000',
            border: 'none',
            borderRadius: '10px',
            padding: '15px',
            fontFamily: 'SFMono-Regular, monospace',
            fontSize: '14px',
            boxSizing: 'border-box',
            resize: 'none'
        });
        editor.value = keywords.join('\n');

        const buttonContainer = createStyledElement('div', {
            display: 'flex',
            gap: '12px',
            marginTop: '15px',
            justifyContent: 'flex-end'
        });

        const buttonStyle = {
            padding: '10px 20px',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
        };

        const saveButton = createStyledElement('button', {
            ...buttonStyle,
            backgroundColor: '#007AFF'
        });
        saveButton.textContent = '保存';
        saveButton.onmouseenter = () => {
            saveButton.style.transform = 'scale(1.05)';
        };
        saveButton.onmouseleave = () => {
            saveButton.style.transform = 'scale(1)';
        };

        const resetButton = createStyledElement('button', {
            ...buttonStyle,
            backgroundColor: '#FF3B30'
        });
        resetButton.textContent = '重置';
        resetButton.onmouseenter = () => {
            resetButton.style.transform = 'scale(1.05)';
        };
        resetButton.onmouseleave = () => {
            resetButton.style.transform = 'scale(1)';
        };

        saveButton.onclick = () => {
            keywords = editor.value.split('\n')
                .map(k => k.trim())
                .filter(k => k);
            saveToLocalStorage(STORAGE_KEYS.REMOVE_AD_SCRIPTS_KEYWORDS, keywords);
            document.body.removeChild(overlay);
            document.body.removeChild(editorContainer);
            alert('关键词已更新');
        };

        resetButton.onclick = () => {
            if (confirm('确定重置为默认关键词？')) {
                keywords = [...DEFAULT_KEYWORDS];
                editor.value = keywords.join('\n');
                saveToLocalStorage(STORAGE_KEYS.REMOVE_AD_SCRIPTS_KEYWORDS, keywords);
                alert('已恢复默认关键词');
            }
        };

        buttonContainer.append(saveButton, resetButton);
        editorContainer.append(editor, buttonContainer);
        document.body.append(overlay, editorContainer);
    }

    function showInlineScripts() {
        const scripts = document.querySelectorAll('script');
        let scriptInfo = '网页中的内嵌脚本:\n\n';
        scripts.forEach((script, index) => {
            if (script.innerHTML.trim()) {
                scriptInfo += `脚本 ${index + 1}:\n${script.innerHTML.trim()}\n\n`;
            }
        });
        alert(scriptInfo);
    }

    function initialize() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach(node => {
                        if (node.tagName === 'SCRIPT') {
                            removeSpecificScript();
                        }
                    });
                }
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        removeSpecificScript();

        window.addEventListener('DOMContentLoaded', () => {
            const floatButton = createFloatButton();
            document.body.appendChild(floatButton);
            if (typeof GM_registerMenuCommand === 'function') {
                GM_registerMenuCommand('排除当前网址', () => manageSite('exclude'));
                GM_registerMenuCommand('拦截当前网址', () => manageSite('add'));
                GM_registerMenuCommand('添加关键词', addKeyword);
                GM_registerMenuCommand('显示关键词', showKeywords);
                GM_registerMenuCommand('编辑关键词', editKeywords);
                GM_registerMenuCommand('移除脚本日志', showRemovedScriptsInfo);
                GM_registerMenuCommand('网页内嵌脚本查看', showInlineScripts);
            }
        });
    }
    initialize();
})();
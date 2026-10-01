// ==UserScript==
// @name         ALook Android 脚本直装助手
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  还原ALook原生安装协议安装脚本，识别user.js后缀的脚本。
// @author       Grok 2
// @match        http*://*/*.user.js
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // 中文 Base64 编码工具（处理中文字符）
    const zhBase64 = {
        encode: function(input) {
            const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            let output = "";
            let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;
            input = this.utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        },
        utf8_encode: function(_string) {
            return unescape(encodeURIComponent(_string.replace(/([\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF])/g, str => {
                return '\\u' + str.charCodeAt(0).toString(16);
            })));
        }
    };

    // 核心安装函数 (完全模拟原生调用)
    const installScript = async () => {
        // 环境验证
        if (!window.via?.addon) {
            alert('错误：请使用 ALook 浏览器访问此页面');
            return;
        }

        try {
            // 获取原始脚本内容
            const scriptContent = document.body.textContent || await fetch(location.href).then(r => r.text());

            // 解析元数据
            const meta = {};
            const metaBlock = scriptContent.match(/\/\/ ==UserScript==([\s\S]*?)\/\/ ==\/UserScript==/i)?.[1] || '';
            metaBlock.split('\n').forEach(line => {
                const match = line.match(/\/\/\s*@(\w+)\s+(.*)/);
                if (match) meta[match[1].toLowerCase()] = (meta[match[1].toLowerCase()] || []).concat(match[2].trim());
            });

            // 构建原生数据结构
            const config = {
                id: `userscript-${Date.now()}`,
                name: (meta.name || ['未命名脚本'])[0],
                author: (meta.author || ['未知作者'])[0],
                version: (meta.version || ['1.0'])[0],
                runat: 1, // ALook 专用标记
                url: (meta.match || meta.include || ['*']).map(rule =>
                    rule.replace(/^https?:\/\//, 'http*://*').replace(/\*/g, '.*')
                ).join('@@'),
                code: btoa(unescape(encodeURIComponent(
                    `(function(){\n\n${scriptContent}\n\n})();`
                )))
            };

            // 生成安装参数
            const installPayload = zhBase64.encode(JSON.stringify(config));

            // 原生调用方式
            window.via.addon(installPayload);

        } catch (error) {
            alert(`安装失败: ${error.message}`);
        }
    };

    // 自动触发安装流程
    if (/\.user\.js(\?|$)/i.test(location.href)) {
        if (document.readyState === 'complete') {
            installScript();
        } else {
            window.addEventListener('load', installScript, {
                once: true
            });
        }
    }
})();
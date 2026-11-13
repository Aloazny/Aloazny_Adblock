#!/bin/sh

#本地用的PATH路径，Github action上别管
export "PATH=$PATH:/data/adb/magisk:/data/adb/ksu/bin:/data/adb/ap/bin:/data/data/com.termux/files/usr/bin"

# ============================================================
# 用途说明（小白必读）
# ============================================================
# 本脚本会自动调用同目录下的 python 脚本 update_css_hide.py，
# 从广告规则文件里提取「通用隐藏规则」，生成一个油猴脚本。
#
# 目录结构要求（都在本 shell 脚本所在目录下）：
#   ./update_css_hide.py         ← 生成器（Python 脚本）
#   ./Rules/Adblock_attach.txt   ← 输入规则文件（Adblock 语法）
#   ./userscript/                ← 输出目录（放生成的 .user.js）
#
# 生成结果：
#   ./userscript/css.hide.user.js  ← 拖进浏览器油猴即可安装
#
# 依赖：
#   系统里要有 python3（在终端执行 python3 -V 能显示版本号即可）
#
# 手动运行方法：
#   在终端 cd 到本脚本所在目录，执行：  sh 本脚本名.sh
#
# ============================================================
# python 脚本 update_css_hide.py 的用法（命令行参数说明）
# ============================================================
#   基本用法：
#     python3 update_css_hide.py 规则文件1 [规则文件2 ...] -o 输出文件
#
#   常用参数：
#     sources               必填。一个或多个规则文件路径，也可以是 URL。
#                           多个文件会叠加合并，例如：
#                             python3 update_css_hide.py a.txt b.txt -o out.js
#                             python3 update_css_hide.py https://xxx/easylist.txt
#     -o, --output          输出文件路径。默认：adblock-generic-hide.user.js
#     --name                生成的油猴脚本名字（浏览器里显示的名称）。
#                           默认：Adblock Generic CSS Hider
#     --match               指定油猴脚本对哪些网站生效。可重复写、也可用逗号分隔。
#                           支持「傻瓜写法」和「油猴语法」两种：
#                             傻瓜写法： a.com        → 自动变成 *://*.a.com/*
#                                       a.com/foo    → 自动变成 *://*.a.com/foo
#                                       *.a.com      → 自动变成 *://*.a.com/*
#                                       https://d.com/home/index.
#                                                    → 原样使用完整 URL
#                             油猴语法： *://*.x.com/*
#                           不写 --match 时默认全站生效（*://*/*）。
#                           例子：
#                             --match "a.com,b.com,c.com"
#                             --match "a.com" --match "b.com"
#     --match-threshold     当 --match 数量超过这个值时，会自动尝试把
#                           多条相似规则合并成 @include 正则，减少元数据行数。
#                           默认 5。举例：同一个域名下有多条不同路径时，
#                           会自动合并为一条正则，让脚本更紧凑。
#
#   实际调用示例（本 shell 脚本中就是下面这一行）：
#     python3 update_css_hide.py Rules/Adblock_attach.txt \
#             -o userscript/css.hide.user.js --name "Css清道夫"
#
#   版本控制机制：
#     如果输出文件已经存在，并且里面的规则和这次提取的规则完全一样，
#     会沿用旧的 @version 号（不刷新）；规则有变化才会生成新的 @version，
#     这样油猴不会因为内容没变而重复提示更新。
# ============================================================

userscript_path="$(pwd)/userscript"
script_file="$(pwd)/update_css_hide.py"

name="Css清道夫"
input_file="$(pwd)/Rules/Adblock_attach.txt"
output_file="$userscript_path/css.hide.user.js"

#通过删除文件强制更新
#rm -rf "${output_file}"

# 下面这一段做两件事：
#   1. 检查 update_css_hide.py 存在、且系统装了 python3
#   2. 两个条件都满足时，才真正调用 python3 生成油猴脚本
# 参数含义（按顺序）：
#   "${script_file}"     Python 生成器路径
#   "${input_file}"      Adblock 规则输入文件
#   -o "${output_file}"  生成的 .user.js 输出路径
#   --name "$name"       油猴脚本显示名（这里是“Css清道夫”）
# 如需指定生效域名，可自行追加，例如：
#   --match "a.com,b.com,c.com"

if [ -f "$script_file" ] && command -v python3 >/dev/null 2>&1 ;then
	if [ "$FORCE_UPDATE" = "true" ]; then
		rm -f "${output_file}"
	fi
	python3 "${script_file}" "${input_file}" -o "${output_file}" --name "$name" $EXTRA_ARGS
fi

#!/bin/sh
export PATH="`pwd`:${PATH}"

#下载Adblock规则
function download_link(){
local IFS=$'\n'

target_dir="${1}"
test "${target_dir}" = "" && target_dir="`pwd`/temple/download_Rules"
mkdir -p "${target_dir}"

list='
https://raw.githubusercontent.com/lingeringsound/adblock_auto/main/base/%E5%85%B6%E4%BB%96.prop|其他.txt
https://raw.githubusercontent.com/lingeringsound/adblock_auto/main/base/%E5%8E%BB%E9%99%A4%E5%B0%8F%E8%AF%B4%E5%B9%BF%E5%91%8A.prop|去除小说广告.txt
https://raw.githubusercontent.com/lingeringsound/adblock_auto/main/base/%E5%B8%B8%E7%94%A8%E5%B9%BF%E5%91%8A%E7%9A%84%E9%A1%B6%E7%BA%A7%E5%9F%9F%E5%90%8D.prop|常用广告的顶级域名.txt
https://raw.githubusercontent.com/lingeringsound/adblock_auto/main/base/%E6%8B%A6%E6%88%AAH%E8%BD%AC%E8%B7%B3.prop|拦截H转跳.txt
https://raw.githubusercontent.com/lingeringsound/adblock_auto/main/base/%E7%BD%91%E5%9D%80%E6%89%B9%E9%87%8F%E8%A7%84%E5%88%99.prop|网址批量规则.txt
https://raw.githubusercontent.com/lingeringsound/adblock_auto/main/base/youtube.prop|youtube.txt
https://raw.githubusercontent.com/damengzhu/banad/main/jiekouAD.txt|轻量规则.txt
https://easylist-downloads.adblockplus.org/antiadblockfilters.txt|antiadblockfilters.txt
https://filters.adtidy.org/extension/ublock/filters/2_without_easylist.txt|2_without_easylist.txt
https://filters.adtidy.org/extension/ublock/filters/224.txt|Adguard_Chinese.txt
https://filters.adtidy.org/extension/ublock/filters/11.txt|Adguard_mobile.txt
'

for i in ${list}
do
test "$(echo "${i}" | grep -E '^#' )" && continue
	name=`echo "${i}" | cut -d '|' -f2`
		URL=`echo "${i}" | cut -d '|' -f1`
	test ! -f "${target_dir}/${name}" && curl -k -L -o "${target_dir}/${name}" "${URL}" >/dev/null 2>&1 && echo "※ `date +'%F %T'` ${name} 下载成功！"
dos2unix "${target_dir}/${name}" >/dev/null 2>&1
done
}

#写入基本信息
function write_head(){
local file="${1}"
local Description="${3}"
test "${Description}" = "" && Description="${2}"
local count=`cat "${file}" | sed '/^!/d;/^[[:space:]]*$/d' | wc -l ` 
local original_file=`cat "${file}"`
cat << key > "${file}"
[Adblock Plus 2.0]
! Title: ${2}
! Version: `date +'%Y%m%d%H%M%S'`
! Expires: 12 hours (update frequency)
! Last modified: `date +'%F %T'`
! Total Count: ${count}
! Blocked Filters: ${count}
! Description: ${Description}
! Homepage: https://github.com/Aloazny/Aloazny_Adblock
! GitHub Homepage: https://github.com/Aloazny/Aloazny_Adblock
! Gitlink Homepage: https://www.gitlink.org.cn/Aloazny/Aloazny_Adblock
! Github Raw Link: https://raw.githubusercontent.com/Aloazny/Aloazny_Adblock/main/Rules/${file##*/}
! Gitlink Raw Link: https://www.gitlink.org.cn/api/Aloazny/Aloazny_Adblock/raw/Rules/${file##*/}?ref=main

key
echo "${original_file}" >> "${file}"
busybox sed -i 's/换行符正则表达式n/\\/g' "${file}"
perl "`pwd`/addchecksum.pl" "${file}"
}

#净化规则
function modtify_adblock_original_file() {
local file="${1}"
if test "${2}" = "" ;then
	busybox sed -i 's/\\n/换行符正则表达式nn/g' "${file}"
	local new=`cat "${file}" | iconv -t 'utf8' | grep -Ev '^#\@\?#|^\$\@\$|^#\%#|^#\@\%#|^#\@\$\?#|^#\$\?#|^<<|<<1023<<' | sed 's|^[[:space:]]@@|@@|g;s|“|"|g;s|”|"|g' | sort | uniq | sed '/^!/d;/^[[:space:]]*$/d;/^\[.*\]$/d' `
	echo "$new" > "${file}"
else
	busybox sed -i 's/\\n/换行符正则表达式nn/g' "${file}"
	local new=`cat "${file}" | iconv -t 'utf8' | grep -Ev '^#\@\?#|^\$\@\$|^#\%#|^#\@\%#|^#\@\$\?#|^#\$\?#|^<<|<<1023<<' | grep -Ev "${2}" | sed 's|^[[:space:]]@@|@@|g;s|“|"|g;s|”|"|g' | sort | uniq | sed '/^!/d;/^[[:space:]]*$/d;/^\[.*\]$/d' `
	echo "$new" > "${file}"
fi

}

function make_white_rules(){
local file="${1}"
local IFS=$'\n'
local white_list_file="${2}"
for o in `cat "${white_list_file}" 2>/dev/null | busybox sed '/^!/d;/^[[:space:]]*$/d' `
do
busybox sed -i -E "/${o}/d" "${file}"
done
}

function fix_Rules(){
local file="${1}"
local target_content="${2}"
local fix_content="${3}"
test ! -f "${file}" -o "${fix_content}" = "" && return 
busybox sed -i "s|${target_content}|${fix_content}|g" "${file}"
}

function Combine_adblock_original_file(){
local file="${1}"
local target_folder="${2}"
test "${target_folder}" = "" && echo "※`date +'%F %T'` 请指定合并目录……" && exit
for i in "${target_folder}"/*.txt
do
	dos2unix "${i}" >/dev/null 2>&1
	echo "`cat "${i}"`" >> "${file}"
done
}

#筛选整理规则
function wipe_white_list() {
	local file="${2}"
	local output_folder="${1}"
	if test -f "${file}" ;then
	local IFS=$'\n'
	local new=$(cat "${file}" | grep -Ev "${3}" | sort | uniq | sed '/^!/d;/^[[:space:]]*$/d' )
		mkdir -p "${output_folder}"
		echo "$new" > "${output_folder}/${file##*/}"
	fi
}

function sort_web_rules() {
	local file="${2}"
	local output_folder="${1}"
	if test -f "${file}" ;then
	local IFS=$'\n'
	local new=$(cat "${file}" | grep -Ev '^\@\@|^[[:space:]]\@\@\|\||^<<|<<1023<<|^\@\@\|\||^\|\||^##|^###|^\/|\/ad\/|^:\/\/|^_|^\?|^\.|^-|^=|^:|^~|^,|^&|^#\$#|#\@#|^\$|^\||^\*|^#\%#' | sort | uniq | sed '/^!/d;/^[[:space:]]*$/d' )
		mkdir -p "${output_folder}"
		echo "$new" >> "${output_folder}/${file##*/}"
	fi
}

function sort_adblock_Rules() {
	local file="${2}"
	local output_folder="${1}"
	if test -f "${file}" ;then
		local IFS=$'\n'
		local new=$(cat "${file}" | grep -E "${3}" | sort | uniq | sed '/^!/d;/^[[:space:]]*$/d' )
			mkdir -p "${output_folder}"
		echo "$new" > "${output_folder}/${file##*/}"
	fi
}

function add_rules_file() {
	local file="${2}"
	local output_folder="${1}"
	local IFS=$'\n'
	local new=$(cat "${file}" | grep -E "${3}" | sort | uniq | sed '/^!/d;/^[[:space:]]*$/d' )
	if test -f "${output_folder}/${file##*/}" ;then
		mkdir -p "${output_folder}"
				echo "$new" >> "${output_folder}/${file##*/}"
			local sort_file=`cat "${output_folder}/${file##*/}" | sort | uniq | sed '/^!/d;/^[[:space:]]*$/d' `
		echo "${sort_file}" > "${output_folder}/${file##*/}"
	fi
}

#测试github 加速的链接
function Get_Download_github_raw_link(){
local download_target="${1}"
if test "`ping -c 1 -W 3 raw.fgit.ml >/dev/null 2>&1 && echo 'yes'`" = "yes" ;then
	target="`echo ${download_target} | sed 's|raw.githubusercontent.com|raw.fgit.ml|g'`"
elif test "`ping -c 1 -W 3 ghproxy.com >/dev/null 2>&1 && echo 'yes'`" = "yes" ;then
	target="https://ghproxy.com/${download_target}"
elif test "`ping -c 1 -W 3 raw.gitmirror.com >/dev/null 2>&1 && echo 'yes'`" = "yes" ;then
	target="`echo ${download_target} | sed 's|raw.githubusercontent.com|raw.gitmirror.com|g'`"
elif test "`ping -c 1 -W 3 raw.iqiq.io >/dev/null 2>&1 && echo 'yes'`" = "yes" ;then
	target="`echo ${download_target} | sed 's|raw.githubusercontent.com|raw.iqiq.io|g'`"
elif test "`ping -c 1 -W 3 raw.fastgit.org >/dev/null 2>&1 && echo 'yes'`" = "yes" ;then
	target="`echo ${download_target} | sed 's|raw.githubusercontent.com|raw.fastgit.org|g'`"
else
	echo "${download_target}" | grep -q 'raw.githubusercontent.com' && echo "[E]`date +'%F %T'` 错误！无法连接网络！" && exit 1
fi
	echo "${target}"
}

#shell 特殊字符转义
function escape_special_chars(){
	local input=${1}
	local output=$(echo ${input} | sed 's/[\^\|\*\?\$\=\@\/\.\"\+\;\(\)\{\}]/\\&/g;s|\[|\\&|g;s|\]|\\&|g' )
	echo ${output}
}

#去除指定重复的Css
function sort_Css_Combine(){
local IFS=$'\n'
local target_file="${1}"
local target_file_tmp="`pwd`/${target_file##*/}.tmp"
local target_output_file="`pwd`/${target_file##*/}.temple"
local count_Rules_all=`cat "${target_file}" | grep '#'  | busybox sed '/^#/d;/^!/d;/^\|\|/d;/^\//d' | busybox sed -E 's/.*\.[A-Za-z]{2,8}#{1,1}//g' | sort | uniq -d | wc -l`
local a=0
busybox sed -i 's/\\n/换行符正则表达式nn/g' "${target_file}"
local new_file=$(cat "${target_file}" | iconv -t 'utf-8' | sort -u | uniq | busybox sed '/^!/d;/^[[:space:]]*$/d;/^\[.*\]$/d' )
echo "${new_file}" > "${target_file}"
for target_content in `cat "${target_file}" | grep '#'  | busybox sed '/^#/d;/^!/d;/^\|\|/d;/^\//d' | busybox sed -E 's/.*\.[A-Za-z]{2,8}#{1,1}//g' | sort | uniq -d `
do
a=$(($a + 1))
target_content="#${target_content}"
transfer_content=$(escape_special_chars ${target_content})
grep -E "${transfer_content}$" "${target_file}" > "${target_file_tmp}" && echo "※处理重复Css规则( $count_Rules_all → $(($count_Rules_all - ${a})) ): ${transfer_content}$"
if test "$(cat "${target_file_tmp}" 2>/dev/null | sed 's|#.*||g' | grep -E ',')" != "" ;then
	sed -i 's|#.*||g' "${target_file_tmp}"
	local before_tmp=$(cat "${target_file_tmp}" | tr ',' '\n' | busybox sed '/^[[:space:]]*$/d' | sort  | uniq )
	echo "${before_tmp}" > "${target_file_tmp}"
	sed -i ":a;N;\$!ba;s#\n#,#g" "${target_file_tmp}"
	if test "$(cat "${target_file_tmp}" 2>/dev/null | sed '/^!/d;/^[[:space:]]*$/d' )" != "" ;then 
		grep -Ev "${transfer_content}$" "${target_file}" >> "${target_output_file}" 
cat << key >> "${target_output_file}" 
`cat "${target_file_tmp}"`${target_content}
key
		mv -f "${target_output_file}" "${target_file}"
	fi
else
	sed -i 's|#.*||g' "${target_file_tmp}"
	local before_tmp=$(cat "${target_file_tmp}" | busybox sed '/^[[:space:]]*$/d' | sort | uniq)
	echo "${before_tmp}" > "${target_file_tmp}"
	if test "$(cat "${target_file_tmp}" 2>/dev/null | sed '/^!/d;/^[[:space:]]*$/d' | wc -l)" -gt "1" ;then
		sed -i ":a;N;\$!ba;s#\n#,#g" "${target_file_tmp}"
	fi
	if test "$(cat "${target_file_tmp}" 2>/dev/null | sed '/^!/d;/^[[:space:]]*$/d' )" != "" ;then 
		grep -Ev "${transfer_content}$" "${target_file}" >> "${target_output_file}" 
cat << key >> "${target_output_file}" 
`cat "${target_file_tmp}"`${target_content}
key
		mv -f "${target_output_file}" "${target_file}"
	fi
fi
done
rm -rf "${target_file_tmp}" 2>/dev/null
}

#去除重复作用的域名
function sort_domain_Combine(){
local IFS=$'\n'
local target_file="${1}"
local target_file_tmp="`pwd`/${target_file##*/}.tmp"
local target_output_file="`pwd`/${target_file##*/}.temple"
local count_Rules_all=`cat "${target_file}" | sed 's|domain=.*||g' | sort | uniq -d | sed '/^[[:space:]]*$/d' | wc -l `
local a=0
busybox sed -i 's/\\n/换行符正则表达式nn/g' "${target_file}"
local new_file=$(cat "${target_file}" | iconv -t 'utf-8' | sort -u | uniq | busybox sed '/^!/d;/^[[:space:]]*$/d;/^\[.*\]$/d' )
echo "${new_file}" > "${target_file}"
for target_content in `cat "${target_file}" | grep 'domain=' | sed 's|domain=.*||g' | sort | uniq -d | busybox sed '/^[[:space:]]*$/d' `
do
a=$(($a + 1))
target_content="${target_content}domain="
transfer_content=$(escape_special_chars ${target_content} )
grep -E "^${transfer_content}" "${target_file}" > "${target_file_tmp}" && echo "※处理重复作用域名规则( $count_Rules_all → $(($count_Rules_all - ${a} )) ): ^${transfer_content}"
if test "$(cat "${target_file_tmp}" 2>/dev/null | sed 's|.*domain=||g' | grep -E ',' )" != "" ;then
	echo "※规则 ${target_content} 包含其他限定器！"
	local fixed_tmp=$(cat "${target_file_tmp}" | sed 's/[[:space:]]$//g' | grep -Ev ',(important|third-party|script|media|subdocument|document|xmlhttprequest|other|stealth|image|stylesheet|content|match-case|font|sitekey|popup|xhr|object|generichide|genericblock|elemhide|all|badfilter|websocket|~important|~third-party|~script|~media|~subdocument|~document|~xmlhttprequest|~other|~stealth|~image|~stylesheet|~content|~match-case|~font|~sitekey|~popup|~xhr|~object|~generichide|~genericblock|~elemhide|~all|~badfilter|~websocket)$' | sed '/^[[:space:]]*$/d' | sort | uniq)
	echo "${fixed_tmp}" > "${target_file_tmp}"
	echo "※尝试修复中……"
	local Rules_juggle=`cat "${target_file_tmp}" | sort | uniq | sed '/^[[:space:]]*$/d' | wc -l`
	test "${Rules_juggle}" -le "1" && echo "※无法合并，已跳过！" && continue
fi
if test "$(cat "${target_file_tmp}" 2>/dev/null | sed 's|.*domain=||g' | grep -E '\|')" != "" ;then
	sed -i 's|.*domain=||g' "${target_file_tmp}"
	local before_tmp=$(cat "${target_file_tmp}" | tr '|' '\n' | sed '/^[[:space:]]*$/d' | sort  | uniq)
	echo "${before_tmp}" > "${target_file_tmp}"
	sed -i ":a;N;\$!ba;s#\n#\|#g" "${target_file_tmp}"
	if test "$(cat "${target_file_tmp}" 2>/dev/null | sed '/^!/d;/^[[:space:]]*$/d' )" != "" ;then 
		grep -Ev "^${transfer_content}" "${target_file}" >> "${target_output_file}" 
cat << key >> "${target_output_file}" 
${target_content}`cat "${target_file_tmp}"`
key
		mv -f "${target_output_file}" "${target_file}"
	fi
else
	sed -i 's|.*domain=||g' "${target_file_tmp}"
	local before_tmp=$(cat "${target_file_tmp}" | sed '/^[[:space:]]*$/d' | sort  | uniq)
	echo "${before_tmp}" > "${target_file_tmp}"
	if test "$(cat "${target_file_tmp}" 2>/dev/null | sed '/^!/d;/^[[:space:]]*$/d' | wc -l)" -gt "1" ;then
		sed -i ":a;N;\$!ba;s#\n#\|#g" "${target_file_tmp}"
	fi
	if test "$(cat "${target_file_tmp}" 2>/dev/null | sed '/^!/d;/^[[:space:]]*$/d' )" != "" ;then 
		grep -Ev "^${transfer_content}" "${target_file}" >> "${target_output_file}"
cat << key >> "${target_output_file}" 
${target_content}`cat "${target_file_tmp}"`
key
		mv -f "${target_output_file}" "${target_file}"
	fi
fi
done
rm -rf "${target_file_tmp}" 2>/dev/null
busybox sed -i 's/换行符正则表达式n/\\/g' "${target_file}"
}

#避免大量字符影响观看
function Running_sort_domain_Combine(){
local IFS=$'\n'
local target_adblock_file="${1}"
test ! -f "${target_adblock_file}" && echo "※`date +'%F %T'` ${target_adblock_file} 规则文件不存在！！！" && return
sort_domain_Combine "${target_adblock_file}"
wipe_same_selector_fiter "${target_adblock_file}"
clear_domain_white_list "${target_adblock_file}"
clear_domain_white_Rules "${target_adblock_file}"
}


#避免大量字符影响观看
function Running_sort_Css_Combine(){
local target_adblock_file="${1}"
test ! -f "${target_adblock_file}" && echo "※`date +'%F %T'` ${target_adblock_file} 规则文件不存在！！！" && return
#记录通用的Css
local css_common_record="$(cat ${target_adblock_file} 2>/dev/null | sed '/^!/d;/^[[:space:]]*$/d;/^#/!d' )"
sort_Css_Combine "${target_adblock_file}"
#写入通用的Css
echo "${css_common_record}" >> "${target_adblock_file}"
busybox sed -i 's/换行符正则表达式n/\\/g' "${target_adblock_file}"
}

#规则分类
function sort_and_optimum_adblock(){
local file="${1}"
test ! -f "${file}" && return 
cat << key > "${file}"

!<<<<<域名规则>>>>>`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -E '^\|\||^\|http' | sort | uniq | wc -l `
`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -E '^\|\||^\|http' | sort | uniq `
!<<<<<域名规则 结束>>>>>

!<<<<<网站单独规则>>>>>`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -Ev '^\@\@|^\|\||^\|http|^#|^\/|^:\/\/|^_|^\?|^\.|^-|^=|^:|^~|^,|^&|^\$|^\||^\*' | sort | uniq | wc -l`
`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -Ev '^\@\@|^\|\||^\|http|^#|^\/|^:\/\/|^_|^\?|^\.|^-|^=|^:|^~|^,|^&|^\$|^\||^\*' | sort | uniq `
!<<<<<网站单独规则 结束>>>>>

!<<<<<通配符规则>>>>>`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -Ev '^\|\||^\|http|##|#\?#|#\%#|#\@#|##\[|##\.|[#][$][#]|[#][$][?][#]|[#][@][?][#]|^#' | sort | uniq | wc -l `
`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -Ev '^\|\||^\|http|##|#\?#|#\%#|#\@#|##\[|##\.|[#][$][#]|[#][$][?][#]|[#][@][?][#]|^#' | sort | uniq `
!<<<<<通配符规则 结束>>>>>

!<<<<<通用Css规则>>>>>`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -E '^#|^~.*#' | sort | uniq | wc -l`
`cat "${file}" | busybox sed '/^!/d;/^\@\@/d;/#\@#/d;/^\[/d;/^[[:space:]]*$/d' | grep -E '^#|^~.*#' | sort | uniq `
!<<<<<通用Css规则 结束>>>>>

!<<<<<放行白名单>>>>>`cat "${file}" | busybox sed '/^!/d;/^\[/d;/^[[:space:]]*$/d' | grep -E '^\@\@|#\@#' | sort | uniq | wc -l`
`cat "${file}" | busybox sed '/^!/d;/^\[/d;/^[[:space:]]*$/d' | grep -E '^\@\@|#\@#' | sort | uniq `
!<<<<<放行白名单 结束>>>>>

key
}

#剔除css规则冲突规则
function fixed_css_white_conflict(){
local file="${1}"
local white_list=`cat ${file} | grep -E '^#\@#' | sed -E 's/#\@#/##/g' `
for i in ${white_list}
do
	echo "剔除冲突规则 ${i}"
	rule=`escape_special_chars ${i}`
	sed -Ei "/^${rule}$/d" "${file}"
done
}

#去除部分选择器
function wipe_same_selector_fiter(){
local file="${1}"
local IFS=$'\n'
test ! -f "${file}" && return
for i in $(cat "${file}" | busybox sed '/^\|\|/!d' | busybox sed -E 's/\$third-party$//g;s/\$popup$//g;s/\$third-party,important$//g;s/\$popup,third-party$//g;s/\$third-party,popup$//g;s/\$script$//g;s/\$image$//g;s/\$image,third-party$//g;s/\$third-party,image$//g;s/\$script,third-party$//g;s/\$third-party,script$//g;/domain=/d;/^!/d;/^[[:space:]]*$/d' | sort | uniq -d)
do
	same_fiter_rule=`escape_special_chars ${i}`
	if test "$(busybox grep -E "^${same_fiter_rule}$" "${file}")" != "" ;then
		busybox sed -Ei "/^${same_fiter_rule}\\$/d" "${file}"
		echo "※去除域名规则 ${i}" 
	fi
done
}

#去除重复的域名规则
function clear_domain_white_list(){
local file="${1}"
test ! -f "${file}" && return
cat "${file}" | sed '/^\!/d;/\#/d;/\$/d' | grep -E '^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(/[^ ]*)?' | sort -u | while read line
do
	transfer_content=`escape_special_chars ${line}`
	grep -E "^\|\|${transfer_content}\^" "${file}" && busybox sed -i -E "/^${transfer_content}$/d" "${file}"
done
}
#去除与白名单冲突的域名
function clear_domain_white_Rules(){
local file="${1}"
test ! -f "${file}" && return
cat "${file}" | busybox sed '/#/d;/domain=~/!d;s/\$.*//g' | while read line
do
	transfer_Rules=`escape_special_chars ${line}`
	busybox sed -i -E "/^${transfer_Rules}$/d" "${file}"
done
}

#精简规则 去除Ublock不支持的规则
function lite_Uadblock_Rules(){
local file="${1}"
test ! -f "${file}" && return
local lite_content="$(cat ${file} | grep -Ev '\$\$|\$@\$|#\%#|#\@\%#|#\@\$\?#|#\$\?#|#\%#\/\/scriptlet|\$dnsrewrite=|redirect=|\,replace=|redirect-rule=|\,badfilter\,|\$generichide|\,generichide\,|\,generichide$|\$important|\,important\,|\,important$|\$empty|\,empty\,|\,empty$|\$popup|\,popup\,|\,popup$|\$media|\,media\,|\,media$|\$object-subrequest|\$~object-subrequest|\$csp|\,csp=|:-abp-properties|:matches-attr|:matches-property|:nth-ancestor|\:matches-path' | sort | uniq)"
echo "${lite_content}" > "${file}"
}

#精简规则，剔除Via不支持的规则
function lite_Adblock_Rules(){
local file="${1}"
test ! -f "${file}" && return
local lite_content="$(cat ${file} | grep -Ev '#\@\?#|\$\@\$|#\%#|#\@\%#|#\@\$\?#|#\$\?#|#\$#|#\?#|##\+js\(|#\%#\/\/scriptlet|##\^|redirect=|removeparam=|\,replace=|redirect-rule=|\$removeparam|\$badfilter|\$empty|\$generichide|\$match-case|\$object|\$object-subrequest|\$~badfilter|\$~empty|\$~generichide|\$~removeparam|\$~match-case|\$~object|\$~object-subrequest|\,badfilter$|\,badfilter\,|\,empty$|\,empty\,|\,generichide$|\,generichide\,|\,match-case$|\,match-case\,|\,object$|\,object-subrequest$|\,object-subrequest\,|\,object\,|\,~badfilter$|\,~badfilter\,|\,~empty$|\,~empty\,|\,~generichide$|\,~generichide\,|\,~match-case$|\,~match-case\,|\,~object$|\,~object-subrequest$|\,~object-subrequest\,|\,~object\,|\$csp|\,csp=|\,denyallow=|permissions=|\:(matches-path|-abp-contains|-abp-properties|contains|has-text|matches-css|matches-css-before|matches-css-after|xpath|nth-ancestor|upward|remove|style|watch-attr)' | busybox sed 's/\$important$//g;s/\$important,/\$/g;s/\,important\,//g;s/\,important$//g;s/\$~important$//g;s/\$~important,/\$/g;s/\,~important\,//g;s/\,~important$//g;s/\$popup$//g;s/\$popup,/\$/g;s/\,popup\,//g;s/\,popup$//g;s/\$~popup$//g;s/\$~popup,/\$/g;s/\,~popup\,//g;s/\,~popup$//g;s/\$document$//g;s/\$document,/\$/g;s/\,document\,//g;s/\,document$//g;s/\$~document$//g;s/\$~document,/\$/g;s/\,~document\,//g;s/\,~document$//g' | sort | uniq)"
echo "${lite_content}" > "${file}"
}

#更新README信息
function update_README_info(){
local file="`pwd`/README.md"
test -f "${file}" && rm -rf "${file}"
cat << key > "${file}"
# Aloazny 自用规则
### 自动更新(`date +'%F %T'`)

> ### 补充规则
<details>
<summary>点击查看补充规则订阅链接</summary>
<li> <a href="https://raw.githubusercontent.com/Aloazny/Aloazny_Adblock/main/Rules/Adblock_attach.txt" target="_blank" > GITHUB链接 </a> </li>
<li> <a href="https://raw.gitmirror.com/Aloazny/Aloazny_Adblock/main/Rules/Adblock_attach.txt" > Git加速订阅链接 </a> </li>
<li> <a href="https://www.gitlink.org.cn/api/Aloazny/Aloazny_Adblock/raw/Rules/Adblock_attach.txt?ref=main" target="_blank" > Gitlink订阅链接 </a> </li>
</details>

> ### 中文规则
<details>
<summary>点击查看中文规则订阅链接</summary>
<li> <a href="https://raw.githubusercontent.com/Aloazny/Aloazny_Adblock/main/Rules/Adblock_Chinese.txt" target="_blank" > GITHUB链接 </a> </li>
<li> <a href="https://raw.gitmirror.com/Aloazny/Aloazny_Adblock/main/Rules/Adblock_Chinese.txt" > Git加速订阅链接 </a> </li>
<li> <a href="https://www.gitlink.org.cn/api/Aloazny/Aloazny_Adblock/raw/Rules/Adblock_Chinese.txt?ref=main" target="_blank" > Gitlink订阅链接 </a> </li>
</details>

> ### 移动端规则
<details>
<summary>点击查看移动端规则订阅链接</summary>
<li> <a href="https://raw.githubusercontent.com/Aloazny/Aloazny_Adblock/main/Rules/Adblock.txt" target="_blank" > GITHUB链接 </a> </li>
<li> <a href="https://raw.gitmirror.com/Aloazny/Aloazny_Adblock/main/Rules/Adblock.txt" > Git加速订阅链接 </a> </li>
<li> <a href="https://www.gitlink.org.cn/api/Aloazny/Aloazny_Adblock/raw/Rules/Adblock.txt?ref=main" target="_blank" > Gitlink订阅链接 </a> </li>
</details>

> ### 移除广告内嵌脚本
- [B仔浏览器](http://www.coolapk.com/apk/com.huicunjun.bbrowser)，**用1.4.9.1。**
- M浏览器/[ALook](http://www.coolapk.com/apk/alook.browser) ([ALook安装脚本](https://aloazny.github.io/Aloazny_Adblock/userscript/ALook.installerscript.user.js))，**用1.4.9.1.chromext，**
- [最新版本](https://aloazny.github.io/Aloazny_Adblock/userscript/%E7%A7%BB%E9%99%A4%E5%B9%BF%E5%91%8A%E5%86%85%E5%B5%8C%E8%84%9A%E6%9C%AC.GM.user.js)
- [1.4.9.1](https://aloazny.github.io/Aloazny_Adblock/userscript/1.4.9.1.user.js)
- [1.4.9.1.chromext](https://aloazny.github.io/Aloazny_Adblock/userscript/1.4.9.1.chromext.user.js)

### 上游规则
#### 感谢各位大佬❤ (ɔˆз(ˆ⌣ˆc)
<details>
<summary>点击查看上游规则</summary>
<ul>
<li> <a href="https://raw.githubusercontent.com/damengzhu/banad/main/jiekouAD.txt" target="_blank" > 轻量规则 </a> </li>
<li> <a href="https://lingeringsound.github.io/adblock_auto" target="_blank" > 混合规则 </a> </li>
<li> <a href="https://easylist-downloads.adblockplus.org/antiadblockfilters.txt" target="_blank" > Antiadblockfilters </a> </li>
<li> <a href="https://filters.adtidy.org/extension/ublock/filters/2_without_easylist.txt" target="_blank" > Adguard Base fiter </a> </li>
<li> <a href="https://filters.adtidy.org/extension/ublock/filters/11.txt" target="_blank" > Adguard mobile </a> </li>
<li> <a href="https://filters.adtidy.org/extension/ublock/filters/224.txt" target="_blank" > Adguard Chinese </a> </li>
</ul>
</details>

### About
This repository mirrors code for personal use, including:
- js-beautify: CSS beautification library, mirrored from https://github.com/beautify-web/js-beautify (MIT License)
- csstree: CSS parsing library, mirrored from https://github.com/csstree/csstree (MIT License)
All code is used under the terms of the MIT License as per the original repositories.


key
}


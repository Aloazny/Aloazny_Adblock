#!/bin/sh

#加载公共函数
source "`pwd`/until_function.sh"

#指定目录和输出文件
Sort_Folder="`pwd`/temple/sort" 
Download_Folder="`pwd`/temple/download_Rules"
#Combine_Folder="`pwd`/temple/combine"
Rules_Folder="`pwd`/Rules"
Base_Rules_Folder="`pwd`/base"

#删除缓存?(也许)
rm -rf "${Rules_Folder}" "`pwd`/temple" 2>/dev/null

#创建目录
mkdir -p "${Download_Folder}" "${Sort_Folder}/Chinese" "${Sort_Folder}/all" "${Sort_Folder}/enhance" "${Rules_Folder}" && echo "※`date +'%F %T'` 创建临时目录成功！"

#设置权限
chmod -R 777 "`pwd`"

#下载规则
download_link "${Download_Folder}"

#处理规则
cp -rf "${Base_Rules_Folder}/Aloazny_Adblock.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/antiadblockfilters.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/youtube.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/网址批量规则.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/拦截H转跳.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/常用广告的顶级域名.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/去除小说广告.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/其他.txt" "${Sort_Folder}/enhance"
cp -rf "${Download_Folder}/轻量规则.txt" "${Sort_Folder}/enhance"
#合并文件
Combine_adblock_original_file "${Rules_Folder}/Adblock_attach.txt" "${Sort_Folder}/enhance"
lite_Adblock_Rules "${Rules_Folder}/Adblock_attach.txt"
#净化去重规则
modtify_adblock_original_file "${Rules_Folder}/Adblock_attach.txt"
#读取白名单 剔除规则
make_white_rules "${Rules_Folder}/Adblock_attach.txt" "`pwd`/white_list/white_list.prop"
#剔除冲突的CSS规则
fixed_css_white_conflict "${Rules_Folder}/Adblock_attach.txt"
#去除重复作用域名
Running_sort_domain_Combine "${Rules_Folder}/Adblock_attach.txt"
#去除指定重复的Css
Running_sort_Css_Combine "${Rules_Folder}/Adblock_attach.txt"
#去除不必要的CSS扩展选择器
modtify_adblock_original_file "${Rules_Folder}/Adblock_attach.txt" '\$removeheader|:matches-property|:nth-ancestor|\$removeparam|,removeparam'
fix_Rules "${Rules_Folder}/Adblock_attach.txt" ':remove\(\)' ''
fix_Rules "${Rules_Folder}/Adblock_attach.txt" '\{[[:space:]]remove:[[:space:]]true\;[[:space:]]\}' ''
#再次净化去重
modtify_adblock_original_file "${Rules_Folder}/Adblock_attach.txt"
#规则分类
sort_and_optimum_adblock "${Rules_Folder}/Adblock_attach.txt"
#写入头信息
write_head "${Rules_Folder}/Adblock_attach.txt" "Aloazny attach fiter" "合并混合规则的补充规则，轻量规则，可作为补充规则使用。" && echo "※`date +'%F %T'` 补充规则合并完成！"

#处理规则
cp -rf "${Rules_Folder}/Adblock_attach.txt" "${Sort_Folder}/Chinese"
cp -rf "${Download_Folder}/Adguard_mobile.txt" "${Sort_Folder}/Chinese"
cp -rf "${Download_Folder}/Adguard_Chinese.txt" "${Sort_Folder}/Chinese"
#合并文件
Combine_adblock_original_file "${Rules_Folder}/Adblock_Chinese.txt" "${Sort_Folder}/Chinese"
lite_Adblock_Rules "${Rules_Folder}/Adblock_Chinese.txt"
#净化去重规则
modtify_adblock_original_file "${Rules_Folder}/Adblock_Chinese.txt"
#读取白名单 剔除规则
make_white_rules "${Rules_Folder}/Adblock_Chinese.txt" "`pwd`/white_list/white_list.prop"
#剔除冲突的CSS规则
fixed_css_white_conflict "${Rules_Folder}/Adblock_Chinese.txt"
#去除重复作用域名
Running_sort_domain_Combine "${Rules_Folder}/Adblock_Chinese.txt"
#去除指定重复的Css
Running_sort_Css_Combine "${Rules_Folder}/Adblock_Chinese.txt"
#再次净化去重
modtify_adblock_original_file "${Rules_Folder}/Adblock_Chinese.txt"
#规则分类
sort_and_optimum_adblock "${Rules_Folder}/Adblock_Chinese.txt"
#写入头信息
write_head "${Rules_Folder}/Adblock_Chinese.txt" "Aloazny Chinese fiter" "合并混合规则的补充规则，轻量规则，Adguard mobile(Adguard移动端规则)，Adguard Chinese(Adguard中文规则)，可作为国内拦截规则使用。" && echo "※`date +'%F %T'` 中文规则合并完成！"

#处理规则
cp -rf "${Rules_Folder}/Adblock_Chinese.txt" "${Sort_Folder}/all"
cp -rf "${Download_Folder}/2_without_easylist.txt" "${Sort_Folder}/all"

#合并文件
Combine_adblock_original_file "${Rules_Folder}/Adblock.txt" "${Sort_Folder}/all"
#规则小修
fix_Rules "${Rules_Folder}/Adblock.txt" ':-abp-contains(' ':has-text('
fix_Rules "${Rules_Folder}/Adblock.txt" ':-abp-has(' ':has('
#去除Ublock不支持的规则
lite_Uadblock_Rules "${Rules_Folder}/Adblock.txt"
#净化去重规则
modtify_adblock_original_file "${Rules_Folder}/Adblock.txt"
#读取白名单 剔除规则
make_white_rules "${Rules_Folder}/Adblock.txt" "`pwd`/white_list/white_list.prop"
#剔除冲突的CSS规则
fixed_css_white_conflict "${Rules_Folder}/Adblock.txt"
#去除重复作用域名
Running_sort_domain_Combine "${Rules_Folder}/Adblock.txt"
#去除指定重复的Css
Running_sort_Css_Combine "${Rules_Folder}/Adblock.txt"
#再次净化去重
modtify_adblock_original_file "${Rules_Folder}/Adblock.txt"
#规则分类
sort_and_optimum_adblock "${Rules_Folder}/Adblock.txt"
#写入头信息
write_head "${Rules_Folder}/Adblock.txt" "Aloazny Mobile fiter" "合并混合规则的补充规则，轻量规则，Adguard mobile(Adguard移动端规则)，Adguard Chinese(Adguard中文规则)，Adguard Base fiter(Adguard基础规则)，可作为移动端规则使用。" && echo "※`date +'%F %T'` 移动规则合并完成！"

rm -rf "`pwd`/temple"
#更新README信息
update_README_info




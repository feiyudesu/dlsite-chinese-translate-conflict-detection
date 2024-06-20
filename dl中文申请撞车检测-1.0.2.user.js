// ==UserScript==
// @name         dl中文申请撞车检测
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  点击右下角按钮 会将翻译申请界面已经被申请过简体中文的作品图片隐藏
// @author       Feiyu
// @match        *www.dlsite.com/home/works/translatable*
// @match        *www.dlsite.com/maniax/works/translatable*
// @match        *www.dlsite.com/girls/works/translatable*
// @match        *www.dlsite.com/bl/works/translatable*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/498471/dl%E4%B8%AD%E6%96%87%E7%94%B3%E8%AF%B7%E6%92%9E%E8%BD%A6%E6%A3%80%E6%B5%8B.user.js
// @updateURL https://update.greasyfork.org/scripts/498471/dl%E4%B8%AD%E6%96%87%E7%94%B3%E8%AF%B7%E6%92%9E%E8%BD%A6%E6%A3%80%E6%B5%8B.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // 创建并添加固定位置按钮
    const button = document.createElement('button');
    button.id = 'fixedButton';
    button.innerText = '检测or删除';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#007bff';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1000';
    document.body.appendChild(button);

    // 按钮点击事件处理
    button.addEventListener('click', function() {

        // 获取所有目标元素
        const elements = document.querySelectorAll('.search_result_img_box_inner.type_exclusive_01, .search_result_img_box_inner');

        elements.forEach(element => {
            const translationTable = element.querySelector('.translation_table');

            if (translationTable) {

                const rows = translationTable.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');

                    if (cells.length === 0) {
                        return;
                    }


                    // 检查行是否全部为空
                    let isEmptyRow = true;
                    cells.forEach((cell, index) => {
                        // 检查innerHTML
                        const cellContent = cell.innerHTML.trim();
                        if (cellContent !== '') {
                            isEmptyRow = false;
                        }
                    });

                    if (isEmptyRow) {
                        return;
                    }

                    // 使用CSS选择特定语言的行
                    const languageCell = cells[0];
                    const firstCellContent = languageCell ? languageCell.innerHTML.trim() : '';
                    if (languageCell && languageCell.innerHTML.includes('简体中文')) {

                        const thirdTdContent = cells[2].innerHTML.trim();

                        // 判断第三个单元格的内容是否不为0
                        if (thirdTdContent !== '0') {

                            const searchImgElement = element.querySelector('.work_thumb');
                            if (searchImgElement) {
                                searchImgElement.remove();
                            } else {
                            }
                        }
                    }
                });
            } else {
            }
        });
    });
})();


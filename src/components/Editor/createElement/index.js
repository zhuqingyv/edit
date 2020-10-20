/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 19:23:33
 * @LastEditTime: 2020-10-14 19:30:24
 * @LastEditors: zhuqingyu
 */
const element = new Set(['p', 'span', 'h1', 'h2', 'h3', 'img']);

export default function(type, text, style = {}) {
    if(!element[type]) return null

    let el = document.createElement(type)
    el.innerText = text
    for(let key in style) {
        if(el.style[key] !== undefined) {
            el.style[key] = style[key]
        }
    }

    return el
}
/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 10:47:03
 * @LastEditTime: 2020-10-16 20:36:27
 * @LastEditors: zhuqingyu
 */
import { Debounce } from 'tools'

let state = {
    data: null, // 从服务器拉取所有的数据
    temp: {
       project: null, // 当前项目
       class: null , // 当前类别
       art: null // 当前文章
    }, // 当前操作的对象
    // tempProject: null, // 当前选中的项目
    // tempArt: null, // 当前选中的项目下的 => 模块
    // tempClass: null,
    history: [],
    searchHistory: [],
    dirty: false,
    debounce: new Debounce('state')
}
export default state
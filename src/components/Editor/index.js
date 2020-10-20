/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 19:20:32
 * @LastEditTime: 2020-10-15 14:20:41
 * @LastEditors: zhuqingyu
 */
import createElement from "./createElement/index.js"
import Pointer from "./Pointer/index.js"

class Editor {
    constructor(target, pointer) {
        this.target = target
        this.createElement = createElement
        this.pointer = new Pointer(this, pointer)
        this.beforeElement = null
        this.lastElement = null
    }

    // enter(type, text, style = {}) {
        // const el = this.createElement(type, text, style)
        // if(this.la)
    // }
}
export default Editor
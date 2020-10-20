/*
 * @Author: zhuqingyu
 * @Date: 2020-10-15 10:19:31
 * @LastEditTime: 2020-10-15 10:57:11
 * @LastEditors: zhuqingyu
 */
export default class Pointer {
    constructor(context, pointer) {
        this.context = context
        this.pointerElement = pointer
        this.timer = null
        this._visible = false
    }

    move() {}

    get visible() {
        return this._visible
    }
    set visible(val) {
        this._visible = !!val
    }

    get beforeElement() {
        return this.context.beforeElement
    }
    get nextElement() {
        return this.context.nextElement
    }
}
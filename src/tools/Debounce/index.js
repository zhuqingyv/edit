/*
 * @Author: zhuqingyu
 * @Date: 2020-10-16 17:59:54
 * @LastEditTime: 2020-10-16 19:10:40
 * @LastEditors: zhuqingyu
 */
class Debounce {
    constructor(key) {
        console.log(`name-${key}`)
        this.name = key
        this.list = []
        
        Object.freeze(this)
    }
    add(callback, context = null, time) {
        this.list.push({
            callback,
            context,
            time
        })
    }

    do(callback, ...arg) {
        const item = this.list.find(item => item.callback == callback)
        if(item) {
            let { callback, context, time } = item

            console.log(time)
            if(item.timer) clearTimeout(time)

            item.timer = setTimeout(() => {
                if(context) {
                    callback.call(context, ...arg)
                } else {
                    callback(...arg)
                }
            }, time)
        }
    }
}

export default Debounce
/*
 * @ Author: zhuqingyu
 * @ Date: 2020-09-22 11:22:49
 * @LastEditTime: 2020-09-23 15:48:33
 * @LastEditors: zhuqingyu
 * @【API】:
 * @ _path: 文件绝对位置(一般通过 path 模块获取到) ===> String
 * @ config: 是否进行自动格式化或者配置(replacer) (默认自动格式化，锁进(space)为 4, replacer为null) ===> Object
 * @ code: 编码模式，默认 utf8 ===> String
 */
const fs = require("fs");

class JsonProxy {

    constructor(_path, _config, code = "utf8") {

        try {

            this.path = _path
            this.code = code
            this.config = this.Config(_config)
            this.data = JSON.parse(fs.readFileSync(this.path, code))
            return this.getProxy(this.data)

        } catch (err) {
            throw err
        }

    }

    getProxy(obj) {
        let root = this.data
        let path = this.path
        let config = this.config

        for (let key in obj) {

            let attr = obj[key]

            if (typeof attr === 'object') {
                if (attr instanceof Array) {

                    obj[key] = attr.reduce((pre, cur, index) => {
                        pre[index] = this.getProxy(cur)
                        return pre
                    }, [])

                } else if (attr instanceof Object) {
                    obj[key] = this.getProxy(attr)
                }

            }
        }

        if (typeof obj !== 'object') return obj

        return new Proxy(obj, {
            get(target, key) {
                return target[key]
            },

            set(target, key, value) {
                target[key] = value
                const newValue = JSON.stringify(root, config.replacer, config.space)
                fs.writeFileSync(path, newValue)
            }
        })

    }

    Config(config = {}) {
        return {
            space: config.space || 4,
            replacer: config.replacer || null
        }
    }
}

module.exports = JsonProxy
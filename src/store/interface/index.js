/*
 * @Author: zhuqingyu
 * @Date: 2020-10-15 14:01:06
 * @LastEditTime: 2020-10-15 14:04:04
 * @LastEditors: zhuqingyu
 */
import api from '@/api/index.js'

export default {
    // 修改 json
    setJson(newJson) {
        return api({
            method: "post",
            url: "/setApi",
            data: { json: newJson },
        })
    }
}
/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 17:59:20
 * @LastEditTime: 2020-10-13 18:07:46
 * @LastEditors: zhuqingyu
 */
const toString = function(info) {
    if(info === null && info === undefined) return ""
    try{
        return JSON.stringify(info)
    }catch{
        return ""
    }
}

module.exports = function(response, code, errInfo) {
    response.statusCode = code;
    response.setHeader("Content-Type", "application/json");
    response.end(toString(errInfo), "utf8");
}
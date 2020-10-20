/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 17:39:55
 * @LastEditTime: 2020-10-13 20:07:28
 * @LastEditors: zhuqingyu
 */
const getApi = require("./getApi/index.js");
const setApi = require("./setApi/index.js")

const json = {
    '/getApi': getApi,
    '/setApi': setApi
}

module.exports = json
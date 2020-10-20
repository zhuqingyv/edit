/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 19:39:30
 * @LastEditTime: 2020-10-16 15:14:39
 * @LastEditors: zhuqingyu
 */
const allowOrigin = require(PATH.COMPONENTS.ALLOW_ORIGIN); // 处理跨域
const testOption = require(PATH.COMPONENTS.TEST_OPTION); // 处理复杂请求第一个试探请求
const getBody = require(PATH.COMPONENTS.GET_BODY); // 获得请求体 body（String）
const responseError = require(PATH.COMPONENTS.RESPONSE_ERROR); // 快速返回错误信息

const json = require(PATH.DATA.ALL); // json 模块化代理

module.exports = function(request, response) {
    allowOrigin(response); // 处理跨域

    if (testOption(request, response)) return; //  处理复杂请求

    try{
        getBody(request).then(data => {
            const body = JSON.parse(data[0] || '{}'); // 用户发送过来的数据

            const newValue = body.json

            if(!newValue || typeof newValue !== 'object') {
                responseError(response, 500, "格式不对！")
                return
            }
            for(let key in json) {
                copyData(json[key], newValue[key]) // 更改json
            }

            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            const value = {json}
            const sendJson = JSON.stringify(value)
            response.end(sendJson, 'utf8')
            console.log(JSON.parse(JSON.stringify(json)).mighty.contents[0].contents[0].contents[0].name, newValue.mighty.contents[0].contents[0].contents[0].name)
        }).catch((err) => {
            responseError(response, 500, "服务器出错！")
        })
    }catch(err){
        responseError(response, 500, "服务器出错！")
    }
}

function copyData(old, change) {
    for(let key in change) {
        old[key] = change[key]
    }
}
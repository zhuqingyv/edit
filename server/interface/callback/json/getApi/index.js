/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 17:45:12
 * @LastEditTime: 2020-10-14 11:08:57
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
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json");
            response.end(
                JSON.stringify({
                    json: JSON.stringify(json)
                }),
                "utf8"
            );
        }).catch(() => {
            responseError(response, 500, "服务器出错！")
        })
    }catch {
        responseError(response, 500, "服务器出错！")
    }
}
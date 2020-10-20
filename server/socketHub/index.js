/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 10:31:59
 * @LastEditTime: 2020-10-14 10:32:17
 * @LastEditors: zhuqingyu
 */
const WebSocket = require('ws');
module.exports = {
    '/updateApi': new WebSocket.Server({
        noServer: true
    })
}
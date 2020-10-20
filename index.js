/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 16:49:42
 * @LastEditTime: 2020-10-13 17:31:45
 * @LastEditors: zhuqingyu
 */
const __global = require("./global/global.js"); // 全局对象
const PATH = global.PATH = __global.PATH; // 全局路径

const server = require("./server/server.js"); // 开始服务
const killPort = require(PATH.TOOLS.KILL_PORT); // 端口终结者
const port = 3000 // 服务端口

killPort(port).then(() => {
    console.log(`清理端口: ${port} 成功！`)
    server.init(port).then(() => {
        console.log(`Server on Port: => ${port} !`);
    }).catch(err => {
        console.log(`${port} is Error!`, err);
    })
})
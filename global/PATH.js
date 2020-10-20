/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 17:22:37
 * @LastEditTime: 2020-10-14 11:07:24
 * @LastEditors: zhuqingyu
 */
const path = require("path");

const PATH = {
    TOOLS: {
        JSON_PROXY: path.resolve(__dirname, "../tools/JsonProxy/JsonProxy.js"), // json 模块化
        KILL_PORT: path.resolve(__dirname, "../tools/killPort/killPort.js") // 关闭端口
    },
    COMPONENTS: {
        GET_BODY: path.resolve(__dirname, "../components/getBody/index.js"), // 获取 response 请求体
        TEST_OPTION: path.resolve(__dirname, "../components/testOption/index.js"), // 处理复杂请求
        ALLOW_ORIGIN: path.resolve(__dirname, "../components/allowOrigin/index.js"), // 允许跨域
        RESPONSE_ERROR: path.resolve(__dirname, "../components/error/index.js") //快速返回错误信息
    },
    DATA: {
        ALL: path.resolve(__dirname, "../data/index.js"), // api json 地址
        MIGHTY: path.resolve(__dirname, "../data/mighty/index.json"),
        GAME_EDITOR: path.resolve(__dirname, "../data/gameEditor/index.json")
    }
}

module.exports = PATH
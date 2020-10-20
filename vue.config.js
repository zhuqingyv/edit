/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 17:51:34
 * @LastEditTime: 2020-10-16 18:11:46
 * @LastEditors: zhuqingyu
 */
const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                event: path.resolve(__dirname, './src/event/event.js'),
                const: path.resolve(__dirname, "./src/const/const.js"),
                tools: path.resolve(__dirname, "./src/tools/index.js")
            }
        }
    }
}
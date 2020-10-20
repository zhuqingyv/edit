/*
 * @Author: zhuqingyu
 * @Date: 2020-10-13 19:46:11
 * @LastEditTime: 2020-10-14 11:25:42
 * @LastEditors: zhuqingyu
 */
const jsonProxy = require(PATH.TOOLS.JSON_PROXY); // json 模块化代理

const mighty = new jsonProxy(PATH.DATA.MIGHTY);
const gameEditor = new jsonProxy(PATH.DATA.GAME_EDITOR);

module.exports = {
    mighty,
    gameEditor
}
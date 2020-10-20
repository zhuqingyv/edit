import state from "../state"

/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 10:52:33
 * @LastEditTime: 2020-10-16 19:16:50
 * @LastEditors: zhuqingyu
 */
const getters = {
    // 获取 文章列表
    getData(state) {
        return state.data
    },
    // 获取当前
    getTempArt(state) {
        return state.temp.art
    },

    // 获取当前的项目
    getTempProject(state) {
        return state.temp.project
    },

    // 获取当前的类别
    getTempClass(state) {
        return state.temp.class
    },

    getDebounce() {
        return state.debounce
    }
}
export default getters
/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 10:50:21
 * @LastEditTime: 2020-10-16 19:45:42
 * @LastEditors: zhuqingyu
 */

const action = {
    /* ------------- 临时状态 --------------- */

    // 选择一个文章
    checkTempArt(context, data) {
        context.commit('CHECK_TEMP_ART', data)
    },

    // 选择一个项目
    checkTempProject(context, data) {
        context.commit('CHECK_TEMP_PROJECT', data)
    },

    // 选择一个类别
    checkTempClass(context, data) {
        context.commit('CHECK_TEMP_CLASS', data)
    },

    /* ------------- 持久状态 --------------- */

    // 更新 数据
    updateData(context, data) {
        context.commit('UPDATE_DATA', data)
    },

    // 增加一个项目
    addProject(context, data) {
        context.commit('ADD_PROJECT', data)
        context.commit('UPDATE_DATA', context.state.data)
    },

    // 增加一个类别
    addClass(context, data) {
        context.commit('ADD_CLASS', data)
        context.commit('UPDATE_DATA', context.state.data)
    },

    // 增加一个项目
    addArt(context, data) {
        context.commit('ADD_ART', data)
        context.commit('UPDATE_DATA', context.state.data)
    },

    // 增加一个列表
    addList(context, data) {
        context.commit('ADD_LIST', data)
        context.commit('UPDATE_DATA', context.state.data)
    },

    // 删除一个项目
    deleteItem(context, data) {
        context.commit('DELETE_ITEM', data)
        context.commit('UPDATE_DATA', context.state.data)
    },

    deleteList(context, data) {
        context.commit('DELETE_LIST', data)
        context.commit('UPDATE_DATA', context.state.data)
    },

    // 更新一个类
    updateClass(context, data) {
        context.commit('UPDATE_CLASS', data)
        context.commit('UPDATE_DATA', context.state.data)
    },

    // 更新一个列表
    updateList(context, data) {
        context.commit('UPDATE_LIST', data)
        context.commit('UPDATE_DATA', context.state.data)
    }
}
export default action
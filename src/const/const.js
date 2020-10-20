/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 16:55:21
 * @LastEditTime: 2020-10-16 19:38:21
 * @LastEditors: zhuqingyu
 */

export const updateConfig = {
    timer: null,
    outTime: 300
}

export const newProject = function(name) {
    return {
        name,
        contents: [],
        type: 'project'
    }
}

export const artical = function(name) {
    return {
        name,
        contents: [],
        type: 'artical'
    }
}
// 一个 类别
export const newClass = function(name, contents = []) {
    return {
        name,
        contents,
        type: 'class'
    }
}
// 一个 文章
export const newArt = function(name, contents = []) {
    return {
        name,
        contents,
        type: 'artical'
    }
}

// 一个 列表
export const newList = function(name, note = [], contents = []) {
    return {
        name,
        note,
        contents,
        type: 'list'
    }
}

// 列表中的 某一个具体值
export const newItem = function(name, contents = []) {
    return {
        name,
        contents,
        type: 'item',
    }
}

// 带有注释的一种文字
export const note = function(text, detail = '', contents = [], style = {}) {
    /*
    * 【目前只支持三种可选样式】
    * size: Number,
    * color: String,
    * weight: String
    */
    return {
        text,
        detail,
        contents,
        style
    }
}

// 一种链接，用于富文本
export const link = function(type, src) {
    /*
    * type: String['img', 'link']
    * src: String
    */
    return {
        type,
        src
    }
}
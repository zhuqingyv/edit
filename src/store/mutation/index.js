/*
 * @Author: zhuqingyu
 * @Date: 2020-10-14 10:50:24
 * @LastEditTime: 2020-10-16 19:48:08
 * @LastEditors: zhuqingyu
 */
import Interface from '../interface/index.js'
import { updateConfig } from '../../const/const.js'
import Event from 'event'

function clone(old, change) {
    for(let key in change) {
        if(change[key] && old[key] && typeof change[key] === 'object' && typeof old[key] === 'object') {
            clone(old[key], change[key])
        } else {
            old[key] = change[key]
        }
    }
}

const mutation = {
    UPDATE_DATA(state, data = state.data) {
        console.log('mutation')
        if(updateConfig.timer) clearTimeout(updateConfig.timer)
        updateConfig.timer = setTimeout(() => {
            Interface.setJson(data).then(response => {
                let newValue = response.data.json
                if(state.data) {
                    clone(state.data, newValue)
                } else {
                    state.data = newValue
                }
                Event.$emit('showMiniTip', true, '更新成功！')
                console.log(state)
            }).catch(response => {
                console.log(response)
            })
        }, updateConfig.outTime)
    },

    CHECK_TEMP_PROJECT(state, data) {
        if(data.type === 'project') state.temp.project = data
    },

    CHECK_TEMP_CLASS(state, data) {
        if(data.type === 'class') state.temp.class = data
    },

    CHECK_TEMP_ART(state, data) {
        if(data.type === 'artical') state.temp.art = data
    },

    ADD_PROJECT(state, data) {
        if(state.temp.art) {
            state.temp.art.contents.push(data)
        }
    },

    ADD_CLASS(state, data) {
        if(state.temp.project) {
            state.temp.project.contents.push(data)
        }
    },

    ADD_ART(state, data) {
        const {parent, child} = data
        parent.contents.push(child)
    },

    ADD_LIST(state, data) {
        if(state.temp.art) {
            state.temp.art.contents.push(data)
        }
    },

    DELETE_ITEM(state, item) {
        let { type } = item
        switch(type) {
            case 'class':{
                if(deleteProject(item)) return
                break
            }
            case 'artical': {
                if(deleteClass(item)) return
                if(deleteProject(item)) return
                break
            }
        }

        function deleteProject(item) {
            if(state.temp.project) {
                const index = state.temp.project.contents.indexOf(item)
                if(index !== -1) {
                    state.temp.project.contents.splice(index, 1)
                    return true
                }
            }
            return false
        }

        function deleteClass(item) {
            if(state.temp.class) {
                const index = state.temp.class.contents.indexOf(item)
                if(index !== -1) {
                    state.temp.class.contents.splice(index, 1)
                    return true
                }
            }
            return false
        }

    },

    DELETE_LIST(state, item) {
        if(state.temp.art) {
            const index = state.temp.art.contents.indexOf(item)
            if(index !== -1) state.temp.art.contents.splice(index, 1)
        }
    },

    UPDATE_CLASS(state, data) {
        if(state.temp.class) {
            state.temp.class = data
        }
    },

    UPDATE_LIST(state, data) {
        if(state.temp.art) {
            let arr = state.temp.art.contents.reduce((pre, cur) => {
                if(cur === data.old) {
                    pre.push(data.change)
                    return pre
                }
                pre.push(cur)
                return pre
            }, [])
            state.temp.art.contents = null
            state.temp.art.contents = arr
        }
    }
}
export default mutation
<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-15 11:01:54
 * @LastEditTime: 2020-10-19 10:38:53
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="edit" v-show="getTempArt">
        <div class="content">
            <div class="btn-container">
                <div class="btn addClassBtn" @click.stop="ifShowAdd(true)"><p>增加一个列表+</p></div>
            </div>
            <div class="list-container">
                <div class="list-box" v-show="showAdd"><span class="triangle"></span><input type="text" @blur="addNewList" v-model="newListName"/></div>
                <div class="list-box" v-for="(listData, index) in getTempArt.contents" :key="listData.name + index">
                    <list :list="listData"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import list from './list/list'
import { newList } from 'const'

export default {
    name: "edit",

    data() {
        return {
            showAdd: false,
            newListName: ''
        }
    },

    components: { list },

    computed: {
        ...mapGetters(['getTempArt']),
    },

    methods: {
        ...mapActions(['addList']),
        // 是否显示新增的列表
        ifShowAdd(bool) {
            this.showAdd = bool
            if(!bool) this.newListName = ''
        },
        // 开始新增列表
        addNewList() {
            if(!this.getTempArt) return
            const name = this.newListName || `列表${this.getTempArt.contents.length + 1}`
            const list = newList(name)
            this.addList(list)

            this.ifShowAdd(false)
        }
    }
}
</script>
<style scoped lang="scss">
.edit{
    .content{
        .btn-container{
            box-sizing: border-box;
            display: flex;
            .btn{
                margin-left: 10px;
                margin-top:4px;
            }
            .addClassBtn{
                display: inline-flex;
                border:1px solid #ccc;
                color:#fff;
                font-weight: bold;
                background: rgba(0,0,0,0.3);
                justify-content: center;
                align-items: center;
                padding:0 10px 0 10px;
                user-select: none;
                border-radius: 4px;
                p{
                    margin:0;
                }
            }
        }
        .list-container{
            .list-box{
                width: calc(100% - 40px);
                border-radius: 4px;
                background: white;
                display: inline-flex;
                margin-top: 20px;
                padding:10px 20px 10px 20px;
                transition: all 0.2s;
                input{
                    outline: none;
                    border: none;
                    color: black;
                    margin-top:-3px;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
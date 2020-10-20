<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-15 13:47:56
 * @LastEditTime: 2020-10-20 15:42:16
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="list">
        <div class="list-name">
            <div @dblclick="changeReadonly" class="db-Box" @click.self="ifShowContent(!showContent)">
                <span :class="['triangle', showContent ? 'activeTriangle' : 'normalTriangle']"></span>
                <input type="text" :value="list.name" class="name" :readonly="readonly ? 'readonly' : false"
                    @change="changeName($event.target.value)"
                    @blur="changeEnd"
                    ref="input"
                    />
                <div class="deleteBtn" @click="deleteList">删除</div>
            </div>
        </div>
        <div class="list-contents" v-show="showContent">
            <div class="btn-container"><div class="addBtn" @click.self="showAddItem">+</div></div>
            <div class="item-box item-editBox">
                <input type="text" class="input" />
                <editTexarea class="editTexarea"></editTexarea>
                <button class="addItem">添加</button>
            </div>
            <div v-for="(item, index) in list.contents" :key="index" class="item-box">
                <item :item="item" />
            </div>
        </div>
    </div>
</template>
<script>
import Event from 'event'
import item from './item/item'
import { mapActions } from 'vuex'
import { newItem } from 'const'
import editTexarea from './editTexarea/editTexarea'

export default {
    name: "list",
    data(){
        return {
            showContent: false,
            timer: null,
            readonly: 'true' // 名称是否只读
        }
    },

    props: ['list'],

    components: { item, editTexarea },

    watch: {
        list(val) {
            console.log(val, val.name)
            this.updateData()
        }
    },

    methods: {
        ...mapActions(['updateData', 'updateList']),
        ifShowContent(bool) {
            this.showContent = bool
        },
        changeReadonly() {
            this.readonly = false
            // const input = this.$refs.input
            // if(input && input.focus && input.select) input.select(), input.focus()
        },

        changeEnd() {
            this.readonly = true
        },

        changeName(name) {
            const old = this.list
            const change = JSON.parse(JSON.stringify(old))
            change.name = name
            console.log(name)
            this.updateList({
                old,
                change
            })
        },

        addItem() {
            newItem
        },

        deleteList() {
            Event.$emit('showGlobalTip', {
                type: 'deleteList',
                item: this.list
            })
        }
    },

    mounted() {
        Event.$on('addList', this.addList)
    }
}
</script>
<style scoped lang="scss">
.list{
    width: 100%;
    .list-name{
        width: 100%;
        user-select: none;
        .db-Box{
            .name{
                min-width: 100px;
                outline: none;
                border:none;
                color: black;
                user-select: none;
                background: gray;
                color:#fff;
                font-weight: bolder;
                padding:4px 4px;
                border-radius: 4px;
            }
            .name::selection {
                background: #3B3B3B;
                color:white;
            }
            .deleteBtn{
                float:right;
                display: none;
                color:red;
                cursor: pointer;     
            }
            .triangle{
                position: relative;
                top: 3px;
            }
            .normalTriangle{
                border-right-color: #3B3B3B;
                margin-right: 10px;
                transform: rotate(0deg) translate(-2px, -2px);
            }
            .activeTriangle{
                border-right-color: #3B3B3B;
                margin-right: 10px;
                transform: rotate(-90deg) translate(-2px, -2px);
            }
        }
        .db-Box:hover .deleteBtn{
            display: inline-block;
        }
        
    }
    .list-contents{
        .btn-container{
            background: rgba(0,0,0,0.1);
            border-radius: 4px;
            margin-top:10px;
            .addBtn{
                display: inline-block;
                padding:0px 30px;
                background: #3B3B3B;
                color: white;
                border-radius: 4px;
                user-select: none;
                margin-top:10px;
                margin-left: 10px;
                margin-bottom: 10px;
                cursor: pointer;
            } 
        }
        .item-editBox{
            width: 100%;
            display: flex;
            justify-content: left;
            margin-top:10px;
            .input{
                flex-grow: 2;
                font-weight: bolder;
                font-size: 20px;
            }
            .input, .editTexarea{
                outline: none;
                border:1px solid #ccc;
                border-radius: 4px;
                text-indent: 10px;
            }
            .editTexarea{
                margin-left: 20px;
                flex-grow: 8;
                border-radius: 4px;
                font-size: 15px;
            }
            .addItem{
                margin-left: 20px;
            }
        }
    }
}
</style>
<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 17:45:39
 * @LastEditTime: 2020-10-15 17:54:44
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="rightClickBox" v-show="show" :style="{top: `${top}px`, left: `${left}px`}">
        <addClassBtn @hiddenRightBox="hiddenList" v-show="item && item.type === 'project'" :item="item"><span  class="btn">新增类别</span></addClassBtn>
        <addArtBtn @hiddenRightBox="hiddenList" v-show="item && (item.type === 'class' || item.type === 'project')"  :item="item"><span>新增文章</span></addArtBtn>
        <deleteBtn @hiddenRightBox="hiddenList" v-show="item" :item="item"><span class="btn">删除</span></deleteBtn>
        <editorBtn @hiddenRightBox="hiddenList" v-show="item" :item="item"><span class="btn">编辑</span></editorBtn>
    </div>
</template>
<script>
import Event from "event"
import addClassBtn from "./addClass/rightClickBox-addClass"
import addArtBtn from "./addArt/rightClickBox-addArt"
import deleteBtn from "./delete/rightClickBox-delete"
import editorBtn from "./editor/rightClickBox-editor"
import {mapActions} from "vuex"

export default {
    name: "rightClickBox",
    data() {
        return {
            show: false,
            top:0,
            left: 0,
            item: null
        }
    },

    components: {addClassBtn, addArtBtn, deleteBtn, editorBtn},

    methods: {
        ...mapActions(['checkTempProject', 'checkTempClass' ,'checkTempArt']),
        showList(item, e) {
            const position = this.getPosition(e)
            this.top = position.top
            this.left = position.left
            this.show = true

            this.item = item
            this.check(this.item)
        },

        hiddenList() {
            this.show = false
            this.clear()
        },

        getPosition(e) {
            const top = e.clientY + 5
            const left = e.clientX + 15
            return {
                top,
                left
            }
        },

        globalClick() {
            this.$nextTick(this.hiddenList)
        },

        clear() {
            this.$nextTick(() => {
                this.item = null
            })
        },

        check(item) {
            switch(item.type) {
                case 'project':{
                    this.checkTempProject(item)
                    break
                }
                case 'class': {
                    this.checkTempClass(item)
                    break
                }
                case 'artical': {
                    this.checkTempArt(item)
                    break
                }
            }
        }
    },

    mounted() {
        Event.$on('showRightBox', this.showList)
        Event.$on('globalClick', this.globalClick)
    }
}
</script>
<style scoped lang="scss">
.rightClickBox{
    position: fixed;
    background: #292421;
    user-select: none;
    color: #fff;
    padding:5px 10px 5px 5px;
    text-indent: 10px;
    .btn{
        transition: all 0.5s;
        font-size: 14px;
    }
    .btn:hover{
        opacity: 0.5;
        transform: scale(1.05);
    }
}
</style>
<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 13:42:16
 * @LastEditTime: 2020-10-16 17:34:33
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="item" :style="{background: `rgba(${color},${color},${color},1)`}" :class="[active ? 'active' : '', activeParent ? 'activeParent' : '']">
        <div class="item-name" @click.self="checkItem" @click.right.prevent="rightClick($event)">
            <span :class="[showList ? 'iconRotate' : '', item.type === 'artical' ? 'iconArt' : 'iconParent']"></span>
            <span>{{ item.name }}</span>
            <span class="itemStyle" :class="item.type">{{ item.type }}</span>
        </div>
        <transition name="slide-fade">
            <div class="item-name" v-if="showAddBtn" :style="{background: `rgba(${color * 0.8},${color * 0.8},${color * 0.8},1)`}"><input type="text" v-model="newItemName" @blur="add" /></div>
            <div v-show="showList && parentType[item.type] && item.contents.length" class="item-contents">
                <div v-for="(item1, index) in item.contents" :key="index">
                    <item :item="item1" :colorDeep="colorDeep * 0.8"/>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Event from "event"
import item from './item'
import { newClass, newArt } from 'const'

export default {
    name: "item",
    data() {
        return {
            showList: false,
            showAddBtn: false,
            newItemName: '',
            type: '',

            parentType: {
                'class': true,
                'project': true
            }
        }
    },

    props: ['item', 'colorDeep'],

    components: { item },

    watch: {},

    computed: {
        ...mapGetters(['getTempArt', 'getTempProject', 'getTempClass']),
        active: {
            get() {
                return this.getTempArt === this.item
            }
        },
        activeParent: {
            get() {
                return this.getTempProject === this.item || this.getTempClass === this.item
            }
        },

        color: {
            get() {
                return 255 * (1- this.colorDeep)
            }
        }
    },

    methods: {
        ...mapActions(['checkTempArt', 'checkTempProject', 'checkTempClass', 'addClass', 'addArt']),
        checkItem() {
            if(this.item.type === 'artical') {
                this.checkTempArt(this.item)
            }
            if(this.item.type === 'class') {
                this.checkTempClass(this.item)
            }
            if(this.item.type === 'project') {
                this.checkTempProject(this.item)
            }
            this.showList = !this.showList
        },

        rightClick(e) {
            Event.$emit('showRightBox', this.item, e)
        },

        // 展示输入输入框
        ifShowAddBtn(type, item) {
            if(this.item !== item) return
            console.log(type)
            this.type = type
            this.showAddBtn = true
        },

        // 增加一个项目
        add() {
            switch(this.type) {
                case 'class':{
                    this.addClass(newClass(this.newItemName))
                    break
                }
                case 'artical': {
                    this.addArt({
                        parent: this.item,
                        child: newArt(this.newItemName)
                    })
                    break
                }
            }
            this.clear()
        },

        clear() {
            this.type = ''
            this.newItemName = ''
            this.showAddBtn = false
        }
    },

    mounted() {
        Event.$on('addClass', this.ifShowAddBtn)
        Event.$on('addArt', this.ifShowAddBtn)
    }
}
</script>
<style scoped lang="scss">
.item{
    width: 100%;
    display: flex;
    text-indent: 10px;
    border-left: 0px;
    border-right: 0px;
    color:#fff;
    border:1px solid rgba(0,0,0,0.5);
    flex-direction: column;
    box-sizing: border-box;
    cursor: pointer;
    .item-name{
        display: flex;
        justify-content: left;
        align-items: center;
        text-align: left;
        height: 50px;
        border-top:1px dashed #ccc;
        box-sizing: border-box;
        user-select: none;
        position: relative;
        span{
            pointer-events: none;
        }
        .iconParent{
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-right: 5px solid;
            border-bottom: 5px solid transparent;
            position: relative;
            top:2px;
            margin-left: 10px;
            transition: all 0.3s;
        }
        .iconArt{
            width: 10px;
            height: 10px;
            background: GoldEnrod;
            border-radius: 5px;
            position: relative;
            margin-left: 10px;
        }
        .iconRotate{
            transform: rotate(-90deg);
        }
        input{
            border:none;
            height: 100%;
            background: rgba(0,0,0,0);
            outline:none;
            color:#fff;
        }
        .itemStyle{
            position: absolute;
            font-size: 10px;
            right:5px;
            pointer-events: none;
        }
        .project{
            color: Salmon;
        }
        .class{
            color: RosyBrown;
        }
        .artical{
            color: GoldEnrod;
        }
    }
    .item-name:first-child{
        border-top:1px dashed rgba(0,0,0,0);
    }
    .item-contens{}
}
.item:hover{
    box-shadow: 0px 5px 5px #ccc;
}
.active{
    animation: active 2s linear infinite;
    box-sizing: border-box;
}
.activeParent{
    border:1px dashed #fff;
}
@keyframes active {
    0%{
        background: #707070;
    }
    50%{
        background:#000000;
    }
    100%{
        background: #707070;
    }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
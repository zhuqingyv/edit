<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-16 18:44:59
 * @LastEditTime: 2020-10-16 18:58:39
 * @LastEditors: zhuqingyu
-->
<template>
    <transition name="slide-fade">
        <div class="miniTip" v-show="show">{{ text }}</div>
    </transition>
</template>
<script>
import Event from 'event'

export default {
    name: "miniTip",
    data() {
        return {
            show: false,
            text: '提示!'
        }
    },

    methods: {
        ifShowMiniTip(bool, text) {
            this.show = bool
            this.text =  text
            if(bool) {
                setTimeout(() => {
                    this.show = false
                }, 2000)
            }
        }
    },

    mounted() {
        Event.$off('showMiniTip', this.ifShowMiniTip)
        Event.$on('showMiniTip', this.ifShowMiniTip)
    }
}
</script>
<style scoped lang="scss">
.miniTip{
    position: fixed;
    z-index: 99999;
    padding: 10px 20px;
    background: white;
    transform: translate(50%);
    left:50%;
    top:50px;
    box-shadow: 2px 3px 10px #777;
    border-radius: 4px;
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
    top:10px;
    opacity: 0;
}
</style>
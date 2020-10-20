<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-15 17:00:22
 * @LastEditTime: 2020-10-16 19:45:10
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="global-tip" v-show="show">
        <div class="tip-container">
            <p class="title">{{ text || '提示！' }}</p>
            <div class="btn-container">
                <div class="btn sure" @click.stop="sure">确定</div>
                <div class="btn but" @click.stop="but">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
import Event from 'event'
import { mapActions } from 'vuex'

export default {
    name: "globalTip",
    data() {
        return {
            show: false,

            type: '',
            text: '',
            item: null
        }
    },

    methods: {
        ...mapActions(['deleteItem', 'deleteList']),
        showGlobalTip(data) {
            const { type, text, item } = data
            this.type = type
            this.text = text
            this.item = item

            this.show = true
        },

        sure() {
            const callback = this[this.type]
            if(callback) {
                callback(this.item)
            }
            this.but()
        },
        but() {
            this.type = ''
            this.item = null

            this.show = false
        },
    },

    mounted() {
        Event.$off('showGlobalTip', this.showGlobalTip)
        Event.$on('showGlobalTip', this.showGlobalTip)
    }
}
</script>
<style scoped lang="scss">
.global-tip{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background: rgba(0,0,0,0.2);
    .tip-container{
        background: white;
        border-radius: 4px;
        padding: 20px 20px;
        .title{
            user-select: none;
        }
        .btn-container{
            user-select: none;
            display: inline-flex;
            .btn{
                justify-content: space-between;
                border:1px solid #000;
                border-radius: 4px;
                padding:4px 10px;
                color:#fff;
                cursor: pointer;
                &:hover{
                    opacity: 0.5;
                }
            }
            .sure{
                background: CornflowerBlue;
                border-color: CornflowerBlue;
            }
            .but{
                margin-left: 10px;
                background: FireBrick;
                border-color: FireBrick;
            }
        }
    }
}
</style>
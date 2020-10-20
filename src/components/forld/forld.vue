<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 13:25:28
 * @LastEditTime: 2020-10-16 17:31:39
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="forld">
        <div class="title">标题</div>
        <div v-for="(value, key) in mapData" :key="key" class="item-container">
            <item :item="value" :colorDeep="colorDeep"/>
        </div>
    </div>
</template>
<script>
import item from "./item/item"
import { mapGetters } from 'vuex'

export default {
    name: "forldView",
    data() {
        return {
            colorDeep: 0.8
        }
    },

    components: { item },

    computed: {
        ...mapGetters(['getData']),

        mapData: {
            get() {
                return this.getData
            }
        }
    }
}
</script>
<style scoped lang="scss">
.forld{
    width: 15rem;
    .title{
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        height: 80px;
        line-height: 80px;
        color:#fff;
    }
    .item-container{
        display: flex;
        flex-direction: ceil;
    }
    background: SlateGray;
}
</style>
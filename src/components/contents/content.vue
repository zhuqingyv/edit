<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 13:25:28
 * @LastEditTime: 2020-10-16 19:50:00
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="content">
        <component :is="currentPage" v-if="getTempArt"></component>
        <div class="defaultTip" v-else>请创建一个文档</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import show from './show/show'
import edit from './edit/edit'

export default {
    name: "contentView",
    data() {
        return {
            currentPage: 'edit'
        }
    },

    components: {show, edit},

    computed: {
        ...mapGetters(['getData', 'getTempArt']),
    },

    mounted(){
    }
}
</script>
<style scoped lang="scss">
.content{
    background: rgba(0,0,0,0.1);
    flex: 1;
    padding: 10px;
}
</style>
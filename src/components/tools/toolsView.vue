<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 16:45:38
 * @LastEditTime: 2020-10-16 18:18:10
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="toolsView" @click="addItem">新增文章</div>
</template>
<script>
import { newItem } from "@/const/const.js"

export default {
    name: "toolsView",
    data() {
        return{}
    },

    methods: {
        addItem(from, name) {
            from.push(newItem(name))
        }
    }
}
</script>
<style scoped lang="scss">
.toolsView{
    user-select: none;
}
</style>
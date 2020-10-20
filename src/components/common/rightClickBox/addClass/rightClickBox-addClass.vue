<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 17:56:51
 * @LastEditTime: 2020-10-15 16:43:06
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="rightClickBoxAddClass" @click.self="check">新增类别</div>
</template>
<script>
import Event from 'event'

export default {
    name: "rightClickBoxAddClass",
    data() {
        return {}
    },

    props: ['item'],

    methods: {
        check() {
            Event.$emit('addClass', 'class', this.item)
            this.$emit('hiddenRightBox')
        }
    }
}
</script>

<style scoped lang="scss">
.rightClickBoxAddClass{
    height: 30px;
}
</style>
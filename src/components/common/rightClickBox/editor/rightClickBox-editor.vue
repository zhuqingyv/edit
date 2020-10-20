<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 17:56:51
 * @LastEditTime: 2020-10-15 16:49:18
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="rightClickBoxEditor" @click.self="check">编辑</div>
</template>
<script>
export default {
    name: "rightClickBoxEditor",
    data() {
        return {}
    },

    props: ['item'],

    methods: {
        check() {
            this.$emit('hiddenRightBox')
        }
    }
}
</script>

<style scoped lang="scss">
.rightClickBoxEditor{
    height: 30px;
}
</style>
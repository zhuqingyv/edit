<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 17:56:51
 * @LastEditTime: 2020-10-15 17:24:57
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="rightClickDelete" @click.self="check">删除</div>
</template>
<script>
import Event from 'event'

export default {
    name: "rightClickDelete",

    props: ['item'],

    methods: {
        check() {
            Event.$emit('showGlobalTip', {
                type: 'deleteItem',
                item: this.item
            })
            this.$emit('hiddenRightBox')
        }
    }
}
</script>

<style scoped lang="scss">
.rightClickDelete{
    height: 30px;
}
</style>
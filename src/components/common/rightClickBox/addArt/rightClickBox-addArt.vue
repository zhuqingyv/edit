<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-14 17:56:51
 * @LastEditTime: 2020-10-15 16:44:30
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="rightClickBoxAddArt" @click.self="check">
        <slot></slot>
    </div>
</template>
<script>
import Event from 'event'

export default {
    name: "rightClickBoxAddArt",
    data() {
        return {}
    },

    props: ['item'],

    methods: {
        check() {
            Event.$emit('addArt', 'artical', this.item)
            this.$emit('hiddenRightBox')
        }
    }
}
</script>

<style scoped lang="scss">
    .rightClickBoxAddArt{
        height: 30px;
    }
</style>
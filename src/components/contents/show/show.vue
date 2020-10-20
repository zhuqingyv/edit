<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-15 11:01:47
 * @LastEditTime: 2020-10-15 11:13:44
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="show" :innerHTML="innerHTML"></div>
</template>
<script>
export default {
    name: "show",

    props: ['innerHTML']
}
</script>
<style scoped lang="scss">

</style>
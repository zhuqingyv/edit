<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-20 13:32:24
 * @LastEditTime: 2020-10-20 13:52:49
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="editPointer">
        <div><span>标题：</span><input type="text" v-model="title" /></div>
        <div><span>内容：</span><p contenteditable="true" @input="changePointerText($event.target.innerText)" ref="textDom"></p></div>
        <div class="button-container"><button @click="add('pointer')">增加</button><button @click="add(null)">取消</button></div>
        <div class="triangle"></div>
    </div>
</template>
<script>
export default {
    name: "btn",
    data() {
        return {
            title: '',
            text: ''
        }
    },

    methods: {
        // 修改 text
        changePointerText(val) {
            this.text = val
        },

        add(type) {
            if(!type) {
                this.$emit('add', null)
                return
            }
            if(!this.title || !this.text) return

            this.$emit('add', {
                type,
                title: this.title,
                text: this.text
            })

            this.title = this.text = ''

            let textDom = this.$refs.textDom
            if(textDom) {
                textDom.innerText = ''
            }
        }
    }
}
</script>
<style lang="scss">
.editPointer{
    border:1px solid #cccccc;
    display: flex;
    flex-direction: column;
    padding:4px;
    border-radius: 4px;
    input {
        outline: none;
        border:none;
        background: rgba(255,255,255,0.5);
        border-radius: 4px;
    }
    p{
        outline: none;
        border-radius: 4px;
        background: rgba(255,255,255,0.5);
        margin:0;
        text-align: left;
        color: black;
    }
    .triangle{
        transform: rotate(-90deg);
        position: absolute;
        bottom: -10px;
        border-right-color: #cccccc;
        left: 50%;
        margin-left: -5px;
    }
    .button-container{
        display: flex;
        flex-direction: cell;
        justify-content: space-around;
        button{
            outline: none;
            margin-top:10px;
            outline: none;
            border:none;
            background: #cccccc;
            border-radius: 4px;
        }
    }
}
</style>
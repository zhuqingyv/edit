<!--
 * @Author: zhuqingyu
 * @Date: 2020-10-16 20:15:19
 * @LastEditTime: 2020-10-20 15:40:48
 * @LastEditors: zhuqingyu
-->
<template>
    <div class="editTexarea">
        <div class="tools">
            <div class="btn">
                <span @click.self="ifShowEditPointer(true)">pointer</span>
                <btnPointer  v-show="allowType.pointer.showEditPointer" @add="add" />
            </div>
            <div class="btn">img</div>
            <div class="btn">link</div>
        </div>
        <div class="renderContent" v-html="content" @click="vmTextareaFocus"></div>
        <textarea class="vmTextarea"
        ref="textarea"
        v-model="baseContentCode"
        @keydown="controlLine($event)"
        ></textarea>
    </div>
</template>
<script>
import btnPointer from './btnPointer/btnPointer'
export default {
    name: "editTexarea",
    data() {
        return {
            baseContentCode: '', // 原始数据
            mouseLineCode: '<div class="mouseLine"></div>', // 光标str
            splitCode: '&splitCode;', // 分割符

            allowType: {
                // 允许的 富文本 类型
                pointer: {
                    showEditPointer: false
                },
                img: {
                    showEditImg: false
                },
                link: {
                    showLink: false
                }
            }
        }
    },

    components: { btnPointer },

    computed: {
        // 解析成的数组
        contentLines: {
            get() {
                const result = this.filterContent(this.contentCode())
                return result
            }
        },
        // 解析成的dom String
        content: {
            get() {
                const result = this.renderContent(this.contentLines)
                return result
            }
        }
    },

    methods: {
        filterContent(str) {
            const lines = str.split('\n')
            const content = []

            for(let i = 0;i < lines.length;i++) {
                let line = lines[i]
                line = line.split(this.splitCode).reduce((pre, cur) => {
                    if(cur.startsWith('<') && cur.endsWith('>')) {
                        pre.push(cur)
                    } else {
                        cur.split('').forEach(item => {
                            pre.push(item)
                        })
                    }
                    return pre
                }, [])

                if(lines.length !== 1 && line != '\n' && i !== lines.length - 1) line.push('<br>')

                content.push(line)
            }
            return content
        },
        // 渲染到 content
        renderContent(arr) {
            let result = ''
            for(let i = 0;i<arr.length;i++) {
                let line = arr[i]
                line.forEach(item => {
                    result += item
                })
            }
            return result || `${this.splitCode}${this.mouseLineCode}`
        },
        // 反向设置到 textarea
        setTextureValue(arr) {
            let result = ''
            for(let i = 0;i<arr.length;i++) {
                let line = arr[i]
                line.forEach(item => {
                    if(item == '<br>') {
                        result += '\n'
                        return
                    } else if(item.startsWith('<') && item.endsWith('>')) {
                        result += `${this.splitCode}${item}${this.splitCode}`
                        return
                    }
                    result += item
                })
            }
            return result
        },
        /* 控制光标线相关 */
        controlLine(e) {
            const callback = this[e.code]
            if(callback) {
                callback()
            } else {
                setTimeout(() => {
                    this.nativeMouseLinePos()
                }, 0)
            }
            
        },
        ArrowLeft() {
            const mouseLineIn = this.mouseLineIn()
            if(mouseLineIn) {
                let changeLine = mouseLineIn.mouseLineIndex <= 0
                if(!(changeLine && !mouseLineIn.before)) {
                    let line = changeLine ? mouseLineIn.before : mouseLineIn.line
                    let lineIndex = changeLine ? (line.length - 1) : (mouseLineIn.mouseLineIndex - 1) // 行内位置
                    mouseLineIn.line.splice(mouseLineIn.mouseLineIndex, 1)
                    if(changeLine) {
                        line.splice(lineIndex, 0, this.mouseLineCode)
                    } else {
                        mouseLineIn.line.splice(lineIndex, 0, this.mouseLineCode)
                    }
                }
                // 同步 textarea 数据
                this.updateTexarea(mouseLineIn.lines)
            }
        },
        ArrowRight() {
            const mouseLineIn = this.mouseLineIn()
            if(mouseLineIn) {
                let changeLine = mouseLineIn.mouseLineIndex >= (mouseLineIn.line.length - 1)
                if(!(changeLine && !mouseLineIn.next)) {
                    let line = changeLine ? mouseLineIn.next : mouseLineIn.line
                    let lineIndex = changeLine ? 0 : (mouseLineIn.mouseLineIndex + 1) // 行内位置
                    mouseLineIn.line.splice(mouseLineIn.mouseLineIndex, 1)
                    if(changeLine) {
                        line.splice(lineIndex, 0, this.mouseLineCode)
                    } else {
                        mouseLineIn.line.splice(lineIndex, 0, this.mouseLineCode)
                    }
                }
                // 同步 textarea 数据
                this.updateTexarea(mouseLineIn.lines)
            }
        },
        ArrowUp(){
            const mouseLineIn = this.mouseLineIn()
            if(mouseLineIn) {
                if(mouseLineIn.before) {
                    // 原行内删除光标
                    mouseLineIn.line.splice(mouseLineIn.mouseLineIndex, 1)
                    // 前一行增加光标
                    mouseLineIn.before.splice(mouseLineIn.mouseLineIndex, 0, this.mouseLineCode)
                }
                // 同步 textarea 数据
                this.updateTexarea(mouseLineIn.lines)
            }
        },
        ArrowDown(){
            const mouseLineIn = this.mouseLineIn()
            if(mouseLineIn) {
                if(mouseLineIn.next) {
                    // 原行内删除光标
                    mouseLineIn.line.splice(mouseLineIn.mouseLineIndex, 1)
                    // 前一行增加光标
                    mouseLineIn.next.splice(mouseLineIn.mouseLineIndex, 0, this.mouseLineCode)
                }
                // 同步 textarea 数据
                this.updateTexarea(mouseLineIn.lines)
            }
        },
        Backspace(){
            const mouseLineIn = this.mouseLineIn()
            if(mouseLineIn) {
                const { before, line, mouseLineIndex } = mouseLineIn
                let changeLine = mouseLineIndex < 1
                let shouldDelLine = changeLine ? before : line
                if(shouldDelLine) {
                    let index = changeLine ? (shouldDelLine.length - 1) : (mouseLineIndex - 1)
                    shouldDelLine.splice(index, 1);
                }
                // 同步 textarea 数据
                this.updateTexarea(mouseLineIn.lines)
            }
        },
        // 更新 textarea 数据
        updateTexarea(lines){
            const $this = this
            setTimeout(() => {
                const result = $this.setTextureValue(lines)
                if(result !== '&splitCode;<div class="mouseLine"></div>&splitCode;') {
                    $this.baseContentCode = result
                } else {
                    $this.baseContentCode = ''
                }

                setTimeout(() => {
                    $this.nativeMouseLinePos()
                }, 30)
            })
        },
        // 控制光标位置
        nativeMouseLinePos() {
            const mouseLineIn = this.mouseLineIn()
            const { index } = mouseLineIn
            this.$refs.textarea.setSelectionRange(index,index, 'backward')
            console.log(index)
        },
        // 光标在数组中的情况
        mouseLineIn() {
            let lines = this.filterContent(this.contentCode())
            let lineIndex, mouseLineIndex, index = 0, line, before, next
            // 第几行， 第几行第几个， 全局index， 行数据

            for(let i = 0;i<lines.length;i++) {
                let _line = lines[i]
                let _index = _line.indexOf(this.mouseLineCode)
                if(_index !== -1) {
                    lineIndex = i
                    mouseLineIndex = _index
                    line = _line
                    before = lines[i - 1] || null
                    next =  lines[i + 1] || null
                    index += _line.slice(0, _index).reduce((pre, cur) => {
                        if(cur === '<br>') {
                            pre += 1
                            return pre
                        }
                        pre += cur.length
                        if(cur.startsWith('<') && cur.endsWith('>') && cur !== '<br>') {
                            pre += (this.splitCode.length * 2)
                        }
                        return pre
                    }, 0)
                    return {
                        lineIndex,
                        mouseLineIndex,
                        line,
                        index,
                        before,
                        next,
                        lines,
                        注释: 'lineIndex: 第几行, mouseLineIndex: 第n行第几个, index: 全局index, line: 行数据, before: 上一行, next: 下一行'
                    }
                } else {
                    index += _line.reduce((pre, cur) => {
                        if(cur === '<br>') {
                            pre += 1
                            return pre
                        }
                        pre += cur.length
                        if(cur.startsWith('<') && cur.endsWith('>') && cur !== '<br>') {
                            pre += (this.splitCode.length * 2)
                        }
                        return pre
                    }, 0)
                }
            }
            return null
        },
        // textarea 的数据
        contentCode() {
            if(!this.baseContentCode.includes(this.mouseLineCode)) return this.baseContentCode + this.splitCode + this.mouseLineCode
            return this.baseContentCode
        },
        // 增加一项
        add(config) {
            if(!config) {
                this.allowType.pointer.showEditPointer = this.allowType.img.showEditImg = this.allowType.link.showLink = false
                return
            }
            if(!this.allowType[config.type]) return
            const mouseLineIn = this.mouseLineIn()
            switch(config.type) {
                case 'pointer': {
                    if(!config.title || !config.text) return

                    const { mouseLineIndex, line, lines } = mouseLineIn,
                    pointer = this.getPointer(config.title, config.text)

                    line.splice(mouseLineIndex, 0, pointer)
                    this.updateTexarea(lines)

                    this.allowType.pointer.showEditPointer = false
                    break
                }
            }
            this.$refs.textarea.focus()
        },
        // 创建一个pointer
        getPointer(title, text) {
            return `${this.splitCode}<div class="pointer"><div class="pointer-title">${title}<div class="pointer-text">${text}</div></div></div>${this.splitCode}`
        },
        ifShowEditPointer(bool){
            this.allowType.pointer.showEditPointer = bool
            console.log(bool)
        },
        changePointerText(value) {
           this.allowType.pointer.text = value
        },
        vmTextareaFocus() {
            this.$refs.textarea.focus()
        }
    }
}
</script>
<style lang="scss">
.editTexarea{
    position: relative;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    .tools{
        width: 100%;
        display: flex;
        justify-content: left;
        background: rgb(85, 83, 83);
        z-index: 5;
        border-top-left-radius: 4px;
        overflow: hidden;
        .btn{
            color: white;
            user-select: none;
            text-align: center;
            padding:0px 10px;
            line-height: 20px;
            cursor: pointer;
            transition: all .3s;
            position: relative;
        }
        .btn:hover{
            color:#666;
            background: rgba(255,255,255,0.5);
        }
    }
    .vmTextarea{
        width: 100%;
        height: 100%;
        opacity: 0;
        background: blue;
        position: absolute;
        z-index: 0;
        color:white;
        margin-top: 5px;
        // top:0px;
        // left:0px;
        // position: fixed!important;
        // opacity: 0.5!important;
    }
    @keyframes a {
        0%{
            background: rgba(0,0,0,1);
        }
        50%{
            background: rgba(0,0,0,0);
        }
        100%{
            background: rgba(0,0,0,1);
        }
    }
}
</style>
<style lang="scss">
.renderContent{
    z-index: 55;
    cursor: text;
    .mouseLine{
        display: inline-block;
        width: 1px;
        height: 15px;
        background: rgba(0,0,0,1);
        animation: a 0.6s linear infinite;
        position: relative;
        top:1.5px;
    }
    .pointer{
        display: inline-block;
        .pointer-title{
            color:chocolate;
            position: relative;
            cursor: pointer;
            .pointer-text{
                display: none;
                position: absolute;
                border-radius: 4px;
                border:1px solid #cccccc;
                padding:0;
                text-align: left;
                background: #666;
                color: white;
                text-indent: 0;
                padding:5px;
                top: 0px;
                left:0px;
                transform: translate(25%, -100%);
            }
        }
        .pointer-title:hover .pointer-text{
            display: block;
        }
    }
}
</style>
<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }"
                >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>信息发布</el-breadcrumb-item>
            <el-breadcrumb-item>系统简介</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <div id="editor"></div>
            <el-button type="success" @click="getEditorData">提交</el-button>
        </el-card>
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
    data() {
        return {
            editor: null,
            editorData: '',
        }
    },
    mounted() {
        const editor = new E('#editor')

        editor.config.onchange = (newHTML) => {
            this.editorData = newHTML
        }
        editor.create()
        this.editor = editor
    },
    methods: {
        getEditorData() {
            let data = this.editor.txt.html()
            alert(data)
        },
    },
    beforeDestroy() {
        this.editor.destroy()
        this.editor = null
    },
}
</script>

<style lang="less" scoped>
#editor {
    padding-top: 30px;
}
.el-button {
    margin: 15px 0;
    float: right;
}
</style>

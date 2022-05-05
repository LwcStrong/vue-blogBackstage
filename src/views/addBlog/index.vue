<template>
    <div class="app-constainer" style="padding: 15px;">
        <div class="block">文章标题</div>
        <div style="margin-bottom: 15px;">
            <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </div>
        <div class="block">文章编辑</div>
        <Editor
            ref="toastuiEditor"
            :initialValue="form.editorText"
            height="600px"
            :options="editOptions"
        />
        <div class="block">文章描述</div>
        <div style="margin-bottom: 15px;">
            <el-input type="textarea" rows="5" v-model="form.description" placeholder="请输入文章标题"></el-input>
        </div>
        <Upload uploadTitle="文章头图" v-model="form.thumb" />
        <!-- 选择分类 -->
        <div class="block">选择分类</div>
        <el-select v-model="form.select" slot="prepend" placeholder="请选择文章分类">
            <el-option v-for="item in blogType" :key="item.id" :value="item.name" :aria-label="item.name" ></el-option>
        </el-select>
        <!-- 文章发布按钮 -->
        <div style="margin: 15px 0;">
            <el-button 
                type="primary" 
                @click="addarticalHandle"
            >
                发布文章
            </el-button>
        </div>
    </div>
</template>

<script>
    import '@toast-ui/editor/dist/toastui-editor.css';
    import { Editor } from '@toast-ui/vue-editor'
    import Upload from '@/components/Upload.vue'
    import {getBlogType} from '@/api/blogType.js'
    import {addBlog} from '@/api/blog.js'
    import '@toast-ui/editor/dist/i18n/zh-cn'
    export default {
        data() {
            return {
                form: {
                    title: '',
                    editorText: '',
                    description: '',
                    thumb: '',
                    select: ''
                },
                blogType: [],
                imageUrl: '',      // 上传图片地址
                editOptions: {
                    language: 'zh-CN'
                }
            }
        },
        created() {
            this.fetchData()
        },
        components: {
            Editor,
            Upload
        },
        methods: {
            fetchData() {
                getBlogType().then(res => {
                    console.log('00000', res.data);
                    this.blogType = res.data
                })
            },
            // 添加文章
            addarticalHandle() {
                let html = this.$refs.toastuiEditor.invoke('getHTML');
                let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');
                let formatData = {
                    title: this.form.title,
                    description: this.form.description,
                    createDate: new Date().getTime(),
                    categoryId: this.form.select,
                    //toc传递一个空数组过去，服务器会将拿到的markdown文档生成toc目录
                    toc: [],
                    htmlContent: html,
                    thumb: this.form.thumb,
                    markdownContent: markdown
                }
                console.log(formatData);
                if(formatData.title && formatData.description && formatData.categoryId) {
                    addBlog(formatData).then(res => {
                        this.$router.push('/blogList')   // 新增文章成功后跳转到文章列表
                    })
                } else {
                    this.$message.error('请填写所有内容')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .block{
        margin: 15px 0;
        font-weight: 400;
    }
</style>
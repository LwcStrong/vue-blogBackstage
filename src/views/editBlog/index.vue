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
        />
        <div class="block">文章描述</div>
        <div style="margin-bottom: 15px;">
            <el-input type="textarea" v-model="form.description" placeholder="请输入文章标题"></el-input>
        </div>
        <Upload uploadTitle="文章头图" v-model="form.thumb" />
        <!-- 选择分类 -->
        <div class="block">选择分类</div>
        <el-select 
        v-model="form.select" 
        slot="prepend" 
        placeholder="请选择文章分类"
        @change="changeHandle"
        >
            <el-option v-for="item in blogType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <!-- 文章修改按钮 -->
        <div style="margin: 15px 0;">
            <el-button 
                type="primary" 
                @click="editArticalHandle"
            >
                确认修改
            </el-button>
        </div>
    </div>
</template>

<script>
    import '@toast-ui/editor/dist/toastui-editor.css';
    import { Editor } from '@toast-ui/vue-editor'
    import Upload from '@/components/Upload.vue'
    import {getBlogType} from '@/api/blogType.js'
    import { editBlog, findOneBlog} from '@/api/blog.js'
    export default {
        data() {
            return {
                id: null,        // 存储传递过来的id
                form: {
                    title: '',
                    editorText: '',
                    description: '',
                    thumb: '',
                    select: ''   // 选择分类
                },
                blogType: [],
                imageUrl: ''      // 上传图片地址
            }
        },
        created() {
            this.getBlogTypeCountAndId()
        },
        components: {
            Editor,
            Upload
        },
        methods: {
            getBlogTypeCountAndId() {
                getBlogType().then(res => {
                    this.blogType = res.data
                })
                this.id = this.$route.params.id    // 接收路由传递过来的id, 获取数据回填表单
                findOneBlog(this.id).then(res => {
                    this.form = res.data
                    console.log('res.data', res.data);
                    this.form.select = res.data.category === null ? '' : res.data.category.id
                    this.$refs.toastuiEditor.invoke('setHTML', res.data.htmlContent)
                })
            },
            // 修改文章
            editArticalHandle() {
                let html = this.$refs.toastuiEditor.invoke('getHTML');
                let markdown = this.$refs.toastuiEditor.invoke('getMarkdown');
                let formatData = {
                    id: this.id,
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
                if(formatData.title && formatData.description && formatData.categoryId) {

                    editBlog(formatData).then(res => {
                        this.$router.push('/blogList')   // 新增文章成功后跳转到文章列表
                        this.$message.success('文章修改成功')
                    })
                } else {
                    this.$message.error('请填写所有内容')
                }
            },
            changeHandle() {
                // 强制跟新选择框ui
                this.$forceUpdate()
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
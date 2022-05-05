<template>
    <div class="app-container">
        <!-- 搜索栏 -->
        <div style="margin-top: 15px;">
            <el-input 
                placeholder="请输入需要添加的分类， 左边选择该分类的等级"
                v-model="input" 
                class="input-with-select blogTypeInput"
            >
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                </el-select>
            </el-input>
            <el-button
            type="primary"
            style="margin-left: 15px;"
            @click="addBlogTypeHandle"
            >添加</el-button>
        </div>
        <el-table
            :data="data"
            border
            style="width: 100%"
        >
            <el-table-column  label="序号" width="60" align="center">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column  label="博客类别" align="center" >
                <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column  label="文章数量" align="center">
                <template slot-scope="scope">{{scope.row.articleCount}}</template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <!-- 编辑 -->
                    <el-tooltip 
                    class="item" 
                    effect="dark" 
                    content="编辑"
                    placement="top-start">
                        <el-button 
                        type="primary" 
                        icon="el-icon-edit" 
                        circle 
                        size="mini"
                        @click="editBlogTypeHandle(scope.row)"
                        ></el-button>
                    </el-tooltip>
                    <!-- 删除按钮 -->
                    <el-tooltip 
                    class="item" 
                    effect="dark" 
                    content="删除" 
                    placement="top-start">
                        <el-button 
                        type="danger" 
                        icon="el-icon-delete" 
                        circle 
                        size="mini"
                        @click="deleteBlogTypeHandle(scope.row)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑分类弹窗 -->
        <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="分类名称" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序等级">
                    <el-select v-model="form.order" placeholder="分类等级">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditBlogTypeHandle">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getBlogType, delBlogType, updateOneBlogType, addBlogType, findOneBlogType} from '@/api/blogType.js'
    import {server_URL, frontEnd_URL} from "@/urlConfig.js"
    import {formatDate} from '@/utils/tools.js'
    export default {
        data() {
            return {
                data: [],    // 存储文章数据
                input: '',
                select: '1',
                listLoading: false,
                dialogFormVisible: false,    // 编辑分类弹窗key
                form: {
                    id: '',
                    name: '',
                    order: ''
                },
            }
        },
        created() {
            // 获取博客分类列表
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getBlogType().then(res => {
                    this.listLoading = false
                    console.log('blogList', res);
                    this.data = res.data
                })
            },
            // 添加
            addBlogTypeHandle() {
                if(this.input) {
                    addBlogType({name: this.input, order: this.select}).then(res => {
                        this.fetchData()
                        this.$message.success('添加分类成功')
                    })

                } else {
                    this.$message.error('分类名称不能为空')
                }

            },
            // 删除博客分类
            deleteBlogTypeHandle({id}) {
                this.$confirm('删除该分类后，该分类下的文章将变为未分类状态, 是否继续?', 
                '是否删除此文章分类', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(() => {
                        delBlogType(id).then(res => {
                            this.fetchData()
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                    });
                });
            },
            // 编辑博客分类
            editBlogTypeHandle({id}) {
                this.dialogFormVisible = true
                findOneBlogType(id).then(res => {
                    this.form = res.data
                })
            },
            confirmEditBlogTypeHandle() {
                updateOneBlogType(this.form).then(() => {
                    this.fetchData()
                    this.$message.success('文章分类编辑成功')
                    this.dialogFormVisible = false
                })
            },
        },
    }
</script>

<style scoped>
.blogTypeInput {
    width: 500px;
    margin-bottom: 20px;
}

</style>
<template>
    <!-- 项目列表 -->
    <div class="app-container">
        <el-table
        :data="data"
        border
        style="width: 100%"
        element-loading-text="数据加载中"
        v-loading="listLoading"
        highlight-current-row
        >
            <el-table-column prop="date" label="序号" width="60" align="center">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column prop="title " label="项目名称" width="200" align="center" >
                <template slot-scope="scope">
                    <a class="pageName" :href="scope.row.url" target="_blank" slot="reference">
                        {{scope.row.name}}
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="项目描述" >
                <template slot-scope="scope">{{scope.row.description.toString()}}</template>
            </el-table-column>
            <el-table-column prop="title " label="预览图" width="250" align="center" >
                <template slot-scope="scope">
                    <el-image
                        style="width: 100px;"
                        :src="scope.row.thumb"
                        fit="contain"
                        :preview-src-list="srcList"
                    >
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-tooltip 
                    class="item" 
                    effect="dark" 
                    content="GitHub"
                    placement="top-start">
                        <el-button 
                        type="primary" 
                        icon="el-icon-s-promotion" 
                        circle 
                        size="mini"
                        @click="openGitHubHandle(scope.row)"
                        ></el-button>
                    </el-tooltip>
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
                        @click="editProjectHandle(scope.row)"
                        ></el-button>
                    </el-tooltip>
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
                        @click="delProjectHandle(scope.row)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    <!-- 编辑项目对话框 -->
        <el-dialog 
            title="请编辑该项目信息" 
            :visible.sync="dialogFormVisible"
            fullscreen
        >
            <el-form :model="form">
                <el-form-item label="项目名称" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" >
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目链接" >
                    <el-input v-model="form.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Github地址" >
                    <el-input v-model="form.github" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目预览图" >
                    <Upload v-model="form.thumb"/>
                </el-form-item>
                <!-- 项目等级 -->
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
                <el-button type="primary" @click="confirmEditProjectHandle">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getProject, delProject, setProject} from '@/api/project.js'
    import {server_URL, frontEnd_URL} from "@/urlConfig.js"
    import {formatDate} from '@/utils/tools.js'
    import Upload from '@/components/Upload.vue'
    export default {
        data() {
            return {
                listLoading: false, 
                data: [],    // 存储项目数据
                srcList: [],   // 预览图链接数组
                dialogFormVisible: false,
                form:{
                    name: '',
                    description: '',
                    url: '',
                    github: '',
                    thumb: '',
                    order: 1,
                }

            }
        },
        created() {
            // 获取文章列表
            this.fetchData()
        },
        components: {
            Upload
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getProject().then(({data}) => {
                    this.listLoading = false
                    console.log('blogList', data);
                    this.data = data
                    for(var item of this.data) {
                        if(!item.thumb.startsWith('http')){
                            // item.thumb = server_URL + item.thumb
                        }
                        this.srcList.push(item.thumb)
                    }
                })
            },
            delProjectHandle(blogInfo) {
                this.$confirm('确定要删除此项目吗?', '删除项目', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(() => {
                        delProject(blogInfo.id).then(res => {
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
            openGitHubHandle(proInfo) {
                window.open(proInfo.github)
            },
            editProjectHandle(proInfo) {
                this.dialogFormVisible = true
                console.log('proInfo', proInfo);
                this.form = {...proInfo, description: proInfo.description.toString()}
                console.log('this.form', this.form);
            },
            // 编辑提交
            confirmEditProjectHandle() {
                let formatData = {...this.form }
                console.log('编辑项目信息', formatData);
                formatData.description = this.form.description.split(',')
                formatData.order = Number(this.form.order)
                setProject(formatData).then(res => {
                    this.dialogFormVisible = false
                    this.fetchData()
                    this.$message.success('项目信息修改成功')
                })
                
            }


        },

        
    }
</script>

<style lang="scss" scoped>
    .pageName:hover{
        color: rgb(163, 163, 163);
        
    }
</style>
<template>
    <div class="app-container">
        <el-table
        :data="data"
        v-loading="loading"
        border
        style="width: 100%"
        >
            <el-table-column  label="序号" width="60" align="center">
                <template slot-scope="scope">{{scope.$index + (currentPage - 1) * eachPage + 1}}</template>
            </el-table-column>
            <el-table-column label="文章名称" align="center" >
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        title="博客预览图"
                        width="200"
                        trigger="hover"
                        >
                         <el-image
                            style="width: 150px; "
                            :src="scope.row.thumb"
                            fit="contain"
                            :preview-src-list="srcList"
                            >
                         </el-image>
                         <a href="#" target="_blank" @click.prevent="goToTitleHandle(scope.row)" slot="reference">
                             {{scope.row.title}}
                         </a>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column width="200" label="文章描述">
                <template slot-scope="scope">{{scope.row.description}}</template>
            </el-table-column>
            <el-table-column  label="浏览数" align="center">
                <template slot-scope="scope">{{scope.row.scanNumber}}</template>
            </el-table-column>
            <el-table-column  label="评论量" align="center">
                <template slot-scope="scope">{{scope.row.commentNumber}}</template>
            </el-table-column>
            <el-table-column label="所属分类" align="center" >
                <template slot-scope="scope">
                    {{scope.row.category === null ? '未分类' : scope.row.category.name}}
                </template>
            </el-table-column>
            <el-table-column label="创建日期" width="230">
                <template slot-scope="scope">{{scope.row.createDate}}</template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
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
                        @click="editBlogHandle(scope.row)"
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
                        @click="deleteBlog(scope.row)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 30px;"
            background
            :page-size="eachPage"
            :page-sizes="[5, 10, 20]"
            layout="prev, pager, next, sizes, ->, total, jumper"
            :total="count"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            @prev-change="prevClickHandle"
            @next-change="nextClickHandle"
            :current-page.sync="pagerCurrentPage"
            >
        </el-pagination>
    </div>
</template>

<script>
    import {findBlog, deleteOneBlog} from '@/api/blog.js'
    import {server_URL, frontEnd_URL} from "@/urlConfig.js"
    import {formatDate} from '@/utils/tools.js'
    export default {
        data() {
            return {
                data: [],    // 存储文章数据
                srcList: [],   // 预览图链接数组
                eachPage: 5,     // 页容量
                currentPage: 1,   // 当前页
                totalPage: 0,     // 总页数
                count: 0,         // 数组总条数
                pagerCurrentPage: 1, // 分页栏当前页码
                loading: false

            }
        },
        created() {
            // 获取文章列表
            this.fetchData()
        },
        methods: {
            fetchData() {
                this.loading = true
                findBlog(this.currentPage, this.eachPage).then(({data}) => {
                    console.log('blogList', data.rows);
                    this.data = data.rows
                    for(var item of this.data) {
                        item.createDate = formatDate(item.createDate)
                        // item.thumb = server_URL + item.thumb
                        this.srcList.push(item.thumb)
                    }
                    this.count = data.total
                    this.totalPage = Math.ceil(data.total / this.eachPage)
                    this.loading = false
                    // 删除操作可能引发问题
                    if(this.currentPage > this.totalPage) {
                        this.currentPage = this.totalPage
                        this.fetchData()
                    }
                })
            },
            goToTitleHandle(blogInfo) {
                window.open(`${frontEnd_URL}/article/${blogInfo.id}`)
            },
            deleteBlog(blogInfo) {
                this.$confirm('删除文章会一并将评论删除, 是否继续?', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(() => {
                        deleteOneBlog(blogInfo.id).then(res => {
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
            sizeChangeHandle(number) {
                this.eachPage = Number(number)
                this.currentPage = 1
                this.pagerCurrentPage = 1
                this.fetchData()
            },
            currentChangeHandle(pageNumber) {
                this.currentPage = Number(pageNumber)
                 this.fetchData()
            },
            prevClickHandle() {
                this.currentPage -= 1
                this.fetchData()
            },
            nextClickHandle() {
                this.currentPage += 1
                this.fetchData()
            },
            editBlogHandle(blogInfo) {
                this.$router.push(`/editBlog/${blogInfo.id}`)
            }
        },

        
    }
</script>

<style lang="scss" scoped>

</style>
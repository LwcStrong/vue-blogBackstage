<template>
<!-- 留言板 -->
    <div class="app-container">
        <el-table
        :data="data"
        border
        style="width: 100%"
        >
            <el-table-column prop="date" label="序号" width="60" align="center">
                <template slot-scope="scope">{{scope.$index + (currentPage - 1) * eachPage + 1}}</template>
            </el-table-column>
            <el-table-column prop="title " label="头像" width="180" align="center" >
                <template slot-scope="scope">
                    <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.avatar"
                    fit="contain"
                    :preview-src-list="srcList"
                    >
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="昵称" >
                <template slot-scope="scope">{{scope.row.nickname}}</template>
            </el-table-column>
            <el-table-column prop="description" label="留言内容" >
                <template slot-scope="scope">{{scope.row.content}}</template>
            </el-table-column>
            <el-table-column prop="description" label="留言日期" width="230">
                <template slot-scope="scope">{{scope.row.createDate}}</template>
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
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
                        @click="deleteMessageHandle(scope.row)"
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
            layout="prev, pager, next, ->, total, jumper "
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
    import {getMessage,delMessage } from '@/api/message.js'
    import {server_URL, frontEnd_URL} from "@/urlConfig.js"
    import {formatDate} from '@/utils/tools.js'
    export default {
        data() {
            return {
                data: [],    // 存储留言版信息
                srcList: [],   // 预览图链接数组
                eachPage: 5,     // 页容量
                currentPage: 1,   // 当前页
                totalPage: 0,     // 总页数
                count: 0,         // 数组总条数
                pagerCurrentPage: 1, // 分页栏当前页码

            }
        },
        created() {
            // 获取文章列表
            this.fetchData()
        },
        methods: {
            fetchData() {
                getMessage(this.currentPage, this.eachPage).then(({data}) => {
                    console.log('blogList', data.rows);
                    this.data = data.rows
                    for(var item of this.data) {
                        item.createDate = formatDate(item.createDate)
                        // item.avatar = server_URL + item.avatar
                        this.srcList.push(item.avatar)
                    }
                    this.count = data.total
                    this.totalPage = Math.ceil(data.total / this.eachPage)
                    // 删除操作可能引发问题
                    if(this.currentPage > this.totalPage) {
                        this.currentPage = this.totalPage
                        this.fetchData()
                    }
                })
            },
            deleteMessageHandle(commentInfo) {
                this.$confirm('你确定要删除该条留言?','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                    }).then(() => {
                        delMessage(commentInfo.id).then(res => {
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
        },

        
    }
</script>

<style lang="scss" scoped>

</style>
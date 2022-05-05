<template>
<div class="app-container">
    <!-- 表格数据 -->
  <el-table
    :data="data"
    border
    style="width: 100%"
  >
    <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
    </el-table-column>
    <el-table-column prop="title " label="标题" align="center" >
        <template slot-scope="scope">{{scope.row.title}}</template>
    </el-table-column>
    <el-table-column prop="description" label="描述"  >
        <template slot-scope="scope">{{scope.row.description}}</template>
    </el-table-column>
    <el-table-column label="中图预览"  align="center">
        <template slot-scope="scope">
            <el-image
                style="width: 150px;"
                :src="scope.row.midImg"
                fit="fill">
            </el-image>
        </template>
    </el-table-column>
    <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
            <el-image
                style="width: 150px;"
                :src="scope.row.bigImg" 
                fit="fill"
                >
            </el-image>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
            <el-tooltip 
            class="item" 
            effect="dark" 
            content="编辑" 
            placement="top-start">
                <el-button 
                type="primary" 
                icon="el-icon-edit" 
                circle size="mini"
                @click="editBannerHandle(scope.row)"
                ></el-button>
            </el-tooltip>
        </template>
    </el-table-column>
  </el-table>
  <!-- 编辑标语 -->
  <el-dialog title="请编辑标语信息" :visible.sync="dialogFormVisible" top="5vh">
    <el-form :model="form">
        <el-form-item label="标题" >
        <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
        <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
            <el-col :span="12">
                <el-form-item label="首页中图" >
                    <Upload v-model="form.midImg"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="首页大图" >
                    <Upload v-model="form.bigImg"/>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { getHome, setHome } from "@/api/home.js"
import {server_URL} from "@/urlConfig.js"
import Upload from '@/components/Upload.vue'
    export default {
        data() {
            return {
                data: [],     // 存储首页数据
                form: {
                    id: '',
                    title: '',
                    description: '',
                    midImg2: '',
                    bigImg2: ''
                },
                dialogFormVisible: false   // 编辑标语蒙层key
            }
        },
        components: {
            Upload
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getHome().then(res => {
                    console.log('res', res);
                    this.data = res.data
                    // for(var item of this.data) {
                    //     item.midImg2 = server_URL + item.midImg
                    //     item.bigImg2 = server_URL + item.bigImg
                    // }
                })
            },
            editBannerHandle(bannerInfo) {
                this.dialogFormVisible = true;
                this.form = {...bannerInfo}
                console.log(bannerInfo);
            },
            // 提交编辑
            editBannerConfirm() {
                let arr = [...this.data]
                for(var i = 0; i < arr.length; i ++) {
                    if(arr[i].id == this.form.id) {
                        arr[i] = this.form
                    }
                }
                setHome(arr).then(res => {
                    this.dialogFormVisible = false;
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    })
                    this.fetchData()
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
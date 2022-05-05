<template>
    <div class="app-container">
        <div class="block">项目名称</div>
        <div style="margin-bottom: 15px;">
            <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
        </div>
        
        <div class="block">项目描述</div>
        <div style="margin-bottom: 15px;">
            <el-input v-model="form.description" placeholder="请输入项目描述"></el-input>
        </div>
        <div class="block">项目链接</div>
        <div style="margin-bottom: 15px;">
            <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
        </div>
        <div class="block">Github地址</div>
        <div style="margin-bottom: 15px;">
            <el-input v-model="form.github" placeholder="请输入github地址"></el-input>
        </div>
        <div class="block">项目预览图</div>
        <div style="margin-bottom: 15px;">
            <Upload v-model="form.thumb"/>
        </div>
        <!-- 项目等级 -->
        <div class="block">项目等级</div>
        <div style="margin-bottom: 15px;">
            <el-select v-model="form.order" placeholder="请选择项目等级">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
                <el-option label="3" value="3"></el-option>
                <el-option label="4" value="4"></el-option>
                <el-option label="5" value="5"></el-option>
            </el-select>
            <!-- <el-form-item label="排序等级"> 
            </el-form-item> -->
        </div>
        <el-button type="primary" style="margin: 15px 0;" @click="addProjectHandle">确认添加</el-button>
    </div>
</template>

<script>
    import Upload from '@/components/Upload.vue'
    import { addProject} from '@/api/project.js'
    export default {
        data() {
            return {
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
        components: {
            Upload
        },
        methods: {
            // 添加项目
            addProjectHandle() {
                let formatData = {...this.form}
                console.log('+++++', this.form);
                formatData.description = this.form.description.split(',')
                formatData.order = Number(this.form.order)
                addProject(formatData).then(() => {
                    this.$message.success('项目添加成功')
                    this.$router.push('/projects')
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .block{
        font-weight: 400;
        margin: 15px 0;
    }
</style>
<template>
    <div class="app-container">
        <div class="block">关于我</div>
        <div style="margin-bottom: 15px;">
            <el-input 
            v-model="url" 
            placeholder="请输入地址"
            :disabled="isDisabled"
            ></el-input>
        </div>
        <el-button 
        type="primary" 
        style="margin-top: 15px;" 
        @click="editAboutUrlHandle"
        >
            {{btnContent}}
        </el-button>
    </div>
</template>

<script>
    import {setAboutUrl, getAboutUrl} from '@/api/about.js'
    export default {
        data() {
            return {
                btnContent: '编辑',
                url: '',
                isDisabled: true
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getAboutUrl().then(res => {
                    console.log('about',res);
                    this.url = res.data
                })
            },
            editAboutUrlHandle() {
                if(this.btnContent === '编辑') {
                    this.isDisabled = false
                    this.btnContent = '完成'
                } else {
                    if(this.url) {
                        setAboutUrl({url: this.url}).then(() => {
                            this.isDisabled = true
                            this.btnContent = '编辑'
                            this.$message.success('编辑成功')
                            this.fetchData()
                        })
                    }else {
                        this.$message.warn('输入框不能为空');
                    }
                }
            }
        },
        
    }
</script>

<style lang="scss" scoped>
    .block{
        font-weight: 400;
        margin: 15px 0;
    }
</style>
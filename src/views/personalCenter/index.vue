<template>
<!-- 设置密码 -->
    <div class="app-container">
        <el-form 
            :model="adminInfo" 
            status-icon 
            :rules="setRules" 
            ref="ruleForm" 
            label-width="100px" 
        >
            <el-form-item label="用户名" prop="name">
                <el-input 
                v-model="adminInfo.name" 
                width="200" 
                placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldLoginPwd">
                <el-input 
                type="password" 
                width="200" 
                v-model="adminInfo.oldLoginPwd"  
                placeholder="请输入旧密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="loginPwd">
                <el-input 
                type="password" 
                width="200" 
                v-model="adminInfo.loginPwd"  
                placeholder="请输入新密码" 
                ></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="loginPwdConfirm">
                <el-input 
                type="password" 
                width="200px" 
                v-model="adminInfo.loginPwdConfirm"  
                placeholder="请确认新密码" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-top: 15px;" type="danger" @click="handleClick">修改</el-button>
                <el-button style="margin-top: 15px;" @click="backHandle">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {setAdminMessage, getAdminMessage} from '@/api/personalCenter.js'
    export default {
        data() {
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'))
                } else if(value !== this.adminInfo.loginPwd) {
                    callback(new Error('两次输入密码不一致'))
                } else {
                    callback()
                }
            }
            return {
                adminInfo: {
                    id: '',
                    loginId: '',
                    name: '',           // 用户名
                    oldLoginPwd: '',   // 旧密码
                    loginPwd: '',       // 新密码
                    loginPwdConfirm: '' // 新密码确认
                },
                setRules: {
                    oldLoginPwd: [{ required: true, trigger: 'blur', message: '请输入旧密码' }],
                    loginPwd: [{ required: true, trigger: 'blur', message: '请输入新密码' },],
                    loginPwdConfirm: [
                        { required: true, trigger: 'blur', message: '请确认密码' },
                        { validator: validatePassword, trigger: 'blur' }
                    ], 
                }
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getAdminMessage().then(res => {
                    console.log('login', res);
                    this.adminInfo = res.data
                })
            },
            handleClick() {
                // 处理修改密码逻辑
                if(this.adminInfo.name && this.adminInfo.loginPwd && this.adminInfo.oldLoginPwd) {
                    setAdminMessage(this.adminInfo).then(res => {
                        if(typeof res === 'string') {
                            const resp = JSON.parse(res)
                            this.$message.error('resp', resp.msg)
                        }else {
                            this.$message.success('密码修改成功')
                            this.$store.dispatch('user/logout').then(() => {
                                this.$router.push(`/login?redirect=${this.$route.fullPath}`)
                            })
                        }
                    })
                } else {
                    this.$message.error('请填写所有项')
                }
            },
            backHandle() {
                this.$router.push('/')
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
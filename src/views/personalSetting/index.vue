<template>
    <div class="app-container">
        <div>
            <div class="block2">网站信息</div>
            <div class="block">网站标题</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.siteTitle" disabled></el-input>
            </div>
            <div class="block">邮箱</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.mail" disabled></el-input>
            </div>
            <div class="block">备案号</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.icp" disabled></el-input>
            </div>
            <div class="block">网站头像信息</div>
            <div style="margin-bottom: 15px;">
                <el-image
                    style="width: 100px;"
                    :src="form.avatar"
                >
                </el-image>
            </div>
            <el-divider></el-divider>
            <div class="block2">网站图标信息</div>
            <div class="block">网站图标地址</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.favicon" placeholder="请输入图片地址" disabled></el-input>
            </div>
            <div class="block">网站图标预览</div>
            <div style="margin-bottom: 15px;">
                <el-image
                    style="width: 100px;"
                    :src="form.favicon"
                >
                </el-image>
            </div>
            <el-divider></el-divider>
            <div class="block2">github 信息</div>
            <div class="block">github 名字</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.githubName" disabled ></el-input>
            </div>
            <div class="block">github 地址</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.github" disabled></el-input>
            </div>
            <el-divider></el-divider>
            <div class="block2">QQ 信息</div>
            <div class="block">QQ 号码</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.qq"  disabled></el-input>
            </div>
            <div class="block">QQ 二维码图片预览</div>
            <div style="margin-bottom: 15px;">
                <el-image
                    style="width: 100px;"
                    :src="form.qqQrCode"
                >
                </el-image>
            </div>
            <el-divider></el-divider>
            <div class="block2">微信信息</div>
            <div class="block">微信号</div>
            <div style="margin-bottom: 15px;">
                <el-input v-model="form.weixin" disabled></el-input>
            </div>
            <div class="block">微信二维码图片预览</div>
            <div>
                <el-image
                    style="width: 100px;"
                    :src="form.weixinQrCode"
                >
                </el-image>
            </div>
            <el-divider></el-divider>
            <el-button type="primary" style="margin: 15px 0;" @click="openEditHandle">进入编辑模式</el-button>
        </div>
        <!-- 编辑弹窗 -->
        <el-dialog 
            title="请编辑信息" 
            :visible.sync="dialogFormVisible"
            fullscreen
            widh="50%"
            top="5vh"
        >
            <el-form :model="form">
                <div class="block">网站标题</div>
                <div>
                    <el-input v-model="form2.siteTitle" placeholder="请输入项目名称"></el-input>
                </div>
                <div class="block">邮箱</div>
                <div>
                    <el-input v-model="form2.mail" placeholder="请输入项目名称"></el-input>
                </div>
                <div class="block">备案号</div>
                <div>
                    <el-input v-model="form2.icp" placeholder="请输入项目名称"></el-input>
                </div>
                <div class="block">网站头像地址</div>
                <div>
                    <Upload v-model="form2.avatar"/>
                </div>
                <div class="block">网站图标地址</div>
                <div>
                    <Upload v-model="form2.favicon"/>
                </div>
                <div class="block">github 名字</div>
                <div>
                    <el-input v-model="form2.githubName" placeholder="请输入项目链接"></el-input>
                </div>
                <div class="block">github 地址</div>
                <div>
                    <el-input v-model="form2.github" placeholder="请输入项目链接"></el-input>
                </div>

                <div class="block">QQ 号码</div>
                <div>
                    <el-input v-model="form2.qq" placeholder="请输入github地址"></el-input>
                </div>
                <div class="block">QQ 二维码地址</div>
                <div>
                    <Upload v-model="form2.qqQrCode"/>
                </div>
                <div class="block">微信号</div>
                <div>
                    <el-input v-model="form2.weixin" placeholder="请输入github地址"></el-input>
                </div>
                <div class="block">微信二维码地址</div>
                <div>
                    <Upload v-model="form2.weixinQrCode"/>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-bottom: 15px;">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditSetting">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Upload from '@/components/Upload.vue'
    import {server_URL, frontEnd_URL} from "@/urlConfig.js"
    import {setPersonalSetting, getPersonalSetting} from '@/api/personalSetting.js'
    export default {
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    avater: '',
                    favicon: '',
                    siteTitle: '',
                    github: '',
                    githubName: '',
                    icp: '',
                    id: '',
                    mail: '',
                    qq: '',
                    weixin: '',
                    qqQrCode: '',
                    weixinQrCode: '',
                },
                form2: {
                    avater: '',
                    favicon: '',
                    siteTitle: '',
                    github: '',
                    githubName: '',
                    icp: '',
                    id: '',
                    mail: '',
                    qq: '',
                    weixin: '',
                    qqQrCode: '',
                    weixinQrCode: '',
                }
            }
        },
        created() {
            this.fetchData()
        },
        components: {
            Upload
        },
        methods: {
            fetchData() {
                getPersonalSetting().then(res => {
                    console.log('setting=res', res);
                    this.form = {...res.data}
                })
            },
            openEditHandle() {
                this.form2 = {...this.form}
                this.dialogFormVisible = true
            },
            confirmEditSetting() {
                // this.form2.avatar = server_URL + this.form2.avatar
                // this.form2.qqQrCode = server_URL + this.form2.qqQrCode
                // this.form2.weixinQrCode = server_URL + this.form2.weixinQrCode
                setPersonalSetting(this.form2).then(() => {
                    this.dialogFormVisible = false
                    this.fetchData()
                    this.$message.success('编辑成功')
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .block{
        margin: 15px 0;
    }
    .block2{
        font-size: 18px;
        font-weight: 700;
        padding-left: 15px;
        border-left: 3px solid #304156;
    }
</style>
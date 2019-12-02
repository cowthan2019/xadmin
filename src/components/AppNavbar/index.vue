<template>
    <div class="navbar">
        <el-menu
                default-active="/home"
                class="el-menu-vertical"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                :router="true"
        >

            <el-menu-item index="/home">
                <i class="el-icon-menu"/>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/member/">
                <i class="el-icon-document"/>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/banner/">
                <i class="el-icon-document"/>
                <span slot="title">轮播图</span>
            </el-menu-item>
            <el-menu-item index="/version/">
                <i class="el-icon-document"/>
                <span slot="title">版本升级</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>开发者配置</span>
                </template>

                <el-menu-item index="/devconf-file-oss/">
                    <i class="el-icon-document"/>
                    <span slot="title">文件系统-OSS</span>
                </el-menu-item>
              <el-menu-item index="/devconf-file-qiniu/">
                <i class="el-icon-document"/>
                <span slot="title">文件系统-七牛</span>
              </el-menu-item>
              <el-menu-item index="/devconf-email-sendcloud/">
                <i class="el-icon-document"/>
                <span slot="title">邮件-sendcloud</span>
              </el-menu-item>
              <el-menu-item index="/devconf-email-aliyun/">
                <i class="el-icon-document"/>
                <span slot="title">邮件-阿里云DirectMail</span>
              </el-menu-item>
              <el-menu-item index="/devconf-email-qq/">
                <i class="el-icon-document"/>
                <span slot="title">邮件-QQ邮箱</span>
              </el-menu-item>
              <el-menu-item index="/devconf-sms-aliyun/">
                <i class="el-icon-document"/>
                <span slot="title">短信-阿里云</span>
              </el-menu-item>
              <el-menu-item index="/devconf/">
                <i class="el-icon-document"/>
                <span slot="title">声网</span>
              </el-menu-item>
              <el-menu-item index="/devconf/">
                <i class="el-icon-document"/>
                <span slot="title">网易云信</span>
              </el-menu-item>
              <el-menu-item index="/devconf/">
                <i class="el-icon-document"/>
                <span slot="title">推送-极光</span>
              </el-menu-item>
              <el-menu-item index="/devconf/">
                <i class="el-icon-document"/>
                <span slot="title">推送-小米</span>
              </el-menu-item>
              <el-menu-item index="/devconf/">
                <i class="el-icon-document"/>
                <span slot="title">推送-华为</span>
              </el-menu-item>
              <el-menu-item index="/devconf/">
                <i class="el-icon-document"/>
                <span slot="title">推送-vivo</span>
              </el-menu-item>
              <el-menu-item index="/devconf/">
                <i class="el-icon-document"/>
                <span slot="title">推送-oppo</span>
              </el-menu-item>
                <el-menu-item index="/devconf/">
                    <i class="el-icon-document"/>
                    <span slot="title">微信小程序</span>
                </el-menu-item>
                <el-menu-item index="/devconf/">
                    <i class="el-icon-document"/>
                    <span slot="title">微信公众号</span>
                </el-menu-item>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {

    components: {},
    data() {
      return {}
    },

    computed: {},

    // mounted: {},

    methods: {}
  }
</script>
<style scoped>
    .el-menu-vertical {
        border-right: none;
        text-align: left;
    }
</style>

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
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/member/">
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
     
      
       <el-menu-item index="/banner/">
        <i class="el-icon-document"></i>
        <span slot="title">轮播图</span>
      </el-menu-item>
      
      
     
       <el-menu-item index="/version/">
        <i class="el-icon-document"></i>
        <span slot="title">版本升级</span>
      </el-menu-item>
       <!-- <el-menu-item index="/userinfo/">
        <i class="el-icon-document"></i>
        <span slot="title">用户详情</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  // mounted: {},

  methods: {
    
  }
};
</script>
<style scoped>
  .el-menu-vertical{
    border-right: none;
    text-align: left;
  }
</style>
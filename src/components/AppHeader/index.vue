<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/logo.jpg" alt width="25px" />
      <span class="company">Momoda Admin</span>
    </a>

    <el-dropdown @command="handleDropdownCommand">
      <span class="el-dropdown-link">
        {{loginNickname}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" command="updatePassword">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus" command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <update-pwd-dialog
      ref="updatePwdDialog"
      v-if="updatePwdDialogVisible"
      @close="handleUpdatePwdDialogDialogClose"
    ></update-pwd-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import updatePwdDialog from "@/components/AppHeader/update-pwd-dialog.vue";
import common from '@/common.js';
export default {
  data() {
    return {
      loginNickname: localStorage.getItem("login-user"),
      updatePwdDialogVisible: false,
    };
  },

  components: {
    updatePwdDialog,
  },

  computed: {},

  // mounted: {},

  methods: {
    handleDropdownCommand(command) {
      if (command == "updatePassword") {
        this.openUpdatePwdDialogDialog();
      } else if (command == "logout") {
        this.$router.push("/login");
        localStorage.setItem("login-token", "");
        localStorage.setItem("login-user", "");
        localStorage.setItem("login-avatar", "");
        localStorage.setItem("login-nickname", "");
        localStorage.setItem("login-role", "");
      }
    },
    openUpdatePwdDialogDialog() {
      this.updatePwdDialogVisible = true;
      
      let that = this;
      that.$nextTick(() => {
        that.$refs['updatePwdDialog'].show();
      });
    },
    handleUpdatePwdDialogDialogClose() {
      this.updatePwdDialogVisible = false;
    }
  }
};
</script>
<style scope>
.header {
  position: absulue;
  line-height: 50px;
  height: 50px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}

.header a {
  float: left;
}

.header a .logo {
  vertical-align: middle;
  padding: 0 10px 0 40px;
  text-align: left;
}

.header a .company {
  vertical-align: middle;
  color: white;
}

.header .el-dropdown {
  float: right;
  margin-right: 40px;
}

.header .el-dropdown-link {
  cursor: pointer;
  color: white;
}
.header .el-icon-arrow-down {
  font-size: 12px;
}

/* .el-dropdown:hover {
  background-color: brown;
} */
</style>
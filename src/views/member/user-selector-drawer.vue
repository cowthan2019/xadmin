<template>
  <div>
    <el-drawer
      title="请选择一个用户"
      :before-close="handleClose"
      :visible.sync="visible"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="50%"
      :modal="false"
      :destroy-on-close="true"
    >
      <div class="demo-drawer__content">
        <user-selector @selectedChange="handleSelectedChange"></user-selector>
      </div>

      <div></div>
    </el-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import UserSelector from "./user-selector.vue";

export default {
  components: {
    UserSelector
  },

  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      // this.$message("show");
      this.visible = true;
    },
    hide() {
      // this.$message("hide");
      this.visible = false;
      this.$emit("close", this.createOk);
    },
    handleClose(done) {
      this.hide();
    },
    handleCancel() {
      this.hide();
    },
    handleSelectedChange(row) {
      // this.$message("用户选择1-" + row.nickname);
      this.$emit("selectedChange", row);
    }
  }
};
</script>
<style  scoped>
.demo-drawer__content {
  background-color: #afafaf;
  width: 80%;
  height: 600px;
  overflow: auto;
  margin-bottom: 20px;
}
</style>
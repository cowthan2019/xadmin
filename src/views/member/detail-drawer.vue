<template>
  <div>
    <el-drawer
      title=""
      :before-close="handleClose"
      :visible.sync="visible"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      size="50%"
      :modal="false"
      :destroy-on-close="true"
    >
      <user-detail class="demo-drawer__content" :uid="uid">
        
      </user-detail>

      <div></div>
    </el-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import UserDetail from "./detail.vue";

export default {
  props: {
    uid: 0
  },

  components:{
    UserDetail,
  },
  data() {
    return {
      visible: false,
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
    }
  }
};
</script>
<style  scoped>
.demo-drawer__content {
  /* background-color: #afafaf; */
  width: 100%;
  height: 600px;
  overflow: auto;
  margin-top: 0px;
  margin-bottom: 20px;
}
</style>
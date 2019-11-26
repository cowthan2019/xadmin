<template>
  <div>
    <el-dialog
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      width="400px"
      title="修改密码"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form class="form" ref="form" :model="form" :rules="rules">
        <el-form-item label="旧密码" prop="oldPwd" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPwd2" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.newPwd2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "@/api/login.js";
import common from "@/common.js";
export default {
  // props: {
  //   visible: Boolean
  // },

  created() {
    // 生命周期钩子，初始化数据
    // this.$message("弹框create");
    console.log("修改密码dialog：created");
  },

  updated() {
    //this.$message("弹框update");
  },

  data() {
    var validatePwd2 = (rule, value, callback) => {
      if (value !== this.form.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      formLabelWidth: "80px",
      createOk: false,
      loading: false,
      form: {
        oldPwd: "",
        newPwd: "",
        newPwd2: ""
      },
      rules: {
        newPwd2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: validatePwd2, trigger: "blur" }
        ],
        oldPwd: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        
      }
    };
  },

  // watch: {
  //   visible(newV, oldV) {
  //     // do something
  //     this.dialogVisible = newV;
  //     console.log(newV, oldV);
  //     if (newV) {
  //       this.createOk = false;
  //       // 弹框重新打开时，需要重置表单，清除上次填写的内容
  //       this.$refs["form"].resetFields();
  //     }
  //   }
  // },
  components: {},

  computed: {},

  methods: {
    show() {
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
      this.$emit("close", this.createOk);
    },
    handleClose(done) {
      this.hide();
    },
    handleCancel() {
      this.hide();
    },
    handleConfirm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .updatePwd(this.form)
            .then(response => {
              if (response.data.code == 0) {
                this.createOk = true;
                this.hide();
                common.alertOk(that, "修改成功");
              } else {
                common.alertError(that, "提交失败：" + response.data.message);
              }
            })
            .catch(function(error) {
              common.alertError(that, "请求出错：" + error.msg);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.form {
  /* background-color: aqua; */
  padding-left: 0;
  text-align: left;
  margin: 0px 0px 0px 0px;
}
</style>
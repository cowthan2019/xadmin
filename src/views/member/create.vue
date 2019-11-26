<template>
  <div>
    <el-dialog
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      width="400px"
      title="添加用户"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form class="form-create" ref="form" :model="form" :rules="rules">
        <el-form-item label="账号" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" :label-width="formLabelWidth">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份" prop="role" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择身份">
            <el-option label="主播" value="3"></el-option>
            <el-option label="普通用户" value="4"></el-option>
          </el-select>
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
import api from "@/api/member.js";
export default {
  props: {
    visible: Boolean
  },

  created() {
    // 生命周期钩子，初始化数据
    // this.$message("弹框create");
  },

  updated() {
    //this.$message("弹框update");
  },

  data() {
    return {
      dialogFormVisible: this.visible,
      formLabelWidth: "80px",
      createOk: false,
      loading: false,
      form: {
        username: "",
        password: "",
        nickname: "",
        gender: "",
        role: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "blur" }]
      }
    };
  },

  watch: {
    visible(newV, oldV) {
      // do something
      this.dialogFormVisible = newV;
      console.log(newV, oldV);
      if (newV) {
        this.createOk = false;
        // 弹框重新打开时，需要重置表单，清除上次填写的内容
        this.$refs["form"].resetFields();
      }
    }
  },
  components: {},

  computed: {},

  methods: {
    show(){
        this.$message("show");
        this.dialogFormVisible = true;
    },
    hide(){
              this.$message("hide");

        this.dialogFormVisible = false;
    },
    handleClose(done) {
      this.$emit("close", this.createOk);
    },
    handleCancel() {
      this.dialogFormVisible = false;
      this.$emit("close", this.createOk);
    },
    handleConfirm(formName) {
      alert("dd");
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(JSON.stringify(this.form));
          this.loading = true;
          api
            .createUser(this.form)
            .then(response => {
              this.loading = false;
              if (response.data.code == 0) {
                this.createOk = true;
                this.dialogFormVisible = false;
                this.$emit("close", this.createOk);
              } else {
                this.$message("创建用户失败：" + response.data.message);
              }
            })
            .catch(function(error) {
              this.loading = false;
              that.$message("创建用户失败：" + error.msg);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.form-create {
  /* background-color: aqua; */
  padding-left: 0;
  text-align: left;
  margin: 0px 0px 0px 0px;
}
</style>
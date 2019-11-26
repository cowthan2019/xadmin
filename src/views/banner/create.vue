<template>
  <div>
    <el-dialog
      width="400px"
      title="添加轮播图"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form class="form-create" ref="form" :model="form" :rules="rules">
        <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="summary" :label-width="formLabelWidth">
          <el-input v-model="form.summary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="mediaUrl" :label-width="formLabelWidth">
          <el-input v-model="form.mediaUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转地址" prop="redirectUrl" :label-width="formLabelWidth">
          <el-input v-model="form.redirectUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属页面" prop="location" :label-width="formLabelWidth">
          <el-select v-model="form.location" placeholder="请选择页面">
            <el-option label="主页" value="home" key="home"></el-option>
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
import api from "@/api/banner.js";
import wx from "@/utils/wx.js"

function getDefaultForm() {
  return {
    location: "home",
    title: "",
    summary: "",
    mediaUrl: "",
    sort: 1
  };
}

function parseDataToForm(data) {
  if (!data) return getDefaultForm();
  let form = wx.object.copyDeep(data);

  if(data.ui === 1) form.location = 'home'
  else form.location = 'home'
  
  return form;
}

export default {
  props: {
    data: getDefaultForm()
  },

  created() {
    // 生命周期钩子，初始化数据
    // this.$message("弹框create");
    console.log("配置添加dialog：created");
  },

  updated() {
    //this.$message("弹框update");
  },

  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      createOk: false,
      form: parseDataToForm(this.data),

      rules: {
        mediaUrl: [
          { required: true, message: "请输入图片地址", trigger: "blur" }
        ],
        redirectUrl: [
          { required: true, message: "请输入跳转地址", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请输入所属页面", trigger: "blur" }
        ]
      }
    };
  },

  // watch: {
  //   visible(newV, oldV) {
  //     // do something
  //     this.dialogFormVisible = newV;
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
      // this.$message("show");
      this.dialogFormVisible = true;
    },
    hide() {
      // this.$message("hide");
      this.dialogFormVisible = false;
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
          console.log(JSON.stringify(this.form));
          // that.loading = true;
          api
            .create(this.form)
            .then(response => {
              // this.loading = false;
              if (response.data.code == 0) {
                this.createOk = true;
                this.hide();
              } else {
                this.$message("创建失败：" + response.data.message);
              }
            })
            .catch(function(error) {
              // this.loading = false;
              that.$message("创建失败：" + error.msg);
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
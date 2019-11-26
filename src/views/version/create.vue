<template>
  <div>
    <el-dialog
      width="500px"
      title="版本"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form class="form-create" ref="form" :model="form" :rules="rules">
          <el-form-item label="平台" prop="platform" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择">
            <el-option label="安卓" value="android" key="android"></el-option>
            <el-option label="iOS" value="ios" key="ios"></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="版本号" prop="versionName" :label-width="formLabelWidth">
          <el-input v-model="form.versionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="版本code" prop="versionCode" :label-width="formLabelWidth">
          <el-input v-model="form.versionCode" autocomplete="off"></el-input>
        </el-form-item>
         
        <el-form-item label="更新日志" prop="changeLog" :label-width="formLabelWidth">
          <el-input v-model="form.changeLog" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="是否强制更新" prop="force" :label-width="formLabelWidth">
          <el-select v-model="form.force" placeholder="请选择">
            <el-option label="是" value="1" key="1"></el-option>
            <el-option label="否" value="0" key="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下载地址" prop="url" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
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
import api from "@/api/version.js";
import wx from "@/utils/wx.js"

function getDefaultForm(){
  return {
        id: null,
        platform: "",
        versionCode: "",
        versionName: "",
        changeLog: "",
        force: "0",
        url: "",
      };
}

function parseDataToForm(data){
  if(!data) return getDefaultForm();
  let form = wx.object.copyDeep(data);
  return form
}



export default {
  props: {
    data: getDefaultForm(),
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
      formLabelWidth: "120px",
      createOk: false,
      form: parseDataToForm(this.data),

      rules: {
        platform: [
          { required: true, message: "请选择平台", trigger: "blur" },
        ],
        versionName: [
          { required: true, message: "请输入版本号", trigger: "blur" },
        ],
        versionCode: [
          { required: true, message: "请输入版本code", trigger: "blur" },
        ],
        changeLog: [
          { required: true, message: "请输入更新日志", trigger: "blur" },
        ],
        force: [
          { required: true, message: "请选择是否强制更新", trigger: "blur" },
        ],
       
        url: [
          { required: true, message: "请输入安装包下载地址", trigger: "blur" },
        ],
        
       
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
    show(){
        // this.$message("show");
        this.dialogFormVisible = true;
    },
    hide(){
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
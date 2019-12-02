<template>
  <div>
    <el-dialog
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      width="400px"
      title="添加配置项"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" class="form-create" :model="form" :rules="rules">
        <el-form-item label="关键字" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="值" prop="val" :label-width="formLabelWidth">
          <el-input v-model="form.val" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" prop="summary" :label-width="formLabelWidth">
          <el-input v-model="form.summary" autocomplete="off" />
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
import api from '@/api/devconf.js'
export default {
  components: {},

  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      createOk: false,
      loading: false,
      form: {
        name: '',
        val: '',
        summary: ''
      },

      rules: {
        name: [
          { required: true, message: '请输入关键词', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          {
            min: 3,
            max: 300,
            message: '长度在 3 到 300 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {},

  watch: {
    visible(newV, oldV) {
      // do something
      this.dialogFormVisible = newV
      console.log(newV, oldV)
      if (newV) {
        this.createOk = false
        // 弹框重新打开时，需要重置表单，清除上次填写的内容
        this.$refs['form'].resetFields()
      }
    }
  },
  // props: {
  //   visible: Boolean
  // },

  created() {
    // 生命周期钩子，初始化数据
    // this.$message("弹框create");
    // console.log('配置添加dialog：created')
  },

  updated() {
    // this.$message("弹框update");
  },

  methods: {
    show() {
      // this.$message("show");
      this.dialogFormVisible = true
    },
    hide() {
      // this.$message("hide");
      this.dialogFormVisible = false
      this.$emit('close', this.createOk)
    },
    handleClose(done) {
      this.hide()
    },
    handleCancel() {
      this.hide()
    },
    handleConfirm(formName) {
      const that = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(JSON.stringify(this.form))
          // that.loading = true;
          api
            .create(this.form)
            .then(response => {
              // this.loading = false;
              if (response.data.code === 0) {
                this.createOk = true
                this.hide()
              } else {
                this.$message('创建失败：' + response.data.message)
              }
            })
            .catch(function(error) {
              // this.loading = false;
              that.$message('创建失败：' + error.msg)
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.form-create {
  /* background-color: aqua; */
  padding-left: 0;
  text-align: left;
  margin: 0px 0px 0px 0px;
}
</style>

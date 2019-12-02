<template>
    <div>
        <el-form class="form-search" :inline="true">
            <el-button type="warning" plain icon="el-icon-plus" @click="handleAdd">添加配置</el-button>
        </el-form>

        <el-table
                ref="table"
                :data="list"
                stripe
                border
                tooltip-effect="dark"
                highlight-current-row
                style="width: 100%"
        >
            <el-table-column type="expand" label="展开" width="80">
                <template slot-scope="props">
                    <el-form label-position="left" class="demo-table-expand">
                        <el-form-item label="描述">
                            <span>{{ props.row.summary }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column prop="id" label="ID" width="70"/>
            <el-table-column prop="name" label="关键词" width="200"/>

            <el-table-column label="值" width="120">
                <template slot-scope="props">
                    <div>
                        <el-form>
                            <el-form-item>
                                <el-input v-model="props.row.val" placeholder="请输入值"/>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handleSave(scope.$index, scope.row)">保存</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                </template>
            </el-table-column>
        </el-table>
        <create-dialog v-if="createDialogVisible" ref="createDialog" @close="handleCreateDialogClose"/>
    </div>
</template>

<script type="text/ecmascript-6">
  // :visible="createDialogVisible"

  import common from '@/common.js'
  import api from '@/api/devconf.js'
  import createDialog from '@/views/devconf/create.vue'

  export default {
    props: ['filter'],
    components: {
      createDialog
    },
    data() {
      return {
        list: [],
        createDialogVisible: false
      }
    },

    computed: {},
    created() {
      // 生命周期钩子，初始化数据
      this.refreshList('onCreate')
    },

    methods: {
      refreshList(forWhat) {
        const that = this
        api
          .getList(that.filter)
          .then(response => {
            if (response.data.code === 0) {
              this.list = response.data.data.list
            } else {
              common.alertOk(that, '获取数据失败：' + response.data.message)
            }
          })
          .catch(function(error) {
            common.alertError(that, '获取数据失败：' + error.msg)
          })
      },
      handleSave(index, row) {
        const that = this
        api
          .updateValue(row.id, row.val)
          .then(response => {
            if (response.data.code === 0) {
              that.refreshList()
              common.alertOk(that, '保存成功!')
            } else {
              this.refreshList()
              common.alertError(that, '保存失败：' + response.data.message)
            }
          })
          .catch(function(error) {
            common.alertError(that, '保存失败：' + error.msg)
          })
      },
      handleDelete(index, row) {
        // this.$message(index + "-handleDelete-" + row);
        const that = this
        common
          .confirm(this, '此操作将永久删除该配置项, 是否继续?')
          .then(() => {
            return api.delete(row.id)
          })
          .then(response => {
            if (response.data.code === 0) {
              that.refreshList()
              common.alertOk(that, '删除成功!')
            } else {
              common.alertError(that, '刪除失败：' + response.data.message)
            }
          })
          .catch(function(error) {
            if (error && error.msg) {
              common.alertError(that, '请求出错：' + error.msg)
            }
          })
      },
      handleSearch() {
        this.refreshList('search-change')
      },
      handleAdd() {
        // createDialogVisible存在的意义就是让对话框每次出来都是new一个新的组件，不受上次数据和状态的影响
        this.createDialogVisible = true
        this.$nextTick(() => {
          this.$refs.createDialog.show()
        })
      },
      handleCreateDialogClose(val) {
        this.createDialogVisible = false
        if (val) {
          this.refreshList()
        }
      }
    }
  }
</script>
<style scoped>
    .el-table .warning-row {
        background: #fdf5e6;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .demo-table-expand {
        font-size: 0;
        background-color: #dcdfe6;
        padding: 10px;
    }

    .demo-table-expand label {
        width: 90px;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
        color: #409eff;
    }

    .el-pagination {
        margin-top: 10px;
    }

    .form-search {
        padding-left: 0;
        text-align: left;
        margin: 10px 10px 10px 10px;
        height: 40px;
    }
</style>

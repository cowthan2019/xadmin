<template>
  <div>
    <el-form class="form-search" :inline="true" :model="filter">
      <el-form-item label>
        <el-select v-model="searchForm.platform">
          <el-option label="全部" value="all" key="all"></el-option>
          <el-option label="安卓" value="android" key="android"></el-option>
          <el-option label="iOS" value="ios" key="ios"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label>
        <el-input v-model="searchForm.keyword" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </el-form-item>

      <el-button type="warning" plain icon="el-icon-plus" @click="handleAdd">添加版本</el-button>
    </el-form>

    <el-table
      :data="list"
      ref="table"
      stripe
      border
      tooltip-effect="dark"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="70"></el-table-column>
      <el-table-column prop="platform" label="平台" width="80"></el-table-column>
      <el-table-column prop="versionName" label="版本号" width="80"></el-table-column>
      <el-table-column prop="versionCode" label="版本code" width="90"></el-table-column>
      <el-table-column prop="changeLog" label="更新日志" width="240"></el-table-column>
      <el-table-column prop="force" label="是否强制" width="80"></el-table-column>
      <el-table-column prop="url" label="下载地址" width="120"></el-table-column>

      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <div>
            <span>
              <el-tag
                :type="scope.row.status === 0 ? 'success' : 'danger'"
              >{{ scope.row.status | statusFilter }}</el-tag>
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="deviceCount" label="设备数" width="120"></el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            v-show="scope.row.status == 0"
            size="mini"
            type="danger"
            @click="handleStatusChange(scope.$index, scope.row, 1)"
          >禁用</el-button>
          <el-button
            v-show="scope.row.status == 1"
            size="mini"
            type="success"
            @click="handleStatusChange(scope.$index, scope.row, 0)"
          >启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <create-dialog
      :data="currentRow"
      ref="createDialog"
      v-if="createDialogVisible"
      @close="handleCreateDialogClose"
    ></create-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// :visible="createDialogVisible"

import common from "@/common.js";
import api from "@/api/version.js";
import createDialog from "@/views/version/create.vue";

const statusOptions = [{ value: 0, name: "正常" }, { value: 1, name: "禁用" }];

function getOption(options, optionValue) {
  return options.find(obj => {
    return obj.value === optionValue;
  });
}

export default {
  created() {
    // 生命周期钩子，初始化数据
    this.refreshList("onCreate");
  },

  data() {
    return {
      filter: this.getDefaultFilter(),
      currentRow: null,
      list: [],
      totalCount: 0,
      lastKeyword: "",
      searchForm: {
        keyword: "",
        platform: "all"
      },

      createDialogVisible: false
    };
  },

  components: {
    createDialog
  },

  computed: {},

  methods: {
    getDefaultFilter() {
      return {
        page: 1,
        count: 20,
        platform: "all",
        keyword: null
      };
    },
    refreshList(forWhat) {
      // console.log("refreshList for " + forWhat);
      // console.log(JSON.stringify(this.filter));
      let that = this;
      api
        .getList(this.filter)
        .then(response => {
          if (response.data.code == 0) {
            this.lastKeyword = this.filter.keyword;
            this.list = response.data.data.list;
            this.totalCount = response.data.data.total;
          } else {
            common.alertOk(that, "获取数据失败：" + response.data.message);
          }
        })
        .catch(function(error) {
          common.alertError(that, "获取数据失败：" + error.msg);
        });
    },
    formatter(row, column) {
      // 通用的格式化器
      //console.log(column.property);

      return "";
    },
    handleDelete(index, row) {
      // this.$message(index + "-handleDelete-" + row);
      let that = this;
      common
        .confirm(this, "此操作将永久删除该条目, 是否继续?")
        .then(() => {
          return api.delete(row.id);
        })
        .then(response => {
          if (response.data.code == 0) {
            that.refreshList();
            common.alertOk(that, "删除成功!");
          } else {
            common.alertError(that, "刪除失败：" + response.data.message);
          }
        })
        .catch(function(error) {
          if (error && error.msg) {
            common.alertError(that, "请求出错：" + error.msg);
          }
        });
    },
    handleStatusChange(index, row, status) {
      //this.$message(index + "-handleStatusChange-" + row);
      let that = this;
      let statusTxt = status == 1 ? "禁用" : "启用";
      common
        .confirm(this, "是否" + statusTxt + "此条目？")
        .then(() => {
          let response = null;
          if (status == 1) response = api.forbidden(row.id);
          else if (status == 0) response = api.unforbidden(row.id);
          return response;
        })
        .then(response => {
          if (response.data.code == 0) {
            that.refreshList();
            common.alertOk(that, "设置成功!");
          } else {
            common.alertError(that, "设置失败：" + response.data.message);
          }
        })
        .catch(function(error) {
          if (error && error.msg) {
            common.alertError(that, "请求出错：" + error.msg);
          }
        });
    },

    handleSearch() {
      this.filter = this.getDefaultFilter();
      this.filter.location = this.searchForm.location;
      this.filter.keyword = this.searchForm.keyword;
      this.refreshList("search-change");
    },
    handleAdd() {
      this.currentRow = null;
      // createDialogVisible存在的意义就是让对话框每次出来都是new一个新的组件，不受上次数据和状态的影响
      this.createDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.createDialog.show();
      });
    },
    handleEdit(index, row) {
      this.currentRow = row;
      this.createDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.createDialog.show();
      });
    },
    handleCreateDialogClose(val) {
      this.createDialogVisible = false;
      if (val) {
        this.filter = this.getDefaultFilter();
        this.refreshList();
      }
    },
  },
  filters: {
    // 过滤器不能引用当前this
    statusFilter(value) {
      // console.log(value);
      let option = getOption(statusOptions, value);
      return option ? option.name : "";
    }
  }
};
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
<template>
  <div>
    <el-form class="form-search" :inline="true" :model="filter">
      <el-form-item label>
        <el-select v-model="searchForm.location">
          <el-option label="全部" value="all" key="all"></el-option>
          <el-option label="首页" value="home" key="home"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label>
        <el-input v-model="searchForm.keyword" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </el-form-item>

      <el-button type="warning" plain icon="el-icon-plus" @click="handleAdd">添加轮播图</el-button>
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
      <el-table-column type="expand" label="展开" width="80">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="描述">
              <span>{{ props.row.summary }}</span>
            </el-form-item>
            <el-form-item label="图片地址">
              <span>{{ props.row.mediaUrl }}</span>
            </el-form-item>
             <el-form-item label="跳转地址">
              <span>{{ props.row.redirectUrl }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="id" label="ID" width="70"></el-table-column>

      <el-table-column prop="mediaUrl" label="图片素材" width="140">
        <template slot-scope="row">
          <el-image
            style="width: 120px; height: 120px"
            :src="row.row.mediaUrl"
            fit="contain"
            :preview-src-list="[row.row.mediaUrl]"
          >
          
          </el-image>
        </template>
      </el-table-column>
      
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="redirectUrl" label="跳转" width="120"></el-table-column>

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
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="1"
      :page-sizes="[2, 20, 30, 40]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>

    <create-dialog
      :data="currentEditRow"
      ref="createDialog"
      v-if="createDialogVisible"
      @close="handleCreateDialogClose"
    ></create-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
// :visible="createDialogVisible"

import common from "@/common.js";
import api from "@/api/banner.js";
import createDialog from "@/views/banner/create.vue";

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
      searchForm: {
        keyword: "",
        location: "all"
      },
      filter: this.getDefaultFilter(),
      list: [],
      totalCount: 0,
      currentEditRow: null,
      lastKeyword: "",
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
        location: "all",
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
    handleSizeChange(val) {
      //this.$message(`每页 ${val} 条`);
      this.filter.count = val;
      this.refreshList("page-size-change");
    },
    handlePageChange(val) {
      // this.$message(`当前页: ${val}`);
      this.filter.page = val;
      this.refreshList("page-change");
    },
    handleSearch() {
      this.filter = this.getDefaultFilter();
      this.filter.location = this.searchForm.location;
      this.filter.keyword = this.searchForm.keyword;
      this.refreshList("search-change");
    },
    handleAdd() {
      this.currentEditRow = null;
      // createDialogVisible存在的意义就是让对话框每次出来都是new一个新的组件，不受上次数据和状态的影响
      this.createDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.createDialog.show();
      });
    },
    handleEdit(index, row) {
      this.currentEditRow = row;
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
    }
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
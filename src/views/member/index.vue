<template>
  <div>
    <el-form class="form-search" :inline="true" :model="filter">
      <el-form-item label>
        <el-select v-model="searchForm.role" placeholder="全部">
          <!-- <el-option label="全部" value="0"></el-option>
          <el-option label="主播" value="3"></el-option>
          <el-option label="普通用户" value="4"></el-option>-->
          <el-option
            v-for="option in roleOptions"
            :key="option.value"
            :label="option.name"
            :value="option.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-input v-model="searchForm.keyword" placeholder="请输入关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </el-form-item>

      <el-button type="warning" plain icon="el-icon-plus" @click="handleAdd">添加用户</el-button>
    </el-form>

    <el-table
      :data="list"
      ref="table"
      stripe
      border
      :default-sort="{prop: 'date', order: 'descending'}"
      tooltip-effect="dark"
      highlight-current-row
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="expand" label="展开" width="80">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="账号">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="注册时间">
              <span>{{ props.row.gmt_create }}</span>
            </el-form-item>
            <el-form-item label="个性签名">
              <span>{{ props.row.signature }}</span>
            </el-form-item>
            <el-form-item label="头像">
              <span>{{ props.row.head_icon }}</span>
            </el-form-item>
            <el-form-item label="注册类型">
              <span>{{ props.row.user_type | userTypeFilter}}</span>
            </el-form-item>
           
          </el-form>
        </template>
      </el-table-column>

      <!-- <el-table-column type="selection" width="40"></el-table-column> -->
      <el-table-column sortable="custom" prop="id" label="ID" width="70"></el-table-column>
      <el-table-column prop="sid" label="短ID" width="80"></el-table-column>

      <el-table-column prop="nickname" label="昵称" width="120" style="cursor: pointer;">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
        </template>
      </el-table-column>

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

      <el-table-column prop="role" label="身份" width="80">
        <template slot-scope="scope">
          <div>
            <span>
              <el-tag
                :type="scope.row.role === 3 ? 'success' : 'danger'"
              >{{ scope.row.role | roleFilter }}</el-tag>
            </span>
          </div>
        </template>
      </el-table-column>

      

     
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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

          <el-button
            v-show="scope.row.role == 3"
            size="mini"
            type="warning"
            @click="handleRoleChange(scope.$index, scope.row, 4)"
          >设为普通用户</el-button>
          <el-button
            v-show="scope.row.role == 4"
            size="mini"
            type="warning"
            @click="handleRoleChange(scope.$index, scope.row, 3)"
          >设为主播</el-button>
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

    <createDialog :visible="createDialogVisible" @close="handleCreateDialogClose"></createDialog>
    <detailDrawer v-if="detailDrawerVisible" :uid="currentDetailRow.uid" ref="detailDrawer" @close="handleDetailDrawerClose"></detailDrawer>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "@/api/member.js";
import createDialog from "@/views/member/create.vue";
import detailDrawer from "@/views/member/detail-drawer.vue";

const statusOptions = [{ value: 0, name: "正常" }, { value: 1, name: "禁用" }];
const onlineOptions = [{ value: 0, name: "离线" }, { value: 1, name: "在线" }];

const roleOptions = [
  // { value: 1, name: "超级管理员" },
  // { value: 2, name: "管理员" },
  { value: 0, name: "全部" },
  { value: 3, name: "主播" },
  { value: 4, name: "普通用户" }
];
const userTypeOptions = [
  { value: 1, name: "邮箱" },
  { value: 2, name: "手机号" },
  { value: 3, name: "facebook" }
];

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
      currentRow: null,
      currentDetailRow: null,
      multipleSelection: [],
      filter: {
        page: 1,
        count: 20,
        sortKey: null,
        sortOrder: null,
        keyword: null,
        role: 0
      },
      list: [],
      totalCount: 0,
      lastKeyword: "",
      roleOptions,
      searchForm: {
        keyword: "",
        role: 0
      },
      createDialogVisible: false,
      detailDrawerVisible: false
    };
  },

  components: {
    createDialog,
    detailDrawer
  },

  computed: {},

  methods: {
    refreshList(forWhat) {
      console.log("refreshList for " + forWhat);
      console.log(JSON.stringify(this.filter));
      let that = this;
      api
        .getUserList(this.filter)
        .then(response => {
          if (response.data.code == 0) {
            this.lastKeyword = this.filter.keyword;
            this.list = response.data.data.list;
            this.totalCount = response.data.data.total;
          } else {
            this.$message("获取数据失败：" + response.data.message);
          }
        })
        .catch(function(error) {
          that.$message("获取数据失败：" + error.msg);
        });
    },
    formatter(row, column) {
      // 通用的格式化器
      //console.log(column.property);
      if (column.property === "date") {
        return "[" + row.date + "]";
      } else if (column.property == "name") {
        return row.name;
      } else {
        return row[column.property];
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleEdit(index, row) {
      this.currentDetailRow = row;
       this.detailDrawerVisible = true;
      this.$nextTick(() => {
        this.$refs.detailDrawer.show();
      });
      // this.$message(index + "-handleEdit-" + row);
    },
    handleDelete(index, row) {
      // this.$message(index + "-handleDelete-" + row);
      let that = this;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteUser(row.id)
            .then(response => {
              if (response.data.code == 0) {
                this.refreshList();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message("刪除失败：" + response.data.message);
              }
            })
            .catch(function(error) {
              that.$message("刪除失败：" + error.msg);
            });
        })
        .catch(() => {});
    },
    handleStatusChange(index, row, status) {
      //this.$message(index + "-handleStatusChange-" + row);
      let that = this;
      let statusTxt = status == 1 ? "禁用" : "启用";
      this.$confirm("是否" + statusTxt + "此用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let promise = null;
        if (status == 1) promise = api.forbidden(row.id);
        else if (status == 0) promise = api.unforbidden(row.id);
        promise
          .then(response => {
            if (response.data.code == 0) {
              this.refreshList();
              this.$message({
                type: "success",
                message: "设置成功!"
              });
            } else {
              that.$message("设置失败：" + response.data.message);
            }
          })
          .catch(function(error) {
            this.$message("设置失败：" + error.msg);
          });
      });
    },
    handleRoleChange(index, row, role) {
      //this.$message(index + "-handleStatusChange-" + row);
      let that = this;

      let statusTxt = role == 3 ? "主播" : "普通用户";
      this.$confirm("是否设置此用户为" + statusTxt + "？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let promise = api.changeRole(row.id, role);
        promise
          .then(response => {
            if (response.data.code == 0) {
              this.refreshList();
              this.$message({
                type: "success",
                message: "设置成功!"
              });
            } else {
              this.$message("设置失败：" + response.data.message);
            }
          })
          .catch(function(error) {
            that.$message("设置失败：" + error.msg);
          });
      });
    },
    setCurrent(row) {
      // setCurrent() 单选：取消选择
      this.$refs.table.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sortChange(column) {
      //需要先清除默认排序 ！！!

      //if (this.$refs.table) this.$refs.table.clearSort()
      console.log(column.prop + "--" + column.order);
      this.filter.sortKey = column.prop;

      if (column.order === "ascending") {
        this.filter.sortOrder = "asc";
      } else if (column.order === "descending") {
        this.filter.sortOrder = "desc";
      } else {
        this.filter.sortOrder = "asc";
      }
      this.filter.page = 1;
      this.refreshList("sort-change");
    },
    handleSizeChange(val) {
      // this.$message(`每页 ${val} 条`);
      this.filter.count = val;
      this.refreshList("page-size-change");
    },
    handlePageChange(val) {
      // this.$message(`当前页: ${val}`);
      this.filter.page = val;
      this.refreshList("page-change");
    },
    handleSearch() {
      this.filter.page = 1;
      this.filter.keyword = this.searchForm.keyword;
      this.filter.role = this.searchForm.role;
      this.refreshList("search-change");

      // if (this.searchForm.keyword) {
      //   this.filter.page = 1;
      //   this.filter.keyword = this.searchForm.keyword;
      //   this.filter.role = this.searchForm.role;
      //   this.refreshList('keyword-change');
      // } else {
      //   if (this.lastKeyword) {
      //     this.filter.page = 1;
      //     this.filter.keyword = '';
      //   this.filter.role = this.searchForm.role;
      //     this.refreshList('keyword-change-from-sth-to-empty');
      //   } else {
      //     this.$message("请输入关键词");
      //   }
      // }
    },
    handleAdd() {
      this.createDialogVisible = true;
      this.$nextTick(() => {
        this.$refs[""];
      });
    },
    handleCreateDialogClose(val) {
      this.createDialogVisible = false;
      // this.$message("对话框关闭：" + val);
      if (val) {
        this.filter = {
          page: 1,
          count: 20,
          sortKey: null,
          sortOrder: null,
          keyword: null,
          role: 0
        };
        this.refreshList();
      }
    },
    handleDetailDrawerClose(val) {
      this.detailDrawerVisible = false;
      // this.$message("详情关闭：" + val);
      
    },
  },
  filters: {
    // 过滤器不能引用当前this
    statusFilter(value) {
      // console.log(value);
      let option = getOption(statusOptions, value);
      return option ? option.name : "";
    },
    roleFilter(value) {
      // console.log(value);
      let option = getOption(roleOptions, value);
      return option ? option.name : "";
    },
    onlineFilter(value) {
      // console.log(value);
      let option = getOption(onlineOptions, value);
      return option ? option.name : "";
    },
    userTypeFilter(value) {
      // console.log(value);
      let option = getOption(userTypeOptions, value);
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
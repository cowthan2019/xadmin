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
    </el-form>

    <el-table
      :data="list"
      ref="table"
      stripe
      border
      tooltip-effect="dark"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <!-- <el-table-column type="selection" width="40"></el-table-column> -->
      <el-table-column prop="id" label="ID" width="70"></el-table-column>
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

      <el-table-column prop="online" label="在线" width="80">
        <template slot-scope="scope">
          <div>
            <span>
              <el-tag
                :type="scope.row.online === 0 ? 'danger' : 'success'"
              >{{ scope.row.online | onlineFilter }}</el-tag>
            </span>
          </div>
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
  </div>
</template>

<script type="text/ecmascript-6">
import api from "@/api/member.js";

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
      }
    };
  },

  components: {},

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
    handleCurrentChange(val) {
      // this.$message("handleCurrentChange--" + val.nickname);
      this.currentRow = val;
      this.$emit("selectedChange", this.currentRow);
    },
    handleSizeChange(val) {
      // this.$message(`每页 ${val} 条`);
      this.filter.count = val;
      this.refreshList("page-size-change");
    },
    handlePageChange(val) {
      this.filter.page = val;
      this.refreshList("page-change");
    },
    handleSearch() {
      this.filter.page = 1;
      this.filter.keyword = this.searchForm.keyword;
      this.filter.role = this.searchForm.role;
      this.refreshList("search-change");
    }
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
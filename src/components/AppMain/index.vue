<template>
  <div class="main">
    <el-breadcrumb separator="/" v-show="$route.path != '/home'">
      <el-breadcrumb-item class='left-line' :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
      
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  // mounted: {},

  methods: {}
};
</script>
<style scoped>
  .el-breadcrumb{
    height: 10px;
    padding: 20px;
    border-radius: 4px;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .left-line{
    border-left: 3px solid #31c67b;
    padding-left: 10px;
  }
</style>
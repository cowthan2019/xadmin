<template>
  <div class="user-detail">
    <!-- <pre>{{dataJson}}</pre> -->
    <div class="banner-info text-center">
      <el-image
        style="width: 100px; height: 100px"
        :src="data.avatar"
        fit="cover"
        class="img-circle"
      ></el-image>
      <h1>{{data.nickname}}</h1>
      <p>{{data.signature}}</p>

      <p>身份：{{data.role}}</p>
      <p>短id：{{data.sid}}</p>
      <p>在线：{{data.online}}</p>
      <p>年龄：{{data.age}}</p>
      <p>性别：{{data.gender}}</p>
      <p>地址：{{data.address}}</p>

      <h2>extra</h2>
      <p>data.extra</p>
      
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "@/api/member.js";
import Vue from "vue";

import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);

export default {
  props: {
    uid: 0
  },
  created() {
    this.refresh();
  },
  components: {
  },
  data() {
    return {
      dataJson: "",
      data: {},
    };
  },

  computed: {},

  methods: {
    refresh() {
      let that = this;
      api
        .getUserinfo(this.uid)
        .then(response => {
          if (response.data.code == 0) {
            this.data = response.data.data;
            this.dataJson = JSON.stringify(this.data, "", 4);

            let data = this.data;

          } else {
            this.$message("获取数据失败：" + response.data.message);
          }
        })
        .catch(function(error) {
          that.$message("获取数据失败：" + error.msg);
        });
    },
    
  }
};
</script>
<style scoped>
/*-- banner-info --*/
.banner-info {
  padding-top: 13%;
  margin: 0 auto;
}
.banner-info h1 {
  font-family: "Cookie", cursive;
  color: #333;
  font-size: 4em;
  margin: 0;
  padding: 0;
}
.banner-info p {
  color: #333;
  margin: 0em 0 1em 0;
  font-size: 1.6em;
  font-weight: 100;
}
.banner-info ul.album {
  margin: 1.5em 0 0 0;
  padding: 0;
}
.banner-info ul.album li {
  display: block;
}

.banner-info ul.album-item {
  margin: 1.5em 0 0 0;
  padding: 0;
}
.banner-info ul.album-item li {
  display: inline-block;
  margin: 0.5em 0 0 1.5em;
}

.banner-info img {
  margin-bottom: 0.7em;
  display: inline-block;
}
.img-circle {
  border-radius: 200px !important;
  -webkit-border-radius: 200px !important;
  -moz-border-radius: 200px !important;
  -o-border-radius: 200px !important;
}
</style>
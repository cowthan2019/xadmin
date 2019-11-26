<template>
  <div>
      <app-header></app-header>
      <app-navbar></app-navbar>
      <app-main></app-main>
  </div>
</template>

<script type="text/ecmascript-6">

import AppHeader from '@/components/AppHeader'
import AppNavbar from '@/components/AppNavbar'
import AppMain from '@/components/AppMain'

export default {
  data () {
    return {
    };
  },

  components: {
    AppHeader,
    AppNavbar,
    AppMain
  },

  computed: {},

  // mounted: {},

  methods: {}
}

</script>
<style scope>
    .header{
        position: absulue;
        line-height: 50px;
        top: 0px;
        left: 0px;
        right: 0px;
        background-color: #2d3a4b;
    }

    .navbar{
        position: absolute;
        width: 230px;
        background-color: #545c64;
        top: 50px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        overflow-y: auto;
    }

    .main{
        position: absolute;
        /* background-color: #545c32; */
        top: 50px;
        left: 230px;
        padding: 10px;
        overflow-y: auto;

        /** 加这两个会把div撑起来，但大小就固定了 */
        right: 0px;
        bottom: 0px;
    }
</style>
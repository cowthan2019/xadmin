
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: { // 存放状态，即数据，共享属性
        count: 1,
    }, 
})

export default store

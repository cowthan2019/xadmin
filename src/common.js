
import { Loading, Message } from 'element-ui'

function loading(fullscreen, target, text) {
  const loadingOptions = {
    target: target, // 可以是标签名，class带., id带# ，会被传入document.querySelector以获取到对应 DOM 节点
    text: text, // 显示在加载图标下方的加载文案
    spinner: 'el-icon-loading',
    lock: false,
    fullscreen: fullscreen,
    body: !fullscreen,
    background: 'rgba(0, 0, 0, 0.7)'
  }
  const loadingInstance = Loading.service(loadingOptions)
  return loadingInstance
  // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
  //     loadingInstance.close();
  // });
}

export default {
  baseUrl: 'http://localhost:81/',
  // baseUrl: 'http://api-dev.freestyle9527.com:8080/',
  currentUser() {
    const tokenJson = localStorage.getItem('login-token')
    if (!tokenJson) return null
    const accessToken = JSON.parse(tokenJson)
    return accessToken
  },
  currentAuth() {
    const tokenJson = localStorage.getItem('login-token')
    if (!tokenJson) return ''
    if (!tokenJson.startsWith('{')) return ''
    const accessToken = JSON.parse(tokenJson)
    return accessToken.tokenType + ' ' + accessToken.accessToken
  },
  currentToken() {
    const tokenJson = localStorage.getItem('login-token')
    if (!tokenJson) return ''
    const accessToken = JSON.parse(tokenJson)
    return accessToken.accessToken
  },
  currentRole() {
    const tokenJson = localStorage.getItem('login-token')
    if (!tokenJson) return -999
    const accessToken = JSON.parse(tokenJson)
    return accessToken.role
  },
  confirm(vueObj, msg, type) {
    if (!type) type = 'warning'
    return vueObj.$confirm(msg, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type
    })
  },
  alertOk(vueObj, msg) {
    vueObj.$message({
      type: 'success',
      message: msg
    })
  },
  alertError(vueObj, msg) {
    vueObj.$message({
      type: 'error',
      message: msg
    })
  },
  alertOk2(msg) {
    Message({
      type: 'success',
      message: msg,
      duration: 3 * 1000
    })
  },
  alertError2(msg) {
    Message({
      type: 'error',
      message: msg,
      duration: 3 * 1000
    })
  },

  loadingMain: {
    loadingView: null,
    open: function(text) {
      if (this.loadingView) return
      if (!text) text = 'loading...'
      this.loadingView = loading(true, '.main', '')
    },
    close: function() {
      if (this.loadingView) {
        this.loadingView.close()
        this.loadingView = null
      }
    }
  },
  loadingFullScreen: {
    loadingView: null,
    open: function(text) {
      if (this.loadingView) return
      if (!text) text = 'loading...'
      this.loadingView = loading(true, 'body', '')
    },
    close: function() {
      if (this.loadingView) {
        this.loadingView.close()
        this.loadingView = null
      }
    }
  },
  loadingPart: {
    loadingViewMap: new Map(),
    open: function(target, text) {
      if (!target) return
      if (this.loadingViewMap.get(target)) return
      if (!text) text = 'loading...'
      const loadingView = loading(true, target, '')
      this.loadingViewMap.set(target, loadingView)
    },
    close: function(target) {
      if (this.loadingViewMap.get(target)) {
        this.loadingViewMap.get(target).close()
        this.loadingViewMap.delete(target)
      }
    }
  }

}


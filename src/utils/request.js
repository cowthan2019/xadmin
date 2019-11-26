
import axios from 'axios'
import common from '@/common.js'

// import request from '../utils/request.js';

const request = axios.create({
  baseURL: '', // https://some-domain.com/api/
  timeout: 10000,
  headers: {
    'X-Custom-Header': 'foobar'
  }
})
request.defaults.timeout = 30000
request.defaults.headers.common['Authorization'] = common.currentAuth()

// Add a request interceptor
request.interceptors.request.use(function(config) {
  // Do something before request is sent
  // console.log("拦截 request--before sent")
  common.loadingMain.open()
  //   if (store.getters.token) {
  //     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  //   }
  return config
}, function(error) {
  // Do something with request error
  // console.log("拦截 request--error")
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('拦截 response--ok ')
  // console.log("拦截 response--ok " + JSON.stringify(response, "", 4));
  common.loadingMain.close()

  if (response.data.code != 0) {
    // Promise.reject({
    //     code: response.data.code,
    //     msg: response.data.message,
    // });
    // 这里不能通过Promise出去，会报uncaught promise的错误，只能return，在业务代码里判断了
    return response
  } else {
    return response
  }
}, function(error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('拦截 response--error')
  common.loadingMain.close()

  var e = null
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log("ok---not ok ");
    // console.log("ok---ok 1 " + error.response.data);
    // console.log("ok---ok 2 " + error.response.status);
    // console.log("ok---ok 3 " + error.response.headers);
    // console.log("ok---ok 3 " + JSON.stringify(error.response));

    var msg = error.response.data.error ? error.response.data.error : ''
    if (!msg) msg = error.response.data.message ? error.response.data.message : '无响应'
    e = {
      code: error.response.status,
      msg: msg
    }
    /*
          例如404，500，返回的response.data是：
          {
                "timestamp": "2019-10-14T18:25:14.119+0000",
                "status": 404, 或500
                "error": "Not Found", 500是 Internal Server Error
                "message": "No message available",
                "path": "/app/version/latestd"
            }
         */
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // console.log("ok---ok 4 " + JSON.stringify(error));
    e = {
      code: -999,
      msg: error.message ? error.message : '请求出错'
    }
    /*
        服务器不在线：msg = "Network Error"
        跨域错误： msg = "Network Error"
        超时返回：msg = "timeout of 5000ms exceeded"
        */
  } else {
    // Something happened in setting up the request that triggered an Error
    // console.log("ok---ok 5 " + 'Error ' + error.message);
    e = {
      code: -777,
      msg: error.message ? error.message : '服务器出错'
    }
  }
  // console.log("ok---ok 6 " + e);
  return Promise.reject(e)
})

// export default request; // 导出自定义的axios对象
import qs from 'qs'
export default {
  get(url, params, header) {
    return request(
      {
        url: url,
        method: 'get',
        params: params
      }
    )
  },
  postForm(url, params, header) {
    // 自动设置："content-type":"application/x-www-form-urlencoded",
    let postData = ''
    if (params) postData = qs.stringify(params)
    return request.post(url, postData)
  },
  postBody(url, params, header) {
    // 自动设置："content-type":"application/json;charset=UTF-8",
    return request.post(url, params)
  }
}


import http from '@/utils/request'

import common from '@/common.js'

export default {
  login(username, password) {
    return http.postForm(common.baseUrl + 'admin/auth/login', {
      account: username,
      password: password
    })
  },
  loginFacebook(openId, payload) {
    return http.postForm(common.baseUrl + 'admin/auth/login_auth2', {
      openId: openId,
      payload: payload
    })
  },
  getAdminUserInfo(token) {
    return http.get(common.baseUrl + 'admin/admin/login', {
      token: token
    })
  },
  updatePwd(form) {
    return http.postForm(common.baseUrl + 'admin/auth/pwd_update', {
      oldPassword: form.oldPwd,
      newPassword: form.newPwd,
      newPassword2: form.newPwd2
    })
  }
}

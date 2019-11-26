import http from '@/utils/request'

import common from '@/common.js'

export default {
  getUserList(filter) {
    return http.get(common.baseUrl + 'admin/user/list', {
      page: filter.page,
      count: filter.count,
      sortKey: filter.sortKey,
      sortOrder: filter.sortOrder,
      keyword: filter.keyword,
      role: filter.role

    })
  },
  createUser(form) {
    return http.postForm(common.baseUrl + 'admin/user/create', {
      username: form.username,
      password: form.password,
      nickname: form.nickname,
      gender: form.gender,
      role: form.role
    })
  },
  forbidden(id) {
    const url = common.baseUrl + 'admin/user/forbidden'
    return http.postForm(url, { id: id })
  },
  unforbidden(id) {
    const url = common.baseUrl + 'admin/user/activate'
    return http.postForm(url, { id: id })
  },
  changeRole(id, role) {
    const url = role === 3 ? 'admin/user/change_to_anchor' : 'admin/user/change_to_user'
    return http.postForm(common.baseUrl + url, { id: id })
  },
  deleteUser(id) {
    return http.postForm(common.baseUrl + 'admin/user/delete', { id: id })
  },
  getUserinfo(uid) {
    return http.get(common.baseUrl + 'admin/userinfo/lookup', { uid: uid })
  }

}

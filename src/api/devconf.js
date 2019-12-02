import http from '@/utils/request'

import common from '@/common.js'

export default {
  getList(filter) {
    return http.get(common.baseUrl + 'admin/devconf/list', {
      filter: filter
    })
  },
  create(form) {
    const val = form.val ? form.val : ''

    let url = 'admin/devconf/create'
    if (form.id) url = 'admin/devconf/edit'
    return http.postForm(common.baseUrl + url, {
      name: form.name,
      val: val,
      summary: form.summary,
      min: form.min,
      max: form.max
    })
  },

  updateValue(id, value) {
    const url = common.baseUrl + 'admin/devconf/update_value'
    return http.postForm(url, { id: id, val: value })
  },
  delete(id) {
    const url = common.baseUrl + 'admin/devconf/delete'
    return http.postForm(url, { id: id })
  }
}

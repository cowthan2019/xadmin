import http from '@/utils/request'

import common from '@/common.js'
import wx from '@/utils/wx.js'
import ui from '@/utils/ui.js'

export default {
    getList(filter) {
        return http.get(common.baseUrl + 'admin/banner/list', {
            page: filter.page,
            count: filter.count,
            keyword: filter.keyword,
            location: filter.location,
        })
    },
    create(form) {
        let url = 'admin/banner/create'
        if(form.id) url = 'admin/banner/edit'
        return http.postForm(common.baseUrl + url, {
            id: form.id,
            location: form.location,
            title: form.title,
            summary: form.summary,
            mediaUrl: form.mediaUrl,
            redirectUrl: form.redirectUrl,
            sort: form.sort,
        })
    },
    delete(id) {
        let url = common.baseUrl + 'admin/banner/delete';
        return http.postForm(url, {id: id});
    },
    forbidden(id) {
        let url = common.baseUrl + 'admin/banner/forbidden';
        return http.postForm(url, {id: id});
    },
    unforbidden(id) {
        let url = common.baseUrl + 'admin/banner/activate';
        return http.postForm(url, {id: id});
    },
}
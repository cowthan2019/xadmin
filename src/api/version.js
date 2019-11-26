import http from '@/utils/request'

import common from '@/common.js'

export default {
    getList(filter) {
        return http.get(common.baseUrl + 'admin/version/list', {
            page: filter.page,
            count: filter.count,
            keyword: filter.keyword,
            platform: filter.platform,
        })
    },
    create(form) {
        let url = 'admin/version/create'
        if(form.id) url = 'admin/version/edit'
        return http.postForm(common.baseUrl + url, {
            id: form.id,
            url: form.url,
            platform: form.platform,
            versionCode: form.versionCode,
            versionName: form.versionName,
            changeLog: form.changeLog,
            force: form.force,
        })

    },
    delete(id) {
        let url = common.baseUrl + 'admin/version/delete';
        return http.postForm(url, {id: id});
    },
    forbidden(id) {
        let url = common.baseUrl + 'admin/version/forbidden';
        return http.postForm(url, {id: id});
    },
    unforbidden(id) {
        let url = common.baseUrl + 'admin/version/activate';
        return http.postForm(url, {id: id});
    },
}
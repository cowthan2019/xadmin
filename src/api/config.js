import http from '@/utils/request'

import common from '@/common.js'
import qs from 'qs';

export default {
    getList(filter) {
        return http.get(common.baseUrl + 'admin/config/list', {
            page: filter.page,
            count: filter.count,
            keyword: filter.keyword,
            platform: filter.platform,
        })
    },
    create(form) {
        let forServer = form.platform === 'server' ? 1 : 0;
        let forApp = form.platform === 'app' ? 1 : 0;
        let val = form.val ? form.val : "";

        let url = 'admin/config/create'
        if(form.id) url = 'admin/config/edit'
        return http.postForm(common.baseUrl + url, {
            forServer: forServer,
            forApp: forApp,
            effectAndroid: form.effectAndroid,
            effectIos: form.effectIos,
            name: form.name,
            val: val,
            summary: form.summary,
            type: form.type,
            min: form.min,
            max: form.max,
        })
    },
    
    updateValue(id, value) {
        let url = common.baseUrl + 'admin/config/update_value';
        return http.postForm(url, {id: id, val: value})
    },
    delete(id) {
        let url = common.baseUrl + 'admin/config/delete';
        return http.postForm(url, {id: id});
    },
    forbidden(id) {
        let url = common.baseUrl + 'admin/config/forbidden';
        return http.postForm(url, {id: id});
    },
    unforbidden(id) {
        let url = common.baseUrl + 'admin/config/activate';
        return http.postForm(url, {id: id});
    },
}
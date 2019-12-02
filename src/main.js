import Vue from 'vue'

import iView from '@/libs/iview'
import ready from '@/mixins/ready'
import events from '@/libs/vendors/events'
import filters from '@/filters'
import components from '@/components'
import storage from '@/libs/storage'
import router from '@/router'
import store from '@/store'

import App from '@/App'

Vue.use(iView)
Vue.use(events)
Vue.use(filters)
Vue.use(components)
Vue.mixin(ready)
Vue.prototype.$closePage = (payload) => {
    store.dispatch('app/closePage', payload)
}
Vue.prototype.$updatePage = (payload = {}) => {
    store.dispatch('app/updatePage', payload)
}
if (storage.has('token') && storage.has('user')) {
    store.dispatch('app/login', {
        user: storage.get('user', {}),
        token: storage.get('token', '')
    })
}
new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

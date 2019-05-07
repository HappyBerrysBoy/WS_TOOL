import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/stores'
import VueMaterial from 'vue-material'

Vue.config.productionTip = false

Vue.use(VueMaterial)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
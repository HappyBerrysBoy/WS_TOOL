import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import UserShortcut from '@/components/UserShortcut'
import TagShortcut from '@/components/TagShortcut'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/userShortcut',
            name: 'UserShortcut',
            component: UserShortcut
        },
        {
            path: '/tagShortcut',
            name: 'TagShortcut',
            component: TagShortcut
        }
    ]
})
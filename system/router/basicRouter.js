import store from '@/vue-web-core/system/store'
export default{
  routes: [
    {
      path: '/about',
      name: 'about',
      component: require('@/vue-web-core/views/basic/About.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/vue-web-core/views/dashboard/Dashboard.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/users',
      name: 'userManagement',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/account_management/AccountManagement.vue')
        }
      },
      meta: {
        auth: true
      },

    },
    {
      path: '/test/websocket',
      name: 'Websocket',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/test/Websocket.vue')
        }
      },
      meta: {
        auth: false
      },

    },
    {
      path: '/test/file-upload',
      name: 'File Upload',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/test/FileUpload.vue')
        }
      },
      meta: {
      },

    }
  ]
}

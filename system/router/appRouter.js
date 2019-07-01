import store from '@/vue-web-core/system/store'
export default{
  routes: [
    {
      path: '/variable',
      name: 'CariableManagement',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/variable_management/VariableManagement.vue')
        }
      },
      meta: {
        auth: true
      },

    },
    {
      path: '/unrecognized_query',
      name: 'UnrecognizedQuery',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/unrecognized_query/UnrecognizedQuery.vue')
        }
      },
      meta: {
        auth: true
      },

    },
    {
      path: '/customers',
      name: 'Customer',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/customer/Customer.vue')
        }
      },
      meta: {
        auth: true
      },

    },
    {
      path: '/active_messages',
      name: 'ActiveMessage',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/active_message/ActiveMessage.vue')
        }
      },
      meta: {
        auth: true
      },

    }
  ]
}

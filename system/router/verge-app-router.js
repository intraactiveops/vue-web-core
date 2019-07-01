import store from '@/vue-web-core/system/store'
export default{
  routes: [
    {
      path: '/company_registration',
      name: 'CompanyRegistration',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/registration/CompanyRegistration.vue')
        }
      },
      meta: {
        // auth: false
      }
    },
    {
      path: '/pos',
      name: 'POS',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/pos/POS.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/category',
      name: 'Category',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/product_management/CategoryManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/product',
      name: 'Product',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/product_management/ProductManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/discount',
      name: 'Discount',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/product_management/DiscountManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    }
  ]
}

import store from '@/vue-web-core/store.js'
export default{
  routes: [
    {
      path: '/borrower',
      name: 'Borrower',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/lending/BorrowerManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/borrowing',
      name: 'Borrowings',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/lending/BorrowingManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    }
  ]
}

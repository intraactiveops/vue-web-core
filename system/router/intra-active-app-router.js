import store from '@/vue-web-core/store.js'
export default{
  routes: [
    {
      path: '/administrator_management',
      name: 'Administrator Management',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/administrator_management/AdministratorManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/services',
      name: 'Services',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/service/ServiceManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/roles',
      name: 'Roles',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/role/RoleManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/company_management',
      name: 'Company',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/company/CompanyManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/company_administrator_management',
      name: 'CompanyAdminManagement',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/company_administrator_management/CompanyAdministratorManagement.vue')
        }
      },
      meta: {
        auth: true
      },
    },
    {
      path: '/registration',
      name: 'UserRegistration',
      component: () => {
        store.commit('setModuleLoading', true)
        return {
          component: import('@/vue-web-core/views/registration/UserRegistration.vue')
        }
      },
      meta: {
      },
    }
  ]
}

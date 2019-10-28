<template>
  <div>
    <header-menu />
    <side-menu :left-side-menu-on="userName ? true: false" :right-side-menu-on="userName ? true: false" >
      <template v-slot:body>
        <slot name="body">
        </slot>
      </template>
    </side-menu>
  </div>
</template>
<script>
import SideMenu from './SideMenu'
import HeaderMenu from './HeaderMenu'
import store from '@/vue-web-core/system/store'
export default{
  components: {
    SideMenu,
    HeaderMenu
  },
  mounted(){
    store.dispatch('setCompanyInformation')
    store.dispatch('setUserInformation')
  },
  computed: {
    companyName(){
      return store.state.companyInformation.name
    },
    userName(){
      return store.state.userInformation.firstName
    }
  }
}
</script>
<style>
</style>

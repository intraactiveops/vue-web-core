<template>
  <div id="sidebar-wrapper" >
      <ul class="sidebar-nav pt-4">
        <side-bar-item @link-clicked="hideSideBar" :items="menu" />
      </ul>
  </div>
</template>
<script>
import '@/assets/style/simple-sidebar.scss'
import SideBarItem from './SideBarItem.vue'
import navigationConfig from './config.js'
import User from '@/vue-web-core/system/store'
export default {
  components: {
    SideBarItem
  },
  props: {
    menu: Array
  },
  data(){
    if(localStorage.getItem('roles')){

    }
    return {
      navConfig: navigationConfig
    }
  },
  methods: {
    hideSideBar(){
      if(window.innerWidth <= 768){
        this.navConfig.sidebarToggled = false
      }
    }
  },
  computed: {
    roles(){
      if(User.user() && localStorage.getItem('roles')){
        return JSON.parse(localStorage.getItem('roles'))
      }
      return null
    }
  },
  destroy(){
    $('#menu-toggle').off('click')
  },
  mounted(){
    // console.log(this.$router.)

  }

}
</script>

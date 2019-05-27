<template>
  <div id="sidebar-wrapper" >

      <ul class="sidebar-nav pt-5">
      <!-- <li class="text-right px-4" v-if="!navConfig.noSideBar">
        <span @click="navConfig.sidebarToggled = !navConfig.sidebarToggled" class="btn btn-light text-center sideNavToggler"><fa icon="arrow-left" /> Close</span>

      </li> -->

        <!-- <li class="mb-4 text-white font-weight-bold">
          1075 Dormitel
        </li> -->
        <side-bar-item @link-clicked="hideSideBar" :items="menu" />
      </ul>
  </div>
</template>
<script>
import '@/vue-web-core/assets/style/simple-sidebar.css'
import SideBarItem from './SideBarItem.vue'
import navigationConfig from './config.js'

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
      if(this.$auth.user() && localStorage.getItem('roles')){
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

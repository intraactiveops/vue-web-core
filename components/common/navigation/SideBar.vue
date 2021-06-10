<template>
  <div id="sidebar-wrapper" class="slim-scrollbar header-padding shadow">
      <ul class="sidebar-nav pt-2">
        <side-bar-item ref="sideBarItem" @link-clicked="hideSideBar" :items="menu" />
      </ul>
      <div class="pt-4 mt-4 font-italic pl-4" style="color: #ffffff38">
        <!-- version + year + month + iteration in that month -->
        <small>Version 1.21.6.1</small>
      </div>
  </div>
</template>
<script>
import '@/assets/style/simple-sidebar.scss'
import SideBarItem from './SideBarItem.vue'
import navigationConfig from './config.js'
export default {
  components: {
    SideBarItem
  },
  props: {
    menu: Array
  },
  mounted(){
  },
  data(){
    return {
      navConfig: navigationConfig
    }
  },
  methods: {
    _initialize(){
      if(!this.$refs.sideBarItem._initialize()){
        // this.navConfig.sidebarToggled = false
        this.navConfig.noSideBar = true
      }
    },
    hideSideBar(){
      if(window.innerWidth <= 768){
        this.navConfig.sidebarToggled = false
      }
    }
  },
  computed: {
  },
  destroy(){
    $('#menu-toggle').off('click')
  }

}
</script>

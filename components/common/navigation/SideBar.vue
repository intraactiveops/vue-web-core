<template>
  <div id="sidebar-wrapper" class="slim-scrollbar">
      <ul class="sidebar-nav pt-4">
        <side-bar-item ref="sideBarItem" @link-clicked="hideSideBar" :items="menu" />
      </ul>
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
      }else{
        this.navConfig.noSideBar = false
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

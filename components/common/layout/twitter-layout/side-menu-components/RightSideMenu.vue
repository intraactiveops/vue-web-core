<template>
  <div >
    <side-menu-container v-show="toggleMenu['project']" name="Projects">
      <template v-slot:body>
        <project-menu  />
      </template>
    </side-menu-container>
    <side-menu-container v-show="toggleMenu['following']" name="Following">
      <template v-slot:body>
        <following-menu  />
      </template>
    </side-menu-container>
    <side-menu-container v-show="toggleMenu['network']" name="Networks">
      <template v-slot:body>
        <network-menu  />
      </template>
    </side-menu-container>
    <contact-menu v-show="toggleMenu['contact']" />
  </div>
</template>
<script>
import SideMenuContainer from './SideMenuContainer'
import NetworkMenu from './menus/NetworkMenu'
import ProjectMenu from './menus/ProjectMenu'
import FollowingMenu from './menus/FollowingMenu'
import ContactMenu from './menus/ContactMenu'

import SideMenuStore from './side-menu-store.js'
export default{
  components: {
    SideMenuContainer,
    NetworkMenu,
    ProjectMenu,
    FollowingMenu,
    ContactMenu
  },
  computed: {
    toggleMenu(){
      return SideMenuStore.state
    },
    currentRouteName(){
      return (this.$route.name + '').toLowerCase()
    }
  }
}
</script>

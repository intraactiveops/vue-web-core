<template>
  <div >
    <side-menu-container name="Projects">
      <template v-slot:body>
        <project-menu  />
      </template>
    </side-menu-container>
    <side-menu-container name="Following">
      <template v-slot:body>
        <following-menu  />
      </template>
    </side-menu-container>
    <side-menu-container name="Networks">
      <template v-slot:body>
        <network-menu  />
      </template>
    </side-menu-container>
    <contact-menu  />
  </div>
</template>
<script>
import SideMenuContainer from './SideMenuContainer'
import NetworkMenu from './menus/NetworkMenu'
import ProjectMenu from './menus/ProjectMenu'
import FollowingMenu from './menus/FollowingMenu'
import ContactMenu from './menus/ContactMenu'
export default{
  components: {
    SideMenuContainer,
    NetworkMenu,
    ProjectMenu,
    FollowingMenu,
    ContactMenu
  },
  computed: {
    currentRouteName(){
      return (this.$route.name + '').toLowerCase()
    }
  }
}
</script>

<template>
  <div>
    <side-menu-container name="Networks">
      <template v-slot:body>
        <network-menu  />
      </template>
    </side-menu-container>
  </div>
</template>
<script>
import SideMenuContainer from './SideMenuContainer'
import NetworkMenu from './NetworkMenu'
export default{
  components: {
    SideMenuContainer,
    NetworkMenu
  },
  computed: {
    currentRouteName(){
      return (this.$route.name + '').toLowerCase()
    }
  }
}
</script>

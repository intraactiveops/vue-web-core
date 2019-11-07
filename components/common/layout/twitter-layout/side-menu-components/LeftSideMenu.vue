<template>
  <div>
    <side-menu-container name="Todays Event">
      <template v-slot:body>
        <event-menu />
      </template>
    </side-menu-container>
    <channel-menu />
    <side-menu-container name="Activity">
      <template v-slot:body>
        <activity-menu />
      </template>
    </side-menu-container>
  </div>
</template>
<script>
import SideMenuContainer from './SideMenuContainer'
import ActivityMenu from './menus/ActivityMenu'
import EventMenu from './menus/EventMenu'
import ChannelMenu from './menus/ChannelMenu'
export default{
  components: {
    ChannelMenu,
    SideMenuContainer,
    ActivityMenu,
    EventMenu
  },
  computed: {
    currentRouteName(){
      return (this.$route.name + '').toLowerCase()
    }
  }
}
</script>

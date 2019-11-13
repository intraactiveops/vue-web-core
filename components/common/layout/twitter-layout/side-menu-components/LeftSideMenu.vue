<template>
  <div>
    <side-menu-container v-show="toggleMenu['dailyEvent']" name="Todays Event">
      <template v-slot:body>
        <event-menu />
      </template>
    </side-menu-container>
    <channel-menu v-show="toggleMenu['channel']" />
    <side-menu-container  v-show="toggleMenu['activity']" name="Activity">
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
import SideMenuStore from './side-menu-store.js'
export default{
  components: {
    ChannelMenu,
    SideMenuContainer,
    ActivityMenu,
    EventMenu
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

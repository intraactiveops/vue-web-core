<template>
  <div>
    <channel-menu />
  </div>
</template>
<script>
import SideMenuContainer from './SideMenuContainer'
import ChannelMenu from './menus/ChannelMenu'
export default{
  components: {
    ChannelMenu,
    SideMenuContainer
  },
  computed: {
    currentRouteName(){
      return (this.$route.name + '').toLowerCase()
    }
  }
}
</script>

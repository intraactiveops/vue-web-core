<template>
  <div>
    <side-menu-container name="Media Exchange" :keep-on="currentRouteName === 'channel'">
      <template v-slot:body>
        <channel-list-menu  />
      </template>
    </side-menu-container>
  </div>
</template>
<script>
import ChannelListMenu from '@/views/channel/channel_list/ChannelList'
import SideMenuContainer from '../SideMenuContainer'
export default{
  components: {
    ChannelListMenu,
    SideMenuContainer
  },
  data(){
    return {

    }
  },
  computed: {
    currentRouteName(){
      let name = this.$route.name
      if(!name){
        name = ''
        console.log('name', name, this.$route)
      }
      return name.toLowerCase()
    }
  }
}
</script>
<style>
</style>

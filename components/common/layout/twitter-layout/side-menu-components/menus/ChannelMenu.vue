<template>
  <div class="mb-2">
    <side-menu-container name="Media Exchange" :keep-on="currentRouteName === 'channel'">
      <template v-slot:body>
        <channel-list-menu :activity-toggle="activityToggle" />
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
  props: {
    activityToggle: Boolean
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
      }
      return name.toLowerCase()
    }
  }
}
</script>

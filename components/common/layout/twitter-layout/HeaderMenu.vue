<template>
  <div class="headerContainer ">
    <div v-if="userId" class="header bg-white border-bottom pt-1 w-100 text-center">
      <div class="header-left">
        <search-bar />
      </div>
      <div class="header-center px-1 d-flex justify-content-around" style="height: 40px;">
        <home-menu :activeMenu="activeMenu" />
        <channel-menu :activeMenu="activeMenu" />
        <notification-menu :activeMenu="activeMenu" />
        <project-menu :activeMenu="activeMenu" />
        <profile-menu :activeMenu="activeMenu" />
      </div>
      <div class="header-right text-left " style="">
        <authorized-channel />
      </div>
    </div>

  </div>
</template>
<script>
import store from '@/vue-web-core/system/store'
import SearchBar from './header-menu-components/left-components/SearchBar'
import AuthorizedChannel from './header-menu-components/AuthorizedChannel'

import NotificationMenu from './header-menu-components/menu-items/Notification'
import HomeMenu from './header-menu-components/menu-items/Home'
import ChannelMenu from './header-menu-components/menu-items/Channel'
import ProfileMenu from './header-menu-components/menu-items/Profile'
import ProjectMenu from './header-menu-components/menu-items/Project'
export default {
  components: {
    SearchBar,
    AuthorizedChannel,
    NotificationMenu,
    HomeMenu,
    ChannelMenu,
    ProfileMenu,
    ProjectMenu
  },
  data(){
    return {
      activeMenu: 'Newsfeed'
    }
  },

  watch: {
    '$route'(to, from){
      this.activeMenu = to.name
    }
  },
  computed: {
    userId(){
      return store.state.userInformation.id
    },
    companyName(){
      return store.state.companyInformation.name
    }
  }
}
</script>
<style scoped>
/* .centerMenuItem{
  width: calc(100% / 5)
} */
.header-left{
  width: calc((100% - 500px) / 2);
  float:left;
}
.header-center{
  width: 100%;
  max-width: 500px;
  float:left;
}
.header-right{
  width: calc((100% - 500px) / 2);
  float:left;
  line-height: 1.4em
}
.headerContainer {
  height: 58px; /* This size is based on twiter*/
}
.header {
  position: fixed;
  z-index: 2;
  height: 50px;
}
/deep/ .menuItemDescription.active{
  visibility: visible
}
/deep/ .bubble-style{
  background-color: red;
  color: white;
  border-radius: 100%;
  font-weight: bold;
  font-size: 0.60em;
  padding: 0.3em;
  width: 1.8em
}
/deep/ .centerMenuItem > button:first-child, .centerMenuItem.direct{
  line-height: 11px
}
/deep/ .centerMenuItem .menuItemDescription{
  visibility: hidden;
}
/deep/ .centerMenuItem:hover .menuItemDescription, .centerMenuItem > button:hover .menuItemDescription{
  visibility: visible;
}
/deep/ .centerMenuItem:focus .menuItemDescription, .centerMenuItem > button:focus .menuItemDescription{
  visibility: hidden!important;
}
</style>

<template>
  <div class="headerContainer ">
    <div v-if="userId" class="header bg-white border-bottom pt-1 w-100 text-center">
      <div class="header-left">
        <search-bar />
      </div>
      <div class="header-center px-1 d-flex justify-content-around" style="height: 40px;">
        <home-menu :activeMenu="activeMenu" />
        <div class="btn-group centerMenuItem">
          <button type="button" class="btn rounded-0 pt-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div>
              <fa-layers full-width class="fa-lg">
                <fa icon="envelope"/>
                <fa-layers-text class="bubble-style " transform="up-6  right-15 shrink-4" value="1"/>
              </fa-layers>
            </div>
            <small :class="activeMenu === 'ViewChannel' || activeMenu === 'Channel' ? 'active' : ''" class="menuItemDescription w-100">ME</small>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <router-link to="/channel/null" class="dropdown-item py-0"  title="Compose Message"><fa icon="paper-plane" fixed-width /> Create Channel</router-link>
            <div class="dropdown-divider" style=""></div>
            <router-link to="/channel" class="dropdown-item py-0"  title="View All Channel">View All Channels</router-link>
          </div>
        </div>
          <notification-menu :activeMenu="activeMenu" />
        <div class="btn-group centerMenuItem">
          <button type="button" class="btn rounded-0 pt-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <div class="w-100">
              <fa-layers full-width class="fa-lg">
                <fa icon="project-diagram" />
                <fa-layers-text class="bubble-style" transform="up-6  right-15 shrink-4" value="1"/>
              </fa-layers>
            </div>
            <small :class="activeMenu === 'Project' ? 'active' : ''" class="menuItemDescription w-100">Project</small>
          </button>
          <div class="dropdown-menu dropdown-menu-right" style="width: 300px">
            <button class="dropdown-item py-o px-2" type="button">
              <name-tag :small-name="true" line-height="12px" class="mb-2" name="Andrea James" :profile-photo="require('@/assets/test-img/andrea.png')">
                <template v-slot:beforeName><strong class="small font-weight-bold text-info">Vue JS Web App</strong></template>
                <template v-slot:afterName><small >Created a new task for you</small></template>
              </name-tag>
              <name-tag :small-name="true" line-height="12px" class="mb-2" name="Nate Sullivan" :profile-photo="require('@/assets/test-img/nate.png')">
                <template v-slot:beforeName><strong class="small font-weight-bold text-info">PHP Dev Phase 2</strong></template>
                <template v-slot:afterName><small >Commented on a task</small></template>
              </name-tag>
            </button>
            <div class="dropdown-divider" style=""></div>
            <router-link to="/newsfeed" class="dropdown-item py-0 "  title="View All Channel">Show All Projects</router-link>
          </div>
        </div>
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
import NameTag from '@/vue-web-core/components/name-tag/NameTag'
import NotificationMenu from './header-menu-components/menu-items/Notification'
import HomeMenu from './header-menu-components/menu-items/Home'
import ProfileMenu from './header-menu-components/menu-items/Profile'
export default {
  components: {
    SearchBar,
    AuthorizedChannel,
    NameTag,
    NotificationMenu,
    HomeMenu,
    ProfileMenu
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
  visibility: visible!important
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
/* .centerMenuItem:focus .menuItemDescription, .centerMenuItem > button:focus .menuItemDescription{
  visibility: visible;
} */
</style>

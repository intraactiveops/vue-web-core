<template>
  <div class="headerContainer ">
    <div v-if="userId" class="header bg-white border-bottom pt-1 w-100 text-center">
      <div class="header-left">
        <search-bar />
      </div>
      <div class="header-center px-1 d-flex justify-content-around" style="height: 40px;">
        <router-link class="btn centerMenuItem direct rounded-0" to="/newsfeed">
          <div>
            <fa icon="home" class="fa-lg"/>
          </div>
          <small :class="activeMenu === 'Newsfeed' ? 'active' : ''" class="menuItemDescription w-100">Newsfeed</small>
        </router-link>
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
        <div class="btn-group centerMenuItem">
          <button type="button" class="btn rounded-0 pt-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            <div class="w-100">
              <fa-layers full-width class="fa-lg">
                <fa icon="bell"/>
                <fa-layers-text class="bubble-style" transform="up-6  right-15 shrink-4" value="1"/>
              </fa-layers>
            </div>
            <small :class="activeMenu === 'Notification' ? 'active' : ''" class="menuItemDescription w-100">Notification</small>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item py-0" type="button">Someone liked your post</button>
            <button class="dropdown-item py-0" type="button">Your post has been reported</button>
            <div class="dropdown-divider" style=""></div>
            <router-link to="/notification" class="dropdown-item py-0 "  title="View All Channel">Show All Notifications</router-link>
          </div>
        </div>
        <router-link class="btn centerMenuItem direct rounded-0" to="/newsfeed">
          <div>
            <fa icon="project-diagram" class="fa-lg"/>
          </div>
          <small :class="activeMenu === 'Project' ? 'active' : ''" class="menuItemDescription w-100">Project</small>
        </router-link>
        <div class="btn-group centerMenuItem">
          <button type="button" class="btn border-0 rounded-0 pt-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div>
              <img class="rounded-circle mr-1" v-bind:src="profilePictureLink" style="width:26px;">
            </div>
            <small :class="activeMenu === 'ViewProfile' ? 'active' : ''" class="menuItemDescription w-100">Profile</small>
          </button>
          <div class="dropdown-menu dropdown-menu-right pt-3 pb-1 ">
            <router-link class="px-3" to="/user">
              <img class="rounded-circle ml-1 mr-1" v-bind:src="profilePictureLink" style="width:40px; float:left">
              <div style="float:left; line-height: 18px">
                {{userFullName}}<br>
                <small>@{{username}}</small>
              </div>
            </router-link>
            <div style="clear:both"></div>
            <div class="dropdown-divider mt-3" style=""></div>
            <button class="dropdown-item" type="button" @click="openPageSetting">Page Settings</button>
            <button class="dropdown-item" type="button">Account Settings</button>
            <button class="dropdown-item" type="button" @click="logout">Log Out</button>
          </div>
        </div>
      </div>
      <div class="header-right text-left " style="">
        <authorized-channel />
      </div>
    </div>
    <page-setting ref="pageSetting"/>
  </div>
</template>
<script>
import store from '@/vue-web-core/system/store'
import SearchBar from './header-menu-components/left-components/SearchBar'
import PageSetting from './header-menu-components/PageSetting'
import AuthorizedChannel from './header-menu-components/AuthorizedChannel'
export default {
  components: {
    SearchBar,
    PageSetting,
    AuthorizedChannel
  },
  data(){
    return {
      activeMenu: 'Newsfeed'
    }
  },
  methods: {
    logout(){
      store.commit('setAuthToken', null)
      this.$auth.logout()
      window.location.reload()
    },
    openPageSetting(){
      this.$refs.pageSetting._open()
    }
  },
  watch: {
    '$route'(to, from){
      this.activeMenu = to.name
      console.log('path', to.name)
    }
  },
  computed: {
    userId(){
      return store.state.userInformation.id
    },
    companyName(){
      return store.state.companyInformation.name
    },
    username(){
      return store.state.userInformation.firstName
    },
    userFullName(){
      return store.state.userInformation.firstName + ' ' + store.state.userInformation.lastName
    },
    profilePictureLink(){
      return store.state.userInformation.profilePictureLink
    }
  }
}
</script>
<style scoped>
/* .centerMenuItem{
  width: calc(100% / 5)
} */
.menuItemDescription.active{
  visibility: visible!important
}
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
.bubble-style{
  background-color: red;
  color: white;
  border-radius: 100%;
  font-weight: bold;
  font-size: 0.60em;
  padding: 0.3em;
  width: 1.8em
}
.centerMenuItem > button:first-child, .centerMenuItem.direct{
  line-height: 11px
}
.centerMenuItem .menuItemDescription{
  visibility: hidden;
}
.centerMenuItem:hover .menuItemDescription, .centerMenuItem > button:hover .menuItemDescription{
  visibility: visible;
}
.centerMenuItem:focus .menuItemDescription, .centerMenuItem > button:focus .menuItemDescription{
  visibility: visible;
}
</style>

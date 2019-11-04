<template>
  <div class="headerContainer ">
    <div v-if="userId" class="header bg-white border-bottom pt-1 w-100 text-center">
      <div class="header-left">
        <search-bar />
      </div>
      <div class="header-center px-1" >
        <router-link class="btn centerMenuItem rounded-0" to="/newsfeed"><fa icon="edit" class="fa-lg"/></router-link>
        <router-link class="btn centerMenuItem rounded-0" to="/newsfeed"><fa icon="home" class="fa-lg"/></router-link>
        <div class="btn-group centerMenuItem">
          <button type="button" class="btn rounded-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <fa-layers full-width class="fa-lg">
              <fa icon="envelope"/>
              <fa-layers-text class="bubble-style" transform="up-6  right-15 shrink-4" value="1"/>
            </fa-layers>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <router-link to="/channel/null" class="dropdown-item py-0"  title="Compose Message"><fa icon="paper-plane" fixed-width />Create Channel</router-link>
            <div class="dropdown-divider" style=""></div>
            <router-link to="/channel" class="dropdown-item py-0"  title="View All Channel">View All Channels</router-link>
          </div>
        </div>
        <div class="btn-group centerMenuItem">
          <button type="button" class="btn rounded-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <fa-layers full-width class="fa-lg">
              <fa icon="bell"/>
              <fa-layers-text class="bubble-style" transform="up-6  right-15 shrink-4" value="1"/>
            </fa-layers>
          </button>
          <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item py-0" type="button">Someone liked your post</button>
            <button class="dropdown-item py-0" type="button">Your post has been reported</button>
          </div>
        </div>
        <div class="btn-group centerMenuItem">
          <button type="button" class="btn border-0 rounded-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img class="rounded-circle mr-1" v-bind:src="profilePictureLink" style="width:30px;">
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
            <button class="dropdown-item" type="button">Interface Settings</button>
            <button class="dropdown-item" type="button">Account Settings</button>
            <button class="dropdown-item" type="button" @click="logout">Log Out</button>
          </div>
        </div>
      </div>
      <div class="header-right text-left " style="">
        <small>IntraComs</small>
        <div class="p-0" style="height; 20px; margin-top: -4px">
          <span class="text-primary font-weight-bold text-uppercase">Personal </span>
          <div class="btn-group ">
            <button type="button" class="btn btn-sm rounded-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <fa icon="exchange-alt"/>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <h3 class="dropdown-header">Authorized Exchanges</h3>
              <button class="dropdown-item py-1" type="button">Personal</button>
              <button class="dropdown-item py-1" type="button">Deliotte</button>
              <button class="dropdown-item py-1" type="button">Dept of State</button>
              <button class="dropdown-item py-1" type="button">Kirkland oninvalid & Ellis</button>
              <button class="dropdown-item py-1" type="button">NOVA Health</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/vue-web-core/system/store'
import SearchBar from './header-menu-components/left-components/SearchBar'
export default {
  components: {
    SearchBar
  },
  methods: {
    logout(){
      store.commit('setAuthToken', null)
      this.$auth.logout()
      window.location.reload()
    }
  },
  computed: {
    userId(){
      console.log(store.state.userInformation,'user id')
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
.centerMenuItem{
  width: calc(100% / 5)
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
  height: 55px; /* This size is based on twiter*/
}
.header {
  position: fixed;
  z-index: 2;
  height: 48px;
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
</style>

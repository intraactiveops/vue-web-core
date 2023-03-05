<template>
  <nav id="header-wrapper" class="fixed-top navbar navbar-expand-md navbar-dark shadow-sm p-0" >
    <div class="d-flex align-items-center align-items-stretch" >
      <div :class="noSidebar ? '' : 'bg-primary'" class="navbar-brand px-3 mr-0 py-3 d-flex align-items-center">
        <router-link :class="noSidebar ? 'text-primary font-weight-bold' : 'text-white'" class=" mr-0 float-left text-truncate text-capitalize" to="/">{{companyName ? companyName : defaultCompanyName}}</router-link>
      </div>
      <div v-if="!noSidebar && !navConfig.noSideBar" class="bg-md-white py-2">
        <button
          v-if="!navConfig.sidebarToggled"
          @click="navConfig.sidebarToggled = !navConfig.sidebarToggled; headerMenuToggled = false"
          class="sideButtonToggler float-left btn shadow-none py-0 text-primary"
          type="button" data-toggle="collapse" aria-label="Toggle Sidebar" title="Open Sidebar">
          <fa :icon="'toggle-on'" />
        </button>
        <button
          v-else-if="navConfig.sidebarToggled"
          @click="navConfig.sidebarToggled = !navConfig.sidebarToggled"
          class="sideButtonToggler float-left btn shadow-none py-0 text-primary"
          type="button" data-toggle="collapse" aria-label="Toggle Sidebar" title="Close Sidebar">
          <fa :icon="'toggle-off'" />
        </button>
      </div>
      <a ref="headerMenuToggler" @click="headerMenuToggled = !headerMenuToggled; navConfig.sidebarToggled = false" id="menuToggleBtn" class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </a>
    </div>
    <div
      v-if="!isLoadingModule && isLoadingModule !== null" :class="headerMenuToggled ? '' : 'collapse'"
      class="navbar-collapse navbar-right">
      <ul class="navbar-nav ml-auto">
        <template v-for="item in menu">
          <li
            v-if="typeof item['offline_only'] === 'undefined' || (item['offline_only'] && !userID) || (item['offline_only'] === false && userID)"
            @click="menuClicked(typeof item['no_sidebar'] === 'undefined' ? false : item['no_sidebar'])"
            class="nav-item pr-1 mb-sm-1 pt-1"
          >
            <router-link
              :class="(typeof item['class'] !== 'undefined' ? item['class'] : '') + (headerMenuToggled ? '' : '')"
              class="nav-link py-0 text-center"
              :to="typeof item['link'] === 'undefined' ?  '/' + ((item['name']).toLowerCase()).replace(/ /g, '_') : item['link']"
            >
              <template v-if="item['icon']">
                <!-- desktop display -->
                <span class="d-none d-md-block">
                  <big ><fa :icon="item['icon']" /></big>
                  <br class="icon-br">
                  <small class="d-none d-md-block mt-1"> {{item['name']}}</small>
                </span>
                <!-- for phone display -->
                <span class="d-md-none">
                  <fa :icon="item['icon']" class="" />
                  <span > {{item['name']}}</span>
                </span>
              </template>
              <template v-else> {{item['name']}}</template>
            </router-link>
          </li>
        </template>
        <li v-if="userID" class="nav-item dropdown text-center pt-md-2">
          <a class="nav-link "  id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="cursor: pointer">{{mode === 'offline' ? 'Hi' : 'Hello'}} <strong class="mr-2 text-uppercase">{{userName}}</strong> <fa :icon="'sort-down'" /></a>
          <div class="dropdown-menu dropdown-menu-right " aria-labelledby="dropdown06">
            <small v-if="mode === 'offline'" class="pl-4 font-weight-bold text-secondary">Offline Mode</small>
            <router-link class="dropdown-item" to="/account-setting">Account Setting</router-link>
            <a class="dropdown-item" href="#" @click="logout">Logout</a>
          </div>
        </li>
        <li v-else>&nbsp;&nbsp;&nbsp;</li>
      </ul>
    </div>
  </nav>
</template>
<script>
import navigationConfig from '@/vue-web-core/components/common/navigation/config.js'
import store from '@/vue-web-core/system/store'
export default {
  props: {
    noSidebar: Boolean,
    menu: Array,
    defaultCompanyName: {
      type: String,
      default: 'IntraActiveOPS'
    }
  },
  data(){
    return {
      headerMenuToggled: false,
      navConfig: navigationConfig,
    }
  },
  mounted(){
  },
  methods: {
    menuClicked(noSidebar){
      this.navConfig.noSideBar = noSidebar
      if(!noSidebar){
        this.navConfig.sidebarToggled = true
      }
      this.headerMenuToggled = false
    },
    logout(){
      this.$refs.headerMenuToggler.click()
      this.$auth.logout()
      store.commit('logout')
      this.$router.push({
        path: '/'
      }, () => {})
    }
  },
  computed: {
    companyName(){
      return store.state.companyInformation.name
    },
    userName(){
      return store.state.userInformation.firstName
    },
    mode(){
      return store.state.mode
    },
    userID(){
      return store.state.userInformation ? store.state.userInformation.id : null
    },
    isLoadingModule () {
      return store.state.isModuleLoading
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/custom-theme";
.navbar-brand a {
  text-decoration: none;
}
.navbar-brand{
  width: calc(100vw - 120px)
}
#menuToggleBtn{
  position:absolute;
  right: 16px;
  top: 8px;
  background-color: $primary;
  -webkit-appearance: none;
}
.sideButtonToggler{
  /* position:absolute; */
  font-size: 1.8em;
  color: $dark
  /* margin-left: 230px; */
}
.navbar {
  background: white
}
.nav-link {
  color: white
}
@media(max-width:767px) {
  .sideButtonToggler{
    float: right;
    color: white!important
    /* margin-left: calc(100% - 200px); */
  }
  .navbar-brand{
    min-width: 100px
  }
  .navbar-brand{
    width: calc(100vw - 138px)!important /* (padding x) + (width of two buttons) - 5*/
  }
  .icon-br{
    display: none
  }
  .navbar-collapse{
    width: 100%;
    height: 80vh;
  }
  .navbar {
    background: $primary
  }

}
@media(min-width:767px) {
  .nav-link {
    color: $dark!important
  }
  .navbar-brand{
    max-width: 250px
  }
}
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}
</style>

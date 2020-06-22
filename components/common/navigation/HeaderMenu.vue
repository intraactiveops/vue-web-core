<template>
  <nav id="header-wrapper" class="fixed-top navbar navbar-expand-md navbar-dark bg-primary">
    <div>
      <router-link class="navbar-brand mr-0 float-left text-truncate" to="/">{{companyName ? companyName : defaultCompanyName}}</router-link>
      <template v-if="noSidebar !== true">
        <button
          v-if="!navConfig.sidebarToggled && !navConfig.noSideBar"
          @click="navConfig.sidebarToggled = !navConfig.sidebarToggled; headerMenuToggled = false"
          class="sideButtonToggler float-left btn text-white"
          type="button" data-toggle="collapse" aria-label="Toggle Sidebar">
          <fa :icon="'toggle-on'" />
        </button>
        <button v-else-if="!navConfig.noSideBar && navConfig.sidebarToggled" @click="navConfig.sidebarToggled = !navConfig.sidebarToggled" class="sideButtonToggler float-left btn text-white"  type="button" data-toggle="collapse" aria-label="Toggle Sidebar">
          <fa :icon="'toggle-off'" />
        </button>
      </template>
      <a @click="headerMenuToggled = !headerMenuToggled; navConfig.sidebarToggled = false" id="menuToggleBtn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </a>
    </div>
    <div v-if="!isLoadingModule && isLoadingModule !== null" :class="headerMenuToggled ? '' : 'collapse'" class="collapsed navbar-collapse navbar-right">
      <ul class="navbar-nav ml-auto">
        <template v-for="item in menu">
          <li v-if="typeof item['offline_only'] === 'undefined' || (item['offline_only'] && !userID) || (item['offline_only'] === false && userID)" class="nav-item pr-1" @click="menuClicked(typeof item['no_sidebar'] === 'undefined' ? false : item['no_sidebar'])">
            <router-link
              :class="(typeof item['class'] !== 'undefined' ? item['class'] : '') + (headerMenuToggled ? 'py-3' : '')"
              class="nav-link py-1 text-center"
              style="line-height:16px"
              :to="typeof item['link'] === 'undefined' ?  '/' + ((item['name']).toLowerCase()).replace(/ /g, '_') : item['link']"
            >
              <template v-if="item['icon']">
                <big><fa :icon="item['icon']" /></big> <br class="icon-br">  <small> {{item['name']}}</small>
              </template>
              <template v-else> {{item['name']}}</template>
            </router-link>
          </li>
        </template>
        <!-- <li v-if="userID" class="nav-item">
          <router-link class=" nav-link"  :to="'/user'"></router-link>
        </li> -->
        <li v-if="userID" class="nav-item dropdown text-center">
          <a class="nav-link py-3"  id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="line-height: 0px; cursor: pointer">Hello <strong class="mr-2 text-uppercase">{{userName}}</strong> <fa :icon="'sort-down'" /></a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown06">
            <small v-if="mode === 'offline'" class="dropdown-item font-weight-bold text-secondary">Offline Mode</small>
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
      this.headerMenuToggled = false
    },
    logout(){
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
<style scoped>

.navbar-brand{
  min-width: 240px
}
.navbar-brand{
  padding: 10px 0 10px 0
}
#menuToggleBtn{
  position:absolute;
  right: 16px;
  top: 8px
}
#menuToggleBtn:focus {
  border-color: red!important
}
.sideButtonToggler{
  /* position:absolute; */
  font-size: 1.8em;
  /* margin-left: 230px; */
}
@media(max-width:767px) {
  .sideButtonToggler{
    float: right;
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
}
.fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}
</style>

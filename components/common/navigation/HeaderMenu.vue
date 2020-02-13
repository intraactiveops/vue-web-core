<template>
  <nav id="header-wrapper" class="fixed-top navbar navbar-expand-md navbar-dark bg-primary">
    <router-link class="navbar-brand mr-0" to="/">{{companyName ? companyName : defaultCompanyName}}</router-link>
    <template v-if="noSidebar !== true">
      <button
        v-if="!navConfig.sidebarToggled && !navConfig.noSideBar"
        @click="navConfig.sidebarToggled = !navConfig.sidebarToggled"
        class="sideButtonToggler float-left btn text-white"
        type="button" data-toggle="collapse" aria-label="Toggle Sidebar">
        <fa :icon="'toggle-on'" />
      </button>
      <button v-else-if="!navConfig.noSideBar && navConfig.sidebarToggled" @click="navConfig.sidebarToggled = !navConfig.sidebarToggled" class="sideButtonToggler float-left btn text-white"  type="button" data-toggle="collapse" aria-label="Toggle Sidebar">
        <fa :icon="'toggle-off'" />
      </button>
    </template>
    <button id="menuToggleBtn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div v-if="!isLoadingModule" class="collapse navbar-collapse navbar-right">
      <ul class="navbar-nav ml-auto">
        <template v-for="item in menu">
          <li v-if="typeof item['offline_only'] === 'undefined' || (item['offline_only'] && !userID) || (item['offline_only'] === false && userID)" class="nav-item pr-1">
            <router-link
              @click="navConfig.noSideBar = typeof item['no_sidebar'] === 'undefined' ? false : item['no_sidebar']"
              :class="typeof item['class'] !== 'undefined' ? item['class'] : ''"
              class="nav-link py-1 text-center"
              style="line-height:16px"
              :to="typeof item['link'] === 'undefined' ? ((item['name']).toLowerCase()).replace(/ /g, '_') : item['link']"
            >
              <template v-if="item['icon']">
                <big><fa :icon="item['icon']" /></big><br><small>{{item['name']}}</small>
              </template>
              <template v-else> {{item['name']}}</template>
            </router-link>
          </li>
        </template>
        <li v-if="userID" class="nav-item">
          <router-link class=" nav-link"  :to="'/user'"></router-link>
        </li>
        <li v-if="userID" class="nav-item dropdown">
          <a class="nav-link py-3"  id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="line-height: 0px; cursor: pointer">Hello <strong class="mr-2 text-uppercase">{{userName}}</strong> <fa :icon="'sort-down'" /></a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown06">
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
      navConfig: navigationConfig,
    }
  },
  mounted(){
  },
  methods: {
    logout(){
      store.commit('setAuthToken', null)
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
      console.log('store.state.userInformation.firstName', store.state.userInformation.firstName)
      return store.state.userInformation.firstName
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
  width: 250px
}
#menuToggleBtn{
  position:absolute;
  right: 16px;
  top: 8px
}
.sideButtonToggler{
  position:absolute;
  font-size: 1.8em;
  margin-left: 230px;
}
@media(max-width:768px) {
  .sideButtonToggler{
    margin-left: calc(100% - 150px);
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

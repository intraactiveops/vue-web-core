<template>
  <nav id="header-wrapper" class="fixed-top navbar navbar-expand-md navbar-dark bg-primary">
    <router-link class="navbar-brand mr-0" to="/">{{companyName ? companyName : 'IntraActiveOPS'}}</router-link>
    <template v-if="noSidebar !== true">
      <button
        v-if="!navConfig.sidebarToggled && !navConfig.noSideBar"
        @click="navConfig.sidebarToggled = !navConfig.sidebarToggled"
        class="sideButtonToggler float-left btn text-white"
        type="button" data-toggle="collapse" aria-label="Toggle Sidebar">
        <fa :icon="'toggle-on'" />
      </button>
      <button v-else-if="!navConfig.noSideBar" @click="navConfig.sidebarToggled = !navConfig.sidebarToggled" class="sideButtonToggler float-left btn text-white"  type="button" data-toggle="collapse" aria-label="Toggle Sidebar">
        <fa :icon="'toggle-off'" />
      </button>
    </template>
    <button id="menuToggleBtn" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample06" aria-controls="navbarsExample06" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse navbar-right" id="navbarsExample06">
      <ul class="navbar-nav ml-auto">
        <li v-for="item in menu" class="nav-item">
          <router-link @click="navConfig.noSideBar = typeof item['no_sidebar'] === 'undefined' ? false : item['no_sidebar']" class="nav-link py-1" style="line-height:16px"  :to="typeof item['link'] === 'undefined' ? ((item['name']).toLowerCase()).replace(/ /g, '_') : item['link']">
            <big><fa :icon="item['icon']" /></big><br><small>{{item['name']}}</small>
          </router-link>
        </li>
        <li v-if="$auth.check()" class="nav-item">
          <router-link class=" nav-link"  :to="'/user'">Hello <strong>{{$userName}}</strong></router-link>
        </li>
        <li v-if="$auth.check()" class="nav-item dropdown">
          <a class="nav-link "  id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="line-height: 0px; cursor: pointer"><fa :icon="'sort-down'" :size="'lg'"/></a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown06">
            <router-link class="dropdown-item" to="/account_setting">Account Setting</router-link>
            <a class="dropdown-item" href="#" @click="logout">Logout</a>
          </div>
        </li>
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
    menu: Array
  },
  data(){
    return {
      navConfig: navigationConfig,
    }
  },
  mounted(){
    store.dispatch('setCompanyInformation')
    store.dispatch('setUserInformation')
  },
  methods: {
    logout(){
      store.commit('setAuthToken', null)
      this.$auth.logout()
      window.location.reload()
    }
  },
  computed: {
    companyName(){
      return store.state.companyInformation.name
    },
    userName(){
      return store.state.userInformation.firstName
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

<template>
  <nav id="header-wrapper" class="navbar navbar-expand-md navbar-dark bg-primary">
      <router-link class="navbar-brand mr-0" to="/">IntraActiveOPS</router-link>
      <template v-if="noSidebar !== true">
        <button v-if="!navConfig.sidebarToggled && !navConfig.noSideBar" @click="navConfig.sidebarToggled = !navConfig.sidebarToggled"  class="sideButtonToggler float-left btn text-white"  type="button" data-toggle="collapse" aria-label="Toggle Sidebar">
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
          <!-- <li class="nav-item">
            <router-link class=" nav-link"  :to="'/'"><fa :icon="'tasks'" /> Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class=" nav-link"  :to="'/pos'"><fa :icon="'cash-register'" /> POS</router-link>
          </li> -->
          <li v-if="$auth.check()" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown06" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello <strong>{{$auth.user().username}}</strong></a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown06">
              <a class="dropdown-item" href="#">Profile Setting</a>
              <a class="dropdown-item" href="#" @click="logout">Logout</a>
            </div>
          </li>
        </ul>

      </div>
    </nav>
</template>
<script>
import navigationConfig from '@/vue-web-core/components/common/navigation/config.js'
import store from '@/store'
export default {
  props: {
    noSidebar: Boolean
  },
  data(){
    return {
      navConfig: navigationConfig
    }
  },
  methods: {
    logout(){
      store.commit('setAuthToken', null)
      this.$auth.logout()
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
</style>

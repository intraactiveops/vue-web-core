<template>
  <div class="pb-1 mt-2 w-100 bg-white" >
    <!-- <h5 class="mb-2 text-uppercase"><router-link class="mr-0" to="/">{{companyName ? companyName : defaultCompanyName}}</router-link></h5> -->
    <div v-if="userId" class="w-100 ">
      <div class="dropdown float-left" style="width: calc(100% - 30px)">
        <button class="btn btn-outline-primary w-100 mb-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <fa :icon="selectedMenuIcon"  /> {{selectedMenu}} <fa icon="caret-down" class="float-right" />
        </button>
        <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
          <router-link class="dropdown-item" to="/"><div @click="menuClicked('Home', 'home')" class="w-100"><fa :icon="'home'" /> Home</div></router-link>
          <router-link class="dropdown-item" to="channel"><div @click="menuClicked('Channel', 'envelope')" class="w-100"><fa :icon="'envelope'" /> Channel <span class="badge badge-pill badge-danger">3</span></div></router-link>
          <router-link class="dropdown-item" to="channel"><div @click="menuClicked('Projects', 'project-diagram')" class="w-100"><fa :icon="'project-diagram'" /> Projects</div></router-link>
          <router-link class="dropdown-item" to="channel"><div @click="menuClicked('Archive', 'archive')" class="w-100"><fa icon="archive" /> Archive</div></router-link>
          <router-link class="dropdown-item" to="channel"><div @click="menuClicked('Activity', 'calendar-week')" class="w-100"><fa icon="calendar-week" /> Activity</div></router-link>
          <router-link class="dropdown-item" to="channel"><div @click="menuClicked('Today\'s Event', 'calendar-day')" class="w-100"><fa icon="calendar-day" /> Today's Event</div></router-link>
          <router-link class="dropdown-item" to="channel"><div @click="menuClicked('Me TV', 'tv')" class="w-100"><fa :icon="'tv'" /> Me TV</div></router-link>
          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" to="/user"><img class="rounded-circle mr-1" v-bind:src="profilePictureLink" style="width:21px; float:left"> {{userName}}</router-link>
          <router-link class="dropdown-item" to="/account_setting"><fa icon="cog" /> Setting</router-link>
          <a class="dropdown-item" href="#" @click="logout"><fa icon="power-off" /> Logout</a>
        </div>
      </div>
      <div class="dropdown float-left" style="width: 30px">
        <button class="btn px-1" style="width:30px" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <fa icon="ellipsis-h"  />
        </button>
        <div class="dropdown-menu w-100 dropdown-menu-right" aria-labelledby="dropdownMenuButton">
          <a v-for="(menu, index) in togglableMenuList" @click="toggleMenu(index, $event)" class="dropdown-item" href="javaScript:void(0)"><div class="w-100"><fa :icon="menu['icon']" /> {{menu['name']}} <fa v-if="menu['is_toggled']" class="float-right" icon="check" /></div></a>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
  </div>
</template>
<script>
import store from '@/vue-web-core/system/store'
import SideMnuStore from './SideMenuStore'
export default{
  props: {
    defaultCompanyName: {
      type: String,
      default: 'IntraActiveOPS'
    }
  },
  mounted(){
    // store.commit('setCompanyInformation')
    // store.commit('setUserInformation')
  },
  data(){
    return {
      selectedMenu: 'Home',
      selectedMenuIcon: 'home',
      togglableMenuList: SideMnuStore.state.menus
      // menuList: [{
      //   name: 'home'
      // }]
    }
  },
  methods: {
    toggleMenu(index, e){
      // console.log('event', e)
      e.stopPropagation()
      SideMnuStore.commit('toggleMenu', index)
    },
    menuClicked(menu, icon){
      this.selectedMenu = menu
      this.selectedMenuIcon = icon
    },
    logout(){
      store.commit('logout')
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
    },
    profilePictureLink(){
      return store.state.userInformation.profilePictureLink
    }
  }
}
</script>
<style scoped>
</style>

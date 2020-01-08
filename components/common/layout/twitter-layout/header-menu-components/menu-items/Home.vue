<template>
  <div class="btn-group centerMenuItem">
    <button type="button" class="btn rounded-0 pt-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
      <div class="w-100">
        <fa-layers full-width class="fa-lg">
          <fa icon="home"/>
          <fa-layers-text class="bubble-style" transform="up-6  right-15 shrink-4" value="1"/>
        </fa-layers>
      </div>
      <template v-if="activeMenu === 'NetworkList'">
        <small :class="activeMenu === 'NetworkList' ? 'active' : ''" class="menuItemDescription w-100">Network</small>
      </template>
      <template v-if="activeMenu === 'Newsfeed'">
        <small :class="activeMenu === 'Newsfeed' ? 'active' : ''" class="menuItemDescription w-100">Newsfeed</small>
      </template>
      <template v-if="activeMenu === 'Network'">
        <small :class="activeMenu === 'Network' ? 'active' : ''" class="menuItemDescription w-100">Network</small>
      </template>
    </button>
    <div class="dropdown-menu px-3" style="width: 250px">
      <router-link class="dropdown-item py-0 px-0" to="/newsfeed">
          <fa icon="home"/> Home
      </router-link>
      <div class="dropdown-divider"></div>
      <router-link class="dropdown-item py-0 px-0" to="/newsfeed">
          <fa icon="calendar"/> Events
      </router-link>
      <div class="dropdown-divider"></div>
      <div class="mb-0">
        <div class=" py-0 px-0 font-weight-bold"  title="View All Channel">Following</div>
        <following-menu />
      </div>
      <div class="dropdown-divider"></div>
      <div>
        <router-link to="/network-list" class="dropdown-item py-0 px-0 font-weight-bold"  title="Networks"><fa icon="network-wired"/> Networks</router-link>
        <div class="dropdown-divider"></div>
        <network-list />
      </div>
    </div>
  </div>
</template>
<script>
import NetworkList from '../../side-menu-components/menus/NetworkMenu'
import FollowingMenu from '../../side-menu-components/menus/FollowingMenu'
export default {
  props: {
    activeMenu: String
  },
  components: {
    NetworkList,
    FollowingMenu,
  }
}
</script>
<style scoped>
.centerMenuItem:focus .menuItemDescription, .centerMenuItem > button:focus .menuItemDescription{
  visibility: hidden!important;
}
</style>

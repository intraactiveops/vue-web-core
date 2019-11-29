<template>
  <div class="btn-group centerMenuItem">
    <button type="button" class="btn border-0 rounded-0 pt-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <div>
        <img class="rounded-circle mr-1" v-bind:src="profilePictureLink" style="width:26px;">
      </div>
      <small :class="activeMenu === 'ViewProfile' ? 'active' : ''" class="menuItemDescription w-100">Profile</small>
    </button>
    <div class="dropdown-menu dropdown-menu-right pt-2 pb-1 px-3" style="width: 250px">
      <h6 class="dropdown-header font-weight-bold text-primary px-0">Profile</h6>
      <router-link class="px-0" to="/user" >
        <img class="rounded-circle ml-1 mr-1" v-bind:src="profilePictureLink" style="width:40px; float:left">
        <div style="float:left; line-height: 18px">
          {{userFullName}}<br>
          <small>@{{username}}</small>
        </div>
      </router-link>
      <div style="clear:both"></div>
      <div class="dropdown-divider mt-3" style=""></div>

      <!-- <button class="dropdown-item" type="button" @click="openPageSetting">Page Settings</button> -->
      <page-setting ref="pageSetting"/>
      <div class="dropdown-divider" style=""></div>
      <button class="dropdown-item" type="button">Account Settings</button>
      <button class="dropdown-item" type="button" @click="logout">Log Out</button>
    </div>
  </div>
</template>
<script>
import PageSetting from '../../header-menu-components/PageSetting'
import store from '@/vue-web-core/system/store'
export default {
  components: {
    PageSetting
  },
  props: {
    activeMenu: String
  },
  methods: {
    logout(){
      store.commit('setAuthToken', null)
      this.$auth.logout()
      window.location.reload()
    },
  },
  computed: {
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
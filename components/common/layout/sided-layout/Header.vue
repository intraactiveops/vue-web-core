<template>
  <div class="p-2 border mb-2 mt-2 w-100">
    <h5 class="mb-2 text-uppercase"><router-link class="mr-0" to="/">{{companyName ? companyName : defaultCompanyName}}</router-link></h5>
    <div class="w-100 border-bottom">
      <img class="rounded-circle" v-bind:src="profilePictureLink" style="width:35px; float:left">
      <div style="width:calc(100% - 35px); height:40px; margin-left:40px" class="pt-2 font-weight-bold">
        {{userName}}
        <div class="dropdown" style="wdith:32px; float:right">
          <button class="btn btn-sm p-0" type="button" style="width:32px" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <fa icon="caret-down" />
          </button>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <router-link class=" dropdown-item"  :to="'/user'">Profile</router-link>
            <router-link class="dropdown-item" to="/account_setting">Account Setting</router-link>
            <a class="dropdown-item" href="#" @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
    <div class="py-2 pt-3">
      <router-link to="channel"><div  style="width:100%"><fa :icon="'envelope'" /> Channel <span class="badge badge-secondary float-right">No Channel</span></div></router-link>
    </div>
  </div>
</template>
<script>
import store from '@/vue-web-core/system/store'
export default{
  props: {
    defaultCompanyName: {
      type: String,
      default: 'IntraActiveOPS'
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
    },
    profilePictureLink(){
      return store.state.userInformation.profilePictureLink
    }
  }
}
</script>

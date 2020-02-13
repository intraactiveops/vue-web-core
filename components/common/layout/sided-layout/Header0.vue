<template>
  <div class="pt-2 pb-1 mt-2 w-100 bg-white" >
    <!-- <h5 class="mb-2 text-uppercase"><router-link class="mr-0" to="/">{{companyName ? companyName : defaultCompanyName}}</router-link></h5> -->
    <div class="w-100 border-bottom">
      <router-link to="/user"><img class="rounded-circle" v-bind:src="profilePictureLink" style="width:35px; float:left"></router-link>
      <div style="width:calc(100% - 35px); height:40px; margin-left:40px" class="pt-2 font-weight-bold">
        <router-link to="/user">{{userName}}</router-link>
        <div class="dropdown" style="wdith:32px; float:right">
          <button class="btn btn-sm p-0" type="button" style="width:32px" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <fa icon="cog" />
          </button>
          <div class="dropdown-menu dropdown-menu-right p-2" aria-labelledby="dropdownMenuButton">
            <!-- <router-link class=" dropdown-item px-2 py-0"  :to="'/user'">Profile</router-link> -->
            <router-link class="dropdown-item px-2 py-0" to="/account_setting">Account Setting</router-link>
            <a class="dropdown-item px-2 py-0" href="#" @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
    <div class="py-2 pt-3">
      <router-link class="py-1" to="/"><div  style="width:100%"><fa :icon="'home'" /> Home</div></router-link>

      <div  class="py-1 " style="width:100%">
        <router-link to="channel"><fa :icon="'envelope'" /> Channel</router-link>
        <div class="dropdown float-right p-0" style="wdith:32px;">
          <button class="btn btn-sm p-0" type="button" style="width:32px" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="badge badge-pill badge-danger">3</span>
          </button>
          <div class="dropdown-menu dropdown-menu-right p-1" aria-labelledby="dropdownMenuButton">
            <router-link class=" dropdown-item py-0 px-2"  :to="'/channel'">John Enrick Plenos</router-link>
            <router-link class="dropdown-item py-0 px-2" to="/channel">Dev Team</router-link>
            <router-link class="dropdown-item py-0 px-2" to="/channel">Special Project Ops</router-link>
            <router-link class="dropdown-item py-0 px-2 text-center " to="/channel">View All</router-link>
          </div>
        </div>
        <!-- <span class="badge badge-secondary float-right">No Channel</span> -->
      </div>
      <router-link class="py-1" to="/"><div class="py-1"  style="width:100%"><fa :icon="'project-diagram'" /> Projects</div></router-link>
      <router-link class="py-1" to="/"><div class="py-1" style="width:100%"><fa :icon="'credit-card'" /> Me Pay</div></router-link>
      <div class="w-100 ">
        <div class="dropdown float-rissght p-0 " >
          <button class="btn btn-sm p-0" type="button"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <fa icon="bars" /> More Menu
          </button>
          <div class="dropdown-menu dropdown-menu-center p-1 w-100" aria-labelledby="dropdownMenuButton">
            <router-link class="dropdown-item py-0 px-2"  :to="'/channel'"><fa icon="archive" /> Archive</router-link>
            <router-link class="dropdown-item py-0 px-2" to="/channel"><fa icon="calendar-week" /> Activity</router-link>
            <router-link class="dropdown-item py-0 px-2" to="/channel"><fa icon="calendar-day" /> Today's Event</router-link>
            <router-link class="dropdown-item py-0 px-2" to="/channel"><fa :icon="'tv'" /> Me TV</router-link>
          </div>
        </div>
      </div>
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

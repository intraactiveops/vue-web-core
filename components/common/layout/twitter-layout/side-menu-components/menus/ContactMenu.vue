<template>
  <div class="mb-2">
    <div class="card w-100 mt-0 border-left-0 border-right-0 border-bottom-0  border-top ">
      <div class="card-header py-1 px-2 border-0 bg-white">
        <router-link to="/contact">
          <label class="contacts font-weight-bold mb-0">Contacts</label>
        </router-link>
      </div>
      <div  class="card-body p-0">
        <ul class="list-group list-group-flush">
          <template v-for="(contact, index) in contacts">
            <li :key="index" class="list-group-item borderless py-1 px-2">
              <img 
                @click="openProfileCard(index)"
                class="rounded-circle mr-2 profile-card-toggler"
                style="cursor: pointer;" 
                height="30px" 
                :src="contact.profile_picture">
              <span class="font-weight-bold">{{ contact.name }}</span>
              <profile-card
                ref="ProfileCard"
                :margin="margin"
                :full_name="contact.name"
                :profile_picture_file_name="contact.profile_picture"
              />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

import ProfileCard from '@/vue-web-core/components/profile-card/ProfileCard'
import SideMenuStore from './../side-menu-store'
import ContactStore from '@/views/contact/contact-store'

export default {
  components: {
    ProfileCard
  },
  methods: {
    openProfileCard(index){
      this.$refs.ProfileCard[index]._toggle()
    }
  },
  computed: {
    margin() {
      if (SideMenuStore.state.dailyEvent || SideMenuStore.state.project) {
        return {top: -145, left: -280}
      } else {
        return {top: -60, left: -280}
      }
    },
    contacts() {
      return ContactStore.state.contacts
    }
  }
}
</script>
<style scoped>
.contacts:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>

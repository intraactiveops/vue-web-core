<template>
  <div class="mb-2">
    <div class="card w-100 mt-0 border-left-0 border-right-0 border-bottom-0  border-top ">
      <div class="card-header py-1 px-2 border-0 bg-white">
        <label class=" font-weight-bold mb-0">Contacts</label>
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

export default {
  components: {
    ProfileCard
  },
  data() {
    return {
      contacts: [
        {
          name: 'Andrea James',
          profile_picture: require('@/assets/test-img/andrea.png')
        },
        {
          name: 'Chuck Royal',
          profile_picture: require('@/assets/test-img/chuck.png')
        },
        {
          name: 'Matt Weber',
          profile_picture: require('@/assets/test-img/matt.png')
        },
        {
          name: 'Nate Sullivan',
          profile_picture: require('@/assets/test-img/nate.png')
        },
        {
          name: 'Nicolas Brunero',
          profile_picture: require('@/assets/test-img/nicolas.png')
        }
      ]
    }
  },
  methods: {
    openProfileCard(index){
      this.$refs.ProfileCard[index]._toggle()
    }
  },
  computed: {
    margin() {
      if (SideMenuStore.state.dailyEvent || SideMenuStore.state.project) {
        return {top: -160, left: -280}
      } else {
        return {top: -60, left: -280}
      }
    }
  }
}
</script>

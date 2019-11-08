<template>
  <div>
    <div class="text-center w-100 bg-whitesmoke p-1 mb-2 rounded font-weight-bold">Quick Access Menu</div>
    <label class="w-100 pb-0" to="channel"><div @click.self="menuToggle('dailyEvent')" class="w-100"><input class="mr-2" checked type="checkbox"> <fa icon="calendar-day" /> Today's Event</div></label>
    <label class="w-100 pb-0" to="channel"><div @click.self="menuToggle('channel')" class="w-100"><input class="mr-2" checked type="checkbox"> <fa :icon="'envelope'" /> Channel <span class="badge badge-pill badge-danger">3</span></div></label>
    <label class="w-100 pb-0" to="channel"><div @click.self="menuToggle('activity')" class="w-100"><input class="mr-2" checked type="checkbox"> <fa icon="calendar-week" /> Activity</div></label>
    <label class="w-100 pb-0" to="channel"><div @click.self="menuToggle('project')" class="w-100"><input class="mr-2" checked type="checkbox"> <fa :icon="'project-diagram'" /> Projects</div></label>
    <label class="w-100 pb-0" to="channel"><div @click.self="menuToggle('following')" class="w-100"><input class="mr-2" checked type="checkbox"> <fa icon="user-check" /> Following</div></label>
    <label class="w-100 pb-0" to="channel"><div @click.self="menuToggle('network')" class="w-100"><input class="mr-2" checked type="checkbox"> <fa :icon="'tv'" /> Network</div></label>
    <label class="w-100 pb-0" to="/"><div @click="menuToggle('contact')" class="w-100"><input class="mr-2" checked type="checkbox"> <fa :icon="'address-book'" /> Contacts</div></label>
  </div>
</template>
<script>
import SideMenuStore from '../side-menu-components/side-menu-store.js'
export default{
  methods: {
    menuToggle(menu){
      SideMenuStore.commit('toggleMenu', menu)
    }
  },
  computed: {
    menu(){
      return SideMenuStore.state
    }
  }
}
</script>

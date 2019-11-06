<template>
  <div>
      <div class="text-center w-100 bg-whitesmoke p-1 mb-2 rounded font-weight-bold">Quick Access Menu</div>
      <label class="w-100 pb-0" to="/"><div @click="menuClicked('Home', 'home')" class="w-100"><input class="mr-2" type="checkbox"> <fa :icon="'home'" /> Home</div></label>
      <label class="w-100 pb-0" to="channel"><div @click="menuClicked('Channel', 'envelope')" class="w-100"><input class="mr-2" type="checkbox"> <fa :icon="'envelope'" /> Channel <span class="badge badge-pill badge-danger">3</span></div></label>
      <label class="w-100 pb-0" to="channel"><div @click="menuClicked('Projects', 'project-diagram')" class="w-100"><input class="mr-2" type="checkbox"> <fa :icon="'project-diagram'" /> Projects</div></label>
      <label class="w-100 pb-0" to="channel"><div @click="menuClicked('Archive', 'archive')" class="w-100"><input class="mr-2" type="checkbox"> <fa icon="archive" /> Archive</div></label>
      <label class="w-100 pb-0" to="channel"><div @click="menuClicked('Activity', 'calendar-week')" class="w-100"><input class="mr-2" type="checkbox"> <fa icon="calendar-week" /> Activity</div></label>
      <label class="w-100 pb-0" to="channel"><div @click="menuClicked('Today\'s Event', 'calendar-day')" class="w-100"><input class="mr-2" type="checkbox"> <fa icon="calendar-day" /> Today's Event</div></label>
      <label class="w-100 pb-0" to="channel"><div @click="menuClicked('Me TV', 'tv')" class="w-100"><input class="mr-2" type="checkbox"> <fa :icon="'tv'" /> Me TV</div></label>
  </div>
</template>
<script>
export default{
  methods: {
    menuClicked(){

    }
  }
}
</script>

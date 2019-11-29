<template>
  <div class="btn-group centerMenuItem">
    <button type="button" class="btn rounded-0 pt-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
      <div class="w-100">
        <fa-layers full-width class="fa-lg">
          <fa icon="project-diagram" />
          <fa-layers-text class="bubble-style" transform="up-6  right-15 shrink-4" value="1"/>
        </fa-layers>
      </div>
      <small :class="activeMenu === 'Project' ? 'active' : ''" class="menuItemDescription w-100">Project</small>
    </button>
    <div class="dropdown-menu dropdown-menu-right px-0" style="width: 300px">
      <h6 class="dropdown-header font-weight-bold text-primary px-3">Projects</h6>
      <button class="dropdown-item py-0 px-3" type="button">
        <name-tag :small-name="true" line-height="12px" class="mb-2" name="Andrea James" :profile-photo="require('@/assets/test-img/andrea.png')">
          <template v-slot:beforeName><strong class="small font-weight-bold text-info">Vue JS Web App</strong></template>
          <template v-slot:afterName><small >Created a new task for you</small></template>
        </name-tag>
      </button>
      <button class="dropdown-item py-0 px-3" type="button">
        <name-tag :small-name="true" line-height="12px" class="mb-2" name="Nate Sullivan" :profile-photo="require('@/assets/test-img/nate.png')">
          <template v-slot:beforeName><strong class="small font-weight-bold text-info">PHP Dev Phase 2</strong></template>
          <template v-slot:afterName><small >Commented on a task</small></template>
        </name-tag>
      </button>
      <div class="dropdown-divider px-3" style=""></div>
      <router-link to="/newsfeed" class="dropdown-item py-0  px-3"  title="View All Channel">Show All Projects</router-link>
    </div>
  </div>
</template>
<script>
import NameTag from '@/vue-web-core/components/name-tag/NameTag'
export default {
  components: {
    NameTag
  },
  props: {
    activeMenu: String
  }
}
</script>
<style scoped>
.centerMenuItem:focus .menuItemDescription, .centerMenuItem > button:focus .menuItemDescription{
  visibility: hidden!important;
}
</style>

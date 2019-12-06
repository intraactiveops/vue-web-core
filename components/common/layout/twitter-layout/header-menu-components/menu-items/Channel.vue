<template>
  <div class="btn-group centerMenuItem">
    <button type="button" class="btn rounded-0 pt-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <div>
        <fa-layers full-width class="fa-lg">
          <fa icon="envelope"/>
          <fa-layers-text class="bubble-style " transform="up-6  right-15 shrink-4" value="1"/>
        </fa-layers>
      </div>
      <small :class="activeMenu === 'ViewChannel' || activeMenu === 'Channel' ? 'active' : ''" class="menuItemDescription w-100">ME</small>
    </button>
    <div class="dropdown-menu dropdown-menu-left" style="width: 250px">
      <div class="px-3 dropdown-header font-weight-bold">
        <span class=" px-0  text-primary">Media Exchange</span>
        <router-link to="/channel/null" class="float-right text-"  title="Compose Message"><fa icon="paper-plane" fixed-width /> Create</router-link>
      </div>
      <button class="dropdown-item py-0 px-3" type="button">
        <name-tag :small-name="true" line-height="12px" class="mb-2" :name="''" :profile-photo="require('@/assets/test-img/nate.png')">
          <template v-slot:beforeName><strong class="small font-weight-bold ">Team 7</strong></template>
          <template v-slot:afterName><small>Hello guys, this is a test chat.</small></template>
        </name-tag>
      </button>
      <button class="dropdown-item py-0 px-3" type="button">
        <name-tag :small-name="true" line-height="12px" class="mb-2" :name="''" :profile-photo="require('@/assets/test-img/nate.png')">
          <template v-slot:beforeName><strong class="small font-weight-bold ">Nate Sullivan</strong></template>
          <template v-slot:afterName><small >This is a private message</small></template>
        </name-tag>
      </button>
      <div class="dropdown-divider" style=""></div>
      <router-link to="/channel" class="dropdown-item py-0 px-3"  title="View All Channel">View All Channels</router-link>
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

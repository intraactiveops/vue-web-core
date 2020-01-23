<template>
  <div class="btn-group centerMenuItem">
    <button type="button" class="btn rounded-0 pt-2 shadow-none" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
      <div class="w-100">
        <fa-layers full-width class="fa-lg">
          <fa :class="{'text-info': isNotification}" icon="bell"/>
          <fa-layers-text class="bubble-style" transform="up-6  right-15 shrink-4" value="1"/>
        </fa-layers>
      </div>
      <small :class="activeMenu === 'Notification' ? 'active' : ''" class="menuItemDescription w-100">Notification</small>
    </button>
    <div class="dropdown-menu dropdown-menu-right">
      <h6 class="dropdown-header font-weight-bold text-primary px-3">Notifications</h6>
      <button class="dropdown-item py-0 px-3" type="button">Someone liked your post</button>
      <button class="dropdown-item py-0 px-3" type="button">Your post has been reported</button>
      <div class="dropdown-divider px-3" style=""></div>
      <router-link to="/notification" class="dropdown-item py-0  px-3"  title="View All Channel">Show All Notifications</router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    activeMenu: String
  },
  data() {
    return {
      isNotification: false
    }
  },
  watch: {
    $route: {
      handler(to) {
        this.isNotification = to.path.includes('/notification')
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.centerMenuItem:focus .menuItemDescription, .centerMenuItem > button:focus .menuItemDescription{
  visibility: hidden!important;
}
</style>

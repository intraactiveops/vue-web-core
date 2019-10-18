<template>
  <div class="headerContainer bg-primary">
    <div class="header bg-primary w-100 text-white text-center">
      <router-link class="text-white" to="/newsfeed">Home</router-link> |
      <router-link class="text-white" to="/channel">Channel</router-link> |
      <router-link class="text-white" to="/user">Profile</router-link>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.headerContainer {
  height: 53px; /* This size is based on twiter*/
}
.header {
  position: fixed;
  z-index: 2;
  height: 53px
}
</style>

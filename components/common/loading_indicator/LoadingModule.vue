<template>
  <div>
    I am loading
  </div>
</template>
<script>
export default {
  methods: {
    logout(){
      this.$auth.logout()
    }
  }
}
</script>
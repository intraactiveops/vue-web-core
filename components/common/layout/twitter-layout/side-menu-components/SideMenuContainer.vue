<template>
  <div class="mb-2">
    <div class="card w-100 mt-0 border-0 ">
      <div class="card-header py-1 px-2 bg-whitesmoke border-0 rounded">
        <label class=" font-weight-bold mb-0">{{name}} </label>
        <button v-if="isOpen && !keepOn" @click="toggle(false)" title="minimize" class="btn btn-sm float-right py-0"><fa icon="minus" /></button>
        <button v-if="!isOpen && !keepOn" @click="toggle(true)" title="maximize" class="btn btn-sm float-right py-0"><fa icon="chevron-down" /></button>
      </div>
      <div v-if="isOpen || keepOn" class="card-body p-0">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    name: String,
    keepOn: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      isOpen: true,
    }
  },
  methods: {
    toggle(isOn){
      this.isOpen = isOn
    }
  },
  watch: {

  }
}
</script>
<style>
.rounded{
  border-radius: 8px!important;
}
</style>

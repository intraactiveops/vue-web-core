<template>
  <div>
    <div class="card w-100 mt-0">
      <div class="card-header p-2 bg-primary text-white">
        <label class=" font-weight-bold mb-0">{{name}} </label>
        <button v-if="isOpen && !keepOn" @click="toggle(false)" title="minimize" class="btn text-white btn-sm float-right py-0"><fa icon="minus" /></button>
        <button v-if="!isOpen && !keepOn" @click="toggle(true)" title="maximize" class="btn text-white btn-sm float-right py-0"><fa icon="window-maximize" /></button>
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

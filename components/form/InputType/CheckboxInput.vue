<template>
  <div class="pt-2">
    <input v-bind:value="value" type="checkbox">
  </div>
</template>
<script>
import InputType from './InputTypeCore.js'
let input = new InputType({
  name: 'Checkbox',
  data(){
    return {
    }
  },
  methods: {
  },
  computed: {
    // dpValue()
  },
  mounted(){
  }
})
export default input.generate()
</script>

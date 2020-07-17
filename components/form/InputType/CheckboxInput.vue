<template>
  <div class="pt-2">
    <input v-bind:value="value" type="checkbox">
  </div>
</template>
<script>
import InputTypeMixIn from './InputTypeMixIn.js'
export default {
  mixins: [InputTypeMixIn],
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
}
</script>

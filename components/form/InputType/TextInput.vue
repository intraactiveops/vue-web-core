<template>
  <div>
    <input @change="dataChanged($event.target.value)" v-bind:value="value"  v-bind:class="isset(validationMessage, index) ? 'is-invalid' : ''" v-bind:placeholder="placeholder" class="form-control" type="text">
    <div class="invalid-feedback">
      {{isset(validationMessage, index) ? validationMessage[index]['message'] : ''}}
    </div>
  </div>
</template>
<script>
import InputType from './InputTypeCore.js'
let input = new InputType({
  name: 'TextInput',
  data(){
    return {
      valueTrigger: false
    }
  },
  methods: {
    dataChanged(value){
      if(value !== 'NULL' && value !== null){
        this.$emit('data-changed', this.index, value)
      }else{
        this.$emit('data-changed', this.index, '')
      }
    }
  },
  watch: {
    value(newData){
    }
  }
})
export default input.generate()
</script>

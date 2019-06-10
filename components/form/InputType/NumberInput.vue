<template>
  <div>
    <input @change="dataChanged" v-bind:class="isset(validationMessage, index) ? 'is-invalid' : ''" class="form-control text-right" v-bind:value="value" type="number">
    <div class="invalid-feedback">
      {{isset(validationMessage, index) ? validationMessage[index]['message'] : ''}}
    </div>
  </div>
</template>
<script>
import InputType from './InputTypeCore.js'
let input = new InputType({
  name: 'NumberInput',
  data(){
    return {
    }
  },
  methods: {
    dataChanged(value){
      if(value.target.value !== 'NULL'){
        this.$emit('data-changed', this.index, value.target.value)
      }else{
        this.$emit('data-removed', this.index)
      }
    }
  },
  computed: {
  },
  mounted(){

  }
})
export default input.generate()
</script>

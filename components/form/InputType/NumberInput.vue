<template>
  <div>
    <input @change="dataChanged" placeholder="0.00" v-bind:class="isset(validationMessage, index) ? 'is-invalid' : ''" class="form-control text-right" v-bind:value="value" :readonly="readOnly" type="number" min="2">
    <div class="invalid-feedback">
      {{isset(validationMessage, index) ? validationMessage[index]['message'] : ''}}
    </div>
    <small v-if="typeof helpText !== 'undefined'" class="form-text text-muted">
      {{helpText}}
    </small>
  </div>
</template>
<script>
import InputTypeMixIn from './InputTypeMixIn.js'
export default {
  mixins: [InputTypeMixIn],
  name: 'NumberInput',
  data(){
    return {
    }
  },
  methods: {
    dataChanged(value){
      if(value && value.target.value !== ''){
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
}
</script>

<template>
  <div>
    <input
      v-bind:value="value | formatValue(config)"
      v-bind:class="classes"
      :readonly="readOnly"
      class="form-control-plaintext"
      >
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
  name: 'TextInput',
  data(){
    return {
      valueTrigger: false,
      classes: {
        'text-right': typeof this.config['decimal_place'] !== 'undefined'
      }
    }
  },
  methods: {
    dataChanged(value){
      if(value !== 'NULL' && value !== null){
        this.$emit('data-changed', this.index, value)
      }else{
        this.$emit('data-changed', this.index, '')
      }
    },
  },
  filters: {
    formatValue: function(value, config){
      if(typeof config['decimal_place'] !== 'undefined'){
        return (value * 1).toFixed(config['decimal_place'])
      }else{
        return value
      }
    }
  },
  watch: {
    value(newData){
    }
  }
}
</script>

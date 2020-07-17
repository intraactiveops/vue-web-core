<template>
  <div>
    <input @change="dataChanged($event.target.value)" v-bind:maxlength="config['maxlength']" v-bind:value="value"  v-bind:class="isset(validationMessage, index) ? 'is-invalid' : ''" v-bind:placeholder="placeholder" class="form-control" type="text">
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
}
</script>

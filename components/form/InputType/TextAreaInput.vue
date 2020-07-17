<template>
  <div>
    <textarea @change="dataChanged($event.target.value)" v-bind:value="formData[index]" v-bind:class="isset(validationMessage, index) ? 'is-invalid' : ''" class="form-control" rows="3">

    </textarea>
    <div class="invalid-feedback">
      {{isset(validationMessage, index) ? validationMessage[index]['message'] : ''}}
    </div>
  </div>
</template>
<script>
import InputTypeMixIn from './InputTypeMixIn.js'
export default {
  mixins: [InputTypeMixIn],
  name: 'TextAreaInput',
  components: {
  },
  props: {
    config: Object,
    validationMessage: Object,
    index: String,
    formData: Object
  },
  data(){
    return {
      options: [], // object containing text, value, is_default.
    }
  },
  mounted(){
    this.initConfig()
  },
  methods: {
    initConfig(){
      this.options = this.config['options']
    },
    dataChanged(value){
      if(value !== 'NULL' && value !== null){
        this.$emit('data-changed', this.index, value)
      }else{
        this.$emit('data-changed', this.index, '')
      }
    }
  }
}
</script>

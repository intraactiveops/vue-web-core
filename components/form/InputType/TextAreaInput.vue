<template>
  <div>
    <textarea @change="$emit('data-change', index, $event.target.value)" v-bind:value="formData[index]" v-bind:class="isset(validationMessage, index) ? 'is-invalid' : ''" class="form-control" rows="3">

    </textarea>
    <div class="invalid-feedback">
      {{isset(validationMessage, index) ? validationMessage[index]['message'] : ''}}
    </div>
  </div>
</template>
<script>
import SelectInput from './SelectInput'
export default {
  name: 'TextAreaInput',
  components: {
    SelectInput
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
    evaluateSelected(){

    }
  }
}
</script>
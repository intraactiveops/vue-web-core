<template>
  <div>
    <select
      ref="select"
      @click="checkLatestAPIOption"
      @change="dataChanged($event.target.value)"
      :value="value === null ? 'NULL' : value"
      :class="isset(validationMessage, index) ? 'is-invalid' : ''"
      :disabled="readOnly"
      class="custom-select"
    >
      <!-- <template v-if="source === 'api' && isLoadingAPI">
        <option value="NULL" selected="selected">Please wait...</option>
      </template> -->
      <template >
        <option v-for="option in options" v-bind:value="option['value']" :selected="value + '' === option['value'] + ''">{{option['text']}}</option>
      </template>
    </select>
    <div class="invalid-feedback">
      {{isset(validationMessage, index) ? validationMessage[index]['message'] : ''}}
    </div>
    <small v-if="hasHelpText" class="form-text text-muted">
      {{helpText}}
    </small>
  </div>
</template>
<script>
import InputTypeMixIn from './InputTypeMixIn.js'
export default {
  mixins: [InputTypeMixIn],
  name: 'Select',
  components: {
  },
  data(){
    return {
      options: [], // object containing text, value, is_default.
      isLoadingAPI: false,
      source: 'option',
      latestAPIData: 0,
      optionValueLookUp: {},
      defaultOption: {
        value: 'NULL',
        text: 'Please select'
      }
    }
  },
  mounted(){
    this.initConfig()
  },
  methods: {
    initConfig(){
      if(typeof this.config['default_option'] !== 'undefined'){
        this.defaultOption = this.config['default_option']
      }
      if(typeof this.config['default_option_setter'] !== 'undefined'){
        this.config['default_option_setter']((defaultOption) => {
          this.defaultOption = defaultOption
          this.setOptions(this.options)
        })
      }
      if(this.isset(this.config, 'option_setter')){
        setTimeout(() => {
          this.config['option_setter'](this.setOptions)
        }, 500)
      }
      if(this.isset(this.config, 'api_link')){
        this.source = 'api'
        this.getLatestAPIOption()
      }else{
        this.setOptions(this.config['options'])
      }
    },
    checkLatestAPIOption(){
      if(this.source === 'api'){
        this.getLatestAPIOption()
      }
    },
    getLatestAPIOption(){
      this.isLoadingAPI = true
      let param = {}
      if(typeof this.config['api_parameter'] !== 'undefined'){
        param = this.config['api_parameter']
      }
      param['select'] = {
        0: typeof this.config['api_option_text'] === 'undefined' ? 'description' : this.config['api_option_text'],
        1: 'deleted_at'
      }
      if(this.latestAPIData){
        param['condition'] = [{
          column: 'updated',
          clause: '>',
          value: this.latestAPIData
        }]
      }
      this.apiRequest(this.config['api_link'], param, (response) => {
        if(response['data']){
          let newOptions = []
          for(let x = 0; x < response['data'].length; x++){
            newOptions.push({
              value: response['data'][x]['id'],
              text: response['data'][x][this.config['api_option_text']]
            })
          }
          this.setOptions(newOptions)
        }
        this.isLoadingAPI = false
      }, () => {
        console.error('API Request error', this.config['api_link'])
        this.isLoadingAPI = false
      })
    },
    setOptions(newOptions){
      if(typeof newOptions === 'undefined'){
        this.options = [this.defaultOption]
      }else{
        newOptions.unshift(this.defaultOption)
        this.options = newOptions
      }
      for(let x in this.options){
        this.optionValueLookUp[this.options[x]['value']] = x
      }
    },
    dataChanged(value){
      this.$emit('data-changed', this.index, value === '' ? null : value)
      // if(value.target.value !== 'NULL'){
      //   this.$emit('data-changed', this.index, value.target.value === '' ? null : value.target.value)
      // }else{
      //   this.$emit('data-removed', this.index)
      // }
    },
    evaluateSelected(){

    }
  },
  watch: {
  },
  computed: {
    hasHelpText(){
      return typeof this.helpText !== 'undefined'
    }
  }
}
</script>

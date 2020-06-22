<template>
  <div class="component-form-input-type-select-2">
    <select2  ref="select" :placeholder="placeholder" :value="selectValue" :label="'text'" :index="'value'" :options="options" @search="userTyping" @input="valueChanged" v-bind:class="isset(validationMessage, index) ? 'hasError' : ''" class="">
      <!-- <option v-for="option in options" v-bind:value="option['value']" v-bind:selected="(formData[index] + '') === (option['value'] + '')" >{{option['text']}}</option> -->
    </select2>
    <div v-bind:class="isset(validationMessage, index) ? 'hasError' : ''" class="invalid-feedback" >
      {{isset(validationMessage, index) ? validationMessage[index]['message'] : ''}}
    </div>
  </div>
</template>
<script>
import InputType from './InputTypeCore.js'
import 'vue-select/dist/vue-select.css'
import select2 from 'vue-select'
let input = new InputType({
  name: 'Select2',
  components: {
    select2
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      options: [], // object containing text, value, is_default.
      source: 'option', // option, api, centralize
      apiLink: null,
      apiOptionText: 'description',
      latestAPIData: 0,
      optionValueLookUp: {},
      initializedConfig: {},
      text: 0,
      userTypingTimer: null,
      noFormDataValue: null // if form data is null, this will be the basisi of select value
    }
  },
  mounted(){
    this.initConfig()
  },
  methods: {
    valueChanged(val){
      let value = val ? val['value'] : null
      this.noFormDataValue = value
      if(value && typeof this.index !== 'undefined'){
        this.$emit('data-changed', this.index, value)
      }else if(value){
        this.$emit('data-changed', value)
      }else{
        this.$emit('data-removed', this.index)
      }
      if(typeof this.config['value_listener'] !== 'undefined'){
        this.config['value_listener'](value)
      }
    },
    initConfig(){
      this._initCore()
      if(this.isset(this.config, 'api_link')){
        this.source = 'api'
        this.apiLink = this.config['api_link']
        this.apiOptionText = this.config['api_option_text']
      }else if(typeof this.config['fetch_options'] !== 'undefined'){
        this.source = 'centralized'
      }else{
        this.setOptions(this.config['options'])
      }
    },
    userTyping(search, loading){
      loading(true)
      clearTimeout(this.userTypingTimer)
      this.userTypingTimer = setTimeout(() => {
        this.fetchOptions(search, loading)
      }, 500)
    },
    fetchOptions (search, loading) {
      if(this.source === 'option'){
        return false
      }

      if(this.source === 'api'){
        let param = {
          select: {
            0: this.apiOptionText
          },
          condition: [{
            column: this.apiOptionText,
            clause: 'like',
            value: '%' + search + '%'
          }]
        }
        if(typeof this.config['api_before_search_hook'] !== 'undefined'){
          param = this.config['api_before_search_hook'](search, param)
        }
        this.apiRequest(this.config['api_link'], param, (response) => {
          if(response['data']){
            let newOptions = []
            for(let x = 0; x < response['data'].length; x++){
              let newOption
              if(typeof this.config['create_option_hook'] !== 'undefined'){
                newOption = this.config['create_option_hook'](response['data'][x])
              }else{
                newOption = {
                  value: response['data'][x]['id'],
                  text: response['data'][x][this.apiOptionText]
                }
              }
              newOptions.push(newOption)
            }

            this.setOptions(newOptions)
          }
          loading(false)
        })
      }else if(this.source === 'centralized'){
        this.config['fetch_options'](search, null, (newOptionsList) => {
          this.setOptions(newOptionsList)
          loading(false)
        })
      }
    },
    setOptions(newOptions){
      if(typeof newOptions === 'undefined'){
        return false
      }
      // newOptions.unshift({
      //   value: 'null',
      //   text: 'Please type and select'
      // })

      this.options = newOptions
      for(let x in this.options){
        this.optionValueLookUp[this.options[x]['value']] = x
      }
    },
    evaluateSelected(){

    }
  },
  computed: {
    selectValue(){
      let value
      if(this.formData === null){
        value = this.noFormDataValue
      }else{
        value = (typeof this.formData[this.index] !== 'undefined') ? this.formData[this.index] : null
      }
      let text = this.placeholder
      if(typeof this.options[this.optionValueLookUp[value]] !== 'undefined'){
        text = this.options[this.optionValueLookUp[value]]['text']
      }else if(value && typeof this.options[this.optionValueLookUp[value]] === 'undefined'){
        if(this.source === 'api'){
          this.apiRequest(this.config['api_link'], { select: ['id', this.apiOptionText], id: value }, (response) => {
            alert('ya b')
            text = response['data'][this.apiOptionText]
            this.setOptions([{ text: text, value: value }])
            this.text = !this.text
          })
        }else if(this.source === 'centralized'){
          this.config['fetch_options'](null, value, (newOption) => { // search word, id, callback
            text = newOption['text']
            this.setOptions([{ text: text, value: value }])
            this.text = !this.text
          })
        }
      }
      if(value && typeof this.options[this.optionValueLookUp[value]] === 'undefined'){
        // console.log('Not text but has value', value, this.optionValueLookUp[value], this.options)
      }

      return { text: text, value: value }
    }
  },
  watch: {
  }
})
export default input.generate()
</script>
<style>
  .component-form-input-type-select-2 .v-select .vs__dropdown-toggle{
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .component-form-input-type-select-2 .v-select.hasError .vs__dropdown-toggle{
    border: red solid 0.04em!important;
    border-radius: 0.25em!important;
  }
  .component-form-input-type-select-2 .invalid-feedback.hasError{
    display: block
  }
</style>

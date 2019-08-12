<template>
  <div>
    <form class="">
      <input-group @data-removed="removeData" @data-changed="dataChanged" @has-field-default-value="setFieldDeaultValue" :config="fieldGroup" :form-data="formData" :validation-message="validationMessages"/>
    </form>
    <slot name="additionalFormField" v-bind:formData="formData"></slot>
  </div>
</template>
<script>
import Vue from 'vue'
import TextHelper from '@/vue-web-core/helper/text-transform.js'
import InputGroup from './InputGroup'
import APIUtil from '@/vue-web-core/helper/api/util.js'

export default {
  name: 'FormComponent',
  components: {
    InputGroup
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    mode: String,
    validationMessages: Object
  },
  data(){
    return {
      fieldDefaultValue: {},
      fieldGroup: {},
      formData: {},
      validationMessageList: {},
      fieldList: [],
      onDataChangeListener: [],
      isDeleteFormData: false,
      getFormDataHook: null
    }
  },
  mounted(){
    this.initConfig()
  },
  methods: {
    _getFormData(toArray = false){
      let cleanedFormData = {}
      for(let key in this.formData){
        if(key.indexOf('last_array_key') === -1 && key.indexOf('deleted_array_key') === -1 && key.indexOf('array_key_list') === -1 && this.formData[key] !== 'NULL'){
          cleanedFormData[key] = this.formData[key]
        }
      }
      let formData = toArray ? APIUtil.textKeyToArray(cleanedFormData) : cleanedFormData
      if(this.getFormDataHook){
        formData = this.getFormDataHook(formData)
      }
      return formData
    },
    _getFieldList(){
      return this.fieldList
    },
    _fillFormData(data){
      this.formData = APIUtil.arrayToTextKey(data)
    },
    dataChanged(index, value){
      Vue.set(this.formData, index, value)
      // TODO call back change
      for(let x = 0; x < this.onDataChangeListener.length; x++){
        let result = this.onDataChangeListener[x](index, this.formData)
        if(result){
          if(this.isset(result, 'validation_message')){
            this.validationMessageList = { ...this.validationMessageList, ...result['validation_message'] }
          }
        }
      }
      // TODO validation
    },
    setFieldDeaultValue(index, value){
      Vue.set(fieldDefaultValue, index, value)
    },
    removeData(formDataField){ // remove array data base on the given formDataField
      for(let field in this.formData){
        if(field.indexOf(formDataField) === 0){
          Vue.delete(this.formData, field)
        }
      }
    },
    initConfig(){
      this.onDataChangeListener = []
      if(typeof this.config['hooks'] !== 'undefined'){
        this.getFormDataHook = typeof this.config['hooks']['get_form_data'] !== 'undefined' ? this.config['hooks']['get_form_data'] : null
      }
      this.fieldGroup = this.initField(this.config)
      setTimeout(() => {
        this.$emit('form-ready')
      }, 100)
    },
    initField(group){
      let setting = Object.assign({}, group)
      this.setDefault(setting, 'type', 'normal')
      this.setDefault(setting, 'default_label_col_span', 4)
      this.setDefault(setting, 'default_label_style_class', '')
      this.setDefault(setting, 'field_col_style', '')
      this.setDefault(setting, 'col', 12)
      for(let field in group['fields']){ // init fields
        if(this.isset(group['fields'][field], 'fields')){ // it is a group
          group['fields'][field] = this.initField(group['fields'][field])
        }else{
          let fieldSetting = group['fields'][field]
          fieldSetting['index'] = field
          this.setDefault(fieldSetting, 'name', TextHelper.toPhrase(field))
          this.setDefault(fieldSetting, 'db_name', field)
          this.setDefault(fieldSetting, 'placeholder', fieldSetting['name'])
          this.setDefault(fieldSetting, 'type', 'text')
          this.setDefault(fieldSetting, 'label_col_span', fieldSetting['type'] !== 'label' ? setting['default_label_col_span'] : 12)
          this.setDefault(fieldSetting, 'label_style', setting['default_label_style'])
          this.setDefault(fieldSetting, 'field_col_style_class', setting['field_col_style_class'])
          if(this.isset(fieldSetting, 'on_form_data_change')){
            this.onDataChangeListener.push(fieldSetting['on_form_data_change'])
          }

          // TODO should handle config defaults
          this.setDefault(fieldSetting, 'config', {})
          // TODO dont include plurals because its foreign table. It should be added manually in the request parameter
          this.fieldList.push(fieldSetting['db_name'])
        }
      }
      return setting
    }
  },
  watch: {
    config(){
      this.initConfig()
    },
    validationMessages(newData){
      this.validationMessageList = newData
    }
  }
}
</script>
<style>

</style>

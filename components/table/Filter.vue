<template>
  <div class="row mb-2">
    <template v-if="hasFilter">
      <div class="col-12 col-lg-10">
        <form-component ref="form" @form-ready="formReady" :config="formConfig"  />
      </div>
      <div class="col-12 col-lg-2 text-center">
        <button @click="_filter" class="btn btn-outline-secondary"> <fa :icon="'filter'" />Filter</button>
      </div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import FormComponent from '@/vue-web-core/components/form/Form'
export default{
  name: 'TableFilter',
  components: {
    FormComponent
  },
  props: {
    config: Object
  },
  data(){
    return {
      formConfig: {},
      formClauses: {},
      hasFilter: false
    }
  },
  methods: {
    _initConfig(config){
      if(typeof config !== 'undefined'){
        this.formConfig = config['form_field_setting']
        this.hasFilter = true
        this.generateFormClause()
        setTimeout(() => {
          this.$emit('ready', true)
          if(typeof readyCallback !== 'function'){
            readyCallback()
          }
        }, 300)
      }else{
        this.$emit('ready', true)
      }
    },
    generateFormClause(){
      for(let x in this.formConfig['fields']){
        Vue.set(this.formClauses, x, typeof this.formConfig['fields'][x]['clause'] === 'undefined' ? '=' : this.formConfig['fields'][x]['clause'])
      }
    },
    formReady(){
    },
    _filter(){
      let conditionParameter = []
      if(this.hasFilter){
        let formData = this.$refs.form._getFormData()
        for(let x in formData){
          switch(this.formClauses[x]){
            case 'like':
              conditionParameter.push({
                column: x,
                clause: 'like',
                value: '%' + formData[x] + '%'
              })
              break
            default:
              conditionParameter.push({
                column: x,
                value: formData[x]
              })
          }
        }
      }

      this.$emit('filter', conditionParameter)
    },
  },
  mounted(){
  },
  watch: {
    formConfig(newData){

    }
  }

}
</script>

<template>
  <div>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div v-bind:class="typeof config['form_setting']['modal_size'] !== 'undefined' ? 'modal-' + config['form_setting']['modal_size'] : ''" class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{config['module_name']}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="formMessage.type" class="text-center mt-3 mb-5">
              <span v-bind:class="'alert-' + formMessage.type" class="alert" role="alert">
                <fa v-bind:icon="formMessage.type === 'success' ? 'check-circle' : 'exclamation-circle'" />
                {{formMessage.message}}
              </span>
              <br>
            </div>
            <form-component ref="form" @form-ready="formReady" :config="formConfig" :validation-messages="validationMessages" >
              <template v-slot:additionalFormField="slotProps">
                <slot name="additionalFormField" v-bind:formData="slotProps.formData"></slot>
              </template>
            </form-component>
          </div>
          <div class="modal-footer">
            <span v-if="isLoading">
              {{loadingMessage}}
            </span>
            <template v-else-if="isVerifyDelete">
              <span class="mr-3">Are you sure you want to <b class="text-danger">DELETE?</b></span>
              <button @click="deleteForm" type="button" class="btn btn-outline-danger">Yes</button>
              <button @click="isVerifyDelete = false" type="button" class="btn btn-outline-dark">No</button>
            </template>
            <template v-else>
              <button @click="isVerifyDelete = true" v-if="currentMode === 'update'" type="button" class="btn btn-sm btn-outline-danger mr-auto" ><fa :icon="'trash-alt'" /> Delete</button>
              <button @click="closeForm" type="button" class="btn btn-sm btn-outline-dark" >Close</button>
              <button @click="save" type="button" class="btn btn-success"><fa :icon="'check'" /> {{currentMode === 'create' ? 'Create' : 'Update'}}</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
// import TextHelper from '@/vue-web-core/helper/text-transform.js'
import FormComponent from '@/vue-web-core/components/form/Form'
import ResponseUtil from '@/vue-web-core/helper/api/response-util.js'
import APIUtil from '@/vue-web-core/helper/api/util.js'

export default {
  name: 'Table',
  components: {
    FormComponent
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.initConfig()
  },
  data(){
    return {
      currentMode: 'create', // create, view, edit
      formConfig: {},
      isVerifyDelete: false,
      validationMessages: {},
      isLoading: false,
      loadingMessage: '',
      formMessage: {
        type: null,
        message: null
      },
      selectParameter: {},
      formOpenListener: null,
      formResetListener: null
    }
  },
  methods: {
    save(){
      this.saveForm()
    },
    formReady(){
      this.selectParameter = APIUtil.generateSelecParameter(this.$refs.form._getFieldList())
    },
    showForm(id){
      this.resetForm()
      this.isLoading = true
      this.loadingMessage = 'Asking data from the server... please wait...'
      let parameter = this.config['form_setting']['retrieve_parameter']
      parameter['id'] = id
      if(this.isset(parameter, 'select')){
        parameter.select = { ...parameter.select, ...this.selectParameter }
      }else{
        parameter.select = this.selectParameter
      }
      this.apiRequest(this.config['api'] + '/retrieve', parameter, (response) => {
        this.$refs.form._fillFormData(response.data)
        this.openViewModal()
        this.isLoading = false
      }, (errorResponse) => {
      })
    },
    saveForm(){
      this.isLoading = true
      this.loadingMessage = 'Talking to the server... please wait...'
      this.validationMessages = {}
      Vue.set(this.formMessage, 'type', null)
      Vue.set(this.formMessage, 'message', null)
      let formDataRaw = this.$refs.form._getFormData()
      let formData = APIUtil.textKeyToArray(formDataRaw)
      let link = this.config['api'] + '/update'
      if(this.currentMode === 'create'){
        link = this.config['api'] + '/create'
      }
      this.apiRequest(link, formData, (response) => {
        this.showForm(response.data.id)
        Vue.set(this.formMessage, 'type', 'success')
        Vue.set(this.formMessage, 'message', 'Saved successfully!')
        this.isLoading = false
        let savedData = formDataRaw
        if(this.currentMode === 'create'){
          savedData = { ...{ id: response.data.id }, ...formDataRaw }
        }
        this.$emit('form-save', savedData)
      }, (errorResponse) => {
        if(errorResponse.error.code === 1){
          let errorMessages = errorResponse.error.message
          for(let error in errorMessages){
            let messageText = ''
            for(let x = 0; x < errorMessages[error].length; x++){
              // TODO apply convertMessage
              // messageText += ResponseUtil.convertMessage(errorMessages[error][x]) + '.'
              messageText += errorMessages[error][x]
            }
            Vue.set(this.validationMessages, error, { type: 'error', message: messageText })
          }
        }
        this.isLoading = false
      })
    },
    deleteForm(){
      this.isLoading = true
      this.loadingMessage = 'Talking to the server... please wait...'
      this.validationMessages = {}
      this.apiRequest(this.config['api'] + '/delete', { id: this.$refs.form._getFormData().id }, (response) => {
        Vue.set(this.formMessage, 'type', 'success')
        Vue.set(this.formMessage, 'message', 'Deleted successfully!')
        this.$emit('form-deleted')
        this.isVerifyDelete = false
        setTimeout(() => {
          $(this.$refs.modal).modal('hide')
          this.isLoading = false
        }, 1000)
      }, (errorResponse) => {
        if(errorResponse.error.code === 1){
          let errorMessages = errorResponse.error.message
          for(let error in errorMessages){
            let messageText = ''
            for(let x = 0; x < errorMessages[error].length; x++){
              messageText += ResponseUtil.convertMessage(errorMessages[error][x]) + '.'
            }
            Vue.set(this.validationMessages, error, { type: 'error', message: messageText })
          }
        }else{
          Vue.set(this.formMessage, 'type', 'danger')
          Vue.set(this.formMessage, 'message', errorResponse.error.message)
        }
        this.isLoading = false
      })
    },
    resetForm(){
      Vue.set(this.formMessage, 'type', null)
      Vue.set(this.formMessage, 'message', null)
      this.isLoading = false
      this.isVerifyDelete = false
      this.$refs.form._fillFormData({})
      this.validationMessages = {}
      if(this.formResetListener){
        this.formResetListener()
      }
    },
    openCreateModal(){
      if(this.currentMode !== 'create'){
        this.resetForm()
      }
      this.currentMode = 'create'
      $(this.$refs.modal).modal({ backdrop: 'static', keyboard: false })
    },
    openViewModal(){
      this.currentMode = 'update'
      $(this.$refs.modal).modal({ backdrop: 'static', keyboard: false })
      setTimeout(() => {
        if(this.formOpenListener){
          this.formOpenListener()
        }
      }, 300)
    },
    closeForm(){
      $(this.$refs.modal).modal('hide')
    },
    initConfig(){
      this.formConfig = this.config['form_setting']['form_field_setting']
      if(typeof this.config['form_setting']['listeners'] !== 'undefined'){
        this.formOpenListener = typeof this.config['form_setting']['listeners']['form_open'] !== 'undefined' ? this.config['form_setting']['listeners']['form_open'] : nulll
        this.formResetListener = typeof this.config['form_setting']['listeners']['form_reset'] !== 'undefined' ? this.config['form_setting']['listeners']['form_reset'] : nulll
      }
      this.setDefault(this.config, 'retrieve_parameter', {})
    }

  }
}
</script>
<style>

</style>

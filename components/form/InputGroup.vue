<template>
  <div>
    <div v-if="config['type'] === 'normal'">
      <div class="row">
        <template v-for="field in config['fields']">
          <div v-bind:class="typeof field['col'] === 'undefined' ? 'col-12' : 'col-' + field['col']">
            <input-type v-if="field['type'] === 'hidden'" :type="'hidden'" :index="field['index']"  @data-changed="formDataChanged"  :config="field['config']" :default-value="field['default_value']" :placeholder="field['placeholder']" :form-data="formData"  />
            <div v-else class="form-group row">
              <label v-if="field['label_col_span']" v-bind:class="('col-' + field['label_col_span']) + ' ' + field['label_style']" class="col-form-label text-wrap">{{field['name']}}</label>
              <div v-bind:class="'col-' + ((12 - field['label_col_span']) || field['label_col_span']) +' '+ field['field_col_style_class']">
                <!-- <template v-if="field['type'] === 'text'">
                  <input @change="$emit('data-changed', field['index'], $event.target.value)" v-bind:value="formData[field['index']]"  v-bind:name="field['index']" v-bind:class="getValidationErrorType(field)" v-bind:placeholder="field['placeholder']" type="text" class="form-control"  />
                  <div v-bind:class="getValidationErrorType(field) === 'is-invalid'? 'invalid-feedback' : 'valid-feedback'">
                    {{isset(validationMessage, field['index']) ? validationMessage[field['index']]['message'] : ''}}
                  </div>
                </template> -->
                <template v-if="field['type'] === 'password'">
                  <input @change="$emit('data-changed', field['index'], $event.target.value)" v-bind:value="formData[field['index']]" v-bind:name="field['index']"  v-bind:class="getValidationErrorType(field)" v-bind:placeholder="field['placeholder']" type="password" class="form-control" />
                  <div v-bind:class="getValidationErrorType(field) === 'is-invalid'? 'invalid-feedback' : 'valid-feedback'">
                    {{isset(validationMessage, field['index']) ? validationMessage[field['index']]['message'] : ''}}
                  </div>
                </template>
                <input-type v-else @data-removed="$emit('data-removed', $event)" @data-changed="formDataChanged" :validation-message="validationMessage" :type="field['type']" :index="field['index']"  :config="field['config']" :default-value="field['default_value']" :placeholder="field['placeholder']" :form-data="formData"  />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
// import InputGroup from './InputGroup.vue'
import InputType from './InputType/InputType.vue'
export default {
  name: 'InputGroup',
  components: {
    // InputGroup,
    InputType
  },
  props: {
    config: Object,
    formData: Object,
    validationMessage: Object
  },
  methods: {
    hasDefaultValue(field){
      if(typeof field['default_value'] !== 'undefined' && typeof this.formData[field['index']] !== 'undefined'){
        this.hasFieldDefaultValue(field['index'], field['default_value'])
      }
    },
    getValidationErrorType(field){
      let validation = this.isset(this.validationMessage, field['index'])
      if(validation){
        if(validation['type'] === 'error'){
          return 'is-invalid'
        }else if(validation['type'] === 'success'){
          return 'is-valid'
        }
      }else{
        return ''
      }
    },

    hasFieldDefaultValue(index, value){
      this.$emit('has-field-default-value', index, value)
    },
    formDataChanged(index, value){
      this.$emit('data-changed', index, value)
    }
  },
  watch: {
    formData(data){
    }
  }
}
</script>

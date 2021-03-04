<template>
  <div>
    <!-- <input v-bind:value="value" type="date"> -->
    {{dpValue}}
    <date-picker ref="datepicker" @dp-change="dateChanged" :name="placeholder" :placeholder="placeholder" :value="dpValue !== null ? new Date(dpValue) : null" :config="datepickerConfig" :readOnly="readOnly"/>
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
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import DatePicker from 'vue-bootstrap-datetimepicker'
export default {
  mixins: [InputTypeMixIn],
  name: 'DateInput',
  components: {
    DatePicker
  },
  data(){
    return {
      datepickerConfig: {
        format: 'MMM D, YYYY',
        useCurrent: true
      }
    }
  },
  methods: {
    dateChanged(date){
      if(date.date && (new Date(date.date)).getFullYear > 1970){
        this.$emit('data-changed', this.index, this.serverDatetimeFormat(date.date))
      }else{
        this.$emit('data-changed', this.index, null)
      }
    },
  },
  computed: {
    dpValue(){
      let value = null
      if(typeof this.formData[this.index] === 'undefined' || this.formData[this.index] === null){
        // this.$emit('data-changed', this.index, this.defaultValue)
        value = this.defaultValue ? this.defaultValue : null
      }else{
        value = this.formData[this.index]
      }
      return value
    }
  }
}
</script>

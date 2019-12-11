<template>
  <div>
    <!-- <input v-bind:value="value" type="date"> -->
    <date-picker ref="datepicker" @dp-change="dateChanged" :name="placeholder" :placeholder="placeholder" :value="dpValue !== null ? new Date(dpValue) : null" :config="datepickerConfig"/>
  </div>
</template>
<script>
import InputType from './InputTypeCore.js'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import DatePicker from 'vue-bootstrap-datetimepicker'
let input = new InputType({
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
      if(date.date){
        this.$emit('data-changed', this.index, this.serverDatetimeFormat(date.date))
      }
    },
  },
  computed: {
    dpValue(){
      let value = null
      if(typeof this.formData[this.index] === 'undefined' || this.formData[this.index] === null){
        this.defaultValue = this.defaultValue ? this.defaultValue : null
        // this.$emit('data-changed', this.index, this.defaultValue)

        value = this.defaultValue
      }else{
        value = this.formData[this.index]
      }
      if(value === null){
        // console.log('clearing',$(this.$refs.datepicker), $(this.$refs.datepicker).datetimepicker('DateTimePicker').clear())
        // $(this.$refs.datepicker)[0].clear()
      }
      return value
    }
  },
  mounted(){
  }
})
export default input.generate()
</script>

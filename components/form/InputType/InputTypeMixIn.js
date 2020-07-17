import ObjectHelper from '@/vue-web-core/helper/object.js'

export default {
  props: {
    config: { type: Object, required: false },
    validationMessage: Object,
    index: String,
    formData: Object,
    placeholder: String,
    helpText: String,
    defaultValue: {
      type: [Number, String],
      default: null
    }
  },
  mounted(){
    this._initCore()
  },
  computed: {
    value(){
      let value
      // if(typeof this.valueTrigger !== 'undefined'){
      //   this.valueTrigger
      // }
      if(typeof this.formData[this.index] === 'undefined' || (this.formData[this.index] === null && this.defaultValue !== null)){
        this.defaultValue = this.defaultValue ? this.defaultValue : null
        value = this.defaultValue
        if(typeof this.dataChanged !== 'undefined'){
          this.dataChanged(this.defaultValue)
        }else{
          this.$emit('data-changed', this.index, this.defaultValue)
        }
      }else{
        value = this.formData[this.index]
      }
      // if(typeof this.config['yawa'] !== 'undefined'){
      if(typeof this.config['value_listener'] !== 'undefined'){
        this.config['value_listener'](value)
      }
      return value
    }
  },
  watch: {
    formData(newData){
      if(typeof this.valueTrigger !== 'undefined'){
        this.valueTrigger = !this.valueTrigger
      }
    },
  },
  methods: {
    _reset(){

    },
    _initCore(){
      if(this.index === 'permanent_address.country') {
        this.$nextTick(() => {
          if(typeof this.config['value_setter'] !== 'undefined'){
            let defaultValueSetter = (newValue) => { // value_setter means get the value setter function
              this.$emit('data-changed', this.index, newValue)
            }
            this.config['value_setter'](defaultValueSetter)
          }
        })
      }
    }
  }
}

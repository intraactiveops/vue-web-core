import ObjectHelper from '@/vue-web-core/helper/object.js'

export default class InputType{
  inputProperties = {}
  defaultPropoerties = {
    props: {
      config: {type: Object, required: false},
      validationMessage: Object,
      index: String,
      formData: Object,
      placeholder: String,
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
        if(typeof this.valueTrigger !== 'undefined'){
          this.valueTrigger

        }
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
        this.$nextTick(() => {
          if(typeof this.config['get_setter'] !== 'undefined'){
            this.config['get_setter']((newValue) => {
              this.$emit('data-changed', this.index, newValue)
            })
          }
        })
      }
    }
  }
  constructor(inputProperties){
    this.inputProperties = inputProperties
  }
  generate(){
    return ObjectHelper.mergeDeep( this.defaultPropoerties, this.inputProperties)
  }
}
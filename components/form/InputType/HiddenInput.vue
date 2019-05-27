<template>
  <div>
    <input type="hidden" v-bind:value="value">
  </div>
</template>
<script>


  import InputType from './InputTypeCore.js'
  let input = new InputType({
    name: "HiddenInput",
    data(){
        return {
          inputValue: null
        }
    },
    mounted(){
      this.init()
    },
    methods: {
      valueChanger(newValue){

      },
      init(){
        this.inputValue = this.value
        if(typeof this.config['getValueChanger'] !== 'undefined'){
          this.config['getValueChanger']((newValue) => {
            this.inputValue = newValue
            this.$emit('data-changed', this.index, newValue)
          })
        }
      }
    }
  })
  export default input.generate()
</script>
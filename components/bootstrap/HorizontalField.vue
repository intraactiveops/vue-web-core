<template>
  <div v-bind:class="classes" class="form-group row">
    <label v-bind:class="labelCol + ' ' + labelClasses" class="col-form-label text-wrap text-right">{{label}} : </label>
    <div v-bind:class="inputCol">
      <slot name="input">
      </slot>
      <div class="invalid-feedback">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        default: null
      },
      labelCol: {
        type: String,
        default: 'col-4'
      },
      labelClasses: {
        type: String,
        default: ''
      },
      classes: {
        type: String,
        default: ''
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.init()
      })
    },
    data(){
      return {
      }
    },
    methods: {
      init(){

      }
    },
    computed: {
      inputCol(){
        let inputCol = ''
        if(this.labelCol){
          let labelColStringSegment = this.labelCol.split(' ')
          for(let x = 0; x < labelColStringSegment.length; x++){
            let colSegnment = labelColStringSegment[x].split('-')
            if(colSegnment.length === 2){
              inputCol += colSegnment[0] + '-' + (12 - colSegnment[1]) + ' '
            }else if(colSegnment.length === 3){
              inputCol += 'col-' + colSegnment[1] + '-' + (12 - colSegnment[2]) + ' '
            }
          }
        }else{
          inputCol = 'col-12'
        }
        return inputCol
      }
    }
  }
</script>

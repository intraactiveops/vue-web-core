<template>
    <!-- {{angles[currentAngleIndex] && angles[currentAngleIndex] <= 360 ? angles[currentAngleIndex] + '' : '360'}} -->
    <fa :icon="icon" :rotation="angles[currentAngleIndex] && angles[currentAngleIndex] <= 360 ? angles[currentAngleIndex] + '' : null" />
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    angles: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 1000
    },
    animate: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      intervalTimer: false,
      currentAngleIndex: 0
    }
  },
  mounted(){
    if(this.animate){
      this.doAnimate()
    }
  },
  methods: {
    doAnimate(){
      this.currentAngleIndex = 0
      this.intervalTimer = setInterval(() => {
        if(this.currentAngleIndex < this.angles.length - 1){
          this.currentAngleIndex++
        }else{
          this.currentAngleIndex = 0
        }
      }, this.interval)
    },
    stopAnimation(){
      clearInterval(this.intervalTimer)
    }
  },
  watch: {
    animate(newValue){
      if(newValue){
        this.doAnimate()
      }else{
        this.stopAnimation()
      }
    }
  },
  destroy(){
    clearInterval(this.intervalTimer)
  }
}
</script>

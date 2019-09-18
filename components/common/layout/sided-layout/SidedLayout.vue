<template>
  <div ref="layout">
    <div v-bind:class="leftSideBarActive ? 'active' : ''" class="leftSideBar pr-1" >
      <header-menu />
      <slot name="leftSide">
      </slot>
    </div>
    <div class="body px-1" style=" float:left">
      <slot name="body">
      </slot>
    </div>
    <div v-bind:class="rightSideBarActive ? 'active' : ''" class="rightSideBar pl-1"  >
      <div class="card w-100 mt-2">
        <h6 class="card-header bg-white p-2 font-weight-bold">Networks</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item py-1 px-2">Public</li>
          <li class="list-group-item py-1 px-2">Deliotte</li>
          <li class="list-group-item py-1 px-2">Department of State</li>
          <li class="list-group-item py-1 px-2">Kirkland & Elis</li>
          <li class="list-group-item py-1 px-2">NOVA Health</li>
        </ul>
      </div>
      <slot name="rightSide">
      </slot>
    </div>
  </div>
</template>
<script>
import HeaderMenu from './Header'
import Swipe from '@/vue-web-core/helper/swipe.js'
export default {
  components: {
    HeaderMenu
  },
  data(){
    return {
      leftSideBarActive: false,
      rightSideBarActive: false
    }
  },
  mounted(){
    let swiper = new Swipe(this.$refs.layout);
    swiper.onLeft(() => {
      console.log('hey')
      if(this.leftSideBarActive){
        this.leftSideBarActive = false
      }else{
        this.rightSideBarActive = true
      }
    })
    swiper.onRight(() => {
      console.log('ho')
      if(this.rightSideBarActive){
        this.rightSideBarActive = false
      }else{
        this.leftSideBarActive = true
      }
    })
    swiper.run()
  },
  watch: {
    leftSideBarActive(newData){
      this.$emit('left-side-bar-toggled', newData)
    },
    rightSideBarActive(newData){
      this.$emit('right-side-bar-toggled', newData)
    }
  }
}
</script>
<style scoped>
  .leftSideBar{
    float:left;
  }
  .rightSideBar{
    float:left;
    width: 250px;
  }
  @media only screen and (max-width: 750px){
    .leftSideBar{
      display: none;
      width: 70%;
      webkit-box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.15) !important;
      box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.15) !important;
    }
    .rightSideBar{
      width: 70%;
      webkit-box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.15) !important;
      box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.15) !important;
    }
    .leftSideBar.active{
      display: block;
      position: absolute;
      background-color: white;
      z-index: 20
    }
    .rightSideBar.active{
      display: block;
      position: absolute;
      background-color: white;
      z-index: 20;
      min-height: 100%;
      margin-left: calc(100% - 250px)
    }
    .body{
      width: 100%
    }
  }
  @media only screen and (min-width: 751px) {
    .leftSideBar{
      width: 250px
    }
  }
  @media only screen and (min-width: 751px) and (max-width: 1000px){
    .leftSideBar{
      margin-left: calc((100% - 750px) / 2)
    }
    .body{
      width: calc(100% - 250px - calc((100% - 750px) / 2) * 2)
    }
  }
  @media only screen and (max-width: 1000px){
    .rightSideBar{
      display: none;
    }
  }
  @media only screen and (min-width: 1001px){
    .leftSideBar{
      margin-left: calc((100% - 1000px) / 2)
    }
    .body{
      width:500px;
    }
  }
</style>
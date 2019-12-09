<template>
  <div ref="layout">
    <div v-bind:class="leftSideBarActive ? 'active' : ''" class="leftSideBar pr-1" >
      <div  style="position:fixed; width:250px" class="">
        <left-side-menu v-if="leftSideMenuOn"></left-side-menu>
      </div>
      &nbsp;
    </div>
    <div class="body px-1" style="float:left; min-height: 20px">
      <slot name="body">
      </slot>
    </div>
    <div v-bind:class="rightSideBarActive ? 'active' : ''" class="rightSideBar "  >
      <div style="position:fixed; width:250px; z-index:1">
        <right-side-menu v-if="rightSideMenuOn"></right-side-menu>
      </div>
      <!-- &nbsp; -->
    </div>
  </div>
</template>
<script>
import Swipe from '@/vue-web-core/helper/swipe.js'
import LeftSideMenu from './side-menu-components/LeftSideMenu'
import RightSideMenu from './side-menu-components/RightSideMenu'

export default {
  components: {
    LeftSideMenu,
    RightSideMenu
  },
  props: {
    leftSideMenuOn: Boolean,
    rightSideMenuOn: Boolean
  },
  data(){
    return {
      leftSideBarActive: false,
      rightSideBarActive: false,
    }
  },
  mounted(){
    let swiper = new Swipe(this.$refs.layout)
    swiper.onLeft(() => {
      if(this.leftSideBarActive){
        this.leftSideBarActive = false
      }else{
        this.rightSideBarActive = true
      }
    })
    swiper.onRight(() => {
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
    },
    $route: (to, from) => {
      // console.log('route', this.$route.name)
      // this.currentRouteName = to.$route.name.toLowerCase()
    }
  },

}
</script>
<style scoped lang="scss">
  $leftSidebarFixedWidth: 250px;
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
      width: $leftSidebarFixedWidth
    }
    .body{
      // margin-left: $leftSidebarFixedWidth
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

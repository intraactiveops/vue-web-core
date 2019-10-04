<template>
  <div ref="layout">
    <div v-bind:class="leftSideBarActive ? 'active' : ''" class="leftSideBar pr-1" >

      <div  style="position:fixed; width:250px" class="">
        <header-menu />
        <side-menu-container v-if="currentRouteName !== 'channel'" name="Channels" :keep-on="currentRouteName === 'channel'">
          <template v-slot:body>
            <channel-list-menu  />
          </template>
        </side-menu-container>
        <slot name="leftSide">
        </slot>
      </div>
      &nbsp;
    </div>
    <div class="body px-1 pt-2" style=" float:left">
      <slot name="body">
      </slot>
    </div>
    <div v-bind:class="rightSideBarActive ? 'active' : ''" class="rightSideBar pl-1 pt-1"  >
      <div style="position:fixed; width:250px">
        <right-side-menu-header />
        <side-menu-container name="Networks">
          <template v-slot:body>
            <network-menu  />
          </template>
        </side-menu-container>
      </div>
      <slot name="rightSide">
      </slot>
      &nbsp;
    </div>
  </div>
</template>
<script>
import HeaderMenu from './Header'
import Swipe from '@/vue-web-core/helper/swipe.js'
import RightSideMenuHeader from './RightSideMenu.vue'
import SideMenuContainer from './side-menus/SideMenuContainer'
import NetworkMenu from './side-menus/NetworkMenu.vue'
import ChannelListMenu from '@/views/channel/channel_list/ChannelList'
export default {
  components: {
    HeaderMenu,
    SideMenuContainer,
    RightSideMenuHeader,
    NetworkMenu,
    ChannelListMenu
  },
  data(){
    return {
      leftSideBarActive: false,
      rightSideBarActive: false,
      // currentRouteName: ''
    }
  },
  mounted(){
    let swiper = new Swipe(this.$refs.layout);
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
      console.log('route', this.$route.name)
      // this.currentRouteName = to.$route.name.toLowerCase()
    }
  },
  computed: {
    currentRouteName(){
      return this.$route.name.toLowerCase()
    }
  }
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
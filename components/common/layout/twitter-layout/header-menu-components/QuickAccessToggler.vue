<template>
  <div>
    <div class="text-center w-100 bg-whitesmoke p-1 mb-2 rounded font-weight-bold">Quick Access Menu</div>
    <label class="w-100 pb-0">
      <template v-for="(menuItem, menuName) in menus">
        <div @click.self="menuToggle(menuName)" class="w-100 mb-2 c-pointer">
          <fa  :icon="menu[menuName] ? 'check' : 'minus'" class="mr-2" /> <fa :icon="menuItem['icon']" /> {{menuItem['text']}} <span  v-if="menuItem['bubble']" class="badge badge-pill badge-danger">{{menuItem['bubble']}}</span>
        </div>
      </template>
    </label>
  </div>
</template>
<script>
import SideMenuStore from '../side-menu-components/side-menu-store.js'
export default{
  mounted(){
    this.reloadSetting()
  },
  data(){
    return {
      menus: {
        dailyEvent: {
          text: 'Today\'s Event',
          icon: 'calendar-day',
          bubble: 0
        },
        channel: {
          text: 'Media Exchange',
          icon: 'envelope',
          bubble: 0
        },
        activity: {
          text: 'Activity',
          icon: 'calendar-week',
          bubble: 0
        },
        project: {
          text:'Projects',
          icon: 'project-diagram',
          bubble: 0
        },
        following: {
          text: 'Following',
          icon: 'user-check',
          bubble: 0
        },
        network: {
          text: 'Network',
          icon: 'tv',
          bubble: 0
        },
        contact: {
          text: 'Contacts',
          icon: 'address-book',
          bubble: 0
        }
      }
    }
  },
  methods: {
    reloadSetting(){
      let savedSetting
      if(savedSetting = localStorage.getItem('side_menu_setting')){
        let sideMenuSetting = JSON.parse(savedSetting)
        SideMenuStore.commit('reset', sideMenuSetting)
      }
    },
    menuToggle(menu){
      console.log('menu changed', menu)
      SideMenuStore.commit('toggleMenu', menu)
    }
  },
  computed: {
    menu(){
      return SideMenuStore.state
    }
  }
}
</script>

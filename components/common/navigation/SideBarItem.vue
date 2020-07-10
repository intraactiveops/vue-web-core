<template>
  <div>
    <li  v-for="menu in menus">
      <router-link v-if="menu['sub_item'] === null" v-on:click="linkClicked" :to="generateLink(menu)">
        <div v-on:click="linkClicked" style="width:100%">
          <fa v-bind:icon="menu['icon']" /> {{menu['name']}}
        </div>
      </router-link>
      <template v-else>
        <a v-bind:href="'#'+ ((menu['name']).replace(/ /g, '_')) + 'SideBarItem'" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
          <fa :icon="menu['icon']" /> {{menu['name']}}
        </a>
        <ul class="subMenu collapse list-unstyled pl-3" v-bind:id="((menu['name']).replace(' ', '_'))  + 'SideBarItem'">
          <template v-for="subItem in menu['sub_item']">
            <li @click="linkClicked">
              <router-link v-if="subItem['sub_item'] === null"  :to="generateLink(subItem)">
                <fa v-bind:icon="subItem['icon']" /> {{subItem['name']}}
              </router-link>
            </li>
          </template>
        </ul>
      </template>
    </li>
  </div>
</template>
<script>
import User from '@/vue-web-core/system/store'
export default{
  name: 'SideBarItem',
  props: {
    items: Array
  },
  mounted(){
  },
  data(){
    return {
      menus: [],
    }
  },
  methods: {
    isTerminal(){
      return localStorage.getItem('is_terminal')
    },
    linkClicked(){
      this.$emit('link-clicked')
    },
    _initialize(){
      this.menus = []
      this.menus = this.initItems(JSON.parse(JSON.stringify(this.items)))
      return this.menus.length
    },
    initItems(items){
      let newItems = []
      for(let item in items){
        let newItem = items[item]
        if(!this.hasRoleAccessList(newItem)){
          continue
        }
        newItem['route'] = (typeof newItem['route'] === 'undefined') ? '/' + ((newItem['name']).toLowerCase()).replace(/ /g, '-') : newItem['route']
        newItem['icon'] = (typeof newItem['icon'] === 'undefined') ? 'dot-circle' : newItem['icon']
        newItem['has_offline'] = (typeof newItem['has_offline'] === 'undefined') ? false : newItem['has_offline']
        newItem['not_terminal_link'] = (typeof newItem['not_terminal_link'] === 'undefined') ? false : newItem['not_terminal_link']
        if(typeof newItem['sub_item'] !== 'undefined' && newItem['sub_item'] !== null && (newItem['sub_item']).length){
          newItem['sub_item'] = this.initItems(newItem['sub_item'])
          if(newItem['sub_item'].length){ // only add this menu item if it has one active sub link
            newItems.push(newItem)
          }
        }else{
          newItem['sub_item'] = null
          newItems.push(newItem)
        }
      }
      return newItems
    },
    generateLink(menu){
      let mode = this.mode
      if(menu['not_terminal_link'] && localStorage.getItem('is_terminal') === null){
        if(menu['not_terminal_link'] === true){
          return '/error/terminal-only'
        }else{
          return menu['not_terminal_link']
        }
      }else if(mode === 'offline' && !menu['has_offline']){
        return '/error/online-only'
      }else{
        return menu['route']
      }
    },
    hasRoleAccessList(item){
      if(typeof item['role_access_list'] !== 'undefined'){
        let hasAccess = false
        for(let role in item['role_access_list']){
          if(typeof this.userRoles[role] !== 'undefined'){
            hasAccess = true
          }
        }
        return hasAccess
      }else{
        return true
      }
    }
  },
  computed: {
    mode(){
      return User.state.mode
    },
    userRoles(){
      return User.getters.userRoles
    }
  }
}
</script>
<style scoped>
  .dropdown-toggle[aria-expanded=true]{
    background-color: #66809e;
  }
  .subMenu{
    background-color: #66809e;;
    font-size: 0.95em;
  }
</style>

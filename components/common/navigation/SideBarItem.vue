<template>
  <div>
    <li  v-for="menu in menus">

        <router-link v-on:click="linkClicked" v-if="menu['sub_item'] === null" :to="menu['route']"><div v-on:click="linkClicked" style="width:100%"><fa v-bind:icon="menu['icon']" /> {{menu['name']}}</div></router-link>
        <template v-else>
          <a v-bind:href="'#'+ menu['name'] + 'SideBarItem'" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
            <fa icon="dot-circle" /> {{menu['name']}}
          </a>
          <ul class="subMenu collapse list-unstyled pl-3" v-bind:id="menu['name'] + 'SideBarItem'">
              <li  v-for="subItem in menu['sub_item']">
                <router-link v-if="subItem['sub_item'] === null" :to="subItem['route']"><fa v-bind:icon="subItem['icon']" /> {{subItem['name']}}</router-link>
              </li>
          </ul>
        </template>
    </li>
  </div>
</template>
<script>
export default{
  name: 'SideBarItem',
  props: {
    items: Array
  },
  mounted(){
    this.menus = this.initItems(this.items)
  },
  data(){
    return {
      menus: []
    }
  },
  methods: {
    linkClicked(){
      this.$emit('link-clicked')
    },
    initItems(items){
      let newItems = []
      for(let item in items){
        let newItem = items[item]

        newItem['route'] = (typeof newItem['route'] === 'undefined') ? '/' + ((newItem['name']).toLowerCase()).replace(/ /g, '_') : newItem['route']
        newItem['icon'] = (typeof newItem['icon'] === 'undefined') ? 'dot-circle' : newItem['icon']
        if(typeof newItem['sub_item'] !== 'undefined'){
          newItem['sub_item'] = this.initItems(newItem['sub_item'])
        }else{
          newItem['sub_item'] = null
        }
        newItems.push(newItem)
      }
      return newItems
    }
  }
}
</script>
<style scoped>
  .dropdown-toggle[aria-expanded=true]{
    background-color: #ea9120;
  }
  .subMenu{
    background-color: #ea9120;;
    font-size: 0.95em;
  }
</style>

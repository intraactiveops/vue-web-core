<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item borderless py-1 px-0 ">
      <span class="font-weight-bold">Mine</span>
    </li>
    <li :key="'mine' + index" v-for="(network, index) in mine" class="list-group-item borderless py-1 px-0">
      <router-link :to="'/network/' + network.id">{{ network.name }}<span class=" float-right badge text-white badge-info badge-pill">5</span></router-link>
    </li>
    <li v-if="joined.length > 0" class="list-group-item borderless py-1 px-0">
      <span class="font-weight-bold">Joined</span>
    </li>
    <li :key="'joined' + index" v-for="(network, index) in joined" class="list-group-item borderless py-1 px-0">
      <router-link :to="'/network/' + network.id">{{ network.name }}</router-link>
    </li>
  </ul>
</template>
<script>

import NetworkStore from '@/views/network/network-store'

export default {
  computed: {
    mine() {
      return NetworkStore.state.networks.filter(network => network.mine)
    },
    joined() {
      return NetworkStore.state.networks.filter(network => !network.mine)
    }
  }
}
</script>

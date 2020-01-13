<template>
  <div>
    <small>
      <div class="btn-group ">
        <button type="button" class="btn btn-sm rounded-0 pl-0 py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          IntraComs <fa icon="exchange-alt"/>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <h3 class="dropdown-header">Authorized Exchanges</h3>
          <template v-for="(channel, index) in authorizedChannels">
            <button v-bind:key="index" @click="selectedAuthorizedChannelIndex = index" class="dropdown-item py-1" type="button">
              {{channel['name']}} <fa v-if="selectedAuthorizedChannelIndex === index" icon="check" />
            </button>
          </template>
        </div>
      </div>
    </small>
    <div class="p-0" style="height; 20px; margin-top: -4px">
      <span class="text-primary font-weight-bold text-uppercase">{{authorizedChannels[selectedAuthorizedChannelIndex]['name']}}</span>
    </div>
  </div>
</template>
<script>
import SystemStore from '@/vue-web-core/system/store.js'
export default{
  mounted(){
    SystemStore.commit('setCompanyInformation', { id: this.selectedAuthorizedChannelIndex, name: this.authorizedChannels[this.selectedAuthorizedChannelIndex]['name'] })
  },
  data(){
    return {
      selectedAuthorizedChannelIndex: 0,
      authorizedChannels: [{
        name: 'Personal'
      // }, {
      //   name: 'Deliotte'
      }, {
        name: 'Dept of State'
      // }, {
      //   name: 'Dunlap Bennett & Ludwig'
      // }, {
      //   name: 'NOVA Health'
      }, {
        name: 'SAIC'
      }, {
        name: 'Cyber Command'
      }, {
        name: 'Air Force'
      }, {
        name: 'CBP'
      }, {
        name: 'NIPRNet'
      }, {
        name: 'SIPRNet'
      }, {
        name: 'JWICS'
      }]
    }
  },
  watch: {
    selectedAuthorizedChannelIndex(newData){
      SystemStore.commit('setCompanyInformation', { id: newData, name: this.authorizedChannels[newData]['name'] })
    }
  }
}
</script>

<template>
  <div>
    <small>
      <div class="btn-group ">
        <button type="button" class="btn btn-sm rounded-0 pl-0 py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          IntraComs <fa icon="exchange-alt"/>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <h3 class="dropdown-header">Authorized Exchanges</h3>
          <button v-for="(channel, index) in authorizedChannels" @click="selectedAuthorizedChannelIndex = index" class="dropdown-item py-1" type="button">{{channel['name']}} <fa v-if="selectedAuthorizedChannelIndex === index" icon="check" /></button>
        </div>
      </div>
    </small>
    <div class="p-0" style="height; 20px; margin-top: -4px">
      <span class="text-primary font-weight-bold text-uppercase">{{authorizedChannels[selectedAuthorizedChannelIndex]['name']}}</span>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return {
      selectedAuthorizedChannelIndex: 0,
      authorizedChannels: [{
        name: 'Personal'
      }, {
        name: 'Deliotte'
      }, {
        name: 'Dept of State'
      }, {
        name: 'Dunlap Bennett & Ludwig'
      }, {
        name: 'NOVA Health'
      }]
    }
  }
}
</script>
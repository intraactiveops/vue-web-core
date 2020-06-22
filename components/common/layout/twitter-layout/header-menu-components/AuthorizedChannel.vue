<template>
  <div>
    <small>
      <div class="btn-group ">
        <button type="button" @click="isLoggingIn = false" class="btn btn-sm rounded-0 pl-0 py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="box-shadow:none!important">
          IntraComs <fa icon="exchange-alt"/>
        </button>
        <div :class="isLoggingIn ? 'bg-primary p-3 login show' : ''" class="dropdown-menu dropdown-menu-left mt-3">
          <div @click.stop>
            <div v-show="!isLoggingIn">
              <h3 class="dropdown-header">Authorized Exchanges</h3>
              <template v-for="(channel, index) in authorizedChannels">
                <button  v-bind:key="index" v-on:click="connect(index)" class="dropdown-item py-1" type="button">
                  {{channel['name']}} <fa v-if="selectedAuthorizedChannelIndex === index" icon="check" />
                </button>
              </template>
            </div>
            <div v-show="isLoggingIn">
              <h6 class="d-flex px-0 text-white pb-2">
                <big style="font-size:2.5em"><fa icon="fingerprint" /></big>
                <div class="pl-2">
                  <small>IntraNAX</small> <br> {{authorizedChannels[selectedAuthorizedChannelIndex]['name']}}
                </div>

                </h6>
              <div class="form-row">
                <div class="col-12">
                  <label class="sr-only">Username</label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text bg-info text-white"><fa icon="user" /></div>
                    </div>
                    <input type="text" class="form-control" placeholder="Username">
                  </div>
                </div>
                <div class="col-12">
                  <label class="sr-only">Password</label>
                  <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text bg-info text-white"><fa icon="key" /></div>
                    </div>
                    <input type="text" class="form-control" placeholder="Password">
                  </div>
                </div>
                <div class="col-12">
                  <small class='text-secondary'>Last Login: 01/02/2019 10:10am at One Loudoun(Secured)</small>
                </div>
                <div class="col-12 text-right">
                  <button class="btn btn-sm text-white">Forgot Password?</button>
                  <button type="button" v-on:click="isLoggingIn = false" class="btn btn-info">Log In</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </small>
    <div class="p-0" style="height; 20px; margin-top: -4px">
      <span class="text-primary font-weight-bold text-uppercase">{{authorizedChannels[selectedAuthorizedChannelIndex]['name']}}</span>
    </div>
    <!-- <modal ref="login">
      <template v-slot:body>
        Hello
      </template>
    </modal> -->
  </div>
</template>
<script>
import SystemStore from '@/vue-web-core/system/store.js'
export default{
  components: {
  },
  mounted(){
    SystemStore.commit('setCompanyInformation', { id: this.selectedAuthorizedChannelIndex, name: this.authorizedChannels[this.selectedAuthorizedChannelIndex]['name'] })
  },
  data(){
    return {
      isLoggingIn: false,
      selectedAuthorizedChannelIndex: 0,
      authorizedChannels: [{
        name: 'Personal'
      }, {
        name: 'Customs & Border Protection'
      // }, {
      //   name: 'Dunlap Bennett & Ludwig'
      // }, {
      //   name: 'NOVA Health'
      }, {
        name: 'SAIC'
      }, {
        name: 'Department of State'
      }, {
        name: 'Department of Defense'
      }, {
        name: 'Cyber Command'
      }, {
        name: 'Central Intelligence Agency'
      }, {
        name: 'Defense Intelligence Agency'
      }, {
        name: 'National Security Agency'
      }, {
        name: 'Marines'
      }, {
        name: 'Navy'
      }, {
        name: 'Army'
      }, {
        name: 'Air Force'
      }, {
        name: 'Coast Guard'
      }, {
        name: 'Homeland Security'
      }, {
        name: 'Drug Enforcement Admin'
      }, {
        name: 'Federal Bureau of Invg.'
      }, {
        name: 'NIPRNet'
      }, {
        name: 'SIPRNet'
      }, {
        name: 'JWICS'
      }]
    }
  },
  methods: {
    connect(index){
      this.isLoggingIn = true
      this.selectedAuthorizedChannelIndex = index
    }
  },
  watch: {
    selectedAuthorizedChannelIndex(newData){
      // this.$refs.login._open()
      SystemStore.commit('setCompanyInformation', { id: newData, name: this.authorizedChannels[newData]['name'] })
    }
  }
}
</script>
<style scoped>
  .login{
    min-width: 250px
  }
</style>

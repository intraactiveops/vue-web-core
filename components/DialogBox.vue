<template>
  <div>
    <modal ref="modal" size="sm">
      <template v-slot:body>
        <div class="text-center">
          <p v-html="message">Are you sure you want to clear your cart?</p>
          <div class="">
            <button class="btn btn-primary mr-3" @click="answer('yes')"><fa v-if="yesIcon" :icon="yesIcon" /> {{yesLabel}}</button>
            <button class="btn btn-outline-secondary" @click="answer('no')">{{noLabel}}</button>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from './bootstrap/Modal'
export default {
  components: {
    Modal
  },
  data(){
    return {
      message: null,
      resolveInstance: null,
      yesIcon: null,
      yesLabel: 'Yes',
      noLabel: 'No',
    }
  },
  methods: {
    _open(message, options = {}){
      this.message = message
      this.setOptions(options)
      return new Promise((resolve, reject) => {
        this.$refs.modal._open()
        this.resolveInstance = resolve
      })
    },
    setOptions({ yes_icon: yesIcon = null, yes_label: yesLabel = 'Yes', no_label: noLabel = 'No' }){
      this.yesIcon = yesIcon
      this.yesLabel = yesLabel
      this.noLabel = noLabel
    },
    answer(answer){
      if(this.resolveInstance){
        this.resolveInstance(answer)
        this.resolveInstance = null
        this.$refs.modal._close()
      }
    }
  }
}
</script>

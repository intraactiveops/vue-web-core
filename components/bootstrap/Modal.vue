<template>
  <div>
    <div ref="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div v-bind:class="'modal-' + size" class="modal-dialog" role="document">
        <div class="modal-content">
          <div v-if="title" class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel"><fa v-if="false" :icon="icon" /> {{title}} </h5>
            <button v-if="closeable" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'md'
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _open(){
      if(this.closeable){
        $(this.$refs.modal).modal('show')
      }else{
        $(this.$refs.modal).modal({ backdrop: 'static', keyboard: false })
      }
    },
    _close(){
      $(this.$refs.modal).modal('hide')
    }
  }
}
</script>

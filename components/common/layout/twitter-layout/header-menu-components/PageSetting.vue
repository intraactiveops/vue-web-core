<template>
  <div>
    <!-- <modal ref="modal" :bg-transparent="true" size="sm" padding-top="50px">
      <template v-slot:body> -->
      <!-- <div class="mb-2">
        <div class="text-center w-100 bg-whitesmoke p-1 mb-2 rounded font-weight-bold">Home Page</div>
        <select @click.stop class="form-control form-control-sm">
          <option>Newsfeed</option>
          <option>Channel</option>
          <option>Following</option>
        </select>
      </div> -->
      <quick-access-toggler />
      <div class="mb-2">
        <div class="text-center w-100 bg-whitesmoke p-1 mb-2 rounded font-weight-bold">Personal Theme</div>
        <select @click.stop class="form-control form-control-sm">
          <option>IntraComs (default)</option>
          <option>Adwaita</option>
          <option>Adwaita Dark</option>
          <option>High Contrast</option>
          <option>Twitter</option>
        </select>
      </div>
      <!-- </template>
    </modal> -->
  </div>
</template>
<script>
// import Modal from '@/vue-web-core/components/bootstrap/Modal'
import QuickAccessToggler from './QuickAccessToggler'

export default{
  components: {
    QuickAccessToggler
  },
  methods: {
    _open(){
      this.$refs.modal._open()
    }
  }
}
</script>

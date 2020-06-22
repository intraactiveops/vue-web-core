<template>
  <div>
    <modal ref="modal">
      <template v-slot:body>
        <h5>Project</h5>
        <form-module ref="form" :config="formConfig" />
        <div  class="text-right">
          <button @click="save" class="btn btn-success"><fa icon="check" /> Save</button>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import FormModule from '@/vue-web-core/components/form/Form'
import Modal from '@/vue-web-core/components/bootstrap/Modal'
export default {
  components: {
    Modal,
    FormModule
  },
  data(){
    return {
      formConfig: {
        fields: {
          name: {},
          description: {
            type: 'textarea'
          },
          deadline: {
            placeholder: 'Deadline',
            type: 'date'
          },
        }
      }
    }
  },
  methods: {
    _open(){
      this.$refs.modal._open()
    },
    _close(){
      this.$refs.modal._close()
    },
    save(){
      this.$emit('created', this.$refs.form._getFormData())
    }
  }
}
</script>

<template>
  <div style="float:left">
    <button class="btn btn-outline-primary text-dark" type="button" @click="_fileInputClicked" ><fa-multimedia /></button>
    <input ref="fileInput" type="file" multiple="multiple" id="attachments" accept="*" @change="uploadFieldChange" style="display:none" />
  </div>
</template>
<script>
import Config from '@/vue-web-core/system/config.js'
import faMultimedia from '@/vue-web-core/components/fontawesome/Multimedia.vue'
export default {
  components: {
    faMultimedia
  },
  data() {
    return {
      uploadPercentage: null,
      // You can store all your files here
      attachments: [],
      // Each file will need to be sent as FormData element
      formData: new FormData(),
      errors: {
      },
    }
  },
  methods: {
    _fileInputClicked(){
      this.$refs.fileInput.click()
    },
    prepareFields() {
      this.formData = new FormData()
      if (this.attachments.length > 0) {
        for (var i = 0; i < this.attachments.length; i++) {
          let attachment = this.attachments[i]
          this.formData.append('files[]', attachment)
        }
      }
    },
    _getFormData(){
      this.prepareFields()
      return this.formData
    },
    _getFileList(){
      return this.attachments
    },
    _remove(attachment) {
      this.attachments.splice(this.attachments.indexOf(attachment), 1)
      this.$emit('change', this.attachments)
    },
    _reset(){
      this.resetData()
      this.formData = new FormData() // Reset it completely
      this.attachments = []
      this.$emit('change', this.attachments)
    },
    uploadFieldChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      for (var i = files.length - 1; i >= 0; i--) {
        this.attachments.push(files[i])
      }
      document.getElementById('attachments').value = []
      this.$emit('change', this.attachments)
    },
    _upload() {
      this.prepareFields()
      this.formData.append('upload_ticket_id', 3)
      this.uploadPercentage = 0
      // let thisIsThis = this
      $.ajax({
        url: Config.FILE_SERVER_URL + '/v1/upload',
        type: 'POST',
        data: this.formData,
        cache: false,
        contentType: false,
        processData: false,
        _method: 'PUT',
        xhr: () => {
          let xhr = new window.XMLHttpRequest()
          xhr.upload.addEventListener('progress', (evt) => {
            if (evt.lengthComputable) {
              let percentComplete = (evt.loaded / evt.total) * 100
              if(percentComplete > (this.uploadPercentage + 5) || percentComplete === 100){
                this.$emit('upload_progress_changed', percentComplete)
              }
              this.uploadPercentage = percentComplete
            }
          }, false)
          return xhr
        }
      }).done((response) => {
        if (response.formData) {
          this._reset()
        } else {
        }
      }).fail((response) => {
        this.$emit('upload_error', response.status, response.responseJSON)
      })
    },
    resetData() {

    },
  }
}
</script>

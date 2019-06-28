<template>
  <div>
    <button class="btn btn-sm btn-light text-dark" type="button" @click="fileInputClicked" ><fa :icon="'paperclip'" /> Add Photo/Video/File</button>
    <input ref="fileInput" type="file" multiple="multiple" id="attachments" accept="*" @change="uploadFieldChange" style="display:none" />
  </div>
</template>
<script>
import Config from '@/vue-web-core/system/config.js'
export default {
  data() {
    return {
      uploadPercentage: null,
      // You can store all your files here
      attachments: [],
      // Each file will need to be sent as FormData element
      data: new FormData(),
      errors: {
      },
    }
  },
  methods: {
    fileInputClicked(){
      this.$refs.fileInput.click()
    },
    prepareFields() {
      this.data = new FormData()
      if (this.attachments.length > 0) {
        for (var i = 0; i < this.attachments.length; i++) {
          let attachment = this.attachments[i]
          this.data.append('files[]', attachment)
        }
      }
    },
    _remove(attachment) {
      this.attachments.splice(this.attachments.indexOf(attachment), 1)
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
      this.data.append('upload_ticket_id', 3)
      this.uploadPercentage = 0
      // let thisIsThis = this
      $.ajax({
        url: Config.FILE_SERVER_URL + '/v1/upload',
        type: 'POST',
        data: this.data,
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
        if (response.data) {
          this.resetData()
        } else {
        }
      }).fail((response) => {
        this.$emit('upload_error', response.status, response.responseJSON)
      })
    },
    resetData() {
      this.data = new FormData() // Reset it completely
      this.attachments = []
    },
  }
}
</script>

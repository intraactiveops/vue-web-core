<template>
  <div class="row ">
    <template v-for="(attachment, index) in attachments">
      <div v-if="typeof attachments['deleted'] === 'undefined' || attachments['deleted'] !== true"   v-bind:class="(attachments.length <= 4 ? 'col-12 col-lg-12' : 'col-6 col-md-4') + ' ' + (index < attachments.length - 1  ? 'pb-1' : '')" class="px-1">
        <div class="border rounded shadow2 p-2 bg-white">
          <div v-if="FileHelper.getGeneralFileType(attachment['type']) === 'file'"  >
            <div style="width:40px; float:left" class="bg-muted text-center h1 py-2">
              <fa :icon="FileHelper.getFileDisplay(attachment['type'])['icon']"  v-bind:style="{color: FileHelper.getFileDisplay(attachment['type'])['color']}" />
            </div>
            <div class="py-1 " style="padding-left: 50px; word-break: break-all;">
              <button v-if="!notEditable && attachment['deleted']" @click="undoRemove(index)" class="btn btn-sm btn-outline-secondary float-right" type="button">Restore</button>
              <button v-else-if="!notEditable" @click="remove(index)" class="btn btn-sm btn-outline-danger float-right" type="button"><fa :icon="'times'" /></button>
              <span>{{attachment.name}}</span> <span v-if="attachment['deleted']" class="badge badge-danger ml-1">Deleted</span><br>
              <small>{{FileHelper.readableFileSize(attachment.size)}}</small>
            </div>
          </div>
          <div v-else-if="FileHelper.getGeneralFileType(attachment['type']) === 'image'" >
            <img alt="loading image" v-bind:src="fileReader[index]['src']" style="width: 100%; height: auto">
            <div class="py-2 pt-3 px-1" style="word-break: break-all;">
              <button v-if="!notEditable && attachment['deleted']" @click="undoRemove(index)" class="btn btn-sm btn-outline-secondary float-right" type="button">Restore</button>
              <button v-else-if="!notEditable" @click="remove(index)" class="btn btn-sm btn-outline-danger float-right" type="button"><fa :icon="'times'" /></button>
              <span>{{attachment.name}}</span> <span v-if="attachment['deleted']" class="badge badge-danger ml-1">Deleted</span><br>
              <small>{{FileHelper.readableFileSize(attachment.size)}}</small>
            </div>
          </div>
          <div v-else-if="FileHelper.getGeneralFileType(attachment['type']) === 'video'" >
            <div v-if="fileReader[index]['src'] === null" >Preparing video preview</div>
            <video v-else v-bind:src="fileReader[index]['src']" controls style="width: 100%">
              <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.webm">link to the video</a> instead.</p>
            </video>
            <div class="py-2 pt-3 px-1" style="word-break: break-all;">
              <button v-if="!notEditable && attachment['deleted']" @click="undoRemove(index)" class="btn btn-sm btn-outline-secondary float-right" type="button">Restore</button>
              <button v-else-if="!notEditable" @click="remove(index)" class="btn btn-sm btn-outline-danger float-right" type="button"><fa :icon="'times'" /></button>
              <span>{{attachment.name}}</span> <span v-if="attachment['deleted']" class="badge badge-danger ml-1">Deleted</span><br>
              <small>{{FileHelper.readableFileSize(attachment.size)}}</small>
            </div>
          </div>
          <div v-else-if="FileHelper.getGeneralFileType(attachment['type']) === 'audio'" >
            <div v-if="fileReader[index]['src'] === null" >Preparing video preview</div>
            <audio v-else v-bind:src="fileReader[index]['src']" controls style="width: 100%">
              <p>Your browser doesn't support HTML5 audio. </p>
            </audio>
            <div class="py-2 pt-3 px-1" style="word-break: break-all;">
              <button v-if="!notEditable && attachment['deleted']" @click="undoRemove(index)" class="btn btn-sm btn-outline-secondary float-right" type="button">Restore</button>
              <button v-else-if="!notEditable" @click="remove(index)" class="btn btn-sm btn-outline-danger float-right" type="button"><fa :icon="'times'" /></button>
              <span>{{attachment.name}}</span> <span v-if="attachment['deleted']" class="badge badge-danger ml-1">Deleted</span><br>
              <small>{{FileHelper.readableFileSize(attachment.size)}}</small>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import FileHelper from '@/vue-web-core/helper/file'
export default{
  props: {
    notEditable: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      attachments: [],
      attachmentsReady: false,
      FileHelper: FileHelper,
      fileReader: {}
    }
  },
  mounted(){
  },
  methods: {
    remove(index){
      this.$emit('remove-attachment', this.attachments[index])
    },
    undoRemove(index){
      this.$emit('undo-remove-attachment', this.attachments[index])
    },
    _refresh(attachments){
      this.attachments = attachments
      for(let x = 0; x < attachments.length; x++){
        if(FileHelper.getGeneralFileType(this.attachments[x]['type']) === 'image'){
          Vue.set(this.fileReader, x, { src: null })
          if(typeof this.attachments[x]['id'] !== 'undefined' && this.attachments[x]['id']){
            Vue.set(this.fileReader[x], 'src', this.getFileServerLink(this.attachments[x]['file_name']))
          }else{
            FileHelper.readFile(this.attachments[x]).then((result) => {
              Vue.set(this.fileReader[x], 'src', result)
            })
          }
        }
        if(FileHelper.getGeneralFileType(this.attachments[x]['type']) === 'video'){
          Vue.set(this.fileReader, x, { src: null })
          FileHelper.readFile(this.attachments[x]).then((result) => {
            Vue.set(this.fileReader[x], 'src', result)
          })
        }
        if(FileHelper.getGeneralFileType(this.attachments[x]['type']) === 'audio'){
          Vue.set(this.fileReader, x, { src: null })
          FileHelper.readFile(this.attachments[x]).then((result) => {
            Vue.set(this.fileReader[x], 'src', result)
          })
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <span v-if="!thumbnail" class="bg-info badge"><fa icon="info-circle" /> Stop the video to create a thumbnail</span>
    <span v-else class="text-success badge"><fa icon="check" /> Thumbnail at {{padNumber((thumbnailTime / 60).toFixed(0))}}:{{padNumber((thumbnailTime % 60).toFixed(0))}}</span>
    <video ref="videoPlayer" v-bind:src="videoSource" controls style="width: 100%" autoplay muted>
      <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.webm">link to the video</a> instead.</p>
    </video>
    <!-- <img v-if="thumbnail" :src="thumbnail" style="width:100px"> -->
  </div>
</template>
<script>
const captureFrame = require('capture-frame')
export default{
  props: {
    videoSource: String,
    index: Number
  },
  data(){
    return {
      thumbnail: null,
      thumbnailTime: null,
      blob: null,
      defaultSnapshotTime: 7 // 7 seconds if the user did not pause the video
    }
  },
  mounted(){
    this.$refs.videoPlayer.addEventListener('seeked', this.snapVideo)
    this.$refs.videoPlayer.addEventListener('pause', this.snapVideo)
    this.$refs.videoPlayer.addEventListener('play', this.videoStarted)
  },
  methods: {
    videoStarted(){
      setTimeout(() => {
        if(!this.thumbnail){
          this.snapVideo()
        }
      }, this.defaultSnapshotTime * 1000)
    },
    snapVideo(){
      let buff = captureFrame(this.$refs.videoPlayer)
      this.thumbnailTime = this.$refs.videoPlayer.currentTime
      this.blob = new window.Blob([buff])
      this.thumbnail = window.URL.createObjectURL(this.blob)
      this.$emit('snapshot', this.index, this.blob)
    }
  }
}
</script>

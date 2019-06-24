<template>
  <div>
    <div ref="modal" class="modal show fade p-0" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog my-3 border-0" role="document" style="">
        <div v-show="!isLoading" class="modal-content"  v-bind:style="{width: (imageElementDimension.width) + 'px', 'margin-top' : ((windowDimension.height - imageElementDimension.height) / 2) + 'px'}">
            <div v-if="typeof links !== 'undefined' && links.length" style="position:absolute" class="navigation w-100">
              <button @click="(imageIndex > 0) ? imageIndex-- : imageIndex = links.length - 1" class="btn">Previous</button>

              <button @click="(imageIndex < links.length - 1) ? imageIndex++ : imageIndex = 0" class="btn float-right">Next</button>
              <div class="log bg-white">
                {{windowDimension}}<br>
                {{maxViewerDimension}}<br>
                {{imageElementDimension}}
              </div>
            </div>
            <img ref="image" v-bind:src="links[imageIndex]" v-bind:style="{width: (imageElementDimension.width - 2) + 'px', height: imageElementDimension.height + 'px'}">
            <div class="footer w-100 p-2 transparent-dark">
              <slot name="footer"></slot>
            </div>
        </div>
        <div v-if="isLoading" class="bg-white ">
          Loading...
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    source: String,
    links: Array
  },
  data(){
    return {
      imageIndex: 0,
      imageElementDimension: {
        width: '0',
        height: '0'
      },
      maxViewerDimension: {
        width: null,
        height: null,
      },
      windowDimension: {
        height: window.innerHeight,
        width: window.innerWidth,
      },
      isLoading: false
    }
  },
  mounted(){
    this.init()
    let resizeImage = this.resizeImage
    $(this.$refs.image).on('load', () => {
      this.resizeImage()
    })
    window.onresize = () => {
      this.init()
      this.resizeImage()
    }
  },
  methods: {
    init(){
      this.maxViewerDimension.height = $(this.$refs.modal).find('.modal-dialog').css('max-height').replace('px', '') * 1
      this.maxViewerDimension.width = $(this.$refs.modal).find('.modal-dialog').css('max-width').replace('px', '') * 1
      this.windowDimension.width = window.innerWidth
      this.windowDimension.height = window.innerHeight
    },
    _open(){
      this.imageIndex = 0
      $(this.$refs.modal).modal('show')
      this.resizeImage()
    },
    resizeImage(){
      this.isLoading = true
      let natWidth = $(this.$refs.image)[0].naturalWidth
      let natHeight = $(this.$refs.image)[0].naturalHeight
      // console.log('size', natWidth, this.maxViewerDimension.width, natWidth >= natHeight)
      if(natWidth > this.maxViewerDimension.width || natHeight > this.maxViewerDimension.height){
        if(natWidth >= natHeight){ // width is bigger
          console.log('got')
          this.imageElementDimension.width = (this.maxViewerDimension.width )
          this.imageElementDimension.height = (this.maxViewerDimension.width * (natHeight / natWidth))
        }else{
          this.imageElementDimension.height = this.maxViewerDimension.height + 'px'
          this.imageElementDimension.width = (this.maxViewerDimension.height * (natWidth / natHeight))
        }
      }else{
        this.imageElementDimension.width = (natWidth)
        this.imageElementDimension.height = (natHeight)
      }
      this.isLoading = false
    }
  },
  watch: {
    imageIndex(newIndex){
      this.isLoading = true
    }
  }
}
</script>
<style scoped>
  .navigation{
    position: absolute;
    margin-top: 30vh;
  }
  .modal.show{
    display:block!important
  }
  .modal-dialog .modal-content{
    margin-left:auto!important;
    margin-right:auto!important;
    position:relative
  }
  .modal-dialog{
    max-width: calc(100vw - 2rem);
    max-height:calc(100vh - 2rem);

    overflow:hidden
  }
  .footer{
    position:absolute;
    bottom:0
  }
  .transparent-dark{
    background-color: #00000040
  }
</style>
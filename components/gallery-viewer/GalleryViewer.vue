<template>
  <div>
    <div ref="modal" class="modal fade p-0" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog my-3 border-0" role="document" style="">

        <div v-show="!isLoading" class="modal-content"  v-bind:style="{width: (imageElementDimension.width) + 'px', 'margin-top' : ((windowDimension.height - imageElementDimension.height) / 2) + 'px'}">
            <div v-if="typeof links !== 'undefined' && links.length > 1" style="position:absolute" class="navigation w-100">
              <button @click="(imageIndex > 0) ? imageIndex-- : imageIndex = links.length - 1" class="btn">Previous</button>

              <button @click="(imageIndex < links.length - 1) ? imageIndex++ : imageIndex = 0" class="btn float-right">Next</button>
              <div class="log bg-white fade">
                {{windowDimension}}<br>
                {{maxViewerDimension}}<br>
                {{imageElementDimension}}
              </div>
            </div>
            <img ref="image" v-bind:src="links[imageIndex]" style="width:100%; height:100%;">
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
    _close(){
      $(this.$refs.modal).modal('hide')
    },
    resizeImage(){
      this.isLoading = true
      let natWidth = $(this.$refs.image)[0].naturalWidth
      let natHeight = $(this.$refs.image)[0].naturalHeight
      this.imageElementDimension.width = natWidth
      this.imageElementDimension.height = natHeight

      if(natWidth > this.maxViewerDimension.width){
        this.imageElementDimension.height = (this.maxViewerDimension.width * (natHeight / natWidth))
        this.imageElementDimension.width = (this.maxViewerDimension.width)
      }
      if(this.imageElementDimension.height > this.maxViewerDimension.height){
        let ratio = (this.imageElementDimension.width / this.imageElementDimension.height)
        this.imageElementDimension.height = this.maxViewerDimension.height
        this.imageElementDimension.width = (this.maxViewerDimension.height * ratio)
      }

      // if(natWidth > this.maxViewerDimension.width || natHeight > this.maxViewerDimension.height){
      //   console.log(natWidth, natHeight)
      //   if(natWidth >= natHeight){ // width is bigger
      //     this.imageElementDimension.width = (this.maxViewerDimension.width )
      //     this.imageElementDimension.height = (this.maxViewerDimension.width * (natHeight / natWidth))
      //   }else{
      //     this.imageElementDimension.height = this.maxViewerDimension.height + 'px'
      //     this.imageElementDimension.width = (this.maxViewerDimension.height * (natWidth / natHeight))
      //   }
      // }else{
      //   this.imageElementDimension.width = (natWidth)
      //   this.imageElementDimension.height = (natHeight)
      // }
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
    margin-top: 40%;
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
    margin-left:auto!important;
    margin-right:auto!important;
    max-width: calc(95vw - 2rem);
    max-height:calc(95vh - 2rem);

  }
  .footer{
    position:absolute;
    bottom:0
  }
  .transparent-dark{
    background-color: #00000040
  }
</style>

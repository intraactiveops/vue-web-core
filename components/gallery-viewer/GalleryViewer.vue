<template>
  <div>
    <div ref="modal" class="modal fade p-0" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog my-3 border-0 bg-transparent" role="document" style="">

        <div v-show="!isLoading" class="modal-content bg-transparent"  v-bind:style="{width: (imageElementDimension.width) + 'px', 'margin-top' : ((windowDimension.height - imageElementDimension.height) / 2) + 'px'}">
            <div class="w-100 bg-transparent" style="margin-top:-37px"><button @click="_close" class="btn btn-lg text-white p-0 float-right"><fa icon="times" /></button></div>
            <div v-if="typeof links !== 'undefined' && links.length > 1" style="position:absolute" class="navigation" v-bind:style="{'margin-top': ((imageElementDimension.height - 20) / 2) +'px', width: (imageElementDimension.width + 71) + 'px'}">
              <button @click="(imageIndex > 0) ? imageIndex-- : imageIndex = links.length - 1" class="navButton btn-lg p-0 "><fa icon="chevron-left" /></button>
              <button @click="(imageIndex < links.length - 1) ? imageIndex++ : imageIndex = 0" class="navButton  btn-lg p-0 float-right"><fa icon="chevron-right" /></button>
              <div class="log bg-white fade">
                {{windowDimension}}<br>
                {{maxViewerDimension}}<br>
                {{imageElementDimension}}<br>
                {{windowDimension.height}} {{(imageElementDimension / 2) +'px'}}
              </div>
            </div>
            <img ref="image" v-bind:src="links[imageIndex]" style="width:100%; height:100%;">
            <div class="footer w-100 p-2 transparent-dark">
              <slot name="footer"></slot>
            </div>
        </div>
        <div v-if="isLoading" class="text-white">
          Loading...
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    source: String,
    links: {
      type: Array,
      required: true
    }
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
    _open(index = 0, links = null){
      this.imageIndex = index
      $(this.$refs.modal).modal({ backdrop: 'static', keyboard: false })
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
    margin-left: -37px
    /* margin-top: 100%; */
  }
  .navButton{
    background-color: transparent;
    border: none;
    font-size: 3em;
    color: white;
    padding: 5px!important;
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

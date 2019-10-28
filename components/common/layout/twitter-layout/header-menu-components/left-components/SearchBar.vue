<template>
  <div class="pt-1">
    <div class="input-group bg-whitesmoke oval-left oval-right  mb-3 float-right rounded-oval input-group-sm" style="max-width: 250px">
      <div class="input-group-prepend border-0 ">
        <span class="input-group-text oval-left  bg-transparent border-0 ml-1"><fa icon="search" /></span>
      </div>
      <input :placeholder="placeholder" class="form-control form-control-no-border no-box-shadow bg-transparent border-left-0 border-0" aria-label="Amount (to the nearest dollar)">
      <div class="input-group-append pr-1">
        <button class="btn dropdown-toggle oval-right " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">&nbsp;</button>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="#">Search Post</a>
          <a class="dropdown-item" href="#">Find People</a>
          <a class="dropdown-item" href="#">Find Channel</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      placeholder: 'Search Post'
    }
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      console.log('read', to.path)
      if(to.path.indexOf('/channel') !== -1){
        this.placeholder = 'Search Channel'
      }else if(to.path.indexOf('/user') !== -1){
        this.placeholder = 'Find People'
      }else{
        this.placeholder = 'Search Post'
      }
    }
  }
}
</script>
<style>
.oval-left{
  border-top-left-radius: 30px!important;
  border-bottom-left-radius: 30px!important;
}
.oval-right{
  border-top-right-radius: 30px!important;
  border-bottom-right-radius: 30px!important;
}
.rounded-oval{

}
</style>

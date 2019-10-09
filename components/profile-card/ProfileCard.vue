<template>
  <div v-show="isOpen">
    Profile
  </div>
</template>
<script>
export default{
  props: {
    id: Number, //Id the of the user
    profile_picture_file_name: String, // the file name of the profile picture
    full_name: String,
    job_title: String
  },
  data(){
    return {
      isOpen: false
    }
  },
  methods: {
    _toggle(){ // open if close, close if open
      if(this.isOpen){
        this._close()
      }else{
        this._open()
      }
    },
    _open(){ // open the card
      /* TODOs
        Other information should only be loaded once the card is open and it should only be loaded once
      */
      this.isOpen = true
    },
    _close(){ // close the card
      this.isOpen = false
    }
  }
}
</script>

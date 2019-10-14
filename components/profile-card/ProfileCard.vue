<template>
  <transition name="fade" mode="out-in">
    <div class="profile-card" v-show="isOpen">
      <div class="profile-card-container py-2">
        <div class="d-flex align-items-center">
          <div class="profile-picture">
            <img class="h-100 w-100" :src="profile_picture_file_name" />
          </div>
          <div class="profile-main-info">
            <span class="font-weight-bold" v-if="full_name">
              {{ full_name }}<br/>
            </span>
            <span v-if="job_title">
              {{ job_title }} <br/>
            </span>
            Company A<br/>
            <a class="color-blue" href="#" style="text-decoration: none;">Unfollow Me</a><br/>
            <div class="profile-links">
              <a href="#" title="Video Call"><fa class="fa-lg color-gray text-hover-primary" icon="video" /></a>&nbsp;
              <a href="#" title="Message"><fa class="fa-lg color-gray text-hover-primary" icon="pen-square" /></a>&nbsp;
              <a href="#" title="Chatter"><fa class="fa-lg color-gray text-hover-primary" icon="comments" /></a>&nbsp;
              <fa class="fa-lg text-primary" icon="address-book" />&nbsp;
              <a href="#" title="Profile"><fa class="fa-lg color-gray text-hover-primary" icon="user" /></a>
            </div>
          </div>
        </div>
        <div class="profile-other-info pt-2">
          <table>
            <tr>
              <td>Office</td>
              <td>8912345612</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>98765234</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>intra1@yahoo.com</td>
            </tr>
            <tr>
              <td>Facebook</td>
              <td>tesasdd</td>
            </tr>
            <tr>
              <td>Twitter</td>
              <td>dasdasdas</td>
            </tr>
            <tr>
              <td class="pr-3">Instagram</td>
              <td>dasdas</td>
            </tr>
            <tr>
              <td>Linkedin</td>
              <td>dasdasdas</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>Basak Pardo, Cebu City</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
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
<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.color-gray {
  color: #9ba0a4;
}

.profile-card {
    float: left;
    position: absolute;
    z-index: 4;
    background: #fff;
    margin: 0 0 0 80px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -moz-box-shadow: 0px 0px 7px #000000;
    -webkit-box-shadow: 0px 0px 7px #000000;
    box-shadow: 0px 0px 7px #000000;
}

.profile-card-container {
    float: left;
    width: 100%;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.profile-picture {
    float: left;
    background: #ffffff none repeat scroll 0 0;
    height: 95px;
    width: 95px;
    overflow: hidden;
    margin: 0 0 0 11px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.profile-picture img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

.profile-main-info {
    float: left;
    margin: 0 0 0 15px;
    width: 190px;
}

.profile-other-info {
    float: left;
    margin: 0 0 0 35px;
    width: 100%;
}

.profile-other-info > table td:nth-child(1) {
  font-weight: bold;
}

</style>
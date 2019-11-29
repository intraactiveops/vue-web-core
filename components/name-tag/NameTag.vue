<template>
  <div class="d-flex">
    <div><img width="40px" :src="profilePhoto" class="rounded-circle"></div>
    <div class="flex-grow-1 pl-2 text-truncate d-inline-block" :style="{'line-height': lineHeight}">
      <div><slot name="beforeName"></slot></div>
      <a href="#/user/plenosjohn@yahoo.com" :class="smallName ? 'small' : ''">{{name}} </a>
      <div><slot name="afterName"></slot></div>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    name: String,
    profilePhoto: String,
    lineHeight: {
      type: String,
      default: '18px'
    },
    smallName: Boolean
  }
}
</script>
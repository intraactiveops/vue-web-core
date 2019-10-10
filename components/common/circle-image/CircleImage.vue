<template>
  <div>
    <img class="rounded-circle" style="height: 21px; width: 21px;" :src="imagePath"/>
    <span v-if="label">&nbsp;{{ label }}</span>
  </div>
</template>
<script>
export default {
  props: {
    imagePath: String,
    label: String
  }
}
</script>
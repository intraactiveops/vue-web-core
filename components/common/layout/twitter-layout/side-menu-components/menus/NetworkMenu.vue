<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item borderless py-1 px-2 ">
      <span class="font-weight-bold">Mine</span> <router-link to="/network-list" class="float-right"  title="View All Channel">View All</router-link>
    </li>
    <li class="list-group-item borderless py-1 px-2">
      <router-link to="/network/1"> Dev Team 51 <span class=" float-right badge text-white badge-info badge-pill">5</span></router-link>
    </li>
    <li class="list-group-item borderless py-1 px-2">
      <router-link to="/network/1"> Team Leads <span class=" float-right badge text-white badge-info badge-pill">3</span></router-link>
    </li>
    <li class="list-group-item borderless py-1 px-2">
      <span class="font-weight-bold">Joined</span>
    </li>
    <li class="list-group-item borderless py-1 px-2">
      <router-link to="/network/1">IT Department</router-link>
    </li>
    <li class="list-group-item borderless py-1 px-2">
      <router-link to="/network/1">Designers</router-link>
    </li>
  </ul>
</template>
<script>
export default{

}
</script>

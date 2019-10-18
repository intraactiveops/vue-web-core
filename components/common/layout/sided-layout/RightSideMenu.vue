<template>
  <div>
    <div class="form-row align-items-center mb-1">
      <div class="col-12 my-1">
        <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text bg-white text-primary"><fa icon="cloud" /></div>
          </div>
          <select class="form-control font-weight-bold">
            <option value="null">Personal</option>
            <option value="null">Deliotte</option>
            <option value="null">Department of State</option>
            <option value="null">Kirkland & Elis</option>
            <option value="null">NOVA Health</option>
          </select>
        </div>
      </div>
    </div>
    <div class="input-group input-group-sm mb-2">
      <input type="text" class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button"><fa icon="search" /></button>
        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only"></span>
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="#"><fa icon="check" /> People</a>
          <a class="dropdown-item" href="#">Network</a>
          <a class="dropdown-item" href="#">Post</a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

</script>

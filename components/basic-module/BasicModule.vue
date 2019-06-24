<template>
  <div class="content">
    <h2>{{config['module_name'] ? config['module_name'] : defaultModuleName}}</h2>
    <slot name="customSection1">
    </slot>
    <div class="text-right py-3">
      <slot name="customButtons"></slot>
      <button v-if="config['can_print']" class="btn btn-outline-dark mr-2 btn-sm"><fa icon="print" /> Print</button>
      <button v-if="config['can_print']" class="btn btn-outline-success mr-2 btn-sm"><fa icon="download" /> Export to Excel</button>
      <button v-if="typeof config['no_create'] === 'undefined' || !config['no_create']" @click="_openCreateForm" class="btn btn-primary"><fa icon="plus" /> Create</button>
    </div>
    <module-table ref="table"  @view-row="viewRow" :config="config" />
    <!-- <module-form ref="form" @form-save="updateRowFromForm" @form-deleted="deleteRow" :config="config" /> -->
  </div>
</template>
<script>
import ModuleTable from './ModuleTable'
// import ModuleForm from './ModuleForm'
import TextTransform from '@/vue-web-core/helper/text-transform.js'
export default {
  components: {
    ModuleTable,
    // ModuleForm
  },
  name: 'BasicModule',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      currentRowViewedIndex: null,
      defaultModuleName: TextTransform.toPhrase(this.config['api']) + ' Management'
    }
  },
  methods: {
    viewRow(index, id){
      this.currentRowViewedIndex = index
      this.$refs.form.showForm(id)
    },
    _openCreateForm(){
      this.currentRowViewedIndex = null
      this.$refs.form.openCreateModal()
    },
    updateRowFromForm(rowData){
      this.$refs.table._updateRow(this.currentRowViewedIndex, rowData)
    },
    deleteRow(){
      console.log(this.currentRowViewedIndex)
      this.$refs.table._deleteRow(this.currentRowViewedIndex)
    },
    _filterTable(){
      this.$refs.table._remoteFilter()
    }
  }
}
</script>

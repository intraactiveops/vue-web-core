<template>
  <div class="p-3">
    <div class="p-3 border shadow-sm bg-white mb-2">
      <h3 class="font-weight-bold">{{config['module_name'] ? config['module_name'] : defaultModuleName}}</h3>
      <div v-html="description"></div>
      <slot name="customSection1"></slot>
    </div>
    <div class="p-3 border shadow-sm bg-white mb-3">
      <div class="text-right mb-3">
        <slot name="customButtons"></slot>
        <button v-if="config['can_print']" class="btn btn-outline-dark mr-2 btn-sm"><fa icon="print" /> Print</button>
        <button v-if="config['can_print']" class="btn btn-outline-success mr-2 btn-sm"><fa icon="download" /> Export to Excel</button>
        <button v-if="typeof config['no_create'] === 'undefined' || !config['no_create']" @click="_openCreateForm" class="btn btn-primary"><fa icon="plus" /> Add</button>
      </div>
      <module-table ref="table"  @view-row="viewRow" :config="config" />
    </div>

    <module-form ref="form" @form-save="updateRowFromForm" @form-delete="deleteRow" :config="config" >
      <template v-slot:additionalFormField="slotProps">
        <slot name="additionalFormField" v-bind:formData="slotProps.formData"></slot>
      </template>
    </module-form>
  </div>
</template>
<script>
import ModuleTable from './ModuleTable'
import ModuleForm from './ModuleForm'
import TextTransform from '@/vue-web-core/helper/text-transform.js'
export default {
  components: {
    ModuleTable,
    ModuleForm
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
      defaultModuleName: TextTransform.toPhrase(this.config['api']) + ' Management',
      description: this.isset(this.config, 'description') || null
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
    updateRowFromForm(rowData, createMore = false){
      this.$emit('form-update', rowData)
      this.$refs.table._updateRow(this.currentRowViewedIndex, rowData)
      if(!createMore){
        this.currentRowViewedIndex = this.currentRowViewedIndex || 0
      }
    },
    deleteRow(id){
      this.$emit('form-delete', id)
      this.$refs.table._deleteRow(this.currentRowViewedIndex)
    },
    _filterTable(){
      this.$refs.table._remoteFilter()
    }
  }
}
</script>

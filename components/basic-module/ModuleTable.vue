<template>
  <div>
    <table-filter ref="filter" @ready="componentReady" @filter="filterTable" />
    <table-component ref="table" @row-view-clicked="viewRow" @ready="componentReady" :config="tableConfig"></table-component>
    <div v-if="resultPerPage" class="">
      <small class="float-left">{{totalResult}} results</small>
      <div class="btn-group float-right" role="group" aria-label="Button group with nested dropdown">
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Page {{padNumber(1, 3,'&nbsp;')}}
          </button>
          <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="min-width: 7.5em">
            <a v-for="x in (1, totalPage)" @click="currentPage = x" class="dropdown-item" href="#">Page <span class="float-right">{{x}}</span></a>
          </div>
        </div>
        <button type="button" class="btn btn-outline-secondary">Next <fa :icon="'chevron-right'"/></button>

      </div>
    </div>
    <br>
    <br>
    <button @click="filterTable(undefined)">test row</button>
  </div>
</template>
<script>
import TableComponent from '@/vue-web-core/components/table/Table.vue'
import TableFilter from '@/vue-web-core/components/table/Filter.vue'
import APIUtil from '@/vue-web-core/helper/api/util.js'
import ObjectHelper from '@/vue-web-core/helper/object.js'

export default {
  name: 'ModuleTable',
  components: {
    TableComponent,
    TableFilter
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      tableConfig: {},
      selectParameter: [],
      filterConditionParameter: [],
      resultPerPage: null,
      currentPage: null,
      totalPage: null,
      totalResult: 0,
      componentReadyCount: 0 // 2 is all
    }
  },
  mounted(){
    this.initConfig()
  },
  methods: {
    viewRow(index, id){
      this.$emit('view-row', index, id)
    },
    initConfig(){
      // Vue.set(this.tableConfig, this.config['table_column_setting'])
      this.tableConfig = this.config['table_setting']['table_column_setting']
      if(typeof this.config['table_setting']['result_per_page'] !== 'undefined'){
        this.resultPerPage = this.config['table_setting']['result_per_page']
        this.currentPage = 1
        this.totalPage = 1
      }
      setTimeout(() => {
        this.$refs.filter._initConfig(this.config['table_setting']['filter_setting'])
      }, 100)
    },
    componentReady(){
      ++this.componentReadyCount
      this.selectParameter = APIUtil.generateSelecParameter(this.$refs.table._getFieldList())
      // this.list().then((rowList) => {
      //   // console.log(this.$refs.table.list)
      //   this.$refs.table._updateList(rowList)
      // })
      if(this.componentReadyCount === 2){
        this.$refs.filter._filter()
      }
    },
    filterTable(filter){
      if(typeof filter !== 'undefined'){
        this.filterConditionParameter = filter
      }
      this.list().then((rowList) => {
        if(typeof this.$refs.table === 'undefined'){
          let interval
          interval = setTimeout(() => {
            if(typeof this.$refs.table !== 'undefined'){
              clearTimeout(interval)
            }
          }, 300)
        }else{
          this.$refs.table._updateList(rowList)
        }
      })
    },
    _remoteFilter(){
      this.$refs.filter._filter()
    },
    _updateRow(index, rowData){
      this.list(rowData['id']).then((response) => {
        if(index !== null || index === 0){ // update row
          this.$refs.table._updateRow(index, response)
        }else{ // new row
          this.$refs.table._addRow(response)
        }
      })
    },
    _deleteRow(index){
      // this.rowData.splice(index, 1)
      this.$refs.table._deleteRow(index)
    },
    list(id){
      return new Promise((resolve, reject) => {
        let parameter = this.cloneObject(this.config['table_setting']['retrieve_parameter'])
        parameter = ObjectHelper.mergeDeep(parameter, { select: this.selectParameter })
        if(typeof id === 'undefined'){
          if(typeof parameter['condition'] === 'undefined'){
            parameter['condition'] = []
          }
          parameter['condition'] = parameter['condition'].concat(this.filterConditionParameter)
        }else{
          delete parameter['condition']
          parameter['id'] = id
        }
        if(this.resultPerPage){
          parameter['limit'] = this.resultPerPage
          parameter['offset'] = (this.currentPage - 1) * this.resultPerPage
        }
        this.apiRequest(this.config['api'] + '/retrieve', parameter, (response) => {
          // this.$refs.table._updateList(response.data)
          resolve(response.data)
          if(typeof id === 'undefined'){
            this.totalPage = Math.ceil(response['additional_data']['total_result'] * 1 / this.resultPerPage)
            this.totaResult = response['additional_data']['total_result'] * 1
          }
          //
        }, (errorResponse, status) => {
          reject(errorResponse)
          console.error('error', errorResponse)
        })
      })
    }
  },
  watch: {
    currentPage(newPage){
      this.filterTable()
    }
  }
}
</script>

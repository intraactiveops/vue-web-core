<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr><th v-for="head in header[0]" v:bind:span="head['sub_colument'].length">{{head}}</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rowData">
          <td v-for="column in columnSetting">
            <template v-if="column['type'] === 'text'">{{row[column['index']]}}</template>
            <div v-else-if="column['type'] === 'number'" class="text-right">{{row[column['index']]}}</div>
            <div v-else-if="column['type'] === 'decimal'" class="text-right">{{(row[column['index']]).toFixed(2)}}</div>
            <div v-else-if="column['type'] === 'html'" v-html="column['value_function'](row)"></div>
            <div v-else-if="column['type'] === 'yesno'">{{row[column['index']] ? 'Yes' : 'No'}}</div>
          </td>
          <td>
            <button @click="$emit('row-view-clicked', index, row['id'])" type="button" class="btn btn-sms btn-outline-primary "><fa icon="edit" /></button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="isLoading" class="mt-2 text-center"><fa icon="hourglass-half" /> Retrieving data...</div>
  </div>
</template>
<script>
import Vue from 'vue'
import TextHelper from '@/vue-web-core/helper/text-transform.js'
import APIUtil from '@/vue-web-core/helper/api/util.js'
export default {
  name: 'Table',
  props: {
    isLoading: Boolean,
    config: {
      type: Object,
      required: true
    }
  },
  mounted () {
    if(typeof this.config === 'object'){
      this.initConfig()
    }
  },
  data(){
    return {
      header: [
        [],
        []
      ],
      rowData: [],
      footerData: [],
      columnSetting: [],
      fieldList: []
    }
  },
  methods: {
    _getFieldList(){
      return this.fieldList
    },
    initConfig () {
      this.header = [
        [], []
      ]
      this.columnSetting = []
      for(let columnKey in this.config){
        this.initColumn(columnKey, this.config[columnKey], 0)
      }
      setTimeout(() => {
        this.$emit('ready', true)
      }, 100)
    },
    initColumn(columnKey, column, row){
      let setting = Object.assign({}, column)
      setting['index'] = columnKey
      this.setDefault(setting, 'name', TextHelper.toPhrase(columnKey))
      this.setDefault(setting, 'type', 'text')
      this.setDefault(setting, 'db_name', columnKey)
      this.setDefault(setting, 'value_function', (rowData) => {
        return rowData[setting['index']]
      })
      if(this.isset(column, 'sub_column')){
        for(let subColumnKey in column['sub_column']){
          this.initColumn(subColumnKey, column['sub_column'][subColumnKey], ++row)
        }
      }else{
        setting['sub_column'] = []
      }
      this.header[row].push(setting['name'])
      this.fieldList.push(setting['db_name'])
      this.columnSetting.push(setting)
    },

    _updateList(rowList){
      let newRow = []
      if(rowList){
        for(let x = 0; x < rowList.length; x++){
          newRow.push(APIUtil.arrayToTextKey(rowList[x]))
        }
      }
      this.rowData = newRow
    },
    _addRow(rowData){
      this.rowData.unshift(APIUtil.arrayToTextKey(rowData))
    },
    _updateRow(index, rowData){
      Vue.set(this.rowData, index, APIUtil.arrayToTextKey(rowData))
    },
    _deleteRow(index){
      this.rowData.splice(index, 1)
    }
  },
  watch: {
    config(data){
      this.initConfig()
    },
    rowList(){
      this.arrayToText()
    }
  }
}
</script>

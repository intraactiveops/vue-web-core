<template>
  <div>
    <!-- <pre>
    {{formData}}
    </pre> -->
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in columns">{{column['name']}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="typeof formData[index+'.last_array_key'] !== 'undefined' && formData[index+'.last_array_key'] !== null">
          <template  v-for="x in formData[index+'.array_key_list']">
            <tr  v-if="typeof formData[index + '.' + x + '.deleted'] === 'undefined' && (formData[index+'.deleted_array_key']).indexOf(x) === -1">
              <td v-for="column in columns">
                {{setColumnDefaultValue(x, index + '.' + x + '.' + column['index'], column['index'])}}
                <div v-if="column['type'] === 'text'">
                  <input  @change="$emit('data-changed', index + '.' + x + '.' + column['index'], $event.target.value)" v-bind:class="typeof validationMessage[index + '.' + x + '.' + column['index']] !== 'undefined' ? 'is-invalid': null" class="form-control" type="text" v-bind:value="formData[index + '.' + x + '.' + column['index']]" />
                  <div class="invalid-feedback">
                    {{typeof validationMessage[index + '.' + x + '.' + column['index']] !== 'undefined' ? validationMessage[index + '.' + x + '.' + column['index']]['message']  : ''}}
                  </div>
                </div>
                <template v-else-if="column['type'] === 'yesno'" >
                  <div class="btn-group btn-group-toggle w-100" data-toggle="buttons">
                    <label @click="$emit('data-changed', index + '.' + x + '.' + column['index'], 1)" v-bind:class="formData[index + '.' + x + '.' + column['index']] ? 'active' : ''" class="btn btn-outline-success ml-auto">
                      <input  type="radio" autocomplete="off"> Yes
                    </label>
                    <label @click="$emit('data-changed', index + '.' + x + '.' + column['index'], 0)"  v-bind:class="formData[index + '.' + x + '.' + column['index']] * 1 === 0 ? 'active' : ''" class="btn btn-outline-danger mr-auto">
                      <input type="radio"  autocomplete="off"> No
                    </label>
                  </div>
                  <small v-if="typeof validationMessage[index + '.' + x + '.' + column['index']] !== 'undefined'" class="text-danger">{{validationMessage[index + '.' + x + '.' + column['index']]['message']}}</small>
                </template>
                <input v-else-if="column['type'] === 'checkbox'" @change="$emit('data-changed', index + '.' + x + '.' + column['index'], $event.target.value)" class="ml-auto mr-auto" type="checkbox" v-bind:value="formData[index + '.' + x + '.' + column['index']]" />
                <template v-else-if="column['type'] === 'select2'" >
                  <input-type @data-changed="dataChanged" :index="index + '.' + x + '.' + column['index']" type="select2" :config="column['config']" :form-data="formData" />
                </template>
              </td>
              <td>
                <button @click="deleteEntry(x)" class="btn btn-sm btn-outline-danger" type="button"><fa :icon="'trash-alt'" /></button>
              </td>
            </tr>
          </template>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td v-bind:colspan="Object.keys(columns).length + 1" ><button @click="addEntry" class="btn btn-sm btn-success float-right" type="button"><fa :icon="'plus'" /> Add Entry</button></td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import InputType from '@/vue-web-core/components/form/InputType/Yawa.vue'
import TextTransformHelper from '@/vue-web-core/helper/text-transform'
import APIUtil from '@/vue-web-core/helper/api/util.js'
export default {
  name: 'TableInput',
  components: {
    InputType
  },
  props: {
    config: Object,
    validationMessage: Object,
    index: String,
    formData: Object
  },
  data(){
    return {
      options: [], // object containing text, value, is_default.
      columns: {},
      emptyRowField: {},
      columnDefaultValues: {}
    }
  },
  mounted(){
    this.initConfig()
  },
  methods: {
    dataChanged(index, value){
      this.$emit('data-changed', index, value)
    },
    setColumnDefaultValue(row, formDataField, column){
      if(typeof this.columnDefaultValues[column] !== 'undefined' && (typeof this.formData[formDataField] === 'undefined' || this.formData[formDataField] === null)){
        this.$emit('data-changed', formDataField, this.columnDefaultValues[column])
      }
    },
    addEntry(){
      let newEntry = {}
      let lastArrayKey = typeof this.formData[this.index + '.last_array_key'] === 'undefined' ? 0 : this.formData[this.index + '.last_array_key'] + 1
      newEntry[this.index] = {}
      newEntry[this.index][lastArrayKey] = this.emptyRowField
      let newFormData = APIUtil.arrayToTextKey(newEntry)
      if(typeof this.formData[this.index + '.last_array_key'] === 'undefined'){
        this.$emit('data-changed', this.index + '.deleted_array_key', [])
        this.$emit('data-changed', this.index + '.array_key_list', [newFormData[this.index + '.last_array_key'] + ''])
        this.$emit('data-changed', this.index + '.last_array_key', newFormData[this.index + '.last_array_key'])
      }else{
        let arrayKeyList = this.formData[this.index + '.array_key_list']
        arrayKeyList.push(newFormData[this.index + '.last_array_key'] + '')
        this.$emit('data-changed', this.index + '.array_key_list', arrayKeyList)
      }
      delete newFormData[this.index + '.array_key_list']
      delete newFormData[this.index + '.deleted_array_key']
      for(let x in newFormData){
        this.$emit('data-changed', x, newFormData[x])
      }
    },
    deleteEntry(x){
      if(typeof this.formData[this.index + '.' + x + '.id'] !== 'undefined' && this.formData[this.index + '.' + x + '.id']){
        for(let column in this.emptyRowField){
          this.$emit('data-changed', this.index + '.' + x + '.' + column, null)
        }
        this.$emit('data-changed', this.index + '.' + x + '.deleted', true)
      }else{
        this.$emit('data-removed', this.index + '.' + x)

        let arrayKeyList = this.formData[this.index + '.array_key_list']
        arrayKeyList.splice(arrayKeyList.indexOf(x + ''), 1)
        this.$emit('data-changed', this.index + '.array_key_list', arrayKeyList)
      }
      this.formData[this.index + '.deleted_array_key'].push(x)
    },
    initConfig(){
      this.options = this.config['options']
      if(this.isset(this.config, 'columns')){
        let emptyRowField = {}
        this.columns = this.config.columns
        for(let column in this.columns){
          this.columns[column]['index'] = column
          this.setDefault(
            this.columns[column],
            'name',
            TextTransformHelper.toPhrase(column)
          )
          this.setDefault(
            this.columns[column],
            'type',
            'text'
          )
          if(typeof this.columns[column]['default_value'] !== 'undefined'){
            this.columnDefaultValues[column] = this.columns[column]['default_value']
          }
          emptyRowField[column] = null
        }
        this.emptyRowField = emptyRowField
      }else{
        console.error('Column required in table input', this.index)
      }
    },
    evaluateSelected(){

    }
  },
  watch: {
    formData(data){

    }
  }
}
</script>

import QueryBuilder from '@/vue-web-core/database/core/query-builder.js'
export default class Sync extends QueryBuilder{
  constructor(){
    super()
    this.tableName = 'sync'
  }
}
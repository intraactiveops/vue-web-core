import QueryBuilder from '@/vue-web-core/database/core/query-builder.js'
export default class Category extends QueryBuilder{
  constructor(){
    super()
    this.tableName = 'categories'

  }
}
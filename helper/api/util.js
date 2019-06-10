import Quick from '@/vue-web-core/helper/mixin/quick'
function extractTextArray(keyChain, array){
  let stringyfiedArray = {}
  let lastArrayKey = null
  let arrayKeyList = []
  for(let key in array){
    let newKey = (keyChain ? keyChain + '.' : '') + key
    if(typeof array[key] === 'object' && array[key] !== null){
      let moreStringifiedArray = extractTextArray(newKey, array[key])
      stringyfiedArray = { ...stringyfiedArray, ...moreStringifiedArray }
    }else{ // array
      stringyfiedArray[newKey] = array[key]
    }
    if(!isNaN(key * 1)){
      lastArrayKey = key * 1
    }
    arrayKeyList.push(key)
  }
  if(lastArrayKey !== null){
    stringyfiedArray[keyChain + '.last_array_key'] = lastArrayKey
    stringyfiedArray[keyChain + '.deleted_array_key'] = []
    stringyfiedArray[keyChain + '.array_key_list'] = arrayKeyList
  }
  return stringyfiedArray
}
export default {
  textKeyToArray(arr){
    let arrayData = {}
    for(let key in arr){
      let segmentedKey = key.split('.')
      let currentArray = arrayData
      for(let x = 0; x < segmentedKey.length; x++){
        if(x === segmentedKey.length - 1){ // last key and must assign value
          currentArray[segmentedKey[x]] = arr[key]
        }else{ // create object
          if(typeof currentArray[segmentedKey[x]] === 'undefined' || currentArray[segmentedKey[x]] === null){
            currentArray[segmentedKey[x]] = {}
            currentArray = currentArray[segmentedKey[x]]
          }else{
            currentArray = currentArray[segmentedKey[x]]
          }
        }
      }
    }
    return arrayData
  },
  arrayToTextKey(arr){
    let result = extractTextArray(null, arr)
    return result
  },
  generateSelecParameter(fieldList){
    let selectObject = {}
    let selectCount = {}
    let indexNumber = 0
    for(let x = 0; x < fieldList.length; x++){
      let segmentedField = fieldList[x].split('.')
      let segmentLength = segmentedField.length

      if(segmentLength === 1){
        selectObject[indexNumber++] = segmentedField[0]
      }else{
        let currentObject = selectObject

        for(let y = 0; y < segmentLength - 1; y++){
          Quick.setDefault(currentObject, segmentedField[y], { 'select': {} })
          // if(Quick.isNumeric(segmentedField[y])){
          //   currentObject['select'][segmentedField[y]]
          // }
          currentObject = currentObject[segmentedField[y]]['select']
        }
        let key = (segmentedField.splice(0, segmentLength - 1)).join('.')
        Quick.setDefault(selectCount, key, 0)
        selectCount[key]++

        // Quick.setDefault(currentObject, segmentedField[y-1], 0)
        currentObject[selectCount[key]] = segmentedField[0]
      }
    }
    return selectObject
  }
}

let getGeneralFileType = (type) => {
  if(type.indexOf('image') === 0){
    return 'image'
  }else if(type.indexOf('video') === 0){
    return 'video'
  }else if(type.indexOf('audio') === 0){
    return 'audio'
  }else{
    return 'file'
  }
}
let imageFileExtensions = ['png', 'jpg', 'jpeg']
let getFileDisplay = (type) => {
  if(type.indexOf('image') === 0){
    return 'fileImage'
  }else if(type.indexOf('video') === 0){
    return 'fileVideo'
  }else if(type.indexOf('audio') === 0){
    return 'fileAudio'
  }else{
    let knownFileType = {
      'word': { icon: 'file-word', color: '#285396' },
      'pdf': { icon: 'file-pdf', color: '#e73e32' },
      'spreadsheet': { icon: 'table', color: '#1d723b' },
      'excel': { icon: 'file-excel', color: '#1d723b' },
      'powerpoint': { icon: 'filePowerpoint', color: '#cc4424' },
      'csv': { icon: 'table', color: '#206f10' },
      'torrent': { icon: 'magnet', color: '#7cc450' }
    }
    for(let x in knownFileType){
      if((type.indexOf(x) !== -1)){
        return knownFileType[x]
      }
    }
    return { icon: 'file', color: 'gray' }
  }
}
let isWithin = (number, lower, upper) => {
  return number >= lower && number <= upper
}
export default{
  getGeneralFileType: getGeneralFileType,
  getFileDisplay: getFileDisplay,
  readableFileSize: (size, unit) => {
    if(typeof unit !== 'undefined'){
      unit = unit.toUpperCase()
    }
    let sizeStringLength = (size + '').length
    if(unit === 'B' || sizeStringLength < 4){
      return (size).toFixed(2) + ' Bytes'
    }
    if(unit === 'KB' || isWithin(sizeStringLength, 4, 6)){
      return (size / 1000).toFixed(2) + ' KB'
    }
    if(unit === 'MB' || isWithin(sizeStringLength, 7, 9)){
      return (size / 1000000).toFixed(2) + ' MB'
    }
    if(unit === 'GB' || isWithin(sizeStringLength, 10, 12)){
      return (size / 1000000000).toFixed(2) + ' GB'
    }
    if(unit === 'TB' || sizeStringLength > 12){
      return (size / 1000000000000).toFixed(2) + ' TB'
    }
  },
  isImage: (type) => {
    console.log(type, imageFileExtensions.indexOf(type.toLowerCase()))
    return imageFileExtensions.indexOf(type.toLowerCase()) !== -1
  },
  readFile: (file) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
      resolve(URL.createObjectURL(file))
      // reader.onload = function(e) {
      //   file.src = e.target.result
      //   resolve(e.target.result)
      // }
      // reader.onerror = function(e) {
      //   console.log('failed to load image')
      //   reject(false)
      // }
    })
  }
}

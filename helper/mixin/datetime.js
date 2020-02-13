import Vue from 'vue'
import QuickHelper from './quick'
let shortMonthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

let formatDate = (datetime, format) => {
  let datetimeObject = new Date(datetime)
  switch(format){
    case 'M d, yyyy hh:mm':
      return shortMonthName[datetimeObject.getMonth()] + ' ' + datetimeObject.getDate() + ', ' + datetimeObject.getFullYear() + ' ' + time12HourFormat(datetimeObject.getHours(), datetimeObject.getMinutes())
    case 'mm/dd/yy hh:mm':
      return QuickHelper.padNumber(datetimeObject.getMonth() + 1) + '/' + QuickHelper.padNumber(datetimeObject.getDate()) + '/' + QuickHelper.padNumber(datetimeObject.getYear() - 100) + ' ' + time12HourFormat(datetimeObject.getHours(), datetimeObject.getMinutes()) // QuickHelper.padNumber(datetimeObject.getHours()) + ':' + QuickHelper.padNumber(datetimeObject.getMinutes())
    default:
      return shortMonthName[datetimeObject.getMonth()] + ' ' + datetimeObject.getDate() + ', ' + datetimeObject.getFullYear()
  }
}
let time12HourFormat = (hour, minute, seconds) => {
  let median = 'am'
  if(hour * 1 > 12){
    hour = hour - 12
    median = 'pm'
  }else if(hour * 1 === 12){
    median = 'pm'
  }
  return hour + ':' + QuickHelper.padNumber(minute, 2) + (typeof seconds !== 'undefined' ? ':' + seconds : '') + ' ' + median
}
Vue.mixin({
  data(){
    return {

    }
  },
  methods: {
    serverDatetimeFormat(date, userServerTime, noHours){
      noHours = typeof noHours === 'undefined' ? false : noHours
      let jsDate = new Date(date)
      if(userServerTime){
        jsDate.setHours(jsDate.getHours() - 8)
      }
      let dateString = jsDate.getFullYear() + '-' + this.padNumber(jsDate.getMonth() + 1, 2) + '-' + this.padNumber(jsDate.getDate(), 2) + ' '
      let hourString = !noHours ? this.padNumber(jsDate.getHours(), 2) + ':' + this.padNumber(jsDate.getMinutes(), 2) + ':' + this.padNumber(jsDate.getSeconds(), 2) : '00:00:00'
      return dateString + hourString
    },
    time12HourFormat: time12HourFormat,
    formatDate: formatDate
  },
  filters: {
    formatDate: formatDate,
    datetimeLapse(actualDate){
      let date = new Date(actualDate)
      let dateTimestamp = ((date).getTime() / 1000) + 28800
      let currentTimestamp = (new Date()).getTime() / 1000
      let timeDifference = currentTimestamp - dateTimestamp
      if(timeDifference < 604800){
        if(timeDifference < 60){
          return Math.floor(timeDifference) + ' seconds ago'
        }else if(timeDifference < 3600){
          return Math.floor(timeDifference / 60) + ' minutes ago'
        }else if(timeDifference < 86400){
          return Math.floor(timeDifference / 3600) + ' hours ago'
        }else{
          return Math.floor(timeDifference / 86400) + ' days ago'
        }
      }else{
        return shortMonthName[date.getMonth()] + ' ' + date.getDate()
      }
    },
    toReadableDateTime(someDate){
      let date = new Date(someDate)
      if(someDate && !isNaN(date.getTime() * 1)){
        return QuickHelper.padNumber(date.getMonth() + 1) + '/' + QuickHelper.padNumber(date.getDate()) + '/' + date.getFullYear() + ' ' + time12HourFormat(date.getHours(), date.getMinutes())
      }else{
        return ''
      }
    }
  }
})

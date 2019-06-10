import Vue from 'vue'

let shortMonthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

let formatDate = (datetime, format) => {
  console.log(datetime)
  let datetimeObject = new Date(datetime)
  switch(format){
    default:
      return shortMonthName[datetimeObject.getMonth()] + ' ' + datetimeObject.getDate() + ', ' + datetimeObject.getFullYear()
  }
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
          return Math.floor(timeDifference) + ' sec'
        }else if(timeDifference < 3600){
          return Math.floor(timeDifference / 60) + ' min'
        }else if(timeDifference < 86400){
          return Math.floor(timeDifference / 3600) + ' hour'
        }else{
          return Math.floor(timeDifference / 86400) + ' day'
        }
      }else{
        return shortMonthName[date.getMonth()] + ' ' + date.getDate()
      }
    }
  }
})

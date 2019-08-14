// let baseURL = 'http://192.168.1.3/kibitz_api/public'
// let baseURL = 'http://localhost/kibitz_api/public'
// // let baseURL = 'http://1075dormitel.com/chatbot/kibitz_api/public'
// export default {
//   API_URL: baseURL + '/api',
//   BASE_URL: baseURL
// }

// let baseURL = 'http://localhost/intraactiveops/api/api-gateway/public'
// let fileServerURL = 'http://localhost/intraactiveops/api/file-server/public'
// let baseURL = 'http://ec2-54-81-22-4.compute-1.amazonaws.com/api-gateway/public'
// let fileServerURL = 'http://ec2-54-81-22-4.compute-1.amazonaws.com/file-server/public'
// let publicAsset = 'http://localhost/intraactiveops/api/public_asset'
if(typeof process.env.VUE_APP_API_URL === 'undefined'){
  alert('Make sure that .env exists')
}
console.log('ENV', process.env.VUE_APP_API_URL)
export default {
  API_URL: process.env.VUE_APP_API_URL,
  FILE_SERVER_URL: process.env.VUE_APP_FILE_SERVER_URL,
  BASE_URL: process.env.VUE_APP_BASE_URL,
}

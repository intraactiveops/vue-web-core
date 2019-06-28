// let baseURL = 'http://192.168.1.3/kibitz_api/public'
// let baseURL = 'http://localhost/kibitz_api/public'
// // let baseURL = 'http://1075dormitel.com/chatbot/kibitz_api/public'
// export default {
//   API_URL: baseURL + '/api',
//   BASE_URL: baseURL
// }

let baseURL = 'http://localhost/intraactiveops/api/api-gateway/public'
let fileServerURL = 'http://localhost/intraactiveops/api/file-server/public'
// let baseURL = 'http://ec2-54-161-197-150.compute-1.amazonaws.com/api-gateway/public'
// let fileServerURL = 'http://ec2-54-161-197-150.compute-1.amazonaws.com/file_server/public'
// let publicAsset = 'http://localhost/intraactiveops/api/public_asset'
export default {
  API_URL: baseURL + '/v1',
  FILE_SERVER_URL: fileServerURL,
  BASE_URL: baseURL,
}

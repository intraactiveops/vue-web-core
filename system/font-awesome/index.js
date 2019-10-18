import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

let freeSolid = require('@fortawesome/free-solid-svg-icons')
let iconUsed = ['faCoffee', 'faList', 'faUsers', 'faComments', 'faUserTie', 'faDotCircle', 'faPlus', 'faPrint', 'faDownload', 'faTrash', 'faTrashAlt', 'faSave', 'faCheck', 'faEdit',
  'faCheckCircle', 'faExclamationCircle', 'faComment', 'faQuestion', 'faInfo', 'faCog', 'faLongArrowAltUp', 'faLongArrowAltDown', 'faStopwatch', 'faArrowLeft', 'faEllipsisH', 'faReply',
  'faSearch', 'faUser', 'faCircle', 'faFolder', 'faBars', 'faCashRegister', 'faTasks', 'faCalculator', 'faTimes', 'faRedo', 'faTag', 'faInfoCircle', 'faToggleOn', 'faToggleOff', 'faPaperclip',
  'faMinusCircle', 'faFilter', 'faChevronLeft', 'faChevronRight', 'faHeart', 'faAddressBook', 'faAt', 'faEnvelope', 'faPhone', 'faPaperclip', 'faMapMarkerAlt', 'faPortrait', 'faUpload', 'faCropAlt',
  'faSortDown', 'faFileAlt', 'faEllipsisH', 'faUserTag', 'faMapMarkerAlt', 'faShoppingCart', 'faArrowRight', 'faEnvelope', 'faMailBulk', 'faReceipt', 'faBan', 'faPrint', 'faStar', 'faCircleNotch', 'faMoneyBill',
  'faBox', 'faTools', 'faFileContract', 'faPercent', 'faBoxes', 'faStore', 'faParking', 'faWifi', 'faServer', 'faThumbsUp', 'faComment', 'faHistory', 'faCalendarDay', 'faCaretDown', 'faPaperPlane', 'faArrowAltCircleRight',
  'faHome', 'faCloud', 'faProjectDiagram', 'faCreditCard', 'faTv', 'faArchive', 'faCalendarWeek', 'faPowerOff', 'faFeatherAlt', 'faPen', 'faClipboardCheck', 'faWindowMinimize', 'faWindowMaximize', 'faMinus',
  'faVideo', 'faPenSquare', 'faFlag', 'faDoorOpen', 'faArchive'
]
let fileIcon = ['faFile', 'faFileWord', 'faTable', 'faFileExcel', 'faFileCsv', 'faFilePdf', 'faFilePowerpoint', 'faFileImage', 'faFileVideo', 'faFileVideo', 'faMagnet']
iconUsed = iconUsed.concat(fileIcon)
for(let x = 0; x < iconUsed.length; x++){
  library.add(freeSolid[iconUsed[x]])
}

Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

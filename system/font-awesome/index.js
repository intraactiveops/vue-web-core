import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

let freeSolid = require('@fortawesome/free-solid-svg-icons')
let iconUsed = ['faCoffee', 'faList', 'faUsers', 'faComments', 'faUserTie', 'faDotCircle', 'faPlus', 'faPrint', 'faDownload', 'faTrash', 'faTrashAlt', 'faSave', 'faCheck', 'faEdit',
  'faCheckCircle', 'faExclamationCircle', 'faComment', 'faQuestion', 'faInfo', 'faCog', 'faLongArrowAltUp', 'faLongArrowAltDown', 'faStopwatch', 'faArrowLeft', 'faEllipsisH', 'faReply',
  'faSearch', 'faUser', 'faCircle', 'faFolder', 'faBars', 'faCashRegister', 'faTasks', 'faCalculator', 'faTimes', 'faRedo', 'faTag', 'faInfoCircle', 'faToggleOn', 'faToggleOff', 'faPaperclip',
  'faMinusCircle', 'faFilter', 'faChevronLeft', 'faChevronRight', 'faHeart', 'faAddressBook', 'faAt', 'faEnvelope', 'faPhone', 'faPaperclip', 'faMapMarkerAlt', 'faPortrait', 'faUpload', 'faCropAlt',
  'faSortDown', 'faFileAlt', 'faEllipsisH', 'faUserTag', 'faMapMarkerAlt', 'faShoppingCart', 'faArrowRight', 'faEnvelope', 'faMailBulk', 'faReceipt', 'faBan', 'faPrint', 'faStar', 'faCircleNotch', 'faMoneyBill',
  'faBox', 'faTools', 'faFileContract', 'faPercent', 'faBoxes', 'faStore', 'faParking', 'faWifi', 'faServer', 'faThumbsUp', 'faComment', 'faHistory', 'faCalendarDay', 'faCaretDown', 'faCaretRight', 'faPaperPlane', 'faArrowAltCircleRight',
  'faHome', 'faCloud', 'faProjectDiagram', 'faCreditCard', 'faTv', 'faCalendarWeek', 'faPowerOff', 'faFeatherAlt', 'faPen', 'faClipboardCheck', 'faWindowMinimize', 'faWindowMaximize', 'faMinus',
  'faVideo', 'faPenSquare', 'faFlag', 'faDoorOpen', 'faArchive', 'faBell', 'faExchangeAlt', 'faBold', 'faItalic', 'faStrikethrough', 'faUnderline', 'faCode', 'faParagraph', 'faListOl', 'faQuoteRight', 'faUndo', 'faRetweet',
  'faBookmark', 'faCode', 'faQuoteRight', 'faUserPlus', 'faCommentSlash', 'faCommentAlt', 'faCamera', 'faCalendar', 'faLink', 'faChevronDown', 'faUserCheck', 'faEllipsisV', 'faSmile', 'faClipboardList', 'faShare',
  'faSignOutAlt', 'faClock', 'faSms', 'faNetworkWired', 'faExternalLinkAlt', 'faSatelliteDish', 'faVial', 'faStar', 'faKey', 'faFingerprint', 'faCalendarPlus', 'faEllipsisV', 'faFlag', 'faExclamationTriangle', 'faDesktop', 'faArrowUp', 'faFlagCheckered', 'faMicrophoneAlt',
  'faChartLine', 'faCalendarCheck', 'faCalendarAlt', 'faHourglassHalf', 'faCheckSquare', 'faLock', 'faCartPlus', 'faTimesCircle', 'faHeadset', 'faQuestionCircle', 'faTachometerAlt', 'faUserFriends', 'faCircleNotch', 'faTabletAlt', 'faExclamation', 'faUserClock',
  'faBarcode', 'faClipboard', 'faPlay'
]
let fileIcon = ['faFile', 'faFileWord', 'faTable', 'faFileExcel', 'faFileCsv', 'faFilePdf', 'faFilePowerpoint', 'faFileImage', 'faFileVideo', 'faFileVideo', 'faMagnet', 'faFileArchive']
iconUsed = iconUsed.concat(fileIcon)
for(let x = 0; x < iconUsed.length; x++){
  library.add(freeSolid[iconUsed[x]])
}
library.add(faFacebookSquare)
Vue.component('fa', FontAwesomeIcon)
Vue.component('fa-layers', FontAwesomeLayers)
Vue.component('fa-layers-text', FontAwesomeLayersText)

Vue.config.productionTip = false

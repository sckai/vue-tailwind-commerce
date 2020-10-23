import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTachometerAlt, faStore, faListAlt, faTicketAlt, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTachometerAlt, faStore, faListAlt, faTicketAlt, faSpinner)

Vue.component('font-awesome-icon', FontAwesomeIcon)

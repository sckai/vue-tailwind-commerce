import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTachometerAlt, faStore, faListAlt, faTicketAlt, faSpinner, faShoppingCart, faBars, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTachometerAlt, faStore, faListAlt, faTicketAlt, faSpinner, faShoppingCart, faBars, faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

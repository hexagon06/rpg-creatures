

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import {
  faArrowUpRightFromSquare, faStar as faStarSolid, faKey, faUser, faPlus, faCopy,
  faXmark, faCheck, faArrowLeft, faSave, faCross, faPen, faCircleDot, faMinus, faImage, faUserPlus, faUserSecret, faList, faAlignLeft, faHeading, faLink, faTrash, faAngleUp, faAngleDown, faBars, faFilter, faWeightHanging, faRepeat, faLinkSlash, faVirus, faVirusSlash, faDiceD20, faPlay, faUpRightAndDownLeftFromCenter, faDownLeftAndUpRightToCenter, faChevronDown
} from '@fortawesome/free-solid-svg-icons'
import { faStar, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import Vue for adding the component */
import Vue from 'vue'


export function addFontAwesome () {
  /* add icons to the library */
  library.add(
    faArrowUpRightFromSquare,
    faStar,
    faStarSolid,
    faPenToSquare,
    faKey,
    faUser,
    faXmark,
    faCheck,
    faArrowLeft,
    faSave,
    faPen,
    faCircleDot,
    faPlus,
    faCopy,
    faMinus,
    faImage,
    faUserPlus,
    faUserSecret,
    faList,
    faAlignLeft,
    faHeading,
    faLink,
    faTrash,
    faAngleUp,
    faAngleDown,
    faBars,
    faFilter,
    faWeightHanging,
    faRepeat,
    faLink,
    faLinkSlash,
    faVirus,
    faVirusSlash,
    faDiceD20,
    faPlay,
    faUpRightAndDownLeftFromCenter,
    faDownLeftAndUpRightToCenter,
    faChevronDown,
  )
  /* add font awesome icon component */
  Vue.component('font-awesome-icon', FontAwesomeIcon)
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { addFontAwesome } from './font-awesome'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import './scss/custom.scss'
import { addSharedComponents, addCreatureComponents, addShopComponents } from '@/components'

addFontAwesome()
addSharedComponents()
addCreatureComponents()
addShopComponents()
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

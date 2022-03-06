import Vue from 'vue'
// Markdown Editor
import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import enUS from '@kangc/v-md-editor/lib/lang/en-US'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import hljs from 'highlight.js'
VMdEditor.use(githubTheme, {
  Hljs: hljs,
})
VMdEditor.lang.use('en-US', enUS)
Vue.use(VMdEditor)
VMdPreview.use(githubTheme, {
  Hljs: hljs,
})
Vue.use(VMdPreview)
// standard vue stuff
import App from './App.vue'
import router from './router'
import { store } from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { addFontAwesome } from './font-awesome'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import './scss/custom.scss'
import { addSharedComponents, addCreatureComponents, addShopComponents, addAbilityComponents, addUserComponents } from '@/components'

addFontAwesome()
addSharedComponents()
addCreatureComponents()
addShopComponents()
addAbilityComponents()
addUserComponents()
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

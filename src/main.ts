import { createApp } from 'vue';
import 'tw-elements';
// Markdown Editor
import VMdEditor from '@kangc/v-md-editor';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import hljs from 'highlight.js';
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.lang.use('en-US', enUS);

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
// standard vue stuff
import router from './router';
import { addFontAwesome } from './font-awesome';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import './scss/custom.scss';
import './assets/tailwind.css';
import { addAllComponents } from '@/components';
// Vue Tailwind
// import {
//   // TInput,
//   // TTextarea,
//   TSelect,
//   // TRadio,
//   // TCheckbox,
//   // TButton,
//   // TInputGroup,
//   // TCard,
//   // TAlert,
//   // TModal,
//   TDropdown,
//   TRichSelect,
//   // TPagination,
//   // TTag,
//   // TRadioGroup,
//   // TCheckboxGroup,
//   // TTable,
//   // TDatepicker,
//   // TToggle,
//   // TDialog,
// } from 'vue-tailwind/dist/components'
const settings = {
  // https://www.vue-tailwind.com/docs/input-group
  // Use the following syntax
  // {component-name}: {
  //   component: {importedComponentObject},
  //   props: {
  //     {propToOverride}: {newDefaultValue}
  //     {propToOverride2}: {newDefaultValue2}
  //   }
  // }
  // "t-select": {
  //   component: TSelect,
  // },
  // "t-dropdown": {
  //   component: TDropdown,
  // },
  // "t-rich-select": {
  //   component: TRichSelect,
  // },
  // ...Rest of the components
};

// Pinia store
import { createPinia, PiniaVuePlugin } from 'pinia';
const pinia = createPinia();


// Vue.config.productionTip = false
import App from './App.vue'
import PrimeVue from 'primevue/config';//theme
import 'primevue/resources/themes/lara-light-indigo/theme.css';

const app = createApp(App);

addAllComponents(app);
addFontAwesome(app);
app.use(pinia);
app.use(router);
app.use(PiniaVuePlugin);
// app.use(VueTailwind, settings);
app.use(VMdEditor);
app.use(VMdPreview);
app.use(PrimeVue);


app.mount('#app');
// new Vue({
//   router,
//   pinia,
//   render: h => h(App)
// }).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as vueGoogleMaps from 'vue2-google-maps'
import { key } from '../config'

Vue.config.productionTip = false
Vue.use(vueGoogleMaps, {
  installComponents: true,
  load: {
    key: key,
    libraries: 'places',
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './registerServiceWorker'
import store from './store'
import i18n from './i18n'
import App from './App.vue'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './config/axios'
import './config/msgs'
import 'font-awesome/css/font-awesome.css'
import { VueMaskDirective } from 'v-mask'

Vue.config.productionTip = false
Vue.directive('mask', VueMaskDirective);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')









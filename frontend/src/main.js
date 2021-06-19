import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './config/axios'
import './config/msgs'
import 'font-awesome/css/font-awesome.css'
import VueTheMask from 'vue-the-mask'
import VueDisqus from 'vue-disqus'
import VueInstagram from 'vue-instagram'
import VueApexCharts from 'vue-apexcharts'

 
Vue.config.productionTip = false

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VueInstagram)
Vue.use(VueTheMask)
Vue.use(VueDisqus, {
  shortname: 'encontre-um-amigo'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')









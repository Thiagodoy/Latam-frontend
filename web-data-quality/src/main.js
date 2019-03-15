import Vue from 'vue'
import App from './App.vue'
import router from './route/routes'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import  '../src/assets/css/styles-global.css'
import VueI18n from 'vue-i18n'


let messages = require('./i18n/lang.js')
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en_USA', // set locale
  messages
})

console.log('i18n',i18n)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  
  
  render: h => h(App),
}).$mount('#app')

export {
  i18n
}



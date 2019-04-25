import Vue from 'vue';
import App from './App.vue';
import router from './route/routes';
import 'bootstrap';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/styles-global.css';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import Diretivas from './directives/index';
import { plugin } from './validators/index';
import store from './store/index';





Vue.use(plugin);
Vue.use(Diretivas);
Vue.use(VeeValidate, {
    // i18nRootKey: 'validations', // customize the root path for validation messages.
    i18n,
});

//Vue.use(VueValidate);

let messages = require('./i18n/lang.js')
Vue.use(VueI18n)

const i18n = new VueI18n({ locale: 'pt_BR', messages });

Vue.config.productionTip = false





new Vue({
    router,
    store,
    i18n,

    render: h => h(App),
}).$mount('#app');

console.log('i18n', i18n);

export {
    i18n
}
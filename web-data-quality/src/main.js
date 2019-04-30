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
import { plugin, dictionary } from './validators/index';
import store from './store/index';
import filter from './filter/index';
import VueSession from 'vue-session';
import MiximModal from './mixins/modal';

//Mixins
Vue.mixin(MiximModal);

Vue.use(VueSession);
Vue.use(filter);
Vue.use(plugin);
Vue.use(Diretivas);
Vue.use(VeeValidate, {
    i18n,
    dictionary
});

//Vue.use(VueValidate);

let messages = require('./i18n/lang.js')
Vue.use(VueI18n)

const i18n = new VueI18n({ locale: 'pt_BR', messages });

Vue.config.productionTip = false;

const instance = new Vue({
    router,
    store,
    i18n,

    render: h => h(App),
}).$mount('#app');

export {
    i18n,
    instance
}
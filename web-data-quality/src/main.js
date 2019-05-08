import Vue from 'vue';
import App from './App.vue';
import router from './route/routes';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/styles-global.scss';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import Diretivas from './directives/index';
import { plugin, dictionary } from './validators/index';
import store from './store/index';
import filter from './filter/index';
import VueSession from 'vue-session';
import MiximModal from './mixins/modal';
import { VueMaskDirective } from "v-mask";

import Autocomplete from 'v-autocomplete'
import 'v-autocomplete/dist/v-autocomplete.css'
import datepickercss from '../src/assets/css/datepicker.css';
import "./assets/css/multselect.css";
import 'jquery';
import ComponentsPlugin from './components/index';

Vue.use(ComponentsPlugin);

// CASL
//Vue.use(abilitiesPlugin, abilitiesFactory.build(null));

//auto complete
Vue.use(Autocomplete)

Vue.com

//Mask
Vue.directive("mask", VueMaskDirective);

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
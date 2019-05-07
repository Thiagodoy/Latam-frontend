

import datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";

const plugin = {};
plugin.install = function(Vue, options) {    
    Vue.component('datepicker', datepicker);
};

export default plugin;

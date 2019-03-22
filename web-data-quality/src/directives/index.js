import async from './async'
export default {
    install(Vue, options) {
        Vue.directive('async', async);
    }
}
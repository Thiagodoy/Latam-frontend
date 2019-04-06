import {date, dateTime, time, dateFull, secondsFormat} from './date'
import {join, cpfCnpj, phone, firstWord, fromSecWord} from './string'
import {money, cents, percent, centsNoSymbol, moneyNoCents} from './number'

const plugin = {};

plugin.install = function (Vue, options) {
  Vue.filter('date', date);
  Vue.filter('dateTime', dateTime);
  Vue.filter('time', time);
  Vue.filter('dateFull', dateFull);
  Vue.filter('secondsFormat', secondsFormat);

  Vue.filter('join', join);
  Vue.filter('cpfCnpj', cpfCnpj);
  Vue.filter('phone', phone);
  Vue.filter('firstWord', firstWord);
  Vue.filter('fromSecWord', fromSecWord);

  Vue.filter('money', money);
  Vue.filter('cents', cents);
  Vue.filter('percent', percent);
  Vue.filter('centsNoSymbol', centsNoSymbol);
  Vue.filter('moneyNoCents', moneyNoCents);
};

export default plugin;

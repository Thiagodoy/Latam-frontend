import * as _ from 'lodash';


/**
 * Formata um valor para "dinheiro"
 *
 * @param value valor
 * @param currency a moeda para formatar
 * @param locale
 */
export function money(value, currency='BRL', locale='pt-BR') {
  if (value === undefined || value === null) return value;

  if (_.isString(value)) {
    value = parseFloat(value);
  }

  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency
  })
}

/**
 * Formata um valor inteiro em centavos para "dinheiro"
 *
 * @param value em centavos
 * @param currency a moeda para formatar
 * @param locale
 */
export function centss(value, currency='BRL', locale='pt-BR') {
  if (value === undefined || value === null || !$.isNumeric(value)) return value;

  if (_.isString(value)) {
    value = parseFloat(value);
  }

  value /= 100.0;

  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency
  }).replace(/^[^0-9]*/g, '');
}

/**
 * Formata um valor inteiro em centavos para "dinheiro"
 *
 * @param value em centavos
 * @param currency a moeda para formatar
 * @param locale
 */
export function cents(value, currency='BRL', locale='pt-BR') {
  if (value === undefined || value === null || !$.isNumeric(value)) return value || "";

    var re = '\\d(?=(\\d{' + (3 || 3) + '})+' + (2 > 0 ? '\\D' : '$') + ')',
        num = (value/100).toFixed(Math.max(0, ~~2));

    return 'R$ ' + (',' ? num.replace('.', ',') : num).replace(new RegExp(re, 'g'), '$&' + ('.' || ','));
}


export function percent(value) {
  if (value === undefined || value === null) return value;

  if (_.isString(value)) {
    value = parseFloat(value);
  }

  value *= 100.0;
  return Math.round(value);
}

export function centsNoSymbol(value, currency='BRL', locale='pt-BR') {
  if (value === undefined || value === null || !$.isNumeric(value)) return value || "";

    var re = '\\d(?=(\\d{' + (3 || 3) + '})+' + (2 > 0 ? '\\D' : '$') + ')',
        num = (value/100).toFixed(Math.max(0, ~~2));

    return (',' ? num.replace('.', ',') : num).replace(new RegExp(re, 'g'), '$&' + ('.' || ','));
}

export function moneyNoCents(value, currency='BRL', locale='pt-BR') {
  if (value === undefined || value === null || !$.isNumeric(value)) return value || "";

    var re = '\\d(?=(\\d{' + (3 || 3) + '})+' + (2 > 0 ? '\\D' : '$') + ')',
        num = (value/100).toFixed(Math.max(0, ~~2));

    let n = (',' ? num.replace('.', ',') : num).replace(new RegExp(re, 'g'), '$&' + ('.' || ','));
    return n.substring(0, n.length-3);
}

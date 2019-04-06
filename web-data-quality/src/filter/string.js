import * as _ from 'lodash';

export function join(value, separator=', ') {
  return _.join(value, separator);
}

export function cpfCnpj(data){
  data = data.replace(/\D/g, "");

  if (data.length < 14) {
    // CPF
    data = data.replace(/(\d{3})(\d)/, '$1.$2');
    data = data.replace(/(\d{3})(\d)/, '$1.$2');
    data = data.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // CNPJ
    data = data.replace(/^(\d{2})(\d)/, '$1.$2');
    data = data.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    data = data.replace(/\.(\d{3})(\d)/, '.$1/$2');
    data = data.replace(/(\d{4})(\d)/, '$1-$2');
  }
  return data;

}

export function phone(data){
  if(!data)
    return "";

  data = data.replace(/\D/g, "");

  if(data.length < 2)
    return data;
  else if (data.length <= 6) {
    return `(${data.substring(0,2)})${data.substring(2,6)}`
  }
  else if (data.length <= 10) {
    // tel
    return `(${data.substring(0,2)})${data.substring(2,6)}-${data.substring(6,10)}`
  } else {
    // cel
    return `(${data.substring(0,2)})${data.substring(2,7)}-${data.substring(7,11)}`
  }

}

export function firstWord(data){
  if(!data)
    return "";

  return data.substring(0, data.indexOf(" "));
}

export function fromSecWord(data){
  if(!data)
    return "";

  return data.substring(data.indexOf(" ")).trim();
}

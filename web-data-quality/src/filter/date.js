import moment from 'moment'
moment.locale('pt-br');

export function date(value, format='L') {
  if (value === undefined || value === null) return value;

  let d = moment(value).format(format);
  return d == "Invalid date" ? value : d;
}




export function dateDay(value, format='DD') {
  if (value === undefined || value === null) return value;

  let d = moment(value).format(format);
  return d == "Invalid date" ? value : d;
}

export function dateMonth(value, format='MM') {
  if (value === undefined || value === null) return value;

  let d = moment(value).format(format);
  return d == "Invalid date" ? value : d;
}

export function dateYear(value, format='YYYY') {
  if (value === undefined || value === null) return value;

  let d = moment(value).format(format);
  return d == "Invalid date" ? value : d;
}




export function dateTime(value, format='L LT') {
  return date(value, format);
}

export function time(value, format='LT') {
  return date(value, format);
}

export function brToAm(data){
  if(data.length != 10)
    return "";
  let d = data.split("/");
  return d[2] + '-' + d[1] + '-' + d[0];
}

export function dateFull(value, format='DD [de] MMMM [de] YYYY') {
  return date(value, format);
}


export function secondsFormat(value){
  if(!value)
    return "";
  let days = Math.floor(value / 86400);
  let hours = Math.floor( (value-days*86400) / 3600);
  let minutes = Math.floor( (value - days*86400 - hours*3600) / 60);
  let str = "";
  if(days>0)
    str += days + " dias ";

  if(hours>0)
    str += hours + " horas e ";

  str += `${minutes} minutos`;

  return str;
}

export function secondsFormatShort(value){
  if(!value)
    return "";
  let days = Math.floor(value / 86400) + "";
  let hours = Math.floor( (value-days*86400) / 3600) + "";
  let minutes = Math.floor( (value - days*86400 - hours*3600) / 60) + "";
  let str = days.padStart(2, "0") + ":" + hours.padStart(2, "0") + ":" + minutes.padStart(2, "0");

  return str;
}

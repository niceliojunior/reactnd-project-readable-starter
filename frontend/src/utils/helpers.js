import moment from "moment";

export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function dateFormat(cell, row) {
  return moment(cell).toNow(true);
}
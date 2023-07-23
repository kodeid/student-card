import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const formatDate = (date) => {
  if (!date) {
    return null;
  }
  if (date.includes('/')) {
    if (date.split('/').length > 2) {
      date = dayjs(date, 'DD/MM/YYYY'); // 23/12/2022
    }
  }
  let formated = dayjs(date).isValid() ? dayjs(date).format('DD MMM YYYY') : date;
  return formated;
};

export const formatDateWithDay = (date) => {
  if (!date) {
    return null;
  }
  if (date.includes('/')) {
    if (date.split('/').length > 2) {
      date = dayjs(date, 'DD/MM/YYYY'); // 23/12/2022
    }
  } else if (date.includes('-')) {
    date = dayjs(date, 'DD-MM-YYYY');
  }
  let formated = dayjs(date).isValid() ? dayjs(date).format('dddd, DD MMM YYYY') : date;
  return formated;
};

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const hoursBetweenDates = (startDate: Date, endDate: Date) => {
  return dayjs(startDate).diff(endDate, 'hours');
};

export const toUTCDate = (date: Date | string) => {
  return dayjs(date).utc().local().toDate();
};

export const dateUTCNow = () => {
  return dayjs().utc().local().toDate();
};

export const daysBetweenDates = (startDate: Date, endDate: Date) => {
  return dayjs(startDate).diff(endDate, 'days');
};

export const addDaysToDate = (days: number, date = new Date()) => {
  return dayjs(date).add(days, 'days').toDate();
};

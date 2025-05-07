import { dateformats } from '@/constants';
import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  const days = ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota'];
  const day = days[date.getDay()];
  const formatted = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}, ${day}`;
  return formatted;
}

export const formatDateToISOLocal = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
}

export const formatISOLocalToHumanReadable = (date: Date | string | null): string => {
  if (!date) {
    return dateformats.DISABLED_DATE;
  }

  if (date instanceof Date) {
    return format(date, 'dd.MM.yyyy');
  }

  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}

export const compareDates = (date1: Date, date2: Date): number => {
  if (
    date1.getFullYear() < date2.getFullYear() ||
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() < date2.getMonth()) ||
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() < date2.getDate())
  ) {
    return -1;
  } else if (
    date1.getFullYear() > date2.getFullYear() ||
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() > date2.getMonth()) ||
    (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() > date2.getDate())
  ) {
    return 1;
  } else {
    // Dates are equal
    return 0;
  }
}

export const parseHumanReadableDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
};

export const parseHumdanReadableDateRange = (dateRange: string): [Date, Date] => {
  const dateRangePattern = /\((\d{2}\.\d{2}\.\d{4}) - (\d{2}\.\d{2}\.\d{4})\)/;
  const [, startDateStr, endDateStr] = dateRange.match(dateRangePattern)!;

  const startDate = parseHumanReadableDate(startDateStr);
  const endDate = parseHumanReadableDate(endDateStr);

  return [startDate, endDate];
}

export const getFirstDayOfYear = (): Date => {
  return new Date(new Date().getFullYear(), 0, 1);
}

export const getLastDayOfYear = (): Date => {
  return new Date(new Date().getFullYear(), 11, 31);
}

export const calculateAge = (birthDate: Date | null): number | null => {
  if (!birthDate) {
    return null;
  }
  return Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
}

export const getAgeFormatted = (birthDate: Date | null): string => {
  const age = calculateAge(birthDate);
  if (age === null) {
    return "";
  }
  switch (age) {
    case 1:
      return `${age} rok`;
    case 2:
    case 3:
    case 4:
      return `${age} roky`;
    default:
      return `${age} rokov`;
  }
}

/**
* Function to check if a date range is active
* @param {string} range - The date range in the format "(dd.MM.yyyy - dd.MM.yyyy)"
* @param {Date} dateToCompare - The date to check against (default is today's date)
* @returns {boolean} - Returns true if the current date is within the range, false otherwise
*/
export const isDateRangeActive = (range: string, dateToCompare: Date = new Date()): boolean => {
  const [startDate, endDate] = parseHumdanReadableDateRange(range)
  return dateToCompare >= startDate && dateToCompare <= endDate;
};
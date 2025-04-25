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
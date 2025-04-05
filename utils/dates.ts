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

export const formatISOLocalToHumanReadable = (date: string | null): string => {
  if (!date) {
    return dateformats.DISABLED_DATE;
  }
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}
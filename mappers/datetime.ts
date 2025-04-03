import { ScheduleTime } from "@/types/schedule";

export const mapDbTimeToScheduleTime = (dbTime: string): ScheduleTime => {
  return {
    hours: dbTime.split(":")[0],
    minutes: dbTime.split(":")[1],
  };
}

export const mapDbTimeToDate = (dbTime: string): Date => {
  return new Date(`1970-01-01T${dbTime}Z`);
}

export const mapDbDateToDate = (dbDate: string): Date => {
  const date = new Date(dbDate);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
}

export const mapTimeToString = (time: Date): string => {
  return `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`
}

export const mapDateToString = (date: Date): string => {
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`
}
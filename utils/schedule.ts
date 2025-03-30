import { ColorStyles } from "@/types/base";
import { ScheduleTime } from "@/types/models/activities";

export const getColorByTime = (scheduleTime: ScheduleTime): ColorStyles => {
  const { hours: scheduleHour, minutes: scheduleMinute } = scheduleTime;
  const [currentHour, currentMinute] = [new Date().getHours(), new Date().getMinutes()];

  const isPast = parseInt(scheduleHour) < currentHour || (parseInt(scheduleHour) === currentHour && parseInt(scheduleMinute) < currentMinute);

  return isPast ? "background" : "secondary";
}
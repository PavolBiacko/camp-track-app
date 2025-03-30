import { ScheduleTime } from "@/types/models/activities";

export const mapDbTimeToScheduleTime = (dbTime: string): ScheduleTime => {
  return {
    hours: dbTime.split(":")[0],
    minutes: dbTime.split(":")[1],
  };
}
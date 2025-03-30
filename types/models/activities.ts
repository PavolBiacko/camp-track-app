export type Activity = {
  id: number,
  name: string,
  time: ScheduleTime,
  date: Date | null,
  leaderId: string | null,
  createdAt: Date,
}

export type ScheduleTime = {
  hours: string;
  minutes: string;
}
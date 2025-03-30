export type Activity = {
  id: number,
  name: string,
  time: ScheduleTime,
  date: Date | null,
  leaderId: string | null,
  createdAt: Date,
}

// strings because of left side zeros
export type ScheduleTime = {
  hours: string;
  minutes: string;
}
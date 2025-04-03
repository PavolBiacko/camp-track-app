import { ScheduleTime } from "../schedule"

export type Activity = {
  id: number,
  name: string,
  time: ScheduleTime,
  date: Date | null,
  leaderId: string | null,
  createdAt: Date,
}

// TODO
export type AddActivity = {
  name: string,
  description?: string | null,
  time: string,
  date?: string | null,
  leaderId?: string | null,
}

// TODO
export type EditActivity = {
  name?: string,
  description?: string | null,
  time?: string,
  date?: Date | null,
  leaderId?: string | null,
}
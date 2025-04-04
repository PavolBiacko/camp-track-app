import { ScheduleTime } from "../schedule"

export type Activity = {
  id: number,
  name: string,
  description: string | null,
  time: ScheduleTime,
  date: Date | null,
  leaderId: string | null,
  createdAt: Date,
}

// TODO
export type ActivityCreate = {
  name: string,
  description?: string | null,
  time: string,
  date?: string | null,
  leaderId?: string | null,
}

// TODO
export type ActivityUpdate = {
  name?: string,
  description?: string | null,
  time?: string,
  date?: string | null,
  leaderId?: string | null,
}
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

export type ActivityCreate = {
  name: string,
  description?: string | null,
  time: string,
  date?: string | null,
  leaderId?: string | null,
}

export type ActivityUpdate = {
  name?: string,
  description?: string | null,
  time?: string,
  date?: string | null,
  leaderId?: string | null,
}
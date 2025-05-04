import { CampSession } from "@/types/models/campSessions"

export type CampSessionBoxProps = {
  year: CampSession[],
}

export type CampSessionLineProps = {
  beginDate: Date,
  endDate: Date,
  order: number,
}
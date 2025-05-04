import { CampSession } from "@/types/models/campSessions"

export type CampSessionBoxProps = {
  year: CampSession[],
}

export type CampSessionLineProps = {
  order: number,
  campSession: CampSession,
}

export type CampSessionParams = {
  campSessionId: string,
}
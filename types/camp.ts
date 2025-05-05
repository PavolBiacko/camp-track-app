import { CampSession } from "@/types/models/campSessions"
import { Child } from "@/types/models/children"

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

export type CampChildrenLineProps = {
  child: Child,
}

export type CampChildParams = {
  childId: string,
}
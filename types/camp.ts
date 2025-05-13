import { CampSession } from "@/types/models/campSessions"
import { Child } from "@/types/models/children"
import { GroupComplex } from "@/types/models/groups"

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

export type CampGroupsBoxProps = {
  sessionGroups: GroupComplex[],
}

export type CampGroupsLineProps = {
  group: GroupComplex,
}

export type CampGroupsLineTextProps = {
  firstName?: string,
  lastName?: string,
}
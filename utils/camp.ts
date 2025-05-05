import { mapCampSessionUpdateToCampSessionCoreWithDates } from "@/mappers/campSessions";
import { FieldBasics } from "@/types/custom/field";
import { CampSession, CampSessionCreate, CampSessionUpdate } from "@/types/models/campSessions";
import { ChildCreate, ChildUpdate } from "@/types/models/children";

export const groupCampSessionsByYear = (sessions: CampSession[]): CampSession[][] => {
  const result: CampSession[][] = [];
  let currentYear: number | null = null;
  let currentGroup: CampSession[] = [];

  sessions.forEach(session => {
    const year = session.beginDate.getFullYear();

    // If the year changes or it's the first session, start a new group
    if (currentYear !== year) {
      if (currentGroup.length > 0) {
        result.push(currentGroup);
      }
      currentGroup = [session];
      currentYear = year;
    } else {
      // Same year, add to the current group
      currentGroup.push(session);
    }
  });

  // Push the last group if it exists
  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  return result;
}

export const getCampSessionFormFields = <T extends CampSessionCreate | CampSessionUpdate>(fields: FieldBasics<T>[]) => {
  return {
    beginDateField: fields[0],
    endDateField: fields[1],
  }
}

export const isCampSessionIntersecting = (
  allCampSessions: CampSession[],
  campSessionToCheck: CampSessionUpdate,
  campSessionId: number | null
): boolean => {
  const newCampSession = mapCampSessionUpdateToCampSessionCoreWithDates(campSessionToCheck);
  const otherCampSessions = allCampSessions.filter(campSession => campSession.id !== campSessionId);
  return otherCampSessions.some(campSession => {
    return newCampSession.endDate! >= campSession.beginDate && newCampSession.beginDate! <= campSession.endDate;
  });
}

export const getCampChildrenFormFields = <T extends ChildCreate | ChildUpdate>(fields: FieldBasics<T>[]) => {
  return {
    firstNameField: fields[0],
    lastNameField: fields[1],
    birthDateField: fields[2],
    genderField: fields[3],
  }
}
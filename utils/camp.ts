import { mapCampSessionUpdateToCampSessionCoreWithDates } from "@/mappers/campSessions";
import { FieldBasics } from "@/types/custom/field";
import { CampSession, CampSessionCreate, CampSessionUpdate } from "@/types/models/campSessions";
import { ChildCreate, ChildUpdate } from "@/types/models/children";
import { GroupComplex, GroupCreateFormInputs, GroupUpdateFormInputs } from "@/types/models/groups";

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

export const groupCampGroupsBySession = (groups: GroupComplex[]): GroupComplex[][] => {
  const result: GroupComplex[][] = [];
  let currentSessionId: number | null = null;
  let currentGroup: GroupComplex[] = [];

  groups.forEach(group => {
    const sessionId = group.sessionId;

    // If the sessionId changes or it's the first group, start a new group
    if (currentSessionId !== sessionId) {
      if (currentGroup.length > 0) {
        currentGroup.sort((a, b) => a.number - b.number);
        result.push(currentGroup);
      }
      currentGroup = [group];
      currentSessionId = sessionId;
    } else {
      // Same sessionId, add to the current group
      currentGroup.push(group);
    }
  });

  // Push the last group if it exists
  if (currentGroup.length > 0) {
    currentGroup.sort((a, b) => a.number - b.number);
    result.push(currentGroup);
  }

  return result;
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

export const getCampSessionFormFields = <T extends CampSessionCreate | CampSessionUpdate>(fields: FieldBasics<T>[]) => {
  return {
    beginDateField: fields[0],
    endDateField: fields[1],
  }
}

export const getCampChildrenFormFields = <T extends ChildCreate | ChildUpdate>(fields: FieldBasics<T>[]) => {
  return {
    firstNameField: fields[0],
    lastNameField: fields[1],
    birthDateField: fields[2],
    genderField: fields[3],
  }
}

export const getCampGroupFromFields = <T extends GroupCreateFormInputs | GroupUpdateFormInputs>(fields: FieldBasics<T>[]) => {
  return {
    numberField: fields[0],
    nameField: fields[1],
    sessionField: fields[2],
    leaderField: fields[3],
    childrenField: fields[4],
  }
}

export const getChildrenButtonTextFormated = (count: number): string => {
  switch (count) {
    case 0:
      return "-";
    case 1:
      return `${count} vybrané dieťa`;
    case 2:
    case 3:
    case 4:
      return `${count} vybrané deti`;
    default:
      return `${count} vybraných detí`;
  }
}
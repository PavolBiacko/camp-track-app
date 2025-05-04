import { CampSession } from "@/types/models/campSessions";

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
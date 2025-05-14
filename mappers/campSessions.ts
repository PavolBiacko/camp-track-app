import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types";
import { PickerItem } from "@/types/base";
import { CampSession, CampSessionCoreWithDates, CampSessionCreate, CampSessionUpdate } from "@/types/models/campSessions";
import { formatISOLocalToHumanReadable } from "@/utils/dates";

const BASE_PICKER_DATA = [{ id: null, showedText: '-' }];

export const mapDbCampSessionToCampSession = (dbCampSeassion: Tables<"camp_sessions">): CampSession => {
  return {
    id: dbCampSeassion.id,
    beginDate: new Date(dbCampSeassion.begin_date),
    endDate: new Date(dbCampSeassion.end_date),
    createdAt: new Date(dbCampSeassion.created_at)
  };
};

export const mapCampSessionCreateToDbCampSession = (campSession: CampSessionCreate): TablesInsert<"camp_sessions"> => {
  return {
    begin_date: campSession.beginDate,
    end_date: campSession.endDate,
  };
}

export const mapCampSessionUpdateToDbCampSession = (campSession: CampSessionUpdate): TablesUpdate<"camp_sessions"> => {
  return {
    begin_date: campSession.beginDate,
    end_date: campSession.endDate,
  };
}

export const mapCampSessionUpdateToCampSessionCoreWithDates = (campSession: CampSessionUpdate): CampSessionCoreWithDates => {
  return {
    beginDate: campSession.beginDate ? new Date(campSession.beginDate) : undefined,
    endDate: campSession.endDate ? new Date(campSession.endDate) : undefined,
  };
}

const mapCampSessionToPickerItem = (campSession: CampSession): PickerItem => {
  const beginDate = formatISOLocalToHumanReadable(campSession.beginDate);
  const endDate = formatISOLocalToHumanReadable(campSession.endDate);

  return {
    id: String(campSession.id),
    showedText: `${beginDate} - ${endDate}`,
  };
}

export const mapManyCampSessionsToPickerItems = (campSessions: CampSession[] | undefined): PickerItem[] => {
  if (campSessions === undefined || campSessions.length === 0) {
    return BASE_PICKER_DATA;
  }

  return [
    ...BASE_PICKER_DATA,
    ...campSessions.map((campSession) => mapCampSessionToPickerItem(campSession))
  ];
}
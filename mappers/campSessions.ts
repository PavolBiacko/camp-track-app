import { Tables } from "@/supabase/types";
import { CampSession } from "@/types/models/campSessions";

export const mapDbCampSessionToCampSession = (dbCampSeassion: Tables<"camp_sessions">): CampSession => {
  return {
    id: dbCampSeassion.id,
    beginDate: new Date(dbCampSeassion.begin_date),
    endDate: new Date(dbCampSeassion.end_date),
    createdAt: new Date(dbCampSeassion.created_at)
  };
};
import { mapDbCampSessionToCampSession } from "@/mappers/campSessions";
import supabase from "@/supabase/client";
import { CampSession, CampSessionBasic } from "@/types/models/campSessions";
import { formatDateToISOLocal } from "@/utils/dates";
import { groupCampSessionsByYear } from "@/utils/sessions";
import { AuthError } from "@supabase/supabase-js";

const readCurrentCampSessionId = async (): Promise<CampSessionBasic | null> => {
  try {
    // Find current camp session by date
    const { data: currentSession, error: currentSessionError } = await supabase
      .from('camp_sessions')
      .select('id')
      .lte('begin_date', formatDateToISOLocal(new Date()))
      .gte('end_date', formatDateToISOLocal(new Date()))
      .single();

    if (currentSessionError) throw currentSessionError;
    if (!currentSession) return null; // No current camp session found

    return currentSession;
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const readAllCampSessions = async (): Promise<CampSession[] | null> => {
  try {
    const { data: campSessions, error: campSessionsError } = await supabase
      .from('camp_sessions')
      .select('*')
      .order('begin_date', { ascending: true });

    if (campSessionsError) throw campSessionsError;
    if (!campSessions) return null; // No camp sessions found

    return campSessions.map((session) => mapDbCampSessionToCampSession(session));
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const readAllCampSessionsGrouped = async (): Promise<CampSession[][] | null> => {
  try {
    const campSessions = await readAllCampSessions();
    if (!campSessions) return null; // No camp sessions found

    return groupCampSessionsByYear(campSessions);
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const campSessionRepository = {
  readCurrentCampSessionId,
  readAllCampSessions,
  readAllCampSessionsGrouped
}
import { mapCampSessionCreateToDbCampSession, mapCampSessionUpdateToDbCampSession, mapDbCampSessionToCampSession } from "@/mappers/campSessions";
import supabase from "@/supabase/client";
import { CampSession, CampSessionBasic, CampSessionCreate, CampSessionUpdate } from "@/types/models/campSessions";
import { groupCampSessionsByYear } from "@/utils/camp";
import { formatDateToISOLocal } from "@/utils/dates";
import { AuthError } from "@supabase/supabase-js";

const readCurrentCampSessionId = async (): Promise<CampSessionBasic> => {
  try {
    // Find current camp session by date
    const { data: currentSession, error: currentSessionError } = await supabase
      .from('camp_sessions')
      .select('id')
      .lte('begin_date', formatDateToISOLocal(new Date()))
      .gte('end_date', formatDateToISOLocal(new Date()))
      .single();

    if (currentSessionError) throw currentSessionError;

    return currentSession;
  } catch (error: any) {
    throw error as AuthError;
  }
};

const readAllCampSessions = async (): Promise<CampSession[]> => {
  try {
    const { data: campSessions, error: campSessionsError } = await supabase
      .from('camp_sessions')
      .select('*')
      .order('begin_date', { ascending: true });

    if (campSessionsError) throw campSessionsError;

    return campSessions.map((session) => mapDbCampSessionToCampSession(session));
  } catch (error: any) {
    throw error as AuthError;
  }
}

const readAllCampSessionsGrouped = async (): Promise<CampSession[][]> => {
  try {
    const campSessions = await readAllCampSessions();

    return groupCampSessionsByYear(campSessions);
  } catch (error: any) {
    throw error as AuthError;
  }
}

const readCampSessionById = async (id: number): Promise<CampSession> => {
  try {
    const { data: campSession, error: campSessionError } = await supabase
      .from('camp_sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (campSessionError) throw campSessionError;

    return mapDbCampSessionToCampSession(campSession);
  } catch (error: any) {
    throw error as AuthError;
  }
}

const updateCampSessionById = async (id: number, campSession: CampSessionUpdate): Promise<CampSession> => {
  try {
    const newMappedCampSession = mapCampSessionUpdateToDbCampSession(campSession);
    const { data: campSessionData, error: campSessionError } = await supabase
      .from("camp_sessions")
      .update(newMappedCampSession)
      .eq("id", id)
      .select()
      .single();

    if (campSessionError) throw campSessionError;

    return mapDbCampSessionToCampSession(campSessionData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

const createCampSessionById = async (campSession: CampSessionCreate): Promise<number> => {
  try {
    const newMappedCampSession = mapCampSessionCreateToDbCampSession(campSession);
    const { data: campSessionData, error: campSessionError } = await supabase
      .from("camp_sessions")
      .insert(newMappedCampSession)
      .select()
      .single();

    if (campSessionError) throw campSessionError;

    return campSessionData.id;
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const campSessionRepository = {
  readCurrentCampSessionId,
  readAllCampSessions,
  readAllCampSessionsGrouped,
  readCampSessionById,
  updateCampSessionById,
  createCampSessionById
}
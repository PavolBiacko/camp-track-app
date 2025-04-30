import supabase from "@/supabase/client";
import { CampSessionBasic } from "@/types/models/campSessions";
import { AuthError } from "@supabase/supabase-js";

const readCurrentCampSessionId = async (): Promise<CampSessionBasic | null> => {
  try {
    // Find current camp session by date
    const { data: currentSession, error: currentSessionError } = await supabase
      .from('camp_sessions')
      .select('id')
      .lte('begin_date', "2025-04-27")
      .gte('end_date', "2025-04-27")
      .single();

    if (currentSessionError) throw currentSessionError;
    if (!currentSession) return null; // No current camp session found

    return currentSession;
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const sessionRepository = {
  readCurrentCampSessionId,
}
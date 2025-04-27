import supabase from "@/supabase/client";
import { CampSessionBasic } from "@/types/models/campSessions";
import { GroupBasic } from "@/types/models/groups";
import { AuthError } from "@supabase/supabase-js";

export const getCurrentCampSessionId = async (): Promise<CampSessionBasic | null> => {
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

export const getGroupByLeaderForCurrentCampSession = async (leaderId: string): Promise<GroupBasic | null> => {
  try {
    const currentSession = await getCurrentCampSessionId();
    if (!currentSession) return null; // No current camp session found

    // Find the group with leader_id for current camp session
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('leader_id', leaderId)
      .eq('session_id', currentSession.id)
      .single();

    if (groupError) throw groupError;
    if (!group) return null; // No group found for this leader and session

    return group;
  } catch (error: any) {
    throw error as AuthError;
  }
};
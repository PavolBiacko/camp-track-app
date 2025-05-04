import { campSessionRepository } from "@/repositories/campSessionRepository";
import supabase from "@/supabase/client";
import { GroupBasic } from "@/types/models/groups";
import { AuthError } from "@supabase/supabase-js";

const readGroupBasicByLeaderForCurrentCampSession = async (leaderId: string): Promise<GroupBasic | null> => {
  try {
    const currentSession = await campSessionRepository.readCurrentCampSessionId();

    // Find the group with leader_id for current camp session
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id, number')
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

export const groupRepository = {
  readGroupBasicByLeaderForCurrentCampSession
}
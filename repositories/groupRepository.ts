import { campSessionRepository } from "@/repositories/campSessionRepository";
import supabase from "@/supabase/client";
import { GroupBasic } from "@/types/models/groups";
import { AuthError } from "@supabase/supabase-js";

const readGroupNumberByLeader = async (leaderId: string): Promise<number | null> => {  // TODO - current camp   session
  try {
    const { data: groupNumber, error: groupError } = await supabase
      .from('groups')
      .select('number')
      .eq('leader_id', leaderId)
      .single();

    if (groupError) throw groupError;

    if (!groupNumber) {
      return null; // User is not in a group.
    }

    return groupNumber.number;

  } catch (error: any) {
    // console.error('Error reading groups:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const readGroupBasicByLeaderForCurrentCampSession = async (leaderId: string): Promise<GroupBasic | null> => {
  try {
    const currentSession = await campSessionRepository.readCurrentCampSessionId();

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

export const groupRepository = {
  readGroupNumberByLeader,
  readGroupBasicByLeaderForCurrentCampSession
}
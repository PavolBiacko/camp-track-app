import { mapDbGroupToGroup, mapGroupCreateToDbGroup } from "@/mappers/groups";
import { campSessionRepository } from "@/repositories/campSessionRepository";
import supabase from "@/supabase/client";
import { Group, GroupBasic, GroupCreate } from "@/types/models/groups";
import { AuthError } from "@supabase/supabase-js";

const readGroupBasicByLeaderForCurrentCampSession = async (leaderId: string): Promise<GroupBasic | null> => {
  try {
    const currentSession = await campSessionRepository.readCurrentCampSessionId();

    // Find the group with leader_id for current camp session
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .select('id, number')
      .eq('leader_id', leaderId)
      .eq('session_id', currentSession.id)
      .single();

    if (groupError) throw groupError;
    if (!groupData) return null; // No group found for this leader and session

    return groupData;
  } catch (error: any) {
    throw error as AuthError;
  }
};

const createGroup = async (group: GroupCreate): Promise<Group> => {
  try {
    const newMappedGroup = mapGroupCreateToDbGroup(group);
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .insert(newMappedGroup)
      .select()
      .single();

    if (groupError) throw groupError;

    return mapDbGroupToGroup(groupData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const groupRepository = {
  readGroupBasicByLeaderForCurrentCampSession,
  createGroup,
}
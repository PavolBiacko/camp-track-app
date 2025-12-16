import { mapDbGroupComplexToGroupComplex, mapDbGroupToGroup, mapGroupCreateToDbGroup, mapGroupUpdateToDbGroup } from "@/mappers/groups";
import { campSessionRepository } from "@/repositories/campSessionRepository";
import supabase from "@/supabase/client";
import { Group, GroupBasic, GroupComplex, GroupCreate, GroupUpdate } from "@/types/models/groups";
import { groupCampGroupsBySession } from "@/utils/camp";
import { AuthError } from "@supabase/supabase-js";

const readGroupBasicByLeaderForCurrentCampSession = async (leaderId: string): Promise<GroupBasic | null> => {
  try {
    const currentSession = await campSessionRepository.readCurrentCampSession();

    if(!currentSession) {
      return null; // No current camp session
    }

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

const readAllGroupsComplex = async (): Promise<GroupComplex[]> => {
  try {
    const { data: groupsData, error: groupsError } = await supabase
      .from('groups')
      .select(`
        id,
        number,
        name,
        session_id,
        leader_id,
        created_at,
        camp_sessions:session_id (
          id,
          begin_date,
          end_date,
          created_at
        ),
        users:leader_id (
          id,
          email,
          first_name,
          last_name,
          birth_date,
          role,
          created_at
        )
      `)
      .order('session_id');

    if (groupsError) throw groupsError;

    return groupsData.map((group) => mapDbGroupComplexToGroupComplex(group));
  } catch (error: any) {
    throw error as AuthError;
  }
}

const readAllGroupsComplexGrouped = async (): Promise<GroupComplex[][]> => {
  try {
    const groups = await readAllGroupsComplex();

    return groupCampGroupsBySession(groups);
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const readGroupById = async (groupId: number): Promise<Group> => {
  try {
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .select("*")
      .eq('id', groupId)
      .single();

    if (groupError) throw groupError;

    return mapDbGroupToGroup(groupData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

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

const updateGroup = async (id: number, group: GroupUpdate): Promise<Group> => {
  try {
    const newMappedGroup = mapGroupUpdateToDbGroup(group);
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .update(newMappedGroup)
      .eq('id', id)
      .select()
      .single();

    if (groupError) throw groupError;

    return mapDbGroupToGroup(groupData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

const deleteGroup = async (id: number): Promise<Group> => {
  try {
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .delete()
      .eq('id', id)
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
  readAllGroupsComplexGrouped,
  readAllGroupsComplex,
  readGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
}
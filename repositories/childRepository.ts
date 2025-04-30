import { mapDbChildGroupLinkWithChildToChild } from "@/mappers/children";
import supabase from "@/supabase/client";
import { Child } from "@/types/models/children";
import { getGroupByLeaderForCurrentCampSession } from "@/utils/supabase";
import { AuthError } from "@supabase/supabase-js";

const readChildrenByLeader = async (leaderId: string): Promise<Child[] | null> => {
  try {
    // Step 1: Find group by leader_id for current camp session
    const group = await getGroupByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all children in that group
    const { data: childrenData, error: childrenError } = await supabase
      .from('child_group_link')
      .select(`
        id,
        group_id,
        child_id,
        children (
          id,
          first_name,
          last_name,
          birth_date,
          gender
        ),
        account_balance,
        created_at
      `)
      .eq('group_id', groupId);

    if (childrenError) throw childrenError;

    // Sort by last_name in memory
    const sortedChildrenData = childrenData.sort((a, b) =>
      a.children.last_name.localeCompare(b.children.last_name)
    );

    return sortedChildrenData.map((child) => mapDbChildGroupLinkWithChildToChild(child));
  } catch (error: any) {
    // console.error('Error reading children:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const readChildByIdWithLeader = async (childId: string, leaderId: string): Promise<Child | null> => {
  try {
    // Step 1: Find group by leader_id for current camp session
    const group = await getGroupByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all children in that group
    const { data: childData, error: childError } = await supabase
      .from('child_group_link')
      .select(`
        id,
        group_id,
        child_id,
        children (
          id,
          first_name,
          last_name,
          birth_date,
          gender
        ),
        account_balance,
        created_at
      `)
      .eq('group_id', groupId)
      .eq('child_id', childId)
      .single();

    if (childError) throw childError;

    return mapDbChildGroupLinkWithChildToChild(childData);
  } catch (error: any) {
    // console.error('Error reading child:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const updateAccountBalanceByIdWithLeader = async (childId: string, leaderId: string, accountBalance: number): Promise<Child | null> => {
  try {
    // Step 1: Find group by leader_id for current camp session
    const group = await getGroupByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Update the account balance of the child
    const { data: childData, error: childError } = await supabase
      .from('child_group_link')
      .update({ account_balance: accountBalance })
      .eq('child_id', childId)
      .eq('group_id', groupId)
      .select(`
        id,
        group_id,
        child_id,
        children (
          id,
          first_name,
          last_name,
          birth_date,
          gender
        ),
        account_balance,
        created_at
      `)
      .single();

    if (childError) throw childError;
    if (!childData) return null; // No matching child_group_link found

    return mapDbChildGroupLinkWithChildToChild(childData);
  } catch (error: any) {
    // console.error('Error updating account balance:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export const childRepository = {
  readChildrenByLeader,
  readChildByIdWithLeader,
  updateAccountBalanceByIdWithLeader,
}
import { mapDbChildGroupLinkWithChildToChild, mapDbGroupAccountToGroupAccount, mapGroupAccountCreateToDbGroupAccount } from "@/mappers/groupAccounts";
import { groupRepository } from "@/repositories/groupRepository";
import supabase from "@/supabase/client";
import { ChildBalanceUpdate, ChildWithBalance } from "@/types/models/children";
import { GroupAccount, GroupAccountCreate } from "@/types/models/groupAccounts";
import { AuthError } from "@supabase/supabase-js";

const readManyAccountsByGroup = async (groupId: number): Promise<GroupAccount[]> => {
  try {
    const { data: groupAccountsData, error: groupAccountsError } = await supabase
      .from('group_accounts')
      .select("*")
      .eq('group_id', groupId);
    if (groupAccountsError) throw groupAccountsError;

    return groupAccountsData.map((groupAccount) => mapDbGroupAccountToGroupAccount(groupAccount));
  } catch (error: any) {
    throw error as AuthError;
  }
}

const readManyAccountsByLeader = async (leaderId: string): Promise<ChildWithBalance[] | null> => {
  try {
    // Step 1: Find group by leader_id for current camp session
    const group = await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all children in that group
    const { data: childrenData, error: childrenError } = await supabase
      .from('group_accounts')
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
    throw error as AuthError;
  }
};

const readManyAccountsByParent = async (parentId: string): Promise<ChildWithBalance[] | null> => {
  try {
    // Step 1: Find children connected to the parent
    const { data: linkData, error: linkError } = await supabase
      .from("child_parent_link")
      .select("child_id")
      .eq("parent_id", parentId);

    if (linkError) throw linkError;

    // Extract child IDs
    const childIds = linkData.map((link) => link.child_id);

    // Step 2: Fetch all children by with that parent
    const { data: childrenData, error: childrenError } = await supabase
      .from('group_accounts')
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
      .in('child_id', childIds);

    if (childrenError) throw childrenError;

    // Sort by last_name in memory
    const sortedChildrenData = childrenData.sort((a, b) =>
      a.children.last_name.localeCompare(b.children.last_name)
    );

    return sortedChildrenData.map((child) => mapDbChildGroupLinkWithChildToChild(child));
  } catch (error: any) {
    throw error as AuthError;
  }
};

const readAccountByChildIdWithLeader = async (childId: string | null, leaderId: string): Promise<ChildWithBalance | null> => {
  try {
    // Step 0: If childId is null, then it is buffet payment, no child balance to update.
    if (childId == null) return null;

    // Step 1: Find group by leader_id for current camp session
    const group = await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all children in that group
    const { data: childData, error: childError } = await supabase
      .from('group_accounts')
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
    throw error as AuthError;
  }
};

const updateAccountBalanceByChildIdWithLeader = async (childId: string | null, leaderId: string, accountBalance: number): Promise<ChildWithBalance | null> => {
  try {
    // Step 0: If childId is null, then it is buffet payment, no child balance to update.
    if (childId == null) return null;

    // Step 1: Find group by leader_id for current camp session
    const group = await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Update the account balance of the child
    const { data: childData, error: childError } = await supabase
      .from('group_accounts')
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
    if (!childData) return null; // No matching group_accounts found

    return mapDbChildGroupLinkWithChildToChild(childData);
  } catch (error: any) {
    throw error as AuthError;
  }
};

const updateManyAccountBalancesWithLeader = async (leaderId: string, accountUpdates: ChildBalanceUpdate[]): Promise<ChildWithBalance[] | null> => {
  try {
    // Step 1: Find group by leader_id for current camp session
    const group = await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;
    const childIds = accountUpdates.map(accountUpdate => accountUpdate.childId);

    // Step 2: Update the account balances of the children in a single query
    const updatePromises = accountUpdates.map(accountUpdate =>
      supabase
        .from('group_accounts')
        .update({ account_balance: accountUpdate.accountBalance })
        .eq('child_id', accountUpdate.childId)
        .eq('group_id', groupId)
    );

    // Step 3: Execute all updates in parallel
    const updateResults = await Promise.all(updatePromises);
    const errors = updateResults.filter(result => result.error);
    if (errors.length > 0) throw errors[0].error; // Throw the first error if any

    // Step 4: Fetch the updated group_accounts records with child details
    const { data: childData, error: childError } = await supabase
      .from('group_accounts')
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
      .in('child_id', childIds)
      .eq('group_id', groupId);

    if (childError) throw childError;
    if (!childData) return null; // No matching group_accounts found

    return childData.map(child => mapDbChildGroupLinkWithChildToChild(child));
  } catch (error: any) {
    throw error as AuthError;
  }
};

const createManyAccounts = async (groupAccounts: GroupAccountCreate[]): Promise<GroupAccount[]> => {
  try {
    const newMappedGroupedAccounts = groupAccounts.map(acc => mapGroupAccountCreateToDbGroupAccount(acc));
    const { data: groupAccountsData, error: groupAccountsError } = await supabase
      .from('group_accounts')
      .insert(newMappedGroupedAccounts)
      .select();

    if (groupAccountsError) throw groupAccountsError;

    return groupAccountsData.map((groupAccount) => mapDbGroupAccountToGroupAccount(groupAccount));
  } catch (error: any) {
    throw error as AuthError;
  }
}

const deleteManyAccounts = async (groupId: number, childIds: string[]): Promise<GroupAccount[]> => {
  try {
    const { data: groupAccountsData, error: groupAccountsError } = await supabase
      .from('group_accounts')
      .delete()
      .eq('group_id', groupId)
      .in('child_id', childIds)
      .select();

    if (groupAccountsError) throw groupAccountsError;

    return groupAccountsData.map((groupAccount) => mapDbGroupAccountToGroupAccount(groupAccount));
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const groupAccountRepository = {
  readManyAccountsByGroup,
  readManyAccountsByLeader,
  readManyAccountsByParent,
  readAccountByChildIdWithLeader,
  updateAccountBalanceByChildIdWithLeader,
  updateManyAccountBalancesWithLeader,
  createManyAccounts,
  deleteManyAccounts,
}
import { mapCashRegisterRecordToDbCashRegister, mapDbCashRegisterToCashRegister } from "@/mappers/cashRegister";
import { mapDbChildGroupLinkWithChildToChild } from "@/mappers/children";
import { mapDbTransactionToTransactionComplex, mapTransactionCreateToDbTransaction } from "@/mappers/transactions";
import supabase from "@/supabase/client";
import { Tables } from "@/supabase/types";
import { CashRegisterRecord } from "@/types/finance";
import { CashRegister } from "@/types/models/cashRegister";
import { Child } from "@/types/models/children";
import { TransactionComplex, TransactionCreate } from "@/types/models/transactions";
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

const readCashRegisterByLeader = async (leaderId: string): Promise<CashRegister[] | null> => {
  try {

    // Step 1: Find group by leader_id for current camp session
    const group = await getGroupByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Find all corresponding data from cash register
    const { data: cashRegisterData, error: cashRegisterError } = await supabase
      .from('cash_register')
      .select('*')
      .eq('group_id', groupId);

    if (cashRegisterError) throw cashRegisterError;

    return cashRegisterData.map((cashRegister) => mapDbCashRegisterToCashRegister(cashRegister));
  }
  catch (error: any) {
    // console.error('Error reading cash registers:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const updateCashRegisterByLeader = async (leaderId: string, counts: CashRegisterRecord): Promise<CashRegister[] | null> => {
  try {
    // Step 1: Find group by leader_id for current camp session
    const group = await getGroupByLeaderForCurrentCampSession(leaderId);
    if (!group) return null; // No group found for this leader

    const groupId = group.id;
    const cashRegisterRecords = mapCashRegisterRecordToDbCashRegister(counts);

    // Step 2: Fetch existing cash register rows for the group
    const { data: existingRows, error: fetchError } = await supabase
      .from('cash_register')
      .select('*')
      .eq('group_id', groupId);

    if (fetchError) throw fetchError;
    if (!existingRows) throw new Error('No cash register rows found for this group');

    // Step 3: Update each row based on denomination
    const updatedRows: Tables<"cash_register">[] = [];
    for (const record of cashRegisterRecords) {
      const { denomination, quantity } = record;

      const { data, error } = await supabase
        .from('cash_register')
        .update({ quantity })
        .eq('group_id', groupId)
        .eq('denomination', denomination!) // Match the denomination
        .select()
        .single();

      if (error) throw error;
      if (data) updatedRows.push(data);
    }

    return updatedRows.map((updatedRows) => mapDbCashRegisterToCashRegister(updatedRows));
  } catch (error: any) {
    // console.error('Error updating account balance:', (error as AuthError).message);
    throw error as AuthError;
  }
}

const createTransaction = async (transaction: TransactionCreate): Promise<number> => {
  try {
    const newMappedTransaction = mapTransactionCreateToDbTransaction(transaction);
    const { data, error } = await supabase
      .from('transactions')
      .insert(newMappedTransaction)
      .select()
      .single();

    if (error) throw error;

    return data.id;
  } catch (error: any) {
    // console.error('Error creating transaction:', (error as AuthError).message);
    throw error as AuthError;
  }
}

const readTransactionsInDateRange = async (dateFrom: Date, dateTo: Date): Promise<TransactionComplex[]> => {
  try {
    const { data: transactionData, error: transactionError } = await supabase
      .from('transactions')
      .select(`
        id,
        amount,
        type,
        created_at,
        child_id,
        children (
          first_name,
          last_name
        )
      `)
      .gte('created_at', dateFrom.toISOString()) // Filter: created_at >= dateFrom
      .lte('created_at', dateTo.toISOString()) // Filter: created_at <= dateTo
      .order('created_at')
      .order('child_id');

    if (transactionError) throw transactionError;

    return transactionData.map((dbTransaction) => mapDbTransactionToTransactionComplex(dbTransaction));

  } catch (error: any) {
    // console.error('Error reading transactions:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export const financeRepository = {
  readChildrenByLeader,
  readChildByIdWithLeader,
  updateAccountBalanceByIdWithLeader,
  readCashRegisterByLeader,
  updateCashRegisterByLeader,
  createTransaction,
  readTransactionsInDateRange
}
import { mapCashRegisterRecordToDbCashRegister, mapDbCashRegisterToCashRegister } from "@/mappers/cashRegister";
import { mapDbChildToChild } from "@/mappers/children";
import { mapDbTransactionToTransactionComplex, mapTransactionCreateToDbTransaction } from "@/mappers/transactions";
import supabase from "@/supabase/client";
import { Tables } from "@/supabase/types";
import { CashRegisterRecord } from "@/types/finance";
import { CashRegister } from "@/types/models/cashRegister";
import { Child } from "@/types/models/children";
import { TransactionComplex, TransactionCreate } from "@/types/models/transactions";
import { formatDateToISOLocalFull } from "@/utils/dates";
import { AuthError } from "@supabase/supabase-js";

const readChildrenByLeader = async (leaderId: string): Promise<Child[] | null> => {
  try {
    // Step 1: Fetch the single group where leader_id matches
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('leader_id', leaderId)
      .single();

    if (groupError) throw groupError;
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all children in that group
    const { data: childrenData, error: childrenError } = await supabase
      .from('children')
      .select('*')
      .eq('group_id', groupId)
      .order('last_name', { ascending: true });

    if (childrenError) throw childrenError;

    return childrenData.map((child) => mapDbChildToChild(child));
  } catch (error: any) {
    // console.error('Error reading children:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const readChildById = async (id: string): Promise<Child | null> => {
  try {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return mapDbChildToChild(data);
  } catch (error: any) {
    // console.error('Error reading child:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const readCashRegisterByLeader = async (leaderId: string): Promise<CashRegister[] | null> => {
  try {
    // Step 1: Fetch the single group where leader_id matches
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('leader_id', leaderId)
      .single();

    if (groupError) throw groupError;
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all corresponding data from cash register
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

const updateAccountBalanceById = async (id: string, acountBalance: number): Promise<Child> => {
  try {
    const { data, error } = await supabase
      .from('children')
      .update({ account_balance: acountBalance })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return mapDbChildToChild(data);
  } catch (error: any) {
    // console.error('Error updating account balance:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const updateCashRegisterByChild = async (childId: string, counts: CashRegisterRecord): Promise<CashRegister[] | null> => {
  try {
    // Step 1: Fetch the single child by id
    const { data: child, error: childError } = await supabase
      .from('children')
      .select("*")
      .eq('id', childId)
      .single();

    if (childError) throw childError;
    if (!child) return null; // No child found for this id

    const groupId = child.group_id!;  // Assuming group_id is not null
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
        date,
        created_at,
        child_id,
        children (
          first_name,
          last_name
        )
      `)
      .gte('date', formatDateToISOLocalFull(dateFrom)) // Filter: date >= dateFrom
      .lte('date', formatDateToISOLocalFull(dateTo)) // Filter: date <= dateTo
      .order('date')
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
  readChildById,
  readCashRegisterByLeader,
  updateAccountBalanceById,
  updateCashRegisterByChild,
  createTransaction,
  readTransactionsInDateRange
}
import { mapDbTransactionToTransactionComplex, mapTransactionCreateToDbTransaction } from "@/mappers/transactions";
import supabase from "@/supabase/client";
import { TransactionComplex, TransactionCreate } from "@/types/models/transactions";
import { AuthError } from "@supabase/supabase-js";

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

export const transactionRepository = {
  createTransaction,
  readTransactionsInDateRange
}
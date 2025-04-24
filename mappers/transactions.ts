import { Enums, TablesInsert } from "@/supabase/types";
import { TransactionType } from "@/types/enums/finance";
import { TransactionCreate } from "@/types/models/transactions";
import { formatDateToISOLocal } from "@/utils/dates";

export const mapTransactionCreateToDbTransaction = (transaction: TransactionCreate): TablesInsert<"transactions"> => {
  return {
    child_id: transaction.childId,
    amount: transaction.amount,
    type: mapTransactionTypeToDbTransactionType(transaction.type),
    date: formatDateToISOLocal(transaction.date),
  };
}

export const mapTransactionTypeToDbTransactionType = (transactionType: TransactionType): Enums<"transaction_type"> => {
  switch (transactionType) {
    case TransactionType.DEPOSIT:
      return "DEPOSIT";
    case TransactionType.WITHDRAWAL:
      return "WITHDRAWAL";
    case TransactionType.PURCHASE:
      return "PURCHASE";
    default:
      throw new Error(`Unknown transaction type: ${transactionType}`);
  }
};
import { Enums, TablesInsert } from "@/supabase/types";
import { TransactionType } from "@/types/enums/finance";
import { DbTransactionWithChild, TransactionComplex, TransactionCreate } from "@/types/models/transactions";

export const mapTransactionCreateToDbTransaction = (transaction: TransactionCreate): TablesInsert<"transactions"> => {
  return {
    group_id: transaction.groupId,
    child_id: transaction.childId,
    amount: transaction.amount,
    type: mapTransactionTypeToDbTransactionType(transaction.type),
  };
}

export const mapDbTransactionToTransactionComplex = (dbTransaction: DbTransactionWithChild): TransactionComplex => {
  return {
    id: dbTransaction.id,
    groupId: dbTransaction.group_id,
    child: dbTransaction.children
      ? {
        firstName: dbTransaction.children.first_name,
        lastName: dbTransaction.children.last_name,
      }
      : null,
    amount: dbTransaction.amount,
    type: mapDbTransactionTypeToTransactionType(dbTransaction.type),
    createdAt: new Date(dbTransaction.created_at),
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

export const mapDbTransactionTypeToTransactionType = (dbTransactionType: Enums<"transaction_type">): TransactionType => {
  switch (dbTransactionType) {
    case "DEPOSIT":
      return TransactionType.DEPOSIT;
    case "WITHDRAWAL":
      return TransactionType.WITHDRAWAL;
    case "PURCHASE":
      return TransactionType.PURCHASE;
    default:
      throw new Error(`Unknown transaction type: ${dbTransactionType}`);
  }
};
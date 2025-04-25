import { Tables } from "@/supabase/types"
import { TransactionType } from "@/types/enums/finance"
import { ChildName } from "@/types/models/children"

export type Transaction = {
  id: number
  childId: string | null
  amount: number
  type: TransactionType
  date: Date
  createdAt: Date
}

export type TransactionComplex = {
  id: number
  child: ChildName | null
  amount: number
  type: TransactionType
  date: Date
  createdAt: Date
}

export type TransactionCreate = {
  childId: string | null
  amount: number
  type: TransactionType
  date: Date
}

export type DbTransactionWithChild = Tables<"transactions"> & {
  children: {
    first_name: string;
    last_name: string;
  } | null;
};
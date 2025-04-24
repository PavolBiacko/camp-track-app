import { TransactionType } from "@/types/enums/finance"

export type Transaction = {
  id: number
  childId: string | null
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
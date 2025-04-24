import { TransactionType } from "@/types/enums/finance"

export type Transaction = {
  id: number
  childId: string
  amount: number
  type: TransactionType
  date: Date
  createdAt: Date
}

export type TransactionCreate = {
  childId: string
  amount: number
  type: TransactionType
  date: Date
}
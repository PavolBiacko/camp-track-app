import { ChildWithBalance } from "@/types/models/children"

export type ParentChildLineProps = {
  child: ChildWithBalance
  textStyles?: string
  containerStyles?: string
}

export type ChildAccountTransactionParams = {
  groupId: string
  childId: string
}
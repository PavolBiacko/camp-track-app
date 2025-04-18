import { Denominations } from "@/types/enums/finance";

export type CashRegister = {
  id: number;
  groupId: number;
  denomination: Denominations;
  quantity: number;
  createdAt: Date;
}
import { Denominations } from "@/types/enums/finance";
import { Child } from "@/types/models/children";

export type MoneyType = 'coin' | 'bill';

export type FinanceOverviewLineProps = {
  denomination: Denominations,
}

export type FinanceOverviewContextType = {
  totalAmount: number;
  quantities: Record<Denominations, number>;
  updateQuantity: (denomination: Denominations, quantity: number) => void;
}

export type FinanceAccountLineProps = {
  child: Child,
  textStyles?: string,
  containerStyles?: string,
}

export type FinanceAccountsParams = {
  leaderId: string,
}

export type ChildAccountParams = {
  childId: string,
}
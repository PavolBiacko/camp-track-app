import { Denominations } from "./enums/finance";

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
  child: any,  // TODO: replace with actual type
  textStyles?: string,
  containerStyles?: string,
}
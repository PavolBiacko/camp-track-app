import { Denominations } from "@/types/enums/finance";
import { Child } from "@/types/models/children";

export type MoneyType = 'coin' | 'bill';

export type AccountActionType = "increment" | "decrement";

type DenominationsType = {
  denomination: Denominations;
}

export type FinanceOverviewLineProps = DenominationsType;

export type FinanceScreenConfigs = {
  name: string;
  title: string;
  params?: any;
}

export type FinanceAccountContentLineProps = DenominationsType & {
  type: AccountActionType;
}

export type FinanceOverviewContextType = {
  totalAmount: number;
  quantities: Record<Denominations, number>;
  updateQuantity: (denomination: Denominations, quantity: number) => void;
}

export type FinanceAccountProps = {
  type: AccountActionType;
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
  type: AccountActionType,
}

export type FinanceAccountActionModalProps = {
  childId: string,
  modalVisible: boolean,
  setModalVisible: (isModalVisible: boolean) => void,
}
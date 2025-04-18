import { Denominations } from "@/types/enums/finance";
import { CashRegister } from "@/types/models/cashRegister";
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
}

export type FinanceAccountContentLineProps = DenominationsType & {
  type: AccountActionType;
}

export type FinanceOverviewContextType = {
  totalAmount: number;
  quantities: Record<Denominations, number>;
}

export type FinanceOverviewProviderProps = {
  cashRegisterData: CashRegister[];
}

export type FinanceAccountContextType = {
  childAccountBalance: number;
  actionAmount: number;
  counts: Record<Denominations, number>;
  updateCount: (denomination: Denominations, count: number) => void;
  resetDenominations: () => void;
}

export type FinanceAccountProviderProps = {
  type: AccountActionType;
  initialBalance: number;
}

export type FinanceAccountHeaderProps = {
  type: AccountActionType;
}

export type FinanceAccountContentProps = {
  type: AccountActionType;
}

export type FinanceAccountFooterProps = {
  type: AccountActionType;
  childId: string;
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
import { ModalBasicProps } from "@/types/custom/modal";
import { Denominations } from "@/types/enums/finance";
import { CashRegister } from "@/types/models/cashRegister";
import { Child } from "@/types/models/children";
import { TransactionComplex } from "@/types/models/transactions";

export type MoneyType = 'coin' | 'bill';

export type AccountActionType = "increment" | "decrement";

type DenominationsType = {
  denomination: Denominations;
}

export type CashRegisterRecord = Record<Denominations, number>;

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
  quantities: CashRegisterRecord;
}

export type FinanceOverviewProviderProps = {
  cashRegisterData: CashRegister[];
}

export type FinanceAccountContextType = {
  childAccountBalance: number;
  actionAmount: number;
  counts: CashRegisterRecord;
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
  leaderId: string,
  type: AccountActionType,
}

export type FinanceAccountActionModalProps = ModalBasicProps & {
  childId: string,
}

export type FinanceAccountSummaryModalProps = ModalBasicProps & {
  childId: string,
  leaderId: string,
  type: AccountActionType,
}

export type FinanceAccountActionSummaryProps = {
  type: AccountActionType,
}

export type FinanceTransactionHeaderData = {
  dateFrom: string;
  dateTo: string;
}

export type FinanceTransactionContextType = {
  dateFrom: Date;
  dateTo: Date;
  setDateFrom: (date: Date) => void;
  setDateTo: (date: Date) => void;
}

export type FinanceTransactionLineProps = {
  transaction: TransactionComplex;
}

export type FinanceBuffetParams = {
  leaderId: string,
}

export type LocalBuffetActionAmounts = {
  [childId: string]: number;
}

export type FinanceBuffetData = {
  actionAmount: number | null
}

export type FinanceBuffetSummaryProps = {
  children: Child[]
  actionAmounts: LocalBuffetActionAmounts
}

export type FinanceBuffetModalProps = ModalBasicProps & FinanceBuffetSummaryProps;



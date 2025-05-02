import { ModalBasicProps } from "@/types/custom/modal";
import { Denominations, TransactionType } from "@/types/enums/finance";
import { CashRegister } from "@/types/models/cashRegister";
import { Child } from "@/types/models/children";
import { TransactionComplex } from "@/types/models/transactions";

export type MoneyType = 'coin' | 'bill';

export type AccountActionType = "increment" | "decrement";

type DenominationsType = {
  denomination: Denominations;
}

export type FinanceScreenConfigs = {
  name: string;
  title: string;
}

export type CashRegisterRecord = Record<Denominations, number>;

export type FinanceOverviewLineProps = DenominationsType;

export type FinanceAccountContentLineProps = DenominationsType;

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
  transactionType: TransactionType
}

export type FinanceAccountProviderProps = {
  transactionType: TransactionType;
  initialBalance: number;
}

export type FinanceAccountFooterProps = {
  childId: string | null;
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
  childId?: string,
  leaderId: string,
  type: AccountActionType,
}

export type FinanceAccountActionModalProps = ModalBasicProps & {
  childId?: string,
}

export type FinanceAccountSummaryModalProps = ModalBasicProps & {
  childId: string | null,
  leaderId: string,
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

export type FinanceBuffetContextType = {
  actionAmounts: LocalBuffetActionAmounts;
  setActionAmounts: (actionAmounts: LocalBuffetActionAmounts) => void;
  resetsActionAmounts: () => void;
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
  children: Child[],
}

export type FinanceBuffetSummaryLineProps = {
  child: Child,
  actionAmount: number,
}

export type FinanceBuffetModalProps = ModalBasicProps & FinanceBuffetSummaryProps;

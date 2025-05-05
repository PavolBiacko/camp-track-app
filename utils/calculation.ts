import { CashRegisterRecord, ChildBalanceRecord, DistributeCashResult, Distribution, Exchanges } from "@/types/finance";
import { subtractDecimals } from "@/utils/decimal";
import { getDenominations } from "@/utils/finance";

export const distributeCash = (
  quantities: CashRegisterRecord,
  balances: ChildBalanceRecord[]
): DistributeCashResult => {

  const distribution: Distribution = Object.fromEntries(balances.map(({ id }) => [id, {}]));
  const cashRegisterCopy: CashRegisterRecord = { ...quantities };
  var balancesCopy: ChildBalanceRecord[] = JSON.parse(JSON.stringify(balances));

  for (const denom of getDenominations().reverse()) {
    balancesCopy.sort((a, b) => b.accountBalance - a.accountBalance);
    for (const child of balancesCopy) {
      while (cashRegisterCopy[denom] > 0 && child.accountBalance >= denom) {
        child.accountBalance = subtractDecimals(child.accountBalance, denom);
        distribution[child.id][denom] = (distribution[child.id][denom] || 0) + 1;
        cashRegisterCopy[denom] -= 1;
      }
    }
  }

  const fromExchange: Partial<CashRegisterRecord> = {}
  const toExchange: Partial<CashRegisterRecord> = {};

  for (const denom of getDenominations()) {
    const count = cashRegisterCopy[denom];
    if (count != 0) {
      fromExchange[denom] = count;
    }
  }

  for (const denom of getDenominations().reverse()) {
    balancesCopy = balancesCopy.sort((a, b) => b.accountBalance - a.accountBalance);
    for (const child of balancesCopy) {
      while (child.accountBalance >= denom) {
        child.accountBalance = subtractDecimals(child.accountBalance, denom);
        distribution[child.id][denom] = (distribution[child.id][denom] || 0) + 1;
        toExchange[denom] = (toExchange[denom] || 0) + 1;
        cashRegisterCopy[denom] -= 1;
      }
    }
  }

  const exchanges: Exchanges = { from: fromExchange, to: toExchange }

  return { exchanges, distribution };
}
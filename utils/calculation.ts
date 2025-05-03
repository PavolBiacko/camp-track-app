import { CashRegisterRecord, ChildBalanceRecord, DistributeCashResult, Distribution, Exchanges } from "@/types/finance";
import { subtractDecimals } from "@/utils/decimal";
import { getDenominations } from "@/utils/finance";

const dummyResult = {
  exchanges: {
    from: {
      "100": 1,
    },
    to: {
      "50": 1,
      "20": 2,
      "10": 1,
    }
  },
  distribution: {
    "58dafaf2-ccd8-4990-9ca2-a0bb2dd44472": {
      "10": 1,
      "20": 2,
      "50": 1,
      "100": 0,
    },
    "14e7f277-4461-43ff-b53d-e21c4fcd8b60": {
      "0.01": 999,
      "0.02": 2,
      "0.05": 11,
    },
    "c9af6ac1-ef2c-4be6-b110-fc178733bd35": {
      "1": 50,
      "2": 50,
      "5": 50,
    },
    "dc0bbeef-b837-4528-b4c8-4e87ce0d7dd8": {
      "10": 1,
      "20": 2,
      "50": 1,
    },
    "8d0d4bd0-5f03-4360-b369-577e2d7e4542": {
      "0.01": 50,
      "0.02": 50,
      "0.05": 50,
    },
    "dcf7a507-94e8-480f-b023-3ebfcd348f52": {
      "100": 50,
      "200": 50,
      "500": 50,
    },
    "7a261785-ba96-42d9-b00d-0dc4e3b827b7": {
      "1": 50,
      "2": 50,
      "5": 50,
    },
    "5fbbbc69-c75c-4a9d-aa1a-b44eb23ed154": {
      "0.01": 50,
      "0.02": 50,
      "0.05": 50,
    },
    "f500c680-62e0-438c-9bc9-bac94a6a4f5f": {
      "100": 50,
      "200": 50,
      "500": 50,
    },
    "bc9ef92d-e79b-46a5-a994-9e7140a5a0ca": {
      "1": 50,
      "2": 50,
      "5": 50,
      "200": 50000
    },
  },
}

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
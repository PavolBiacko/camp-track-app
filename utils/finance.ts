import { images } from "@/constants";
import { Denominations, TransactionType } from "@/types/enums/finance";
import { AccountActionType, CashRegisterRecord, DistributeCashResult, FinanceCalculationBalances, LocalBuffetActionAmounts, MoneyType } from "@/types/finance";
import { Child, ChildBalanceUpdate } from "@/types/models/children";
import { TransactionCreate } from "@/types/models/transactions";
import { addDecimals, multiplyDecimals, subtractDecimals } from "@/utils/decimal";
import { ImageProps } from "react-native";

export const getMoneyType = (denomination: Denominations): MoneyType => {
  switch (denomination) {
    case Denominations.CENTS_1:
    case Denominations.CENTS_2:
    case Denominations.CENTS_5:
    case Denominations.CENTS_10:
    case Denominations.CENTS_20:
    case Denominations.CENTS_50:
    case Denominations.EURO_1:
    case Denominations.EURO_2:
      return "coin";
    case Denominations.EURO_5:
    case Denominations.EURO_10:
    case Denominations.EURO_20:
    case Denominations.EURO_50:
    case Denominations.EURO_100:
    case Denominations.EURO_200:
    case Denominations.EURO_500:
      return "bill";
    default:
      throw new Error("Invalid denomination");
  }
};

export const getMoneyImage = (denomination: Denominations): ImageProps => {
  switch (denomination) {
    case Denominations.CENTS_1:
      return images.cents1;
    case Denominations.CENTS_2:
      return images.cents2;
    case Denominations.CENTS_5:
      return images.cents5;
    case Denominations.CENTS_10:
      return images.cents10;
    case Denominations.CENTS_20:
      return images.cents20;
    case Denominations.CENTS_50:
      return images.cents50;
    case Denominations.EURO_1:
      return images.euro1;
    case Denominations.EURO_2:
      return images.euro2;
    case Denominations.EURO_5:
      return images.euro5;
    case Denominations.EURO_10:
      return images.euro10;
    case Denominations.EURO_20:
      return images.euro20;
    case Denominations.EURO_50:
      return images.euro50;
    case Denominations.EURO_100:
      return images.euro100;
    case Denominations.EURO_200:
      return images.euro200;
    case Denominations.EURO_500:
      return images.euro500;
    default:
      throw new Error("Invalid denomination");
  }
};

export const getCoins = (): Denominations[] => {
  return [
    Denominations.CENTS_1,
    Denominations.CENTS_2,
    Denominations.CENTS_5,
    Denominations.CENTS_10,
    Denominations.CENTS_20,
    Denominations.CENTS_50,
    Denominations.EURO_1,
    Denominations.EURO_2,
  ];
};

export const getBills = (): Denominations[] => {
  return [
    Denominations.EURO_5,
    Denominations.EURO_10,
    Denominations.EURO_20,
    Denominations.EURO_50,
    Denominations.EURO_100,
    Denominations.EURO_200,
    Denominations.EURO_500,
  ];
};

export const getDenominations = (): Denominations[] => {
  return [
    ...getCoins(),
    ...getBills()
  ];
};

export const processCountsWithQuantities = (
  quantities: CashRegisterRecord,
  counts: CashRegisterRecord,
  transactionType: TransactionType
): CashRegisterRecord => {

  const result: CashRegisterRecord = { ...quantities };

  const operation = getActionAccountType(transactionType) === 'increment' ? 1 : -1;

  (Object.entries(counts) as [keyof typeof Denominations, number][]).forEach(([denomination, count]) => {
    result[denomination as unknown as Denominations] += count * operation;
  });

  return result;
};

export const isIncrementAvailable = (
  transactionType: TransactionType,
  denomination: Denominations,
  quantity: number,
  count: number,
  accountBalance: number,
  actionAmount: number
): boolean => {
  if (transactionType === TransactionType.WITHDRAWAL) {
    if (count === quantity || subtractDecimals(accountBalance, actionAmount) < denomination) {
      return false;
    }
  }
  if (transactionType === TransactionType.PAYOUT) {
    if (count === quantity) {
      return false;
    }
  }
  if (transactionType === TransactionType.PAYBACK) {
    if (subtractDecimals(-accountBalance, actionAmount) < denomination)
      return false;
  }
  return true;
};

export const isAccountActionAvailable = (
  type: AccountActionType,
  childId: string | undefined,
  totalAmount: number,
  childrenBalances: number,
): boolean => {
  return (childId)
    ? childrenBalances <= totalAmount
    : (type === "increment") ? childrenBalances > totalAmount : childrenBalances < totalAmount;
}

export const isTransactionActionAvailable = (
  transactionType: TransactionType,
  accountBalance: number,
  actionAmount: number,
): boolean => {
  if (transactionType === TransactionType.PAYOUT) {
    return accountBalance <= actionAmount;
  }
  if (transactionType === TransactionType.PAYBACK) {
    return -accountBalance === actionAmount;
  }
  return actionAmount !== 0;
}

export const getTransactionObject = (
  groupId: number,
  childId: string | null,
  actionAmount: number,
  transactionType: TransactionType
): TransactionCreate => {
  return {
    groupId,
    childId,
    amount: multiplyDecimals(actionAmount, getTransactionDirection(transactionType)),
    type: transactionType,
  }
}

export const getManyTransactionObjectsOfType = (
  groupId: number,
  children: Child[],
  actionAmounts: LocalBuffetActionAmounts,
  transactionType: TransactionType
): TransactionCreate[] => {
  return children.map((child) => {
    return getTransactionObject(groupId, child.id, actionAmounts[child.id] || 0, transactionType);
  });
}

export const getTransactionDirection = (transactionType: TransactionType): number => {
  switch (transactionType) {
    case TransactionType.DEPOSIT:
    case TransactionType.PAYBACK:
      return 1;
    case TransactionType.WITHDRAWAL:
    case TransactionType.PURCHASE:
    case TransactionType.PAYOUT:
      return -1;
    default:
      throw new Error("Invalid transaction type");
  }
}

export const getManyChildBalanceObjects = (children: Child[], actionAmounts: LocalBuffetActionAmounts): ChildBalanceUpdate[] => {
  return children
    .filter(child => child.id in actionAmounts)
    .map(child => {
      const newBalance = subtractDecimals(child.accountBalance, actionAmounts[child.id]);
      return {
        childId: child.id,
        accountBalance: newBalance,
      };
    });
}

export const getActionAccountType = (transactionType: TransactionType): AccountActionType => {
  switch (transactionType) {
    case TransactionType.DEPOSIT:
    case TransactionType.PAYBACK:
      return "increment"
    case TransactionType.WITHDRAWAL:
    case TransactionType.PURCHASE:
    case TransactionType.PAYOUT:
      return "decrement"
    default:
      throw new Error("Invalid transaction type");
  }
}

export const getActionButtonTitle = (transactionType: TransactionType): string => {
  switch (transactionType) {
    case TransactionType.DEPOSIT:
      return "Pridanie peňazí"
    case TransactionType.WITHDRAWAL:
      return "Vrátenie peňazí"
    case TransactionType.PAYOUT:
      return "Vyplatenie bufetu"
    case TransactionType.PAYBACK:
      return "Výdavok vyplatenia"
    default:
      throw new Error("Invalid transaction type");
  }
}

export const getTransactionSuccessMessage = (transactionType: TransactionType, actionAmount: number): string => {
  let textPrefix = "";
  switch (transactionType) {
    case TransactionType.DEPOSIT:
      textPrefix = "Pridané peniaze"
      break;
    case TransactionType.WITHDRAWAL:
      textPrefix = "Vrátené peniaze"
      break;
    case TransactionType.PURCHASE:
      textPrefix = "Celková suma"
      break;
    case TransactionType.PAYOUT:
      textPrefix = "Suma za vyplatený bufet"
      break;
    case TransactionType.PAYBACK:
      textPrefix = "Výdavok vyplatenia"
      break;
    default:
      throw new Error("Invalid transaction type");
  }
  return `${textPrefix}: ${actionAmount.toFixed(2)} €.`;
}

export const getTotalAmount = (actionAmounts: LocalBuffetActionAmounts): number => {
  return Object.values(actionAmounts).reduce((sum, amount) => addDecimals(sum, amount), 0);
}

export const getTotalOfChildrenBalances = (children: Child[]): number => {
  return children.reduce((sum, child) => addDecimals(sum, child.accountBalance), 0);
}

export const distributeCash = (
  quantities: CashRegisterRecord,
  balances: FinanceCalculationBalances
): DistributeCashResult => {
  return {
    exchange: {
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
}
import { images } from "@/constants";
import { Denominations } from "@/types/enums/finance";
import { AccountActionType, CashRegisterRecord, MoneyType } from "@/types/finance";
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
}

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
}

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
}

export const processCountsWithQuantities = (type: AccountActionType, quantities: CashRegisterRecord, counts: CashRegisterRecord): CashRegisterRecord => {
  const result: CashRegisterRecord = { ...quantities };

  const operation = type === 'increment' ? 1 : -1;

  (Object.entries(counts) as [keyof typeof Denominations, number][]).forEach(([denomination, count]) => {
    result[denomination as unknown as Denominations] += count * operation;
  });

  return result;
}
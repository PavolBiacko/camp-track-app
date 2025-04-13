import { images } from "@/constants";
import { Denominations } from "@/types/enums/finance";
import { MoneyType } from "@/types/finance";
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
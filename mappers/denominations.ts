import { Enums } from "@/supabase/types";
import { Denominations } from "@/types/enums/finance";

export const mapDbDenominationsToDenominations = (dbDenominations: Enums<"euro_denominations">): Denominations => {
  switch (dbDenominations) {
    case "1_CENT":
      return Denominations.CENTS_1;
    case "2_CENT":
      return Denominations.CENTS_2;
    case "5_CENT":
      return Denominations.CENTS_5;
    case "10_CENT":
      return Denominations.CENTS_10;
    case "20_CENT":
      return Denominations.CENTS_20;
    case "50_CENT":
      return Denominations.CENTS_50;
    case "1_EUR":
      return Denominations.EURO_1;
    case "2_EUR":
      return Denominations.EURO_2;
    case "5_EUR":
      return Denominations.EURO_5;
    case "10_EUR":
      return Denominations.EURO_10;
    case "20_EUR":
      return Denominations.EURO_20;
    case "50_EUR":
      return Denominations.EURO_50;
    case "100_EUR":
      return Denominations.EURO_100;
    case "200_EUR":
      return Denominations.EURO_200;
    case "500_EUR":
      return Denominations.EURO_500;
    default:
      throw new Error(`Unknown denomination: ${dbDenominations}`);
  }
};

export const mapDenominationsToDbDenominations = (denomination: Denominations): Enums<"euro_denominations"> => {
  switch (denomination) {
    case Denominations.CENTS_1:
      return "1_CENT";
    case Denominations.CENTS_2:
      return "2_CENT";
    case Denominations.CENTS_5:
      return "5_CENT";
    case Denominations.CENTS_10:
      return "10_CENT";
    case Denominations.CENTS_20:
      return "20_CENT";
    case Denominations.CENTS_50:
      return "50_CENT";
    case Denominations.EURO_1:
      return "1_EUR";
    case Denominations.EURO_2:
      return "2_EUR";
    case Denominations.EURO_5:
      return "5_EUR";
    case Denominations.EURO_10:
      return "10_EUR";
    case Denominations.EURO_20:
      return "20_EUR";
    case Denominations.EURO_50:
      return "50_EUR";
    case Denominations.EURO_100:
      return "100_EUR";
    case Denominations.EURO_200:
      return "200_EUR";
    case Denominations.EURO_500:
      return "500_EUR";
    default:
      throw new Error(`Unknown denomination: ${denomination}`);
  }
}
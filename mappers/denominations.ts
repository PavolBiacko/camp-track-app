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
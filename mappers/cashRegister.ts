import { mapDbDenominationsToDenominations, mapDenominationsToDbDenominations } from "@/mappers/denominations";
import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types";
import { Denominations } from "@/types/enums/finance";
import { CashRegisterRecord } from "@/types/finance";
import { CashRegister } from "@/types/models/cashRegister";

export const mapDbCashRegisterToCashRegister = (dbCashRegister: Tables<"cash_register">): CashRegister => {
  return {
    id: dbCashRegister.id,
    groupId: dbCashRegister.group_id,
    denomination: mapDbDenominationsToDenominations(dbCashRegister.denomination),
    quantity: dbCashRegister.quantity,
    createdAt: new Date(dbCashRegister.created_at)
  };
};

export const mapCashRegisterDataToCashRegisterRecord = (cashRegister?: CashRegister[]): CashRegisterRecord => {
  const defaultQuantities: CashRegisterRecord = {
    [Denominations.CENTS_1]: 0,
    [Denominations.CENTS_2]: 0,
    [Denominations.CENTS_5]: 0,
    [Denominations.CENTS_10]: 0,
    [Denominations.CENTS_20]: 0,
    [Denominations.CENTS_50]: 0,
    [Denominations.EURO_1]: 0,
    [Denominations.EURO_2]: 0,
    [Denominations.EURO_5]: 0,
    [Denominations.EURO_10]: 0,
    [Denominations.EURO_20]: 0,
    [Denominations.EURO_50]: 0,
    [Denominations.EURO_100]: 0,
    [Denominations.EURO_200]: 0,
    [Denominations.EURO_500]: 0,
  };

  cashRegister?.forEach((entry) => {
    defaultQuantities[entry.denomination] = entry.quantity;
  });

  return defaultQuantities;
};

export const mapCashRegisterRecordToDbCashRegister = (cashRegister: CashRegisterRecord): TablesUpdate<"cash_register">[] => {
  return Object.entries(cashRegister).map(([denomination, quantity]) => ({
    denomination: mapDenominationsToDbDenominations(parseFloat(denomination) as unknown as Denominations),
    quantity,
  }));
};

export const mapCashRegisterRecordToDbCashRegisterWithGroup = (
  groupId: number,
  cashRegister: CashRegisterRecord
): TablesInsert<"cash_register">[] => {
  return Object.entries(cashRegister).map(([denomination, quantity]) => ({
    group_id: groupId,
    denomination: mapDenominationsToDbDenominations(parseFloat(denomination) as unknown as Denominations),
    quantity,
  }));
};
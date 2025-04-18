import { mapDbDenominationsToDenominations } from "@/mappers/denominations";
import { Tables } from "@/supabase/types";
import { CashRegister } from "@/types/models/cashRegister";

export const mapDbCashRegisterToCashRegister = (dbChild: Tables<"cash_register">): CashRegister => {
  return {
    id: dbChild.id,
    groupId: dbChild.group_id,
    denomination: mapDbDenominationsToDenominations(dbChild.denomination),
    quantity: dbChild.quantity,
    createdAt: new Date(dbChild.created_at)
  };
};
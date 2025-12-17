import { mapDenominationsToDbDenominations } from "@/mappers/denominations";
import supabase from "@/supabase/client";
import { Json } from "@/supabase/types";
import { Denominations } from "@/types/enums/finance";
import {
  BuffetPurchaseInput,
  SingleCashActionInput,
  WithdrawalActionInput,
} from "@/types/finance";
import { AuthError } from "@supabase/supabase-js";

const processSingleCashAction = async (
  input: SingleCashActionInput
): Promise<Json> => {
  try {
    const { data, error } = await supabase.rpc("process_single_cash_action", {
      input: {
        leader_id: input.leaderId,
        child_id: input.childId,
        transaction_amount: input.transactionAmount,
        transaction_type: input.transactionType,
        denominations_updates: Object.entries(input.denominationsUpdates).map(
          ([denomination, quantity]) => ({
            denomination: mapDenominationsToDbDenominations(
              parseFloat(denomination) as unknown as Denominations
            ),
            quantity,
          })
        ),
      },
    });

    if (error) {
      throw new Error(error.message || "Finančná operácia zlyhala.");
    }
    return data;
  } catch (error: any) {
    throw error as AuthError;
  }
};

const processBuffetPurchase = async (
  input: BuffetPurchaseInput
): Promise<Json> => {
  try {
    const { data, error } = await supabase.rpc("process_buffet_purchase", {
      input: {
        leader_id: input.leaderId,
        payments_list: input.buffetAccounts.map((account) => ({
          child_id: account.childId,
          amount: account.amountToPay,
        })),
      },
    });

    if (error) {
      throw new Error(error.message || "Finančná operácia zlyhala.");
    }
    return data;
  } catch (error: any) {
    throw error as AuthError;
  }
};

const processWithdrawalAction = async (
  input: WithdrawalActionInput
): Promise<Json> => {
  try {
    const { data, error } = await supabase.rpc("process_withdrawal_action", {
      input: {
        leader_id: input.leaderId,
        total_amount: input.totalAmount,
      },
    });

    if (error) {
      throw new Error(error.message || "Finančná operácia zlyhala.");
    }
    return data;
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const financeRepository = {
  processSingleCashAction,
  processBuffetPurchase,
  processWithdrawalAction,
};

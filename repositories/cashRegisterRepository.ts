import { mapCashRegisterRecordToDbCashRegister, mapCashRegisterRecordToDbCashRegisterWithGroup, mapDbCashRegisterToCashRegister } from "@/mappers/cashRegister";
import { groupRepository } from "@/repositories/groupRepository";
import supabase from "@/supabase/client";
import { Tables } from "@/supabase/types";
import { CashRegisterRecord } from "@/types/finance";
import { CashRegister } from "@/types/models/cashRegister";
import { getEmptyCashRegister } from "@/utils/finance";
import { AuthError } from "@supabase/supabase-js";

const readCashRegisterByLeader = async (leaderId: string): Promise<CashRegister[]> => {
  try {

    // Step 1: Find group by leader_id for current camp session
    const group = await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId);
    if (!group) throw new Error("No group found for the leader");

    const groupId = group.id;

    // Step 2: Find all corresponding data from cash register
    const { data: cashRegisterData, error: cashRegisterError } = await supabase
      .from('cash_register')
      .select('*')
      .eq('group_id', groupId);

    if (cashRegisterError) throw cashRegisterError;

    return cashRegisterData.map((cashRegister) => mapDbCashRegisterToCashRegister(cashRegister));
  }
  catch (error: any) {
    throw error as AuthError;
  }
};

const updateCashRegisterByLeader = async (leaderId: string, counts: CashRegisterRecord): Promise<CashRegister[]> => {
  try {
    // Step 1: Find group by leader_id for current camp session
    const group = await groupRepository.readGroupBasicByLeaderForCurrentCampSession(leaderId);
    if (!group) throw new Error("No group found for the leader");

    const groupId = group.id;
    const cashRegisterRecords = mapCashRegisterRecordToDbCashRegister(counts);

    // Step 2: Fetch existing cash register rows for the group
    const { data: existingRows, error: fetchError } = await supabase
      .from('cash_register')
      .select('*')
      .eq('group_id', groupId);

    if (fetchError) throw fetchError;
    if (!existingRows) throw new Error('No cash register rows found for this group');

    // Step 3: Update each row based on denomination
    const updatedRows: Tables<"cash_register">[] = [];
    for (const record of cashRegisterRecords) {
      const { denomination, quantity } = record;

      const { data, error } = await supabase
        .from('cash_register')
        .update({ quantity })
        .eq('group_id', groupId)
        .eq('denomination', denomination!) // Match the denomination
        .select()
        .single();

      if (error) throw error;
      if (data) updatedRows.push(data);
    }

    return updatedRows.map((updatedRows) => mapDbCashRegisterToCashRegister(updatedRows));
  } catch (error: any) {
    throw error as AuthError;
  }
}

const createEmptyCashRegisterRecordsForGroup = async (groupId: number): Promise<CashRegister[]> => {
  try {
    const cashRegisterRecords = mapCashRegisterRecordToDbCashRegisterWithGroup(groupId, getEmptyCashRegister());
    const { data, error } = await supabase
      .from('cash_register')
      .insert(cashRegisterRecords)
      .select();

    if (error) throw error;

    return data.map((record) => mapDbCashRegisterToCashRegister(record));
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const cashRegisterRepository = {
  readCashRegisterByLeader,
  updateCashRegisterByLeader,
  createEmptyCashRegisterRecordsForGroup,
}
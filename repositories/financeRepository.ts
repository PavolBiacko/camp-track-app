import { mapDbCashRegisterToCashRegister } from "@/mappers/cashRegister";
import { mapDbChildToChild } from "@/mappers/children";
import supabase from "@/supabase/client";
import { CashRegister } from "@/types/models/cashRegister";
import { Child } from "@/types/models/children";
import { AuthError } from "@supabase/supabase-js";

const readChildrenByLeader = async (leaderId: string): Promise<Child[] | null> => {
  try {
    // Step 1: Fetch the single group where leader_id matches
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('leader_id', leaderId)
      .single();

    if (groupError) throw groupError;
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all children in that group
    const { data: childrenData, error: childrenError } = await supabase
      .from('children')
      .select('*')
      .eq('group_id', groupId)
      .order('last_name', { ascending: true });

    if (childrenError) throw childrenError;

    return childrenData.map((child) => mapDbChildToChild(child));
  } catch (error: any) {
    // console.error('Error reading children:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const readChildById = async (id: string): Promise<Child | null> => {
  try {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return mapDbChildToChild(data);
  } catch (error: any) {
    // console.error('Error reading child:', (error as AuthError).message);
    throw error as AuthError;
  }
}

const readCashRegisterByLeader = async (leaderId: string): Promise<CashRegister[] | null> => {
  try {
    // Step 1: Fetch the single group where leader_id matches
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .select('id')
      .eq('leader_id', leaderId)
      .single();

    if (groupError) throw groupError;
    if (!group) return null; // No group found for this leader

    const groupId = group.id;

    // Step 2: Fetch all corresponding data from cash register
    const { data: cashRegisterData, error: childrenError } = await supabase
      .from('cash_register')
      .select('*')
      .eq('group_id', groupId);

    if (childrenError) throw childrenError;

    return cashRegisterData.map((cashRegister) => mapDbCashRegisterToCashRegister(cashRegister));
  }
  catch (error: any) {
    // console.error('Error reading cash registers:', (error as AuthError).message);
    throw error as AuthError;
  }
};


export const financeRepository = {
  readChildrenByLeader,
  readChildById,
  readCashRegisterByLeader,
}
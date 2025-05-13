import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types";
import { Group, GroupCreate, GroupCreateFormInputs, GroupUpdate, GroupUpdateFormInputs } from "@/types/models/groups";

export const mapGroupCreateFormInputsToGroupCreate = (data: GroupCreateFormInputs): GroupCreate => {
  return {
    number: Number(data.number),
    name: data.name,
    sessionId: Number(data.sessionId!), // sessionId can't be null here
    leaderId: data.leaderId,
  };
}

export const mapGroupUpdateFormInputsToGroupUpdate = (data: GroupUpdateFormInputs): GroupUpdate => {
  return {
    number: data.number ? Number(data.number) : undefined,
    name: data.name,
    sessionId: data.sessionId ? Number(data.sessionId) : undefined,
    leaderId: data.leaderId,
  };
}

export const mapGroupCreateToDbGroup = (data: GroupCreate): TablesInsert<"groups"> => {
  return {
    number: data.number,
    name: data.name,
    session_id: data.sessionId,
    leader_id: data.leaderId,
  };
}

export const mapGroupUpdateToDbGroup = (data: GroupUpdate): TablesUpdate<"groups"> => {
  return {
    number: data.number,
    name: data.name,
    session_id: data.sessionId,
    leader_id: data.leaderId,
  };
}

export const mapDbGroupToGroup = (data: Tables<"groups">): Group => {
  return {
    id: data.id,
    number: data.number,
    name: data.name,
    sessionId: data.session_id,
    leaderId: data.leader_id,
    createdAt: new Date(data.created_at),
  };
}

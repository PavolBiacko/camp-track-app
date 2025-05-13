import { mapDbUserRoleToUserRole } from "@/mappers/roles";
import { Tables, TablesInsert, TablesUpdate } from "@/supabase/types";
import {
  DbGroupComlex,
  Group,
  GroupComplex,
  GroupCreate,
  GroupCreateFormInputs,
  GroupUpdate,
  GroupUpdateFormInputs
} from "@/types/models/groups";

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

export const mapDbGroupComplexToGroupComplex = (data: DbGroupComlex): GroupComplex => {
  return {
    id: data.id,
    number: data.number,
    name: data.name,
    sessionId: data.session_id,
    session: {
      id: data.camp_sessions.id,
      beginDate: new Date(data.camp_sessions.begin_date),
      endDate: new Date(data.camp_sessions.end_date),
      createdAt: new Date(data.camp_sessions.created_at),
    },
    leaderId: data.leader_id,
    leader: data.leader_id && data.users ? {
      id: data.users.id,
      email: data.users.email,
      firstName: data.users.first_name,
      lastName: data.users.last_name,
      birthDate: data.users.birth_date ? new Date(data.users.birth_date) : null,
      role: mapDbUserRoleToUserRole(data.users.role),
      createdAt: new Date(data.users.created_at),
    } : null,
    createdAt: new Date(data.created_at),
  };
}

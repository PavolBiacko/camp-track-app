import { mapDbGenderToGender } from "@/mappers/gender";
import { Tables, TablesInsert } from "@/supabase/types";
import { ChildWithBalance, DbChildGroupLinkWithChild } from "@/types/models/children";
import { GroupAccount, GroupAccountCreate } from "@/types/models/groupAccounts";

export const mapDbChildGroupLinkWithChildToChild = (dbChildGroup: DbChildGroupLinkWithChild): ChildWithBalance => {
  return {
    id: dbChildGroup.children.id,
    firstName: dbChildGroup.children.first_name,
    lastName: dbChildGroup.children.last_name,
    birthDate: dbChildGroup.children.birth_date ? new Date(dbChildGroup.children.birth_date) : null,
    gender: mapDbGenderToGender(dbChildGroup.children.gender), // Map to Gender enum (assumes DB values match enum)
    accountBalance: dbChildGroup.account_balance,
    createdAt: new Date(dbChildGroup.created_at) // Assuming created_at is in the group_accounts table (not whole child creaeted_at)
  };
};

export const mapGroupAccountCreateToDbGroupAccount = (groupAccount: GroupAccountCreate): TablesInsert<"group_accounts"> => {
  return {
    group_id: groupAccount.groupId,
    child_id: groupAccount.childId,
  };
};

export const mapDbGroupAccountToGroupAccount = (dbGroupAccount: Tables<"group_accounts">): GroupAccount => {
  return {
    id: dbGroupAccount.id,
    groupId: dbGroupAccount.group_id,
    childId: dbGroupAccount.child_id,
    accountBalance: dbGroupAccount.account_balance,
    createdAt: new Date(dbGroupAccount.created_at),
  };
};
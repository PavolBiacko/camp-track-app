import { mapDbGenderToGender } from "@/mappers/gender";
import { Child, DbChildGroupLinkWithChild } from "@/types/models/children";

export const mapDbChildGroupLinkWithChildToChild = (dbChildGroup: DbChildGroupLinkWithChild): Child => {
  return {
    id: dbChildGroup.children.id,
    firstName: dbChildGroup.children.first_name,
    lastName: dbChildGroup.children.last_name,
    birthDate: dbChildGroup.children.birth_date ? new Date(dbChildGroup.children.birth_date) : null,
    gender: mapDbGenderToGender(dbChildGroup.children.gender), // Map to Gender enum (assumes DB values match enum)
    groupId: dbChildGroup.group_id,
    accountBalance: dbChildGroup.account_balance,
    createdAt: new Date(dbChildGroup.created_at) // Assuming created_at is in the group_accounts table (not whole child creaeted_at)
  };
};

// export const mapAccountUpdateToDbChildGroup = (groupId: number, accountUpdate: ChildBalanceUpdate): TablesInsert<"group_accounts"> => {
//   return {
//     group_id: groupId,
//     child_id: accountUpdate.childId,
//     account_balance: accountUpdate.accountBalance
//   };
// };
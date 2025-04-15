import { mapDbGenderToGender } from "@/mappers/gender";
import { Tables } from "@/supabase/types";
import { Child } from "@/types/models/children";

export const mapDbChildToChild = (dbChild: Tables<"children">): Child => {
  return {
    id: dbChild.id,
    firstName: dbChild.first_name,
    lastName: dbChild.last_name,
    birthDate: dbChild.birth_date ? new Date(dbChild.birth_date) : null,
    gender: mapDbGenderToGender(dbChild.gender), // Map to Gender enum (assumes DB values match enum)
    groupId: dbChild.group_id,
    accountBalance: dbChild.account_balance,
    createdAt: dbChild.created_at,
  };
};
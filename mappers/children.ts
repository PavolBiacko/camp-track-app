import { Tables } from "@/supabase/types";
import { Child } from "@/types/models/children";
import { mapDbGenderToGender } from "./gender";

export const maDbChildToChild = (child: Tables<"children">): Child => {
  return {
    id: child.id,
    firstName: child.first_name,
    lastName: child.last_name,
    birthDate: child.birth_date ? new Date(child.birth_date) : null,
    gender: mapDbGenderToGender(child.gender),
    accessCode: child.access_code,
    createdAt: new Date(child.created_at)
  };
}
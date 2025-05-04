import { mapDbUserRoleToUserRole } from "@/mappers/roles";
import { Tables } from "@/supabase/types";
import { User } from "@/types/models/users";

export const mapDbUserToUser = (dbUser: Tables<"users">): User => {
  return {
    id: dbUser.id,
    email: dbUser.email,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    role: mapDbUserRoleToUserRole(dbUser.role),
    birthDate: dbUser.birth_date ? new Date(dbUser.birth_date) : null,
    createdAt: new Date(dbUser.created_at),
  };
}
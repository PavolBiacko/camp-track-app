import { Enums } from "@/supabase/types";
import { UserRoles } from "@/types/enums/roles";

export const mapDbUserRoleToUserRole = (dbRole: Enums<"camp_roles">): UserRoles => {
  switch (dbRole) {
    case "CAMP_LEADER":
      return UserRoles.CAMP_LEADER;
    case "GROUP_LEADER":
      return UserRoles.GROUP_LEADER;
    case "PARENT":
      return UserRoles.PARENT;
    case "USER":
      return UserRoles.USER;
    default:
      throw new Error(`Unknown role: ${dbRole}`);
  }
};

export const mapUserRoleToDbUserRole = (role: UserRoles): Enums<"camp_roles"> => {
  switch (role) {
    case UserRoles.CAMP_LEADER:
      return "CAMP_LEADER";
    case UserRoles.GROUP_LEADER:
      return "GROUP_LEADER";
    case UserRoles.PARENT:
      return "PARENT";
    case UserRoles.USER:
      return "USER";
    default:
      throw new Error(`Unknown role: ${role}`);
  }
};
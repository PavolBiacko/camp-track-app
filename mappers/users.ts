import { mapDbUserRoleToUserRole } from "@/mappers/roles";
import { Tables } from "@/supabase/types";
import { PickerItem } from "@/types/custom/button";
import { User } from "@/types/models/users";

const BASE_PICKER_DATA = [{ id: null, showedText: '-' }];

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

const mapUserToPickerItem = (user: User): PickerItem => {
  return {
    id: user.id,
    showedText: `${user.firstName} ${user.lastName}`,
    helperText: user.email,
  };
}

export const mapManyUsersToPickerItems = (users: User[] | undefined): PickerItem[] => {
  if (users === undefined || users.length === 0) {
    return BASE_PICKER_DATA;
  }

  return [
    ...BASE_PICKER_DATA,
    ...users.map((user) => mapUserToPickerItem(user))
  ];
}
import { mapUserRoleToDbUserRole } from "@/mappers/roles";
import { mapDbUserToUser } from "@/mappers/users";
import supabase from "@/supabase/client";
import { UserRoles } from "@/types/enums/roles";
import { User } from "@/types/models/users";
import { AuthError } from "@supabase/supabase-js";

const readManyUsers = async (sessionId: number | null): Promise<User[]> => {
  try {
    if (sessionId === null) {
      return [];
    }

    const { data: groupsData, error: groupsError } = await supabase
      .from('groups')
      .select('leader_id')
      .eq('session_id', sessionId)
      .not('leader_id', 'is', null);

    if (groupsError) throw groupsError;

    if (groupsData.length === 0) {
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*');

      if (usersError) throw usersError;

      return usersData.map((user) => mapDbUserToUser(user));
    }

    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*')
      .not('id', 'in', `(${groupsData.map((group) => group.leader_id).join(',')})`);

    if (usersError) throw usersError;

    return usersData.map((user) => mapDbUserToUser(user));
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const readUserById = async (id: string | null): Promise<User | null> => {
  try {
    if (id === null) {
      return null;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (userError) throw userError;

    return mapDbUserToUser(userData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

const changeUserRole = async (id: string | null, role: UserRoles): Promise<User | null> => {
  try {
    if (id === null) {
      return null;
    }
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({ role: mapUserRoleToDbUserRole(role) })
      .eq('id', id)
      .select()
      .single();

    if (userError) throw userError;

    return mapDbUserToUser(userData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const usersRepository = {
  readManyUsers,
  readUserById,
  changeUserRole,
};
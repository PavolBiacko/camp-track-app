import { mapDbUserToUser } from "@/mappers/users";
import supabase from "@/supabase/client";
import { User } from "@/types/models/users";
import { AuthError } from "@supabase/supabase-js";

const readManyUsers = async (): Promise<User[]> => {
  try {
    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('*');

    if (usersError) throw usersError;

    return usersData.map((user) => (mapDbUserToUser(user)));
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const usersRepository = {
  readManyUsers,
};
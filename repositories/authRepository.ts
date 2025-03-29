import { mapDbUserToUser } from '@/mappers/users';
import supabase from '@/supabase/client';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';
import { User } from '@/types/models/users';
import { AuthError } from '@supabase/supabase-js';

const login = async ({ email, password }: LoginCredentials): Promise<string> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data.user.id;
  } catch (error: any) {
    // console.error('Login error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const register = async ({ email, password, firstName, lastName }: RegisterCredentials): Promise<string | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      }
    });

    if (error) throw error;

    return data.user?.id ?? null;
  } catch (error: any) {
    // console.error('Register error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

// Running on the server for security reasons
const deleteAccount = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase.functions.invoke("delete-auth-user-by-id", {
      method: "DELETE",
      body: { id: userId },
    });

    if (error) throw error;

  } catch (error: any) {
    // console.error('Deleting user error:', (error as AuthError).message);
    throw error;
  }
}

const logout = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

  } catch (error: any) {
    // console.error('Logout error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const whoami = async (): Promise<User> => {
  try {
    const { data, error: error1 } = await supabase.auth.getUser();

    if (!data || error1) throw error1;

    const { data: user, error: error2 } = await supabase.from("users").select("*").eq("id", data.user.id).single();

    if (!user || error2) throw error2;

    return mapDbUserToUser(user);
  } catch (error: any) {
    // console.error('Logout error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export default {
  login,
  register,
  logout,
  deleteAccount,
  whoami
};
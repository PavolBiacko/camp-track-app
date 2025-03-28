import supabase from '@/supabase/client';
import { Tables } from '@/supabase/types';
import { AuthError } from '@supabase/supabase-js';

const login = async (email: string, password: string): Promise<string> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data.user?.id;
  } catch (error: any) {
    // console.error('Login error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const register = async (email: string, password: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
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

const whoami = async (): Promise<Tables<"users">> => {
  try {
    const { data: data1, error: error1 } = await supabase.auth.getUser();

    if (!data1 || error1) throw error1;

    const { data: data2, error: error2 } = await supabase.from("users").select("*").eq("id", data1.user.id).single();

    if (!data2 || error2) throw error2;

    return data2 as Tables<"users">;
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
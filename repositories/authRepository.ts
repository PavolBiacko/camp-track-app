import client from '@/services/supabaseClient';
import { User } from '@/types/models/users';
import { AuthError } from '@supabase/supabase-js';

const login = async (email: string, password: string): Promise<string> => {
  try {
    const { data, error } = await client.auth.signInWithPassword({
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
    const { data, error } = await client.auth.signUp({
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

const logout = async (): Promise<void> => {
  try {
    const { error } = await client.auth.signOut();

    if (error) throw error;

  } catch (error: any) {
    // console.error('Logout error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

const whoami = async (): Promise<User> => {
  try {
    const { data: data1, error: error1 } = await client.auth.getUser();

    if (!data1 || error1) throw error1;

    const { data: data2, error: error2 } = await client.from("users").select("*").eq("id", data1.user.id).single();

    if (!data2 || error2) throw error2;

    return data2 as User;
  } catch (error: any) {
    // console.error('Logout error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export default {
  login,
  register,
  logout,
  whoami
};
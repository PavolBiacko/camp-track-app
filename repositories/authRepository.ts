import client from '@/services/supabaseClient';
import { AuthError, AuthResponse } from '@/types/auth';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data as AuthResponse;
  } catch (error: any) {
    // console.error('Login error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await client.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data as AuthResponse;
  } catch (error: any) {
    // console.error('Register error:', (error as AuthError).message);
    throw error as AuthError;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const { error } = await client.auth.signOut();

    if (error) throw error;

  } catch (error: any) {
    // console.error('Logout error:', (error as AuthError).message);
    throw error as AuthError;
  }
};
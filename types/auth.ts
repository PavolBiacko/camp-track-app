export type AuthResponse = {
  user: {
    id: string;
    email: string;
    [key: string]: any; // For additional fields client might return
  } | null;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    [key: string]: any; // For additional fields client might return
  } | null;
}

export type AuthError = {
  message: string;
  status?: number;
}
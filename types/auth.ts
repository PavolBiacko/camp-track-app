export type LoginCredentials = {
  email: string;
  password: string;
}

export type RegisterCredentials = LoginCredentials & {
  firstName: string;
  lastName: string;
}
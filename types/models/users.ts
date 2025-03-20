import { UserRoles } from "@/types/roles";

export type User = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  birthDate: any,
  role: UserRoles,
  createdAt: any,
}
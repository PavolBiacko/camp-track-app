import { UserRoles } from "@/types/roles";

export type User = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  birthDate: Date | null,
  role: UserRoles,
  createdAt: Date,
}
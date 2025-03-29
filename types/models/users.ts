import { UserRoles } from "@/types/enums/roles";

export type User = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  birthDate: Date | null,
  role: UserRoles,
  createdAt: Date,
}
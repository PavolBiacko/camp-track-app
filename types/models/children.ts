import { Gender } from "@/types/enums/gender";

export type Child = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  gender: Gender;
  groupId: number | null;
  accountBalance: number;
  createdAt: Date;
}
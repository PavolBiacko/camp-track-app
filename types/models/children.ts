import { Enums, Tables } from "@/supabase/types";
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

export type ChildName = {
  firstName: string;
  lastName: string;
}

export type ChildBalanceUpdate = {
  childId: string,
  accountBalance: number,
}

// DB complex type
export type DbChildGroupLinkWithChild = Tables<"child_group_link"> & {
  children: {
    id: string;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    gender: Enums<"gender">;
  };
};
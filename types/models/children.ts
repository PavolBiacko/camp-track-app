import { Enums, Tables } from "@/supabase/types";
import { Gender } from "@/types/enums/gender";

export type ChildInfo = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  gender: Gender;
  createdAt: Date;
}

export type Child = ChildInfo & {
  accessCode: string;
}

export type ChildWithBalance = ChildInfo & {  // accessCode was added later
  accountBalance: number;
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
export type DbChildGroupLinkWithChild = Tables<"group_accounts"> & {
  children: {
    id: string;
    first_name: string;
    last_name: string;
    birth_date: string | null;
    gender: Enums<"gender">;
  };
};
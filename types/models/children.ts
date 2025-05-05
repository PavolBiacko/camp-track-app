import { Enums, Tables } from "@/supabase/types";
import { Gender } from "@/types/enums/gender";

export type ChildName = {
  firstName: string;
  lastName: string;
}

export type ChildCore = ChildName & {
  birthDate: Date | null;
  gender: Gender;
}

export type ChildFormCore = ChildName & {
  birthDate?: string | null;
  gender: Gender;
}

type ChildInfo = ChildCore & {
  id: string
  createdAt: Date;
}

export type Child = ChildInfo & {
  accessCode: string;
}

export type ChildCreate = ChildFormCore;

export type ChildUpdate = Partial<ChildFormCore>;

export type ChildWithBalance = ChildInfo & {  // accessCode was added later
  accountBalance: number;
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
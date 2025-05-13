import { Tables } from "@/supabase/types";
import { CampSession } from "@/types/models/campSessions";
import { User } from "@/types/models/users";

export type GroupBasic = {
  id: number;
  number: number;
}

export type Group = {
  id: number;
  number: number;
  name: string | null;
  sessionId: number;
  leaderId: string | null;
  createdAt: Date;
}

export type GroupComplex = {
  id: number;
  number: number;
  name: string | null;
  sessionId: number;
  session: CampSession;
  leaderId: string | null;
  leader: User | null;
  createdAt: Date;
}

export type GroupCore = {
  number: number;
  name?: string | null;
  sessionId: number;
  leaderId?: string | null;
}

export type GroupFormInputsCore = {
  number: string;
  name?: string | null;
  sessionId: string | null;
  leaderId?: string | null;
}

export type GroupCreate = GroupCore;

export type GroupUpdate = Partial<GroupCore>;

export type GroupCreateFormInputs = GroupFormInputsCore;

export type GroupUpdateFormInputs = Partial<GroupFormInputsCore>;

// DB complex type
export type DbGroupComlex = Tables<"groups"> & {
  camp_sessions: Tables<"camp_sessions">,
  users: Tables<"users"> | null,
}
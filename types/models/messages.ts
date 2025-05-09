import { Tables } from "@/supabase/types";
import { User } from "@/types/models/users";

export type Message = {
  id: number,
  groupChatId: number,
  senderId: string,
  content: string,
  cretedAt: Date,
}

export type MessageComplex = {
  id: number,
  groupChatId: number,
  sender: User | null,
  content: string,
  createdAt: Date,
}

export type MessageCreate = {
  groupChatId: number,
  senderId: string,
  content: string,
}

// DB complex type
export type DbMessageWithSender = Tables<"messages"> & {
  users: Tables<"users"> | null,
}
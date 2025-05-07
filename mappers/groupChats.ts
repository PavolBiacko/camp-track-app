import { Tables } from "@/supabase/types";
import { GroupChat } from "@/types/models/groupChats";

export const mapDbGroupChatToGroupChat = (dbGroupChat: Tables<"group_chats">): GroupChat => {
  return {
    id: dbGroupChat.id,
    name: dbGroupChat.name,
    sessionRange: dbGroupChat.session_range,
    createdAt: new Date(dbGroupChat.created_at),
  };
}
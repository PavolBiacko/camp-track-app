import { mapDbUserRoleToUserRole } from "@/mappers/roles";
import { TablesInsert } from "@/supabase/types";
import { DbMessageWithSender, MessageComplex, MessageCreate } from "@/types/models/messages";

export const mapDbMessageToMessageComplex = (dbMessage: DbMessageWithSender): MessageComplex => {
  return {
    id: dbMessage.id,
    groupChatId: dbMessage.group_chat_id,
    sender: dbMessage.sender_id && dbMessage.users ? {
      id: dbMessage.users.id,
      email: dbMessage.users.email,
      firstName: dbMessage.users.first_name,
      lastName: dbMessage.users.last_name,
      birthDate: null,
      role: mapDbUserRoleToUserRole(dbMessage.users.role),
      createdAt: new Date(dbMessage.users.created_at),
    } : null,
    content: dbMessage.content,
    createdAt: new Date(dbMessage.created_at),
  };
}

export const mapMessageCreateToDbMessage = (message: MessageCreate): TablesInsert<"messages"> => {
  return {
    group_chat_id: message.groupChatId,
    sender_id: message.senderId,
    content: message.content,
  }
}
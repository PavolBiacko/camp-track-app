import { mapDbMessageToMessageComplex, mapMessageCreateToDbMessage } from "@/mappers/messages";
import supabase from "@/supabase/client";
import { MessageComplex, MessageCreate } from "@/types/models/messages";
import { AuthError } from "@supabase/supabase-js";

const PAGE_SIZE = 20; // Number of messages per page

const fetchMessages = async (chatId: number, page: number): Promise<MessageComplex[]> => {
  try {
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select(`
        id,
        group_chat_id,
        sender_id,
        content,
        created_at,
        users:sender_id (
          id,
          email,
          first_name,
          last_name,
          birth_date,
          role,
          created_at
        )
      `)
      .eq('group_chat_id', chatId)
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

    if (messagesError) throw messagesError;

    return messagesData.map((message) => mapDbMessageToMessageComplex(message));
  } catch (error: any) {
    throw error as AuthError;
  }
}

const sendMessage = async (message: MessageCreate): Promise<MessageComplex> => {
  try {
    const mappedMessage = mapMessageCreateToDbMessage(message);
    const { data: messageData, error: messageError } = await supabase
      .from('messages')
      .insert(mappedMessage)
      .select(`
        id,
        group_chat_id,
        sender_id,
        content,
        created_at,
        users:sender_id (
          id,
          email,
          first_name,
          last_name,
          birth_date,
          role,
          created_at
        )
      `)
      .single();

    if (messageError) throw messageError;

    return mapDbMessageToMessageComplex(messageData);
  } catch (error: any) {
    throw error as AuthError;
  }
};

export const messagesRepository = {
  fetchMessages,
  sendMessage,
  PAGE_SIZE
};
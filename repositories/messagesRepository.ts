import { mapDbMessageToMessageComplex } from "@/mappers/messages";
import supabase from "@/supabase/client";
import { MessageComplex } from "@/types/models/messages";
import { AuthError } from "@supabase/supabase-js";

const PAGE_SIZE = 20; // Number of messages per page

const readManyMessagesPaginated = async (chatId: number, page: number): Promise<MessageComplex[]> => {
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

    console.log("Messages data:", JSON.stringify(messagesData, null, 2));

    return messagesData.map((message) => mapDbMessageToMessageComplex(message));
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const messagesRepository = {
  readManyMessagesPaginated,
  PAGE_SIZE
};
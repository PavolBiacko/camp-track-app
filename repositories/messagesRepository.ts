import { mapDbMessageToMessageComplex, mapMessageCreateToDbMessage } from "@/mappers/messages";
import supabase from "@/supabase/client";
import { DbMessageWithSender, MessageComplex, MessageCreate } from "@/types/models/messages";
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

const createSubscribtion = (queryClient: any, chatId: number) => {
  supabase
    .channel(`messages:group_chat_id=${chatId}`)
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages', filter: `group_chat_id=eq.${chatId}` },
      async (payload) => {
        const newMessage = payload.new as DbMessageWithSender;

        // Fetch the sender's details separately
        const { data: senderData, error: senderError } = await supabase
          .from('users')
          .select('*')
          .eq('id', newMessage.sender_id!)
          .single();

        if (senderError) {
          console.error("Error fetching sender data:", senderError);
          return;
        }

        // Combine the message data with the sender data
        const messageWithSender: DbMessageWithSender = {
          ...newMessage,
          users: senderData,
        };

        const mappedMessage = mapDbMessageToMessageComplex(messageWithSender);
        queryClient.setQueryData(['messages', chatId], (oldData: any) => {
          if (!oldData) return { pages: [[mappedMessage]], pageParams: [0] };
          const updatedPages = [...oldData.pages];
          updatedPages[0] = [mappedMessage, ...updatedPages[0]];
          return { ...oldData, pages: updatedPages };
        });
      }
    )
    .subscribe();
}

export const messagesRepository = {
  fetchMessages,
  sendMessage,
  createSubscribtion,
  PAGE_SIZE
};
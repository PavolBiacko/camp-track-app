import { mapDbGroupChatToGroupChat } from "@/mappers/groupChats";
import supabase from "@/supabase/client";
import { GroupChat } from "@/types/models/groupChats";
import { parseHumdanReadableDateRange } from "@/utils/dates";
import { AuthError } from "@supabase/supabase-js";

const readManyGroupChats = async (): Promise<GroupChat[]> => {
  try {
    const { data: groupChatsData, error: groupChatsError } = await supabase
      .from('group_chats')
      .select('*');

    if (groupChatsError) throw groupChatsError;

    const sortedChatData = groupChatsData.sort((a, b) => {
      const [startA, _endA] = parseHumdanReadableDateRange(a.session_range)
      const [startB, _endB] = parseHumdanReadableDateRange(b.session_range)
      return startA.getTime() - startB.getTime();
    });

    return sortedChatData.map((groupChat) => mapDbGroupChatToGroupChat(groupChat));
  } catch (error: any) {
    throw error as AuthError;
  }
}

const readGroupChatById = async (id: number): Promise<GroupChat> => {
  try {
    const { data: groupChatData, error: groupChatError } = await supabase
      .from('group_chats')
      .select('*')
      .eq('id', id)
      .single();

    if (groupChatError) throw groupChatError;

    return mapDbGroupChatToGroupChat(groupChatData);
  } catch (error: any) {
    throw error as AuthError;
  }
}

export const groupChatRepository = {
  readManyGroupChats,
  readGroupChatById
}
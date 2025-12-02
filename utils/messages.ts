import { FieldBasics } from "@/types/custom/field";
import { GroupChatUpdate } from "@/types/models/groupChats";
import { MessageCreate } from "@/types/models/messages";

export const getMessageObject = (
  groupChatId: number,
  senderId: string,
  content: string
): MessageCreate => {
  return {
    groupChatId,
    senderId,
    content,
  };
};

export const getChatSettingsFormFields = <T extends GroupChatUpdate>(
  fields: FieldBasics<T>[]
) => {
  return {
    titleField: fields[0],
  };
};

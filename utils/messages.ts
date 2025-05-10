import { MessageCreate } from "@/types/models/messages"

export const getMessageObject = (
  groupChatId: number,
  senderId: string,
  content: string,
): MessageCreate => {
  return {
    groupChatId,
    senderId,
    content
  }
}
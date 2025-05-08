import { User } from "./models/users";

export type MessagesBoxProps = {
  id: number;
  name: string | null;
  range: string;
}

export type GroupChatsFilter = {
  current: boolean
}

export type GroupChatParams = {
  chatId: string,
  chatName?: string,
}

export type MessagesContextType = {
  groupMessages: any[],
  setGroupMessages: (messages: any[]) => void,
}

export type MessagesChatData = {
  message: string,
}

export type MessagesChatLineProps = {
  messageId: number,
  userId: string,
  sender: User | null,
  content: string,
  createdAt: Date,
}

export type MessagesAvatarProps = {
  firstName?: string,
  lastName?: string,
}

export type MessagesBubbleProps = {
  firstName?: string,
  lastName?: string,
  isCurrentUser: boolean,
  content: string,
  createdAt: Date,
}
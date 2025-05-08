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
}

export type MessagesContextType = {
  groupMessages: any[],
  setGroupMessages: (messages: any[]) => void,
}

export type MessagesChatData = {
  message: string,
}
export type GroupChat = {
  id: number;
  name: string | null;
  sessionRange: string;
  createdAt: Date;
};

export type GroupChatUpdate = {
  name?: string | null;
};

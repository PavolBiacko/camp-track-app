import { MessagesContextType } from '@/types/messages';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider = (props: PropsWithChildren) => {
  const [groupMessages, setGroupMessages] = useState<any>([]);

  return (
    <MessagesContext.Provider value={{ groupMessages, setGroupMessages }}>
      {props.children}setGroupMessages
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessagesContext must be used within a MessagesProvider');
  }
  return context;
};
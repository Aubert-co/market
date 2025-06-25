// src/context/MessageContext.tsx
import { createContext, useContext, useState } from 'react';
import type {ReactNode} from 'react'
type MessageType = 'success' | 'error' | 'info';

type Message = {
  content: string;
  type: MessageType;
};

type MessageContextType = {
  message: Message | null;
  setMessage: (msg: Message, duration?: number) => void;
  clearMessage: () => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessageState] = useState<Message | null>(null);

  const setMessage = (msg: Message, duration = 3000) => {
    setMessageState(msg);
    if (duration > 0) {
      setTimeout(() => setMessageState(null), duration);
    }
  };

  const clearMessage = () => setMessageState(null);

  return (
    <MessageContext.Provider value={{ message, setMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage deve ser usado dentro de <MessageProvider>');
  }
  return context;
};

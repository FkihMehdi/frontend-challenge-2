import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useRecoilState } from 'recoil';
import { messageStateAtom } from '../state/messageState';
import { Message } from '../types';
import { startMessageStream, stopMessageStream } from '@frontend-challenge/api';

interface MessageContextProps {
  addMessage: (message: Message) => void;
  clearAllMessages: () => void;
  clearMessage: (id: number) => void;
  toggleMessageStream: () => void;
  isRunning: boolean;
}

const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageState, setMessageState] = useRecoilState(messageStateAtom);
  const { isRunning } = messageState;

  useEffect(() => {
    if (isRunning) {
      startMessageStream(addMessage);
    } else {
      stopMessageStream();
    }

    return () => stopMessageStream();
  }, [isRunning]);

  const addMessage = useCallback((message: Message) => {
    setMessageState((prev) => ({
      ...prev,
      messages: [message, ...prev.messages],
    }));
  }, []);

  const clearAllMessages = useCallback(() => {
    setMessageState((prev) => ({
      ...prev,
      messages: [],
    }));
  }, []);

  const clearMessage = useCallback((id: number) => {
    setMessageState((prev) => ({
      ...prev,
      messages: prev.messages.filter((msg) => msg.id !== id),
    }));
  }, []);

  const toggleMessageStream = useCallback(() => {
    setMessageState((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  }, []);
  const value = useMemo(
    () => ({
      addMessage,
      clearAllMessages,
      clearMessage,
      toggleMessageStream,
      isRunning,
    }),
    [addMessage, clearAllMessages, clearMessage, toggleMessageStream, isRunning]
  );

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

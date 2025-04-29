import { useContext } from 'react';
import { MessageContext } from '../context/MessageContext';

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

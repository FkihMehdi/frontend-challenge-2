import { Message } from './types.js';

export interface MessageColumnProps {
  title: string;
  messages: Message[];
  count: number;
  colorClass: string;
}

export interface SnackbarProps {
  message: Message | null;
  label?: string;
  color?: string;
  duration?: number;
  onDismiss: (id: number) => void;
}

export interface MessageItemProps {
  message: Message;
}

export interface HeaderProps {
  title: string;
}

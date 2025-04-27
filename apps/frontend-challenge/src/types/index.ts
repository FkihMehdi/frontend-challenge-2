export interface Message {
  message: string;
  priority: Priority;
  id: number;
}

export enum Priority {
  Error = 0,
  Warning = 1,
  Info = 2,
}

export interface MessageState {
  messages: Message[];
  isRunning: boolean;
}

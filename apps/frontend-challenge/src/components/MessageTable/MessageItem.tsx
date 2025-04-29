import React from 'react';
import { Message } from '@frontend-challenge/types';
import { getMessageBgColor } from '@frontend-challenge/utilities';
import { X } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div
      className={`relative p-3 mb-2 rounded-md border-l-4 shadow-sm ${getMessageBgColor(
        message.priority
      )} transition-all hover:shadow-md group`}
    >
      <button
        data-id={message.id}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-black hover:bg-opacity-10 delete-btn"
        aria-label="Clear message"
      >
        <X size={16} />
      </button>
      <p className="pr-6 text-sm">{message.message}</p>
    </div>
  );
};

export default React.memo(MessageItem);

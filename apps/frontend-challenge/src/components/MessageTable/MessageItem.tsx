import React from 'react';
import { getMessageBgColor } from '@frontend-challenge/utilities';
import { X } from 'lucide-react';
import { MessageItemProps } from '@frontend-challenge/types';
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

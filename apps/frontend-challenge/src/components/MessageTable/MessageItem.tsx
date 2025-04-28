import React from 'react';
import { Message, Priority } from '@frontend-challenge/types';
import { X } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const getBgColor = () => {
    switch (message.priority) {
      case Priority.Error:
        return 'bg-priority-error/10 border-priority-error';
      case Priority.Warning:
        return 'bg-priority-warning/10 border-priority-warning';
      case Priority.Info:
        return 'bg-priority-info/10 border-priority-info';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div
      className={`relative p-3 mb-2 rounded-md border-l-4 shadow-sm ${getBgColor()} transition-all hover:shadow-md group`}
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

import React from 'react';
import { Message } from '@frontend-challenge/types';
import MessageItem from './MessageItem';
import { useMessages } from '../../hooks/useMessage';
import { areEqual } from '@frontend-challenge/utilities';

interface MessageColumnProps {
  title: string;
  messages: Message[];
  count: number;
  colorClass: string;
}

const MessageColumn: React.FC<MessageColumnProps> = ({
  title,
  messages,
  count,
  colorClass,
}) => {
  const { clearMessage } = useMessages();

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const button = target.closest('.delete-btn') as HTMLElement | null;

    if (button) {
      const id = button.getAttribute('data-id');
      if (id) {
        clearMessage(parseInt(id, 10));
      }
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div
        className={`${colorClass} py-2 px-4 rounded-t-lg flex justify-between items-center`}
      >
        <h2 className="font-semibold text-white">{title}</h2>
        <span className="bg-white bg-opacity-20 text-white text-xs font-medium px-2 py-1 rounded-full">
          {count}
        </span>
      </div>
      <div
        className="border border-gray-200 border-t-0 rounded-b-lg p-3 h-[calc(100vh-250px)] overflow-y-auto bg-white"
        onClick={handleClick}
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">No messages</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(MessageColumn, (prev, next) =>
  areEqual(prev, next, ['count', 'title', 'messages'])
);

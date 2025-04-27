import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  errorMessagesSelector,
  warningMessagesSelector,
  infoMessagesSelector,
  messageCounts,
} from '../../state/messageState';
import MessageColumn from './MessageColumn';

const MessageTable: React.FC = () => {
  const errorMessages = useRecoilValue(errorMessagesSelector);
  const warningMessages = useRecoilValue(warningMessagesSelector);
  const infoMessages = useRecoilValue(infoMessagesSelector);
  const counts = useRecoilValue(messageCounts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MessageColumn
        title="Error"
        messages={errorMessages}
        count={counts.error}
        colorClass="bg-priority-error"
      />
      <MessageColumn
        title="Warning"
        messages={warningMessages}
        count={counts.warning}
        colorClass="bg-priority-warning text-gray-800"
      />
      <MessageColumn
        title="Info"
        messages={infoMessages}
        count={counts.info}
        colorClass="bg-priority-info text-gray-800"
      />
    </div>
  );
};

export default MessageTable;

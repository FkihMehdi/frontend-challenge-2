import React from 'react';
import { useRecoilValue } from 'recoil';
import { messageCounts } from '../../state/messageState';
import { useMessages } from '../../context/MessageContext';
import { Play, Pause, Trash2 } from 'lucide-react';

const Controls: React.FC = () => {
  const { clearAllMessages, toggleMessageStream, isRunning } = useMessages();
  const counts = useRecoilValue(messageCounts);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={toggleMessageStream}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition-colors ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
            aria-label={isRunning ? 'Stop messages' : 'Start messages'}
          >
            {isRunning ? (
              <>
                <Pause size={18} /> Stop
              </>
            ) : (
              <>
                <Play size={18} /> Start
              </>
            )}
          </button>

          <button
            onClick={clearAllMessages}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
            aria-label="Clear all messages"
          >
            <Trash2 size={18} /> Clear All
          </button>
        </div>

        <div className="flex items-center justify-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-priority-error"></span>
            <span className="text-sm font-medium">Error: {counts.error}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-priority-warning"></span>
            <span className="text-sm font-medium">
              Warning: {counts.warning}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-priority-info"></span>
            <span className="text-sm font-medium">Info: {counts.info}</span>
          </div>

          <span className="text-sm font-medium text-gray-500">
            Total: {counts.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Controls);

import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { latestErrorSelector } from '../../state/messageState';
import { useMessages } from '../../hooks/useMessage';
import { X } from 'lucide-react';
import { Message } from '@frontend-challenge/types';

const ErrorSnackbar: React.FC = () => {
  const latestError = useRecoilValue(latestErrorSelector);
  const { clearMessage } = useMessages();
  const [activeError, setActiveError] = useState<Message | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (latestError && latestError !== activeError) {
      setActiveError(latestError);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setActiveError(null), 300);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [latestError]);

  if (!activeError) return null;

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm bg-priority-error text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium mb-1">Error</p>
          <p className="text-sm">{activeError.message}</p>
        </div>
        <button
          onClick={() => {
            clearMessage(activeError.id);
            setIsVisible(false);
            setTimeout(() => setActiveError(null), 300);
          }}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
          aria-label="Dismiss error"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ErrorSnackbar;

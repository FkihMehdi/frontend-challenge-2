import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Message } from '@frontend-challenge/types';
import { SnackbarProps } from '@frontend-challenge/types';

const Snackbar: React.FC<SnackbarProps> = ({
  message,
  label = 'Message',
  color = 'bg-priority-error',
  duration = 2000,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(false);
  const [activeMessage, setActiveMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (message && message !== activeMessage) {
      setActiveMessage(message);
      setVisible(true);

      const hideTimer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setActiveMessage(null), 300);
      }, duration);

      return () => clearTimeout(hideTimer);
    }
  }, [message]);

  if (!activeMessage) return null;

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
      } ${color}`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-sm">{activeMessage.message}</p>
        </div>
        <button
          onClick={() => {
            onDismiss(activeMessage.id);
            setVisible(false);
            setTimeout(() => setActiveMessage(null), 300);
          }}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
          aria-label="Dismiss message"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;

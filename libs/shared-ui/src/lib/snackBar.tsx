interface SnackbarProps {
  title?: string;
  message: string;
  colorClass: string;
  duration?: number;
  onClose?: () => void;
}

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const Snackbar: React.FC<SnackbarProps> = ({
  title,
  message,
  colorClass,
  duration = 2000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${colorClass} ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          {title && <p className="font-medium mb-1">{title}</p>}
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => {
              if (onClose) onClose();
            }, 300);
          }}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { useRecoilValue } from 'recoil';
import { latestErrorSelector } from '../../state/messageState';
import { useMessages } from '../../hooks/useMessage';
import Snackbar from '../SnackBar';

const ErrorSnackbar: React.FC = () => {
  const latestError = useRecoilValue(latestErrorSelector);
  const { clearMessage } = useMessages();

  return (
    <Snackbar
      message={latestError}
      label="Error"
      color="bg-priority-error"
      onDismiss={(id) => clearMessage(id)}
    />
  );
};

export default ErrorSnackbar;

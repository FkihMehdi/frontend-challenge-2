import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MessageProvider } from '../MessageContext';
import { useMessages } from '../../hooks/useMessage';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const {
    addMessage,
    clearAllMessages,
    clearMessage,
    toggleMessageStream,
    isRunning,
  } = useMessages();

  return (
    <div>
      <button
        onClick={() =>
          addMessage({ id: 1, message: 'Test Error', priority: 0 })
        }
      >
        Add Message
      </button>
      <button onClick={() => clearMessage(1)}>Clear Message</button>
      <button onClick={clearAllMessages}>Clear All Messages</button>
      <button onClick={toggleMessageStream}>Toggle Stream</button>

      <div data-testid="isRunning">{isRunning ? 'Running' : 'Stopped'}</div>
    </div>
  );
};

describe('MessageContext', () => {
  const setup = () =>
    render(
      <RecoilRoot>
        <MessageProvider>
          <TestComponent />
        </MessageProvider>
      </RecoilRoot>
    );

  it('should toggle the message stream', () => {
    setup();
    const toggleButton = screen.getByText('Toggle Stream');

    const isRunningIndicator = screen.getByTestId('isRunning');

    expect(isRunningIndicator).toHaveTextContent('Running');
    act(() => {
      toggleButton.click();
    });
    expect(isRunningIndicator).toHaveTextContent('Stopped');
  });
});

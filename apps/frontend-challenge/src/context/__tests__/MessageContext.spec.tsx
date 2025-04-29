import { render, screen, act, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { MessageProvider } from '../MessageContext';
import { useMessages } from '../../hooks/useMessage';
import '@testing-library/jest-dom';
import { messageStateAtom } from '../../state/messageState';

const TestComponent = () => {
  const {
    addMessage,
    clearAllMessages,
    clearMessage,
    toggleMessageStream,
    isRunning,
  } = useMessages();

  const [messageState] = useRecoilState(messageStateAtom);

  return (
    <div>
      <button
        onClick={() =>
          addMessage({ id: Math.random(), message: 'Test Error', priority: 0 })
        }
      >
        Add Message
      </button>
      <button onClick={() => clearMessage(messageState.messages[0]?.id || 0)}>
        Clear Message
      </button>
      <button onClick={clearAllMessages}>Clear All Messages</button>
      <button onClick={toggleMessageStream}>Toggle Stream</button>

      <div data-testid="isRunning">{isRunning ? 'Running' : 'Stopped'}</div>
      <ul data-testid="messages">
        {messageState.messages.map((msg) => (
          <li key={msg.id}>
            {msg.message} - {msg.priority}
            <button onClick={() => clearMessage(msg.id)}>Clear</button>
          </li>
        ))}
      </ul>
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

  it('should add a message', () => {
    setup();
    const addButton = screen.getByText('Add Message');
    const messageList = screen.getByTestId('messages');
    expect(messageList.querySelectorAll('li').length).toBe(1);
    act(() => {
      addButton.click();
    });
    expect(messageList.querySelectorAll('li').length).toBe(2);
  });

  it('should clear a message', () => {
    setup();
    const addButton = screen.getByText('Add Message');
    const clearButton = screen.getByText('Clear Message');
    const messageList = screen.getByTestId('messages');

    act(() => {
      addButton.click();
    });

    expect(messageList.querySelectorAll('li').length).toBe(2);

    act(() => {
      clearButton.click();
    });

    expect(messageList.querySelectorAll('li').length).toBe(1);
  });

  it('should clear all messages', () => {
    setup();
    const addButton = screen.getByText('Add Message');
    const clearAllButton = screen.getByText('Clear All Messages');
    const messageList = screen.getByTestId('messages');

    act(() => {
      addButton.click();
      addButton.click();
    });

    expect(messageList.querySelectorAll('li').length).toBe(3);

    act(() => {
      clearAllButton.click();
    });

    expect(messageList.querySelectorAll('li').length).toBe(0);
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageColumn from './MessageColumn';
import { Message, Priority } from '@frontend-challenge/types';
import { useMessages } from '../../context/MessageContext';

jest.mock('./MessageItem', () => ({ message }: any) => (
  <div data-testid="message-item">
    {message.message}
    <button
      data-testid="delete-button"
      className="delete-btn"
      data-id={message.id}
    >
      Delete
    </button>
  </div>
));
jest.mock('../../context/MessageContext', () => ({
  useMessages: jest.fn(),
}));

describe('MessageColumn', () => {
  const mockClearMessage = jest.fn();

  const baseMessages: Message[] = [
    { id: 1, message: 'First message', priority: Priority.Info },
    { id: 2, message: 'Second message', priority: Priority.Warning },
  ];

  beforeEach(() => {
    (useMessages as jest.Mock).mockReturnValue({
      clearMessage: mockClearMessage,
    });
    jest.clearAllMocks();
  });

  it('renders the title and count correctly', () => {
    render(
      <MessageColumn
        title="Info Messages"
        messages={baseMessages}
        count={2}
        colorClass="bg-blue-500"
      />
    );

    expect(screen.getByText('Info Messages')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
  it('renders all messages', () => {
    render(
      <MessageColumn
        title="Test"
        messages={baseMessages}
        count={2}
        colorClass="bg-blue-500"
      />
    );

    const items = screen.getAllByTestId('message-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('First message');
    expect(items[1]).toHaveTextContent('Second message');
  });
  it('renders "No messages" when message list is empty', () => {
    render(
      <MessageColumn
        title="Empty"
        messages={[]}
        count={0}
        colorClass="bg-gray-500"
      />
    );

    expect(screen.getByText('No messages')).toBeInTheDocument();
  });
  it('calls clearMessage when a delete button is clicked', () => {
    render(
      <MessageColumn
        title="Clickable"
        messages={baseMessages}
        count={2}
        colorClass="bg-green-500"
      />
    );

    const deleteButtons = screen.getAllByTestId('delete-button');

    //console.log("deleted buttons are",deleteButtons);

    fireEvent.click(deleteButtons[0]);
    expect(mockClearMessage).toHaveBeenCalledWith(1);
    fireEvent.click(deleteButtons[1]);
    expect(mockClearMessage).toHaveBeenCalledWith(2);
  });
});

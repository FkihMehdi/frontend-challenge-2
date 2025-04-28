import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageItem from '../MessageItem';
import { Message, Priority } from '@frontend-challenge/types';

describe('MessageItem', () => {
  const baseMessage: Message = {
    id: 1,
    message: 'This is a test message',
    priority: Priority.Info,
  };

  it('renders the message text', () => {
    render(<MessageItem message={baseMessage} />);
    expect(screen.getByText(baseMessage.message)).toBeInTheDocument();
  });

  it('renders the clear button with correct aria-label', () => {
    render(<MessageItem message={baseMessage} />);
    const button = screen.getByRole('button', { name: /clear message/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-id', `${baseMessage.id}`);
  });

  it('applies correct styles for Priority.Error', () => {
    const errorMessage: Message = { ...baseMessage, priority: Priority.Error };
    render(<MessageItem message={errorMessage} />);
    const container = screen.getByText(errorMessage.message).parentElement;
    expect(container).toHaveClass('bg-priority-error/10');
    expect(container).toHaveClass('border-priority-error');
  });

  it('applies correct styles for Priority.Warning', () => {
    const warningMessage: Message = {
      ...baseMessage,
      priority: Priority.Warning,
    };
    render(<MessageItem message={warningMessage} />);
    const container = screen.getByText(warningMessage.message).parentElement;
    expect(container).toHaveClass('bg-priority-warning/10');
    expect(container).toHaveClass('border-priority-warning');
  });

  it('applies correct styles for Priority.Info', () => {
    const infoMessage: Message = { ...baseMessage, priority: Priority.Info };
    render(<MessageItem message={infoMessage} />);
    const container = screen.getByText(infoMessage.message).parentElement;
    expect(container).toHaveClass('bg-priority-info/10');
    expect(container).toHaveClass('border-priority-info');
  });
});

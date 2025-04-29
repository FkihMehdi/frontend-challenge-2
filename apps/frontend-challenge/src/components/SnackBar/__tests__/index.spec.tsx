import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Snackbar from '../index';

jest.mock('lucide-react', () => ({
  X: jest.fn(() => <svg />),
}));

describe('Snackbar', () => {
  const mockOnDismiss = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render anything if there is no active message', () => {
    const { container } = render(
      <Snackbar message={null} onDismiss={mockOnDismiss} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the message when the message prop is provided', () => {
    const message = { id: 1, message: 'Test message', priority: 1 };

    render(<Snackbar message={message} onDismiss={mockOnDismiss} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('calls onDismiss and hides the message when the dismiss button is clicked', () => {
    const message = { id: 1, message: 'Dismiss this message', priority: 1 };

    render(<Snackbar message={message} onDismiss={mockOnDismiss} />);

    const dismissButton = screen.getByRole('button', {
      name: /dismiss message/i,
    });
    fireEvent.click(dismissButton);

    expect(mockOnDismiss).toHaveBeenCalledWith(1);
  });

  it('automatically hides the message after the specified duration', () => {
    jest.useFakeTimers();
    const message = { id: 1, message: 'Auto-hide message', priority: 1 };

    render(<Snackbar message={message} onDismiss={mockOnDismiss} />);

    expect(screen.getByText('Auto-hide message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Auto-hide message')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.queryByText('Auto-hide message')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('does not hide the message until the specified duration is reached', () => {
    jest.useFakeTimers();
    const message = {
      id: 1,
      message: 'Delayed auto-hide message',
      priority: 1,
    };

    render(<Snackbar message={message} onDismiss={mockOnDismiss} />);

    expect(screen.getByText('Delayed auto-hide message')).toBeInTheDocument();

    expect(screen.getByText('Delayed auto-hide message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1999);
    });

    expect(screen.getByText('Delayed auto-hide message')).toBeInTheDocument();

    jest.useRealTimers();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Controls from '../index';
import { useRecoilValue } from 'recoil';
import { useMessages } from '../../../context/MessageContext';

jest.mock('recoil', () => {
  const actualRecoil = jest.requireActual('recoil');
  return {
    ...actualRecoil,
    useRecoilValue: jest.fn(),
  };
});

jest.mock('../../../context/MessageContext', () => ({
  useMessages: jest.fn(),
}));

describe('Controls', () => {
  const mockClearAllMessages = jest.fn();
  const mockToggleMessageStream = jest.fn();

  beforeEach(() => {
    (useMessages as jest.Mock).mockReturnValue({
      clearAllMessages: mockClearAllMessages,
      toggleMessageStream: mockToggleMessageStream,
      isRunning: false,
    });

    (useRecoilValue as jest.Mock).mockReturnValue({
      error: 3,
      warning: 5,
      info: 7,
      total: 15,
    });

    jest.clearAllMocks();
  });

  it('renders the start button and counts correctly when not running', () => {
    render(<Controls />);

    expect(
      screen.getByRole('button', { name: /start messages/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Error: 3')).toBeInTheDocument();
    expect(screen.getByText('Warning: 5')).toBeInTheDocument();
    expect(screen.getByText('Info: 7')).toBeInTheDocument();
    expect(screen.getByText('Total: 15')).toBeInTheDocument();
  });

  it('renders the stop button when running', () => {
    (useMessages as jest.Mock).mockReturnValue({
      clearAllMessages: mockClearAllMessages,
      toggleMessageStream: mockToggleMessageStream,
      isRunning: true,
    });

    render(<Controls />);

    expect(
      screen.getByRole('button', { name: /stop messages/i })
    ).toBeInTheDocument();
  });

  it('calls toggleMessageStream when start/stop button is clicked', () => {
    render(<Controls />);

    const toggleButton = screen.getByRole('button', {
      name: /start messages/i,
    });
    fireEvent.click(toggleButton);

    expect(mockToggleMessageStream).toHaveBeenCalled();
  });

  it('calls clearAllMessages when "Clear All" button is clicked', () => {
    render(<Controls />);

    const clearAllButton = screen.getByRole('button', {
      name: /clear all messages/i,
    });
    fireEvent.click(clearAllButton);

    expect(mockClearAllMessages).toHaveBeenCalled();
  });
});

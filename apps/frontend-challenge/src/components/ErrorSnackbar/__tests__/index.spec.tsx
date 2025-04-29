import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorSnackbar from '../index';
import { useRecoilValue } from 'recoil';
import { useMessages } from '../../../hooks/useMessage';

jest.mock('recoil', () => {
  const actualRecoil = jest.requireActual('recoil');
  return {
    ...actualRecoil,
    useRecoilValue: jest.fn(),
  };
});

jest.mock('../../../hooks/useMessage', () => ({
  useMessages: jest.fn(),
}));

describe('ErrorSnackbar', () => {
  const mockClearMessage = jest.fn();

  beforeEach(() => {
    (useMessages as jest.Mock).mockReturnValue({
      clearMessage: mockClearMessage,
    });
    jest.clearAllMocks();
  });

  it('should not render anything if there is no active error', () => {
    (useRecoilValue as jest.Mock).mockReturnValue(null);
    const { container } = render(<ErrorSnackbar />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the latest error message with correct label', () => {
    (useRecoilValue as jest.Mock).mockReturnValue({
      id: 1,
      message: 'Test error',
      priority: 1,
    });

    render(<ErrorSnackbar />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('calls clearMessage when dismiss button is clicked', () => {
    (useRecoilValue as jest.Mock).mockReturnValue({
      id: 1,
      message: 'Dismiss this error',
      priority: 1,
    });

    render(<ErrorSnackbar />);
    const dismissButton = screen.getByRole('button', {
      name: /dismiss/i,
    });

    fireEvent.click(dismissButton);
    expect(mockClearMessage).toHaveBeenCalledWith(1);
  });
});

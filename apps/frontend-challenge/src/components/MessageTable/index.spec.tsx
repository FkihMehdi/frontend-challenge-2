import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageTable from './index';
import { useRecoilValue } from 'recoil';

jest.mock('recoil', () => {
  const actualRecoil = jest.requireActual('recoil');
  return {
    ...actualRecoil,
    useRecoilValue: jest.fn(),
  };
});

jest.mock('./MessageColumn', () => (props: any) => (
  <div data-testid="message-column">
    {props.title} - {props.count}
  </div>
));

describe('MessageTable', () => {
  beforeEach(() => {
    (useRecoilValue as jest.Mock).mockImplementation((selector) => {
      if (selector.key === 'errorMessagesSelector') {
        return [{ id: 1, message: 'Error message' }];
      }
      if (selector.key === 'warningMessagesSelector') {
        return [{ id: 2, message: 'Warning message' }];
      }
      if (selector.key === 'infoMessagesSelector') {
        return [{ id: 3, message: 'Info message' }];
      }
      if (selector.key === 'messageCounts') {
        return { error: 1, warning: 1, info: 1 };
      }
      return [];
    });
    jest.clearAllMocks();
  });

  it('renders three MessageColumn components with correct titles and counts', () => {
    render(<MessageTable />);

    const columns = screen.getAllByTestId('message-column');
    expect(columns).toHaveLength(3);

    expect(screen.getByText('Error - 1')).toBeInTheDocument();
    expect(screen.getByText('Warning - 1')).toBeInTheDocument();
    expect(screen.getByText('Info - 1')).toBeInTheDocument();
  });
});

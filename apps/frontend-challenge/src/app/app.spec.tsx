import { render, screen } from '@testing-library/react';
import App from './app';
import { RecoilRoot } from 'recoil';
import { MessageProvider } from '../context/MessageContext';
import '@testing-library/jest-dom';

jest.mock('../components/Header', () => () => <div>Header Component</div>);
jest.mock('../components/Controls', () => () => <div>Controls Component</div>);
jest.mock('../components/MessageTable', () => () => (
  <div>Message Table Component</div>
));
jest.mock('../components/ErrorSnackbar', () => () => (
  <div>Error Snackbar Component</div>
));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <RecoilRoot>
        <MessageProvider>
          <App />
        </MessageProvider>
      </RecoilRoot>
    );

    expect(screen.getByText('Header Component')).toBeInTheDocument();

    expect(screen.getByText('Controls Component')).toBeInTheDocument();

    expect(screen.getByText('Message Table Component')).toBeInTheDocument();

    expect(screen.getByText('Error Snackbar Component')).toBeInTheDocument();
  });

  it('renders all necessary components inside MessageProvider and RecoilRoot', () => {
    render(
      <RecoilRoot>
        <MessageProvider>
          <App />
        </MessageProvider>
      </RecoilRoot>
    );

    expect(screen.getByText('Header Component')).toBeInTheDocument();
    expect(screen.getByText('Controls Component')).toBeInTheDocument();
    expect(screen.getByText('Message Table Component')).toBeInTheDocument();
    expect(screen.getByText('Error Snackbar Component')).toBeInTheDocument();
  });
});

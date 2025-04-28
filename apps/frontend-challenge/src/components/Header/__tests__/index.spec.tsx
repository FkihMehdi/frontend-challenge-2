import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../index';

describe('Header', () => {
  it('renders the title correctly', () => {
    const testTitle = 'Welcome to the header component';

    render(<Header title={testTitle} />);

    const titleElement = screen.getByText(testTitle);
    // console.log('titleElement', titleElement);

    expect(titleElement).toBeInTheDocument();
    // console.log('tagName', titleElement.tagName);

    expect(titleElement.tagName).toBe('H1');
  });
});

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('App', () => {
  it('can pass this test', () => {
    render(<div>Test</div>);
    expect(true).toBe(true);
  });
});

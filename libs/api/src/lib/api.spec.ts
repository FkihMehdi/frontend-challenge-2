import { startMessageStream, stopMessageStream } from './api.js';

jest.useFakeTimers();

describe('startMessageStream and stopMessageStream', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    stopMessageStream();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('should start the message stream and receive messages', () => {
    startMessageStream(callback);

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0]).toHaveProperty('message');
    expect(callback.mock.calls[0][0]).toHaveProperty('priority');
    expect(callback.mock.calls[0][0]).toHaveProperty('id');
  });

  it('should not start the stream multiple times', () => {
    startMessageStream(callback);
    const firstCallCount = callback.mock.calls.length;

    startMessageStream(callback);
    jest.advanceTimersByTime(1000);

    expect(callback.mock.calls.length).toBeGreaterThanOrEqual(firstCallCount);
    expect(callback.mock.calls.length).toBeLessThanOrEqual(firstCallCount + 1);
  });

  it('should stop the message stream', () => {
    startMessageStream(callback);
    jest.advanceTimersByTime(1000);

    stopMessageStream();

    const callCountAfterStop = callback.mock.calls.length;

    jest.advanceTimersByTime(3000);

    expect(callback.mock.calls.length).toBe(callCountAfterStop);
  });
});

import { snapshot_UNSTABLE } from 'recoil';
import {
  messageStateAtom,
  errorMessagesSelector,
  warningMessagesSelector,
  infoMessagesSelector,
  latestErrorSelector,
  messageCounts,
} from '../messageState';
import { Priority } from '@frontend-challenge/types';

describe('Recoil state and selectors', () => {
  const baseMessages = [
    { id: 1, message: 'Error 1', priority: Priority.Error },
    { id: 2, message: 'Warning 1', priority: Priority.Warning },
    { id: 3, message: 'Info 1', priority: Priority.Info },
    { id: 4, message: 'Error 2', priority: Priority.Error },
  ];

  it('should have the correct default state', async () => {
    const snapshot = snapshot_UNSTABLE();
    const state = await snapshot.getPromise(messageStateAtom);
    expect(state).toEqual({ messages: [], isRunning: true });
  });

  it('errorMessagesSelector should return only error messages', async () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(messageStateAtom, {
        messages: baseMessages,
        isRunning: true,
      });
    });

    const errors = await snapshot.getPromise(errorMessagesSelector);
    expect(errors).toHaveLength(2);
    expect(errors.map((e) => e.message)).toEqual(['Error 1', 'Error 2']);
  });

  it('warningMessagesSelector should return only warning messages', async () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(messageStateAtom, {
        messages: baseMessages,
        isRunning: true,
      });
    });

    const warnings = await snapshot.getPromise(warningMessagesSelector);
    expect(warnings).toHaveLength(1);
    expect(warnings[0].message).toBe('Warning 1');
  });

  it('infoMessagesSelector should return only info messages', async () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(messageStateAtom, {
        messages: baseMessages,
        isRunning: true,
      });
    });

    const infos = await snapshot.getPromise(infoMessagesSelector);
    expect(infos).toHaveLength(1);
    expect(infos[0].message).toBe('Info 1');
  });

  it('latestErrorSelector should return the first error', async () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(messageStateAtom, {
        messages: baseMessages,
        isRunning: true,
      });
    });

    const latestError = await snapshot.getPromise(latestErrorSelector);
    expect(latestError).toEqual({
      id: 1,
      message: 'Error 1',
      priority: Priority.Error,
    });
  });

  it('latestErrorSelector should return null when no error exists', async () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(messageStateAtom, {
        messages: [{ id: 5, message: 'Only Info', priority: Priority.Info }],
        isRunning: true,
      });
    });

    const latestError = await snapshot.getPromise(latestErrorSelector);
    expect(latestError).toBeNull();
  });

  it('messageCounts selector should return correct counts', async () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(messageStateAtom, {
        messages: baseMessages,
        isRunning: true,
      });
    });

    const counts = await snapshot.getPromise(messageCounts);
    expect(counts).toEqual({
      error: 2,
      warning: 1,
      info: 1,
      total: 4,
    });
  });

  it('messageCounts selector should return zeros when no messages', async () => {
    const snapshot = snapshot_UNSTABLE(({ set }) => {
      set(messageStateAtom, {
        messages: [],
        isRunning: true,
      });
    });

    const counts = await snapshot.getPromise(messageCounts);
    expect(counts).toEqual({
      error: 0,
      warning: 0,
      info: 0,
      total: 0,
    });
  });
});

import { atom, selector } from 'recoil';
import { MessageState, Priority } from '@frontend-challenge/types';

export const messageStateAtom = atom<MessageState>({
  key: 'messageState',
  default: {
    messages: [],
    isRunning: true,
  },
});

export const errorMessagesSelector = selector({
  key: 'errorMessages',
  get: ({ get }) => {
    const state = get(messageStateAtom);
    return state.messages.filter((msg) => msg.priority === Priority.Error);
  },
});

export const warningMessagesSelector = selector({
  key: 'warningMessages',
  get: ({ get }) => {
    const state = get(messageStateAtom);
    return state.messages.filter((msg) => msg.priority === Priority.Warning);
  },
});

export const infoMessagesSelector = selector({
  key: 'infoMessages',
  get: ({ get }) => {
    const state = get(messageStateAtom);
    return state.messages.filter((msg) => msg.priority === Priority.Info);
  },
});

export const latestErrorSelector = selector({
  key: 'latestError',
  get: ({ get }) => {
    const errors = get(errorMessagesSelector);
    return errors.length > 0 ? errors[0] : null;
  },
});

export const messageCounts = selector({
  key: 'messageCounts',
  get: ({ get }) => {
    const errors = get(errorMessagesSelector);
    const warnings = get(warningMessagesSelector);
    const infos = get(infoMessagesSelector);

    return {
      error: errors.length,
      warning: warnings.length,
      info: infos.length,
      total: errors.length + warnings.length + infos.length,
    };
  },
});

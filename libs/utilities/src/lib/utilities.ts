import { Priority } from '@frontend-challenge/types';

export function areEqual<T extends object>(
  prevProps: T,
  nextProps: T,
  keys: (keyof T)[]
): boolean {
  return keys.every((key) => prevProps[key] === nextProps[key]);
}

export const getMessageBgColor = (priority: Priority): string => {
  switch (priority) {
    case Priority.Error:
      return 'bg-priority-error/10 border-priority-error';
    case Priority.Warning:
      return 'bg-priority-warning/10 border-priority-warning';
    case Priority.Info:
      return 'bg-priority-info/10 border-priority-info';
    default:
      return 'bg-gray-100 border-gray-300';
  }
};

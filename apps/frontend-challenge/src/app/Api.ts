import random from 'lodash/random';
import faker from 'faker';
import { Observable } from 'rxjs';
import { Priority } from '../types';
import { Message } from '../types';

const observable = new Observable<Message>((subscriber) => {
  const generate = () => {
    const message = faker.lorem.sentence();
    const priority = random(0, 2) as Priority;
    const nextInMS = random(500, 3000);
    const id = Date.now() + Math.floor(Math.random() * 1000);
    subscriber.next({ message, priority, id });
    setTimeout(generate, nextInMS);
  };
  generate();
});

let currentSubscription: (() => void) | null = null;

export const startMessageStream = (
  callback: (message: Message) => void
): void => {
  if (currentSubscription) return;

  const subscription = observable.subscribe({
    next: callback,
  });

  currentSubscription = () => subscription.unsubscribe();
};

export const stopMessageStream = (): void => {
  if (currentSubscription) {
    currentSubscription();
    currentSubscription = null;
  }
};

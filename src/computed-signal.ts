import { computed as createComputed } from './computed';
import { effect } from './effect';
import type { Signal } from './types';

export function computedSignal<T>(fn: () => T): Signal<T> {
  const c = createComputed(fn);

  return {
    get: c.get,
    set: () => {
      throw new Error('Cannot set a computed signal');
    },
    update: () => {
      throw new Error('Cannot update a computed signal');
    },
    subscribe: (callback: () => void) => {
      effect(() => {
        c.get();
        callback();
      });

      return () => {
        // optional cleanup
      };
    },
  };
}

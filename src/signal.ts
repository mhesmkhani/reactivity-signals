import { context } from './context';
import type { Computation, Signal, Subscriber } from './types';

export function signal<T>(initialValue: T): Signal<T> {
  let value = initialValue;
  const subscribers = new Set<Computation>();
  const reactSubscribers = new Set<Subscriber>();

  function get(): T {
    const comp = context.activeComputation;
    if (comp) subscribers.add(comp);
    return value;
  }

  function set(next: T) {
    if (Object.is(value, next)) return;
    value = next;
    subscribers.forEach((comp) => comp.markDirty());
    reactSubscribers.forEach((fn) => fn());
  }

  function update(fn: (prev: T) => T) {
    set(fn(value));
  }

  function subscribe(fn: Subscriber) {
    reactSubscribers.add(fn);
    return () => reactSubscribers.delete(fn);
  }

  return { get, set, update, subscribe };
}

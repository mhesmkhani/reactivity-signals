import { useSyncExternalStore } from 'react';
export function useSignal<T>(signal: { subscribe: (fn: () => void) => () => void; get: () => T }) {
  return useSyncExternalStore(signal.subscribe, signal.get, signal.get);
}

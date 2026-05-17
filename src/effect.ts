import { cleanup } from './cleanup';
import { context } from './context';
import type { Computation } from './types';

export function effect(fn: () => void) {
  const comp: Computation = {
    dirty: false,
    dependencies: new Set(),

    run() {
      cleanup(comp);
      context.activeComputation = comp;
      fn();
      context.activeComputation = null;
    },

    markDirty() {
      queueMicrotask(() => this.run());
    },
  };

  comp.run();
  return comp;
}

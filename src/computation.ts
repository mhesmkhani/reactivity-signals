import { cleanup } from './cleanup';
import { context } from './context';
import type { Computation } from './types';

export function createComputation(fn: () => void): Computation {
  const comp: Computation = {
    dirty: true,
    dependencies: new Set(),
    run() {
      if (!this.dirty) return;
      cleanup(this);
      context.activeComputation = comp;
      fn();
      context.activeComputation = null;
      this.dirty = false;
    },
    markDirty() {
      this.dirty = true;
      queueMicrotask(() => this.run());
    },
  };

  comp.run();
  return comp;
}

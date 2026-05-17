import type { Computation } from './types';
export function cleanup(comp: Computation) {
  comp.dependencies.forEach((dep) => dep.delete(comp));
  comp.dependencies.clear();
}

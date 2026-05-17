import { createComputation } from './computation';

export function computed<T>(fn: () => T) {
  let value!: T;

  const comp = createComputation(() => {
    value = fn();
  });

  return {
    get(): T {
      comp.run();
      return value;
    },
  };
}

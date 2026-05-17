export type Subscriber = () => void;

export interface Computation {
  run: () => void;
  markDirty: () => void;
  dependencies: Set<Set<Computation>>;
  dirty: boolean;
}

export interface Signal<T> {
  get(): T;
  set(value: T): void;
  update(fn: (prev: T) => T): void;
  subscribe(fn: Subscriber): () => void;
}

export const delay = async (ms: number) => {
  await new Promise<void>((resolve) => setTimeout(() => resolve(), ms));
};

type PromiseParams<T> = Parameters<ConstructorParameters<typeof Promise<T>>[0]>;
type PromiseResolve<T> = PromiseParams<T>[0];
type PromiseReject<T> = PromiseParams<T>[1];

export class Deferred<T> {
  declare resolve: PromiseResolve<T>;
  declare reject: PromiseReject<T>;
  promise: Promise<T>;
  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

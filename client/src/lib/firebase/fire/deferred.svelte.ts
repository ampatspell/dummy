export class Deferred<T, E> {
  promise = $state<Promise<T>>()!;
  _resolve!: (model: T) => void;
  _reject!: (err: E) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(model: T) {
    this._resolve(model);
  }

  reject(err: E) {
    this._reject(err);
  }
}

const deferred = <T, E>() => new Deferred<T, E>();

export type LoadPromiseType = 'cached' | 'remote';

export class LoadPromises<T, E> {
  _cached = $state(deferred());
  _remote = $state(deferred());

  _onWillLoad() {
    this._cached = deferred();
    this._remote = deferred();
  }

  _onDidLoad(model: T, type: LoadPromiseType) {
    this._cached.resolve(model);
    if (type === 'remote') {
      this._remote.resolve(model);
    }
  }

  _onError(error: E) {
    this._cached.reject(error);
    this._remote.reject(error);
  }

  cached = $derived(this._cached.promise);
  remote = $derived(this._remote.promise);
}

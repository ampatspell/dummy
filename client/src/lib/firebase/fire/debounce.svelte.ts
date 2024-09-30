export type DebounceOptions = {
  delay: number;
  commit: () => Promise<void>;
};

export class Debounce {
  private readonly options: DebounceOptions;
  private id?: number;

  constructor(options: DebounceOptions) {
    this.options = options;
  }

  cancel() {
    const id = this.id;
    if (id !== undefined) {
      this.id = undefined;
      window.clearTimeout(id);
      return true;
    }
    return false;
  }

  private async commit() {
    await this.options.commit();
  }

  schedule() {
    this.cancel();
    this.id = window.setTimeout(() => this.commit(), this.options.delay);
  }

  force() {
    if (this.cancel()) {
      this.commit();
    }
  }
}

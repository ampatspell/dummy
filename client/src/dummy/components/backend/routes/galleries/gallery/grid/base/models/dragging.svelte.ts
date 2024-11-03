export class GridContextDragging<T> {
  models = $state<T[]>([]);
  selected = $state<T[]>([]);
  first = false;

  readonly isDragging = $derived(this.selected.length > 0);

  isDraggingModel(model: T) {
    return this.selected.includes(model);
  }

  onStart(models: T[], selected: T[]) {
    this.models = [...models];
    this.selected = [...selected];
    this.first = true;
  }

  onEnd() {
    const models = this.models;
    this.models = [];
    this.selected = [];
    return models;
  }

  onOver(over: T, position: 'before' | 'after') {
    const next = [];
    const current = this.models;
    const selected = this.selected;

    if (!this.first && selected.includes(over)) {
      return;
    }

    this.first = false;

    for (let i = 0; i < current.length; i++) {
      const model = current[i];
      if (!selected.includes(model)) {
        if (position === 'after') {
          next.push(model);
        }
        if (model === over) {
          next.push(...selected);
        }
        if (position === 'before') {
          next.push(model);
        }
      }
    }
    this.models = next;
  }
}

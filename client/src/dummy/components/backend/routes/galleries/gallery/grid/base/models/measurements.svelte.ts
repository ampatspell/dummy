export class GridContextMeasurements {
  width = $state<number>();

  readonly gap = 5;

  readonly columns = $derived.by(() => {
    const width = this.width;
    if (width) {
      return Math.floor(width / 150);
    }
  });

  readonly size = $derived.by(() => {
    const { width, columns, gap } = this;
    if (width && columns) {
      const w = width - gap * (columns - 1);
      const size = w / columns;
      return Math.floor(size);
    }
  });
}

import { browser } from '$app/environment';

export class LoadedImage {
  url: string;
  element?: HTMLImageElement;

  isLoading = $state(true);
  isLoaded = $state(false);
  isError = $state(false);

  constructor(url: string) {
    this.url = url;
    if (browser) {
      this.element = new Image();
      this.element.onload = () => this.onLoaded();
      this.element.onerror = (e) => this.onError(e);
      this.element.src = url;
    }
  }

  onError(e: string | Event) {
    this.isLoading = false;
    this.isError = true;
  }

  onLoaded() {
    this.isLoading = false;
    this.isLoaded = true;
  }
}

export type OnSizeCallback = (size: number) => void;

export class ImageResizeObserver {
  pairs: Map<HTMLDivElement, OnSizeCallback> = new Map();
  observer = new ResizeObserver((entries) => {
    const pairs = this.pairs;
    entries.forEach((entry) => {
      const element = entry.target as HTMLDivElement;
      const callback = pairs.get(element);
      let { width } = element.getBoundingClientRect();
      callback?.(width);
    });
  });
  observe(element: HTMLDivElement, onSize: OnSizeCallback) {
    this.pairs.set(element, onSize);
    this.observer.observe(element, { box: 'border-box' });
    return () => {
      this.pairs.delete(element);
      this.observer.unobserve(element);
    };
  }
}

let observer: ImageResizeObserver | undefined;

export const getImageResizeObserver = () => {
  if (!observer && browser) {
    observer = new ImageResizeObserver();
  }
  return observer;
};

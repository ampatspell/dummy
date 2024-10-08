export type Document<T extends object> = {
  id: string;
  data: T;
};

export type GalleryData = {
  name: string;
};

export type ImageDataSizeKey = 'original' | '120x120' | '2048x2048';

export type ImageDataSizes = {
  [key in ImageDataSizeKey]: {
    size: { width: number; height: number };
    url: string;
  };
};

export type ImageData = {
  name: string;
  createdAt: Date;
  sizes: ImageDataSizes;
};

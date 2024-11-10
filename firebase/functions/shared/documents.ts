export type GalleryData = {
  name: string;
};

export type GalleryImageSize = 'original' | '2048x2048' | '120x120';

export type GalleryImageData = {
  name: string;
  createdAt: Date;
  position?: number;
  sizes: {
    [key in GalleryImageSize]: {
      url: string;
      size: { width: number; height: number };
    };
  };
};

export type PageData = {
  name: string;
  createdAt: Date;
  path: string;
  definition: string;
  settings: Record<string, unknown>;
  viewCount: number;
};

export type LayoutData = {
  name: string;
  definition: string;
  settings: {
    layout: Record<string, unknown>;
    pages: Record<string, Record<string, unknown>>;
  };
};

export type SiteData = {
  layout?: string;
};

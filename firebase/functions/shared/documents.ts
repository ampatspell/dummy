export type GalleryData = {
  name: string;
  images: number;
};

export type GalleryImageSize = '120x120' | '2048x2048';

export type GalleryImageDataImageInfo = {
  url: string;
  size: { width: number; height: number };
};

export type GalleryImageDataThumbnails = {
  [key in GalleryImageSize]: GalleryImageDataImageInfo;
};

export type GalleryImageData = {
  name: string;
  createdAt: Date;
  position?: number;
  original: GalleryImageDataImageInfo;
  thumbnails: GalleryImageDataThumbnails;
};

export type PageData = {
  name: string;
  createdAt: Date;
  path: string;
  definition: string;
  settings: Record<string, unknown>;
  views: number;
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

export const userRoles = ['admin', 'visitor'] as const;

export const isUserRole = (role: string): role is UserRole => {
  return (userRoles as unknown as string[]).includes(role);
};

export type UserRole = (typeof userRoles)[number];

export type UserData = {
  email?: string;
  isAnonymous: boolean;
  role: UserRole;
};

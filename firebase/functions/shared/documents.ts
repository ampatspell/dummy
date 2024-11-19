export type AssetsFolderData = {
  name: string;
  files: number;
};

export type AssetsImageSize = '120x120' | '2048x2048';

export type Size = { width: number; height: number };

export type AssetsFileDataThumbnails = {
  [key in AssetsImageSize]: {
    url: string;
    size: Size;
  };
};

export type AssetsFileDataOriginal = {
  url: string;
  size?: Size;
};

export type AssetFileType = 'image' | 'other';

export type AssetsFileData = {
  type: AssetFileType;
  name: string;
  createdAt: Date;
  position?: number;
  contentType: string;
  original: AssetsFileDataOriginal;
  thumbnails?: AssetsFileDataThumbnails;
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

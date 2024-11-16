export type GalleryData = {
  name: string;
  images: number;
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
}

export type UserRole = typeof userRoles[number];

export type UserData = {
  email?: string;
  isAnonymous: boolean;
  role: UserRole;
};

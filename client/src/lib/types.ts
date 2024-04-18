export type Document<T extends object> = {
	id: string;
	data: T;
};

export type GalleryData = {
	name: string;
};

export type ImageDataSizes = {
	[key: string]: {
		size: { width: number; height: number };
		url: string;
	};
};

export type ImageData = {
	name: string;
	createdAt: Date;
	sizes: ImageDataSizes;
};

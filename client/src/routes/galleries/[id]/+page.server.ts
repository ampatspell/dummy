import { getFirebase } from '$server/firebase';
import type { Timestamp } from 'firebase-admin/firestore';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Document, GalleryData, ImageData, ImageDataSizes } from '$lib/types';

export const load: PageServerLoad = async (event) => {
	const id = event.params.id;
	const firebase = await getFirebase();

	const loadGallery = async () => {
		const snapshot = await firebase.firestore.doc(`galleries/${id}`).get();
		const data = snapshot.data();
		if (!data) {
			return;
		}
		return {
			id: snapshot.id,
			data: {
				name: data.name as string
			}
		} satisfies Document<GalleryData>;
	};

	const loadImages = async () => {
		const snapshot = await firebase.firestore.collection(`galleries/${id}/images`).get();
		return snapshot.docs.map((snapshot) => {
			const data = snapshot.data();
			return {
				id: snapshot.id,
				data: {
					name: data.name as string,
					createdAt: (data.createdAt as Timestamp).toDate(),
					sizes: data.sizes as ImageDataSizes
				}
			} satisfies Document<ImageData>;
		});
	};

	const [gallery, images] = await Promise.all([loadGallery(), loadImages()]);

	if (!gallery) {
		return error(404, 'Gallery not found');
	}

	return {
		gallery,
		images
	};
};

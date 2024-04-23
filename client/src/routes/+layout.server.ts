import type { Document, GalleryData } from '$lib/types';
import { getFirebase } from '$server/firebase';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const firebase = await getFirebase();

  const snapshot = await firebase.firestore.collection('galleries').orderBy('name', 'asc').get();
  const galleries = snapshot.docs.map((snapshot) => {
    const id = snapshot.id;
    const data = snapshot.data();
    return {
      id,
      data: {
        name: data.name as string,
      },
    } satisfies Document<GalleryData>;
  });

  return {
    galleries,
  };
};

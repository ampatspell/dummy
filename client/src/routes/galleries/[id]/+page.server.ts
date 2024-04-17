import { getFirebase } from "$server/firebase";
import type { Timestamp } from "firebase-admin/firestore";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

type ImageSizes = {
  [key: string]: {
    size: { width: number, height: number },
    url: string,
  };
};

export const load: PageServerLoad = async (event) => {
  const id = event.params.id;
  const firebase = await getFirebase();

  const loadGallery = async () => {
    let snapshot = await firebase.firestore.doc(`galleries/${id}`).get();
    if(!snapshot.exists) {
      return;
    }
    const data = snapshot.data();
    return {
      id: snapshot.id,
      data: {
        name: data.name as string,
      }
    };
  }

  const loadImages = async () => {
    let snapshot = await firebase.firestore.collection(`galleries/${id}/images`).get();
    return snapshot.docs.map(snapshot => {
      let data = snapshot.data();
      return {
        id: snapshot.id,
        data: {
          name: data.name as string,
          createdAt: (data.createdAt as Timestamp).toDate(),
          sizes: data.sizes as ImageSizes
        },
      };
    });
  }

  let [ gallery, images ] = await Promise.all([
    loadGallery(),
    loadImages(),
  ]);

  if(!gallery) {
    return error(404, 'Gallery not found');
  }

  return {
    gallery,
    images
  };
}

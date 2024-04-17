import { getFirebase } from "../server/firebase";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  let firebase = await getFirebase();

  let snapshot = await firebase.firestore.collection('galleries').orderBy('name', 'asc').get();
  let galleries = snapshot.docs.map(snapshot => {
    const id = snapshot.id;
    const data = snapshot.data();
    return {
      id,
      data: {
        name: data.name as string
      }
    };
  });

  return {
    galleries
  };
}

import { QueryDocumentSnapshot, WithFieldValue } from 'firebase-admin/firestore';

export const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

import { FieldValue } from 'firebase-admin/firestore';
import { QueryDocumentSnapshot, WithFieldValue } from 'firebase-admin/firestore';

export const compact = <T extends object>(input: T): T => {
  const res: Record<string, unknown> = {};
  for (const key in input) {
    const value = input[key];
    if (value !== undefined) {
      res[key] = value;
    }
  }
  return res as T;
};

export const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

export const maybeDelete = <T>(value: T) => {
  if (value === undefined || value === null) {
    return FieldValue.delete();
  }
  return value;
};

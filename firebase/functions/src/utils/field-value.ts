import { FieldValue } from 'firebase-admin/firestore';

export const maybeDelete = <T>(value: T) => {
  if (value === undefined || value === null) {
    return FieldValue.delete();
  }
  return value;
};

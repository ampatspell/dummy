export const existing = <T extends { exists: boolean | undefined }>(value: T | undefined) => {
  if (value) {
    if (value.exists === true) {
      return value;
    }
  }
};

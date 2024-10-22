export type ExistingTarget = { exists: boolean | undefined };

export const existing = <T extends ExistingTarget>(value: T | undefined) => {
  if (value) {
    if (value.exists === true) {
      return value;
    }
  }
};

export const isExisting = <T extends ExistingTarget>(value: T | undefined) => {
  return !!existing(value);
};

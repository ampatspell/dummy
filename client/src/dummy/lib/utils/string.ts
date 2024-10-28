export const quote = (string: string | undefined) => {
  if (string !== undefined) {
    return `"${string}"`;
  }
};

export const pluralize = (value: number, singular: string, plural: string) => {
  if (value === 1) {
    return singular;
  }
  return plural;
};

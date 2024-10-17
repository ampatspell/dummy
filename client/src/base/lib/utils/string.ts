export const quote = (string: string | undefined) => {
  if (string !== undefined) {
    return `"${string}"`;
  }
};

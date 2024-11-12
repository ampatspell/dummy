export type IsLoadedModel = {
  isLoaded: boolean;
};

export const isLoaded = (arr: (IsLoadedModel | undefined)[]) => {
  return !arr.find((item) => {
    if (item) {
      return !item.isLoaded;
    }
    return true;
  });
};

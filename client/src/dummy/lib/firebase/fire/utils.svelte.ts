export type IsLoadedModel = {
  isLoaded: boolean;
};

export const isLoaded = (arr: (IsLoadedModel | undefined)[]) => {
  return !arr.find((item) => item && !item.isLoaded);
};

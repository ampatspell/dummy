export const scope = <T>(cb: () => T): T => {
  return cb();
};

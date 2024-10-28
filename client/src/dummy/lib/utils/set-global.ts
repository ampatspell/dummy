export const setGlobal = (hash: { [key: string]: unknown }, silent = false) => {
  if (typeof window === 'undefined') {
    return;
  }
  for (const key in hash) {
    const value = hash[key];
    if (!silent) {
      console.log(`window.${key} = ${value}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)[key] = value;
  }
};

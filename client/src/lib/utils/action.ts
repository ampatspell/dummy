export const action = (target: object, key: string, descriptor?: PropertyDescriptor) => {
  if (typeof descriptor?.value !== 'function') {
    throw new Error('Must be function');
  }
  return {
    configurable: true,
    get() {
      const bound = descriptor.value!.bind(this);
      Object.defineProperty(this, key, {
        value: bound,
        configurable: true,
        writable: true,
      });
      return bound;
    },
  };
};

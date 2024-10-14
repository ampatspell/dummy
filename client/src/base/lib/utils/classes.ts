export type ClassesArg = string | undefined | null | false;
export type Classes = ClassesArg | ClassesArg[];

export const classes = (...args: Classes[]) => {
  const arr = <string[]>[];
  const onArg = (arg: ClassesArg) => {
    const type = typeof arg;
    if (type === 'string') {
      if (arg) {
        arr.push(arg);
      }
    }
  };
  args.forEach((arg) => {
    if (Array.isArray(arg)) {
      arg.forEach((arg) => {
        onArg(arg);
      });
    } else {
      onArg(arg);
    }
  });
  return arr.join(' ');
};

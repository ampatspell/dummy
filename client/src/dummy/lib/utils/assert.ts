import { dev } from '$app/environment';

export class AssertionError extends Error {}

export function assert(expr: unknown, msg = ''): asserts expr {
  if (dev) {
    if (!expr) {
      throw new AssertionError(msg);
    }
  }
}

export const assertDefined = <T>(
  condition: T | undefined,
  instance: { constructor: { name: string } },
  caller: string,
): T => {
  assert(!!condition, `${instance.constructor.name}.${caller}`);
  return condition;
};

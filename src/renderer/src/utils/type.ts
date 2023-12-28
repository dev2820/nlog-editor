export const isNil = (value: unknown): value is undefined | null => {
  return Object.is(value, undefined) || Object.is(value, null);
};

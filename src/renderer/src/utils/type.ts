export const isNull = (value: unknown): value is null => {
  return Object.is(value, null);
};

export const isUndefined = (value: unknown): value is undefined => {
  return Object.is(value, undefined);
};

export const isNil = (value: unknown): value is undefined | null => {
  return isNull(value) || isUndefined(value);
};

export const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};

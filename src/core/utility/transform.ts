export const keepUndefinedOrTransform = <T, K>(
  value: T | undefined,
  transformInto: (v: T) => K,
): K | undefined => {
  if (value === undefined) {
    return undefined;
  }
  return transformInto(value);
};

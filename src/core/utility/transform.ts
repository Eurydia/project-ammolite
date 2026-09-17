export const keepUndefinedOrTransform = <T, K>(
  value: T | undefined,
  transformInto: (v: T) => K,
): K | undefined => {
  if (value === undefined) {
    return undefined;
  }
  return transformInto(value);
};

export const executeThenChain = <FnInputT, FnOutputT, TransformedOutputT>(
  fn: (v: FnInputT) => FnOutputT,
  transformer: (v: FnOutputT) => TransformedOutputT,
) => {
  return (data: FnInputT) => transformer(fn(data));
};

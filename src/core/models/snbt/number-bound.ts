const validateExact = (value: number, inclMin: number, inclMax: number) => {
  if (!Number.isInteger(value)) {
    return false;
  }
  if (value < inclMin || value > inclMax) {
    return false;
  }
  return true;
};

const validateRange = (
  value: { min?: number; max?: number },
  inclMin: number,
  inclMax: number,
) => {
  if (value.min !== undefined && !validateExact(inclMin, inclMax, value.min)) {
    return false;
  }

  if (value.max !== undefined && !validateExact(inclMin, inclMax, value.max)) {
    return false;
  }
  if (
    value.max !== undefined &&
    value.min !== undefined &&
    value.max < value.min
  ) {
    return false;
  }
  return true;
};

const validate = (
  value: number | { min?: number; max?: number },
  inclMin: number,
  inclMax: number,
) => {
  switch (typeof value) {
    case "number":
      return validateExact(value, inclMin, inclMax);
    case "object":
      return validateRange(value, inclMin, inclMax);
    default:
      return false;
  }
};

const makeNew = <T extends number | { min?: number; max?: number }>(
  value: T,
  inclMin: number,
  InclMax: number,
): T => {
  if (!validate(value, inclMin, InclMax)) {
    throw new Error("Bad value for NumberBound");
  }
  return value;
};

export type NumberBoundType = number | Readonly<{ min?: number; max?: number }>;

export const NumberBound = {
  integer<T extends number | { min?: number; max?: number }>(
    value: T,
    inclMin: number = -2_147_483_648,
    inclMax: number = 2_147_483_647,
  ) {
    return makeNew(value, inclMin, inclMax);
  },
  byte<T extends number | { min?: number; max?: number }>(
    value: T,
    inclMin: number = -128,
    inclMax: number = 127,
  ) {
    return makeNew(value, inclMin, inclMax);
  },
};

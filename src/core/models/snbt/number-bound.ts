const validateExact = (value: number, inclMin: number, inclMax: number) => {
  if (!Number.isInteger(value)) {
    return false;
  }
  if (value < inclMin || value > inclMax) {
    return false;
  }
  return true;
};

const validateFloat = (value: number, inclMin: number, inclMax: number) => {
  return Number.isFinite(value) && value >= inclMin && value <= inclMax;
};

const validateRange = (
  value: { min?: number; max?: number },
  inclMin: number,
  inclMax: number,
) => {
  if (value.min !== undefined && !validateExact(value.min, inclMin, inclMax)) {
    return false;
  }

  if (value.max !== undefined && !validateExact(value.max, inclMin, inclMax)) {
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

type NumberBoundInput = number | { min?: number; max?: number };
type FrozenNumberBound<T extends NumberBoundInput> = T extends number ? T
  : Readonly<T>;

const makeNew = <T extends NumberBoundInput>(
  value: T,
  inclMin: number,
  InclMax: number,
): FrozenNumberBound<T> => {
  if (!validate(value, inclMin, InclMax)) {
    throw new Error("Bad value for NumberBound");
  }
  if (typeof value === "number") {
    return value as FrozenNumberBound<T>;
  }
  const range = value as { min?: number; max?: number };
  return Object.freeze({ ...range }) as FrozenNumberBound<T>;
};

const makeFloat = (value: number, inclMin: number, inclMax: number): number => {
  if (!validateFloat(value, inclMin, inclMax)) {
    throw new Error("Bad value for NumberBound");
  }
  return value;
};

export type NumberBoundType = number | Readonly<{ min?: number; max?: number }>;

export const SNBT_FLOAT_MIN = -3.4028235e38;
export const SNBT_FLOAT_MAX = 3.4028235e38;
export const SNBT_FLOAT_MIN_POSITIVE = 1.401298464324817e-45;

export const NumberBound = {
  integer<T extends NumberBoundInput>(
    value: T,
    inclMin: number = -2_147_483_648,
    inclMax: number = 2_147_483_647,
  ) {
    return makeNew(value, inclMin, inclMax);
  },
  byte<T extends NumberBoundInput>(
    value: T,
    inclMin: number = -128,
    inclMax: number = 127,
  ) {
    return makeNew(value, inclMin, inclMax);
  },
  float(
    value: number,
    inclMin: number = SNBT_FLOAT_MIN,
    inclMax: number = SNBT_FLOAT_MAX,
  ): number {
    return makeFloat(value, inclMin, inclMax);
  },
};

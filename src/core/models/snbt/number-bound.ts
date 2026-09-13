class NumberBoundImpl {
  private readonly value: number | Readonly<{ min?: number; max?: number }>;

  public valueOf() {
    return this.value;
  }

  public constructor(value: number | { min?: number; max?: number }) {
    switch (typeof value) {
      case "number": {
        this.value = value;
        break;
      }
      case "object": {
        this.value = Object.freeze({ ...value });
        break;
      }
      default:
        throw new Error("Unsupported type");
    }
  }
}

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

export type NumberBound = NumberBoundImpl;

export const NumberBound = {
  integer(
    value: number | { min?: number; max?: number },
    inclMin: number = -2_147_483_648,
    inclMax: number = 2_147_483_647,
  ) {
    if (!validate(value, inclMin, inclMax)) {
      throw new Error();
    }
    return new NumberBoundImpl(value);
  },
  byte(
    value: number | { min?: number; max?: number },
    inclMin: number = -128,
    inclMax: number = 127,
  ): NumberBoundImpl {
    if (!validate(value, inclMin, inclMax)) {
      throw new Error();
    }
    return new NumberBoundImpl(value);
  },
};

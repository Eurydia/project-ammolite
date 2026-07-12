export const predicateIntValueOrRange = (
  value:
    | number
    | { min?: number; max: number }
    | { min: number; max?: number }
    | { min: number; max: number },
) => {
  if (typeof value === 'number' && !Number.isInteger(value)) {
    return false
  }

  if (
    typeof value === 'object' &&
    typeof value.min === 'number' &&
    !Number.isInteger(value.min)
  ) {
    return false
  }

  if (
    typeof value === 'object' &&
    typeof value.max === 'number' &&
    !Number.isInteger(value.max)
  ) {
    return false
  }
  return true
}

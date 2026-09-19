export interface DataPackModel<TDataPackObject = unknown> {
  asJsonObject(): TDataPackObject;
}

export const toDataPackObject = <T>(value: T): T => {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => toDataPackObject(item)) as T;
  }

  if (typeof value !== "object") {
    return value;
  }

  const model = value as T & Partial<DataPackModel>;
  if (typeof model.asJsonObject === "function") {
    return toDataPackObject(model.asJsonObject()) as T;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      toDataPackObject(item),
    ]),
  ) as T;
};

export const freezeArray = <T>(values: ReadonlyArray<T>): ReadonlyArray<T> =>
  Object.freeze([...values]);

export const freezeDataClass = <T extends object>(value: T): Readonly<T> =>
  Object.freeze(value);

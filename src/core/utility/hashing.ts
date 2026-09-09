import { Hashery } from "hashery";

export const hashString = (str: string) => {
  const hasher = new Hashery();

  return hasher.toHashSync(str, { algorithm: "fnv1" });
};

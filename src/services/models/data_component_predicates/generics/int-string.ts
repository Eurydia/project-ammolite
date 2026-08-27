import z from "zod";

export const IntString = z
  .string()
  .trim()
  .normalize()
  .transform((arg) => Number.parseInt(arg, 10))
  .pipe(z.int());

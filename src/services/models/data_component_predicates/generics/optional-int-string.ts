import z from "zod";

export const OptionalIntString = z
  .string()
  .trim()
  .normalize()
  .transform((arg) => (arg.length === 0 ? undefined : Number.parseInt(arg, 10)))
  .pipe(z.int().optional());

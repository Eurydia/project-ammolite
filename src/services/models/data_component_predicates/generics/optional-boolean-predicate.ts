import z from "zod";

export const OptionalBooleanPredicate = z
  .enum(["yes", "no", "unset"])
  .transform((arg) => (arg === "unset" ? undefined : arg === "yes"))
  .pipe(z.boolean().optional());

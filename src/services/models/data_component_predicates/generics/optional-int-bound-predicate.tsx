import z from "zod";
import { OptionalIntString } from "./optional-int-string";

export const OptionalIntBoundPredicate = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("unset") }),
  z.object({
    kind: z.literal("exact"),
    value: OptionalIntString,
  }),
  z.object({
    kind: z.literal("range"),
    value: z.object({
      minValue: OptionalIntString,
      maxValue: OptionalIntString,
    }),
  }),
]);

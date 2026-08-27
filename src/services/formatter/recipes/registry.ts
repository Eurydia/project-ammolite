import { z } from "zod";

export const RECIPE_STRINGIFIER_REGISTRY = z.registry<{
  stringify: (payload: z.$output) => string | undefined;
}>();

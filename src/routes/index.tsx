import { FieldGroup$MobEffect } from "#/components/form/field-groups/mob-effect.field-group";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type { BrewingRecipe } from "#/services/models/recipes/brewing";
import { createFileRoute } from "@tanstack/react-router";
import type z from "zod";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const form = AppFormHook.useAppForm({
    defaultValues: {
      inputItem: {},
      outputItem: {},
      reagentItem: {},
    } as z.input<typeof BrewingRecipe>,
  });
  return <FieldGroup$MobEffect form={form} fields={""} />;
}

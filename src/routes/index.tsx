import { createFileRoute } from "@tanstack/react-router";
import type z from "zod";
import { FieldGroup$MobEffect } from "#/components/form/field-groups/mob-effect.field-group";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { BrewingRecipe } from "#/services/models/recipes/brewing";
import { FieldGroup$BrewingRecipe } from "#/components/form/field-groups/recipes/brewing-recipe";
import { MinecraftItem } from "#/services/enums/minecraft-item.enum";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const form = AppFormHook.useAppForm({
    defaultValues: {
      inputItem: { item: MinecraftItem.ACACIA_BOAT },
      reagentItem: { item: MinecraftItem.ACACIA_BOAT },
      outputItem: {},
    } as z.input<typeof BrewingRecipe>,
  });
  return <FieldGroup$BrewingRecipe form={form} />;
}

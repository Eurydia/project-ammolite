import { createFileRoute } from "@tanstack/react-router";
import type z from "zod";
import { FieldGroup$BrewingRecipe } from "#/components/form/field-groups/recipes/brewing-recipe";
import { AppFormHook } from "#/lib/form/form-hooks";
import { MinecraftItem } from "#/services/enums/minecraft-item.enum";
import type { BrewingRecipe } from "#/services/models/recipes/brewing";

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

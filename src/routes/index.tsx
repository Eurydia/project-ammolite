import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { createFileRoute } from "@tanstack/react-router";
import type z from "zod";
import { FieldGroup$BrewingRecipe } from "#/components/form/field-groups/recipes/brewing-recipe";
import { JsonDisplay } from "#/components/json-display";
import { AppFormHook } from "#/lib/form/form-hooks";
import { MinecraftItem } from "#/services/enums/minecraft-item.enum";
import { PotionType } from "#/services/enums/potion-effect.enum";
import {
  BrewingRecipe,
  BrewingRecipe$toDataPackJSON,
} from "#/services/models/recipes/brewing";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const form = AppFormHook.useAppForm({
    defaultValues: {
      inputItem: { item: MinecraftItem.ACACIA_BOAT },
      reagentItem: { item: MinecraftItem.ACACIA_BOAT },
      outputItem: {
        id: MinecraftItem.BLAZE_POWDER,
        count: "",
        components: {
          selectedType: "minecraft:potion_contents",
          values: [
            {
              type: "minecraft:potion_contents",
              value: {
                id: "minecraft:potion_contents",
                potion: PotionType.AWKWARD,
                customName: "",
              },
            },
          ],
        },
      },
    } as z.input<typeof BrewingRecipe>,
    validators: { onChange: BrewingRecipe },
  });

  return (
    <Container sx={{ py: 3 }}>
      <Stack spacing={3}>
        <FieldGroup$BrewingRecipe form={form} />
        <form.Subscribe selector={({ values }) => values}>
          {(values) => {
            const result = BrewingRecipe.safeParse(values);

            return (
              <JsonDisplay
                emptyMessage="Complete the recipe to display its JSON."
                title="RECIPE JSON"
                value={
                  result.success
                    ? BrewingRecipe$toDataPackJSON(result.data)
                    : undefined
                }
              />
            );
          }}
        </form.Subscribe>
      </Stack>
    </Container>
  );
}

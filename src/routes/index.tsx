import Container from "@mui/material/Container";
import { createFileRoute } from "@tanstack/react-router";
import type z from "zod";
import { FieldGroup$BrewingRecipe } from "#/components/form/field-groups/recipes/brewing-recipe";
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
        item: MinecraftItem.BLAZE_POWDER,
        count: "",
        components: {
          id: "minecraft:potion_contents",
          potion: PotionType.AWKWARD,
          customName: "",
        },
      },
    } as z.input<typeof BrewingRecipe>,
    validators: { onChange: BrewingRecipe },
    listeners: {
      onChange: ({
        formApi: {
          state: { values },
        },
      }) => {
        console.debug(
          JSON.stringify(
            BrewingRecipe$toDataPackJSON(BrewingRecipe.parse(values)),
          ),
        );
      },
    },
  });

  return (
    <Container>
      <FieldGroup$BrewingRecipe form={form} />
    </Container>
  );
}

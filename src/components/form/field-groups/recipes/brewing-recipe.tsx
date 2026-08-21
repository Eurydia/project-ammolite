import { AppFormHook } from "#/lib/form/form-hooks";
import type { PotionContentsPredicate } from "#/services/models/data_component_predicates/potion_contents_predicate";
import type {
  BrewingRecipe,
  BrewingRecipe$InputItem,
  BrewingRecipe$OutputItem,
} from "#/services/models/recipes/brewing";
import Stack from "@mui/material/Stack";
import type z from "zod";

const FG$PotionContentsPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContentsPredicate>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="potions"></group.AppField>
      </Stack>
    );
  },
});

const RecipeInput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.infer<typeof BrewingRecipe$InputItem>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="item">
          {(f) => <f.MinecraftItemSelector label={"Item"} />}
        </group.AppField>
      </Stack>
    );
  },
});

const RecipeOutput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.infer<typeof BrewingRecipe$OutputItem>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="item">
          {(f) => <f.MinecraftItemSelector label={"Item"} />}
        </group.AppField>
        <group.AppField name="count">
          {(f) => <f.NumberField label={"Count"} />}
        </group.AppField>
      </Stack>
    );
  },
});

export const FieldGroup$BrewingRecipe = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof BrewingRecipe>,
  render: ({ group }) => {
    return (
      <Stack>
        <RecipeInput fields={"inputItem"} form={group} />
        <RecipeInput fields={"reagentItem"} form={group} />
        <RecipeOutput fields={"outputItem"} form={group} />
      </Stack>
    );
  },
});

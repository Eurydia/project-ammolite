import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type {
  BrewingRecipe,
  BrewingRecipe$InputItem,
  BrewingRecipe$OutputItem,
} from "#/services/models/recipes/brewing";
import { FG$PotionContentsPredicate } from "../data-component-predicates/potion-contents-predicate";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const RecipeInput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.infer<typeof BrewingRecipe$InputItem>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="item">
          {(f) => <f.MinecraftItemSelector label={"Item"} />}
        </group.AppField>
        <group.Subscribe
          selector={({ values: { potionContentsPredicate } }) => {
            return potionContentsPredicate;
          }}
        >
          {(value) =>
            value !== undefined ? (
              <Card variant="outlined" sx={{ padding: 4 }}>
                <FG$PotionContentsPredicate
                  form={group}
                  fields={"potionContentsPredicate"}
                />
              </Card>
            ) : (
              <Button
                onClick={() =>
                  group.setFieldValue("potionContentsPredicate", {
                    potions: { kind: "unset" },
                  })
                }
              >
                Add predicate
              </Button>
            )
          }
        </group.Subscribe>
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

export const FieldGroup$BrewingRecipe = AppFormHook.withForm({
  defaultValues: {} as z.input<typeof BrewingRecipe>,
  render: ({ form }) => {
    return (
      <Stack>
        <RecipeInput fields={"inputItem"} form={form} />
        <RecipeInput fields={"reagentItem"} form={form} />
      </Stack>
    );
  },
});

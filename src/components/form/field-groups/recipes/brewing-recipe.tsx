import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type {
  BrewingRecipe,
  BrewingRecipe$InputItem,
  BrewingRecipe$OutputItem,
} from "#/services/models/recipes/brewing";
import { FieldGroup$PotionContents } from "../data-component/potion-content/potion-content";
import { FieldGroup$PotionContentsPredicate } from "../data-component-predicates/potion-content-predicate/potion-contents-predicate";

const _RecipeInput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof BrewingRecipe$InputItem>,
  render: ({ group }) => {
    return (
      <Paper>
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>RECIPE INGREDIENT</Typography>
          <group.AppField name="item">
            {(field) => <field.MinecraftItemSelector label="Item" />}
          </group.AppField>
          <group.Subscribe
            selector={({ values }) => values.potionContents !== undefined}
          >
            {(active) => (
              <Paper variant="outlined">
                <Stack spacing={2}>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "potionContents",
                        active ? undefined : {},
                      )
                    }
                  >
                    {active
                      ? "REMOVE POTION CONTENTS PREDICATE"
                      : "ADD POTION CONTENTS PREDICATE"}
                  </Button>
                  {active && (
                    <FieldGroup$PotionContentsPredicate
                      form={group}
                      fields="potionContents"
                    />
                  )}
                </Stack>
              </Paper>
            )}
          </group.Subscribe>
        </Stack>
      </Paper>
    );
  },
});

const _RecipeOutput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof BrewingRecipe$OutputItem>,
  render: ({ group }) => {
    return (
      <Paper>
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>RECIPE OUTPUT</Typography>
          <group.AppField name="id">
            {(field) => <field.MinecraftItemSelector label="Item" />}
          </group.AppField>
          <group.AppField name="count">
            {(field) => <field.FC$TextField label="Count (optional)" />}
          </group.AppField>
          <FieldGroup$PotionContents form={group} fields="components" />
        </Stack>
      </Paper>
    );
  },
});

export const FieldGroup$BrewingRecipe = AppFormHook.withForm({
  defaultValues: {} as z.input<typeof BrewingRecipe>,
  render: ({ form }) => {
    return (
      <Stack spacing={3}>
        <Typography sx={{ fontWeight: 700 }}>BREWING RECIPE</Typography>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 700 }}>INPUT</Typography>
          <_RecipeInput fields="inputItem" form={form} />
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 700 }}>REAGENT</Typography>
          <_RecipeInput fields="reagentItem" form={form} />
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 700 }}>OUTPUT</Typography>
          <_RecipeOutput fields="outputItem" form={form} />
        </Stack>
      </Stack>
    );
  },
});

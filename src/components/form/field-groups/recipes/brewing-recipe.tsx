import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
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
          <group.AppField name="item">
            {(f) => <f.MinecraftItemSelector label={"Item"} />}
          </group.AppField>
          <Card>
            <group.Subscribe
              selector={({ values }) => {
                return values.potionContents !== undefined;
              }}
            >
              {(active) => (
                <CardContent>
                  <Toolbar>
                    <Button
                      onClick={() =>
                        group.setFieldValue(
                          "potionContents",
                          active ? undefined : {},
                        )
                      }
                    >
                      {active ? "Clear" : "Add"}
                    </Button>
                  </Toolbar>
                  {active && (
                    <FieldGroup$PotionContentsPredicate
                      form={group}
                      fields={"potionContents"}
                    />
                  )}
                </CardContent>
              )}
            </group.Subscribe>
          </Card>
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
          <group.AppField name="item">
            {(f) => <f.MinecraftItemSelector label={"Item"} />}
          </group.AppField>
          <group.AppField name="count">
            {(f) => <f.FC$TextField label={"Count"} />}
          </group.AppField>
          <FieldGroup$PotionContents form={group} fields={"components"} />
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
        <_RecipeInput fields={"inputItem"} form={form} />
        <_RecipeInput fields={"reagentItem"} form={form} />
        <_RecipeOutput fields={"outputItem"} form={form} />
      </Stack>
    );
  },
});

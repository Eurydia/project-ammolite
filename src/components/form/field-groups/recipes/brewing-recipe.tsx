import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type {
  BrewingRecipe,
  BrewingRecipe$InputItem,
  BrewingRecipe$OutputItem,
} from "#/services/models/recipes/brewing";
import { FieldGroup$PotionContentsPredicate } from "../data-component-predicates/potion-content-predicate/potion-contents-predicate";

const RecipeInput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof BrewingRecipe$InputItem>,
  render: ({ group }) => {
    return (
      <Stack>
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
    );
  },
});

const _RecipeOutput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.infer<typeof BrewingRecipe$OutputItem>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="item">
          {(f) => <f.MinecraftItemSelector label={"Item"} />}
        </group.AppField>
        <group.AppField name="count">
          {(f) => <f.FC$TextField label={"Count"} />}
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
      </Stack>
    );
  },
});

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type z from "zod";
import {
  FieldGroupPanel,
  FieldGroupSection,
} from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { DataComponents } from "#/services/models/data_components";
import type {
  BrewingRecipe,
  BrewingRecipe$InputItem,
  BrewingRecipe$OutputItem,
} from "#/services/models/recipes/brewing";
import { FieldGroup$PotionContentsPredicate } from "../data-component-predicates/potion-content-predicate/potion-contents-predicate";

const _RecipeInput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof BrewingRecipe$InputItem>,
  render: ({ group }) => {
    return (
      <FieldGroupPanel title="Recipe ingredient">
        <group.AppField name="item">
          {(field) => <field.MinecraftItemSelector label="Item" />}
        </group.AppField>
        <group.Subscribe
          selector={({ values }) => values.potionContents !== undefined}
        >
          {(active) => (
            <FieldGroupSection>
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
            </FieldGroupSection>
          )}
        </group.Subscribe>
      </FieldGroupPanel>
    );
  },
});

const _RecipeOutput = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof BrewingRecipe$OutputItem>,
  render: ({ group }) => {
    return (
      <FieldGroupPanel title="Recipe output">
        <group.AppField name="id">
          {(field) => <field.MinecraftItemSelector label="Item" />}
        </group.AppField>
        <group.AppField name="count">
          {(field) => <field.FC$TextField label="Count (optional)" />}
        </group.AppField>
        <DataComponents.fieldGroupComponent form={group} fields="components" />
      </FieldGroupPanel>
    );
  },
});

export const FieldGroup$BrewingRecipe = AppFormHook.withForm({
  defaultValues: {} as z.input<typeof BrewingRecipe>,
  render: ({ form }) => {
    return (
      <FieldGroupPanel title="Brewing recipe">
        <FieldGroupSection title="Input">
          <_RecipeInput fields="inputItem" form={form} />
        </FieldGroupSection>
        <FieldGroupSection title="Reagent">
          <_RecipeInput fields="reagentItem" form={form} />
        </FieldGroupSection>
        <FieldGroupSection title="Output">
          <_RecipeOutput fields="outputItem" form={form} />
        </FieldGroupSection>
      </FieldGroupPanel>
    );
  },
});

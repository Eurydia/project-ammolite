import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import {
  FieldGroupPanel,
  FieldGroupSection,
} from "#/components/form/field-group-layout";
import { FieldGroup$PotionContents } from "#/components/form/field-groups/data-component/potion-content/potion-content";
import { AppFormHook } from "#/lib/form/form-hooks";
import { ItemRarity } from "#/services/enums/item-rarity";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { Consumable } from "./consumable";
import { CustomName } from "./custom_name";
import { DamageResistant } from "./damage_resistant";
import { DeathProtection } from "./death_protection";
import { EnchantmentGlintOverride } from "./enchantment_glint_override";
import { ItemName } from "./item_name";
import { Lore } from "./lore";
import {
  PotionContents,
  PotionContents$AsDataPackJSON,
} from "./potion_contents";
import { PotionDurationScale } from "./potion-duration-scale";
import { Rarity } from "./rarity";

const DATA_COMPONENT_TYPES = [
  "minecraft:potion_contents",
  "minecraft:custom_name",
  "minecraft:item_name",
  "minecraft:lore",
  "minecraft:rarity",
  "minecraft:enchantment_glint_override",
  "minecraft:potion_duration_scale",
  "minecraft:damage_resistant",
  "minecraft:consumable",
  "minecraft:death_protection",
] as const;

type DataComponentType = (typeof DATA_COMPONENT_TYPES)[number];

const _schema$Entry = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("minecraft:potion_contents"),
    value: PotionContents,
  }),
  z.object({
    type: z.literal("minecraft:custom_name"),
    value: CustomName.schema,
  }),
  z.object({
    type: z.literal("minecraft:item_name"),
    value: ItemName.schema,
  }),
  z.object({ type: z.literal("minecraft:lore"), value: Lore.schema }),
  z.object({ type: z.literal("minecraft:rarity"), value: Rarity.schema }),
  z.object({
    type: z.literal("minecraft:enchantment_glint_override"),
    value: EnchantmentGlintOverride.schema,
  }),
  z.object({
    type: z.literal("minecraft:potion_duration_scale"),
    value: PotionDurationScale.schema,
  }),
  z.object({
    type: z.literal("minecraft:damage_resistant"),
    value: DamageResistant.schema,
  }),
  z.object({
    type: z.literal("minecraft:consumable"),
    value: Consumable.schema,
  }),
  z.object({
    type: z.literal("minecraft:death_protection"),
    value: DeathProtection.schema,
  }),
]);

const schema = z
  .object({
    selectedType: z.enum(DATA_COMPONENT_TYPES),
    values: _schema$Entry.array(),
  })
  .transform(({ values }) => values);

const _createDefaultEntry = (
  type: DataComponentType,
): z.input<typeof _schema$Entry> => {
  switch (type) {
    case "minecraft:potion_contents":
      return {
        type,
        value: {
          mode: "normal",
          id: "minecraft:potion_contents",
          potion: PotionType.AWKWARD,
          customName: "",
        },
      };
    case "minecraft:custom_name":
    case "minecraft:item_name":
      return {
        type,
        value: {
          mode: "normal",
          value: { kind: "string", value: "" },
        },
      };
    case "minecraft:lore":
      return { type, value: { mode: "normal", lines: [] } };
    case "minecraft:rarity":
      return {
        type,
        value: { mode: "normal", value: ItemRarity.COMMON },
      };
    case "minecraft:enchantment_glint_override":
      return { type, value: { mode: "normal", value: false } };
    case "minecraft:potion_duration_scale":
      return { type, value: { mode: "normal", value: "" } };
    case "minecraft:damage_resistant":
      return {
        type,
        value: {
          mode: "normal",
          types: { kind: "single", value: "" },
        },
      };
    case "minecraft:consumable":
      return {
        type,
        value: {
          mode: "normal",
          consumeSeconds: "",
          animation: "drink",
          sound: { kind: "reference", value: "" },
          hasConsumeParticles: true,
          onConsumeEffects: [],
        },
      };
    case "minecraft:death_protection":
      return { type, value: { mode: "normal", deathEffects: [] } };
  }
};

const _entryToDataPackJSON = (entry: z.output<typeof _schema$Entry>) => {
  switch (entry.type) {
    case "minecraft:potion_contents":
      return PotionContents$AsDataPackJSON(entry.value);
    case "minecraft:custom_name":
      return CustomName.toDataPackJSON(entry.value);
    case "minecraft:item_name":
      return ItemName.toDataPackJSON(entry.value);
    case "minecraft:lore":
      return Lore.toDataPackJSON(entry.value);
    case "minecraft:rarity":
      return Rarity.toDataPackJSON(entry.value);
    case "minecraft:enchantment_glint_override":
      return EnchantmentGlintOverride.toDataPackJSON(entry.value);
    case "minecraft:potion_duration_scale":
      return PotionDurationScale.toDataPackJSON(entry.value);
    case "minecraft:damage_resistant":
      return DamageResistant.toDataPackJSON(entry.value);
    case "minecraft:consumable":
      return Consumable.toDataPackJSON(entry.value);
    case "minecraft:death_protection":
      return DeathProtection.toDataPackJSON(entry.value);
  }
};

const fieldGroupComponent = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof schema>,
  render: ({ group }) => {
    const renderEntry = (
      entry: z.input<typeof _schema$Entry>,
      index: number,
    ) => {
      const fields = `values[${index}].value` as const;

      switch (entry.type) {
        case "minecraft:potion_contents":
          return <FieldGroup$PotionContents form={group} fields={fields} />;
        case "minecraft:custom_name":
          return (
            <CustomName.fieldGroupComponent form={group} fields={fields} />
          );
        case "minecraft:item_name":
          return <ItemName.fieldGroupComponent form={group} fields={fields} />;
        case "minecraft:lore":
          return <Lore.fieldGroupComponent form={group} fields={fields} />;
        case "minecraft:rarity":
          return <Rarity.fieldGroupComponent form={group} fields={fields} />;
        case "minecraft:enchantment_glint_override":
          return (
            <EnchantmentGlintOverride.fieldGroupComponent
              form={group}
              fields={fields}
            />
          );
        case "minecraft:potion_duration_scale":
          return (
            <PotionDurationScale.fieldGroupComponent
              form={group}
              fields={fields}
            />
          );
        case "minecraft:damage_resistant":
          return (
            <DamageResistant.fieldGroupComponent form={group} fields={fields} />
          );
        case "minecraft:consumable":
          return (
            <Consumable.fieldGroupComponent form={group} fields={fields} />
          );
        case "minecraft:death_protection":
          return (
            <DeathProtection.fieldGroupComponent form={group} fields={fields} />
          );
      }
    };

    return (
      <FieldGroupPanel title="Data components">
        <group.Subscribe selector={({ values }) => values}>
          {({ selectedType, values }) => {
            const usedTypes = new Set(values.map((entry) => entry.type));
            const availableTypes = DATA_COMPONENT_TYPES.filter(
              (type) => !usedTypes.has(type),
            );
            const activeSelection = availableTypes.includes(selectedType)
              ? selectedType
              : null;

            return (
              <Stack spacing={2}>
                <FieldGroupSection title="Choose component type">
                  <group.AppField
                    name="selectedType"
                    listeners={{
                      onChange: ({ value }) => {
                        if (availableTypes.includes(value)) {
                          group.setFieldValue("values", [
                            ...values,
                            _createDefaultEntry(value),
                          ]);
                        }
                      },
                    }}
                  >
                    {(field) => (
                      <Autocomplete
                        options={availableTypes}
                        value={activeSelection}
                        onChange={(_, value) => {
                          if (value !== null) {
                            field.handleChange(value);
                          }
                        }}
                        renderInput={(inputProps) => (
                          <TextField {...inputProps} label="Data component" />
                        )}
                      />
                    )}
                  </group.AppField>
                  <Box
                    component="section"
                    sx={{
                      borderColor: "divider",
                      borderLeft: 1,
                      pl: 2,
                    }}
                  >
                    <FieldGroupSection title="Component items">
                      <group.AppField name="values" mode="array">
                        {(field) => (
                          <SortableList
                            items={field.state.value}
                            onMove={(fromIndex, toIndex) =>
                              field.moveValue(fromIndex, toIndex)
                            }
                            renderItem={(entry, index) => (
                              <Stack spacing={2}>
                                {renderEntry(entry, index)}
                                <Button
                                  onClick={() => field.removeValue(index)}
                                >
                                  REMOVE DATA COMPONENT
                                </Button>
                              </Stack>
                            )}
                          />
                        )}
                      </group.AppField>
                    </FieldGroupSection>
                  </Box>
                </FieldGroupSection>
              </Stack>
            );
          }}
        </group.Subscribe>
      </FieldGroupPanel>
    );
  },
});

export const DataComponents = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return Object.assign({}, ...data.map(_entryToDataPackJSON));
  },
  fieldGroupComponent,
} as const;

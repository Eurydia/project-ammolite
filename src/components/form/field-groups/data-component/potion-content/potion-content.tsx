import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { RgbColorPicker } from "react-colorful";
import type z from "zod";
import { DataComponentModeField } from "#/components/form/field-components/data-component-mode";
import { SortableList } from "#/components/form/field-components/sortable-list";
import {
  FieldGroupPanel,
  FieldGroupSection,
} from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type {
  PotionContents,
  PotionContents$CustomEffects,
  PotionContents$CustomEffects$Effect,
} from "#/services/models/data_components/potion_contents";
import { PotionContents$CustomColor } from "#/services/models/data_components/potion_contents";

export const _FieldGroup$PotionContents$CustomColor =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContents$CustomColor>,
    render: ({ group }) => {
      return (
        <FieldGroupSection title="Custom color">
          <group.Subscribe selector={({ values }) => values}>
            {({ red, green, blue }) => {
              const result = PotionContents$CustomColor.safeParse({
                red,
                green,
                blue,
              });
              const channels = result.success
                ? [result.data.red, result.data.green, result.data.blue]
                : undefined;
              const pickerColor = channels
                ? { b: channels[2], g: channels[1], r: channels[0] }
                : { b: 0, g: 0, r: 0 };
              const hex = channels
                ? `#${channels
                    .map((channel) => channel.toString(16).padStart(2, "0"))
                    .join("")}`.toUpperCase()
                : undefined;

              return (
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <RgbColorPicker
                      color={pickerColor}
                      onChange={({ b, g, r }) => {
                        group.setFieldValue("red", `${r}`);
                        group.setFieldValue("green", `${g}`);
                        group.setFieldValue("blue", `${b}`);
                      }}
                      style={{ maxWidth: 360, width: "100%" }}
                    />
                  </Box>
                  <Typography align="center" variant="body2">
                    {hex ?? "Enter RGB values from 0 to 255"}
                  </Typography>
                </Stack>
              );
            }}
          </group.Subscribe>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { sm: "repeat(3, 1fr)", xs: "1fr" },
            }}
          >
            <group.AppField name="red">
              {(field) => <field.FC$TextField label="Red (0–255)" />}
            </group.AppField>
            <group.AppField name="green">
              {(field) => <field.FC$TextField label="Green (0–255)" />}
            </group.AppField>
            <group.AppField name="blue">
              {(field) => <field.FC$TextField label="Blue (0–255)" />}
            </group.AppField>
          </Box>
        </FieldGroupSection>
      );
    },
  });

export const _FieldGroup$PotionContents$CustomEffects$Effect =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContents$CustomEffects$Effect>,
    render: ({ group }) => {
      return (
        <Stack spacing={3}>
          <group.AppField name="id">
            {(field) => <field.PotionEffectSelector label="Effect ID" />}
          </group.AppField>
          <group.AppField name="duration">
            {(field) => (
              <field.FC$TextField label="Duration (ticks, optional)" />
            )}
          </group.AppField>
          <group.AppField name="amplifier">
            {(field) => <field.FC$TextField label="Amplifier (optional)" />}
          </group.AppField>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: { sm: "repeat(2, 1fr)", xs: "1fr" },
            }}
          >
            <group.AppField name="ambient">
              {(field) => <field.BooleanCheckbox label="Ambient" />}
            </group.AppField>
            <group.AppField name="visible">
              {(field) => <field.BooleanCheckbox label="Visible" />}
            </group.AppField>
            <group.AppField name="showIcon">
              {(field) => <field.BooleanCheckbox label="Show icon" />}
            </group.AppField>
            <group.AppField name="showParticles">
              {(field) => <field.BooleanCheckbox label="Show particles" />}
            </group.AppField>
          </Box>
        </Stack>
      );
    },
  });

const _FieldGroup$PotionContents$CustomEffects = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContents$CustomEffects>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <group.AppField name="values" mode="array">
          {(f) => (
            <Stack spacing={2}>
              <SortableList
                items={f.state.value}
                onMove={(fromIndex, toIndex) => f.moveValue(fromIndex, toIndex)}
                renderItem={(_, i) => (
                  <FieldGroupSection title={`Effect ${i + 1}`}>
                    <Stack spacing={2}>
                      <_FieldGroup$PotionContents$CustomEffects$Effect
                        form={group}
                        fields={`values[${i}]`}
                      />
                      <Button onClick={() => f.removeValue(i)}>
                        REMOVE EFFECT
                      </Button>
                    </Stack>
                  </FieldGroupSection>
                )}
              />
              <Button
                onClick={() =>
                  f.pushValue({
                    id: PotionType.REGENERATION,
                    visible: false,
                    ambient: false,
                    amplifier: "",
                    duration: "",
                    showParticles: true,
                    showIcon: true,
                  })
                }
              >
                ADD EFFECT
              </Button>
            </Stack>
          )}
        </group.AppField>
      </Stack>
    );
  },
});

export const FieldGroup$PotionContents = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContents>,
  render: ({ group }) => {
    return (
      <FieldGroupPanel title="Potion contents">
        <group.AppField name="mode">
          {() => <DataComponentModeField />}
        </group.AppField>
        <group.Subscribe selector={({ values }) => values.mode}>
          {(mode) =>
            mode === "normal" ? (
              <Stack spacing={2}>
                <group.AppField name="potion">
                  {(field) => <field.PotionEffectSelector label="Potion" />}
                </group.AppField>

                <group.AppField name="customName">
                  {(field) => (
                    <field.FC$TextField label="Custom name (optional)" />
                  )}
                </group.AppField>
                <group.Subscribe
                  selector={({ values }) => {
                    return (
                      "customColor" in values &&
                      values.customColor !== undefined
                    );
                  }}
                >
                  {(active) => (
                    <FieldGroupSection>
                      <Stack spacing={2}>
                        <Button
                          onClick={() =>
                            group.setFieldValue(
                              "customColor",
                              active
                                ? undefined
                                : { blue: "", green: "", red: "" },
                            )
                          }
                        >
                          {active ? "REMOVE CUSTOM COLOR" : "ADD CUSTOM COLOR"}
                        </Button>
                        {active && (
                          <_FieldGroup$PotionContents$CustomColor
                            form={group}
                            fields={"customColor"}
                          />
                        )}
                      </Stack>
                    </FieldGroupSection>
                  )}
                </group.Subscribe>
                <group.Subscribe
                  selector={({ values }) => {
                    return (
                      "customEffects" in values &&
                      values.customEffects !== undefined
                    );
                  }}
                >
                  {(active) => (
                    <FieldGroupSection>
                      <Stack spacing={2}>
                        <Button
                          onClick={() =>
                            group.setFieldValue(
                              "customEffects",
                              active ? undefined : { values: [] },
                            )
                          }
                        >
                          {active
                            ? "REMOVE CUSTOM EFFECTS"
                            : "ADD CUSTOM EFFECTS"}
                        </Button>
                        {active && (
                          <_FieldGroup$PotionContents$CustomEffects
                            form={group}
                            fields={"customEffects"}
                          />
                        )}
                      </Stack>
                    </FieldGroupSection>
                  )}
                </group.Subscribe>
              </Stack>
            ) : null
          }
        </group.Subscribe>
      </FieldGroupPanel>
    );
  },
});

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type {
  PotionContents,
  PotionContents$CustomColor,
  PotionContents$CustomEffects,
  PotionContents$CustomEffects$Effect,
} from "#/services/models/data_components/potion_contents";

export const _FieldGroup$PotionContents$CustomColor =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContents$CustomColor>,
    render: ({ group }) => {
      return (
        <Stack spacing={3}>
          <group.AppField name="red">
            {(f) => <f.FC$TextField />}
          </group.AppField>
          <group.AppField name="green">
            {(f) => <f.FC$TextField />}
          </group.AppField>
          <group.AppField name="blue">
            {(f) => <f.FC$TextField />}
          </group.AppField>
        </Stack>
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
            {(f) => <f.PotionEffectSelector />}
          </group.AppField>
          <group.AppField name="duration">
            {(f) => <f.FC$TextField label="duration" />}
          </group.AppField>
          <group.AppField name="amplifier">
            {(f) => <f.FC$TextField label="amplifier" />}
          </group.AppField>
          <group.AppField name="ambient">
            {(f) => <f.BooleanCheckbox label="ambient?" />}
          </group.AppField>
          <group.AppField name="visible">
            {(f) => <f.BooleanCheckbox label="visible?" />}
          </group.AppField>
          <group.AppField name="showIcon">
            {(f) => <f.BooleanCheckbox label="show icon?" />}
          </group.AppField>
          <group.AppField name="showParticles">
            {(f) => <f.BooleanCheckbox label="show particles?" />}
          </group.AppField>
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
            <>
              {f.state.value.map((_, i) => (
                <Paper key={i}>
                  <_FieldGroup$PotionContents$CustomEffects$Effect
                    form={group}
                    fields={`values[${i}]`}
                  />
                </Paper>
              ))}
              <Button
                onClick={() =>
                  f.pushValue({
                    id: PotionType.WATER,
                    visible: false,
                    showParticles: false,
                    ambient: false,
                    amplifier: "",
                    duration: "",
                    showIcon: false,
                  })
                }
              >
                ADD
              </Button>
            </>
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
      <Paper>
        <Stack spacing={3}>
          <group.AppField name="potion">
            {(f) => <f.PotionEffectSelector />}
          </group.AppField>

          <group.AppField name="customName">
            {(f) => <f.FC$TextField />}
          </group.AppField>
          <group.Subscribe
            selector={({ values: { customColor } }) => {
              return customColor !== undefined;
            }}
          >
            {(active) => (
              <Paper>
                <Stack spacing={3}>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "customColor",
                        active ? undefined : { blue: "", green: "", red: "" },
                      )
                    }
                  >
                    {active
                      ? "Remove"
                      : "Add custom potion effect particle color"}
                  </Button>
                  {active && (
                    <_FieldGroup$PotionContents$CustomColor
                      form={group}
                      fields={"customColor"}
                    />
                  )}
                </Stack>
              </Paper>
            )}
          </group.Subscribe>
          <group.Subscribe
            selector={({ values: { customEffects } }) => {
              return customEffects !== undefined;
            }}
          >
            {(active) => (
              <Paper>
                <Stack spacing={3}>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "customEffects",
                        active ? undefined : { values: [] },
                      )
                    }
                  >
                    {active ? "Remove" : "Add custom potion effect"}
                  </Button>
                  {active && (
                    <_FieldGroup$PotionContents$CustomEffects
                      form={group}
                      fields={"customEffects"}
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

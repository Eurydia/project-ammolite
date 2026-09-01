import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import {
  FieldGroupPanel,
  FieldGroupSection,
} from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { ConsumeEffect, ConsumeEffectType } from "./generic/consume-effect";

const CONSUME_ANIMATIONS = [
  "none",
  "eat",
  "drink",
  "block",
  "bow",
  "spear",
  "crossbow",
  "spyglass",
  "toot_horn",
  "brush",
  "bundle",
  "trident",
] as const;

const SOUND_KINDS = ["reference", "inline"] as const;

const _schema$Identifier = z.string().trim().normalize().min(1);

const _schema$FloatString = z
  .string()
  .trim()
  .normalize()
  .transform(Number)
  .pipe(z.float32());

const _schema$OptionalFloatString = z
  .string()
  .trim()
  .normalize()
  .transform((value) => (value.length === 0 ? undefined : Number(value)))
  .pipe(z.float32().optional());

const _schema$Sound = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("reference"),
    value: _schema$Identifier,
  }),
  z.object({
    kind: z.literal("inline"),
    soundId: _schema$Identifier,
    range: _schema$OptionalFloatString,
  }),
]);

const schema = z.object({
  consumeSeconds: _schema$FloatString,
  animation: z.enum(CONSUME_ANIMATIONS),
  sound: _schema$Sound,
  hasConsumeParticles: z.boolean(),
  onConsumeEffects: ConsumeEffect.schema.array(),
});

const _FieldGroup$Sound = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof _schema$Sound>,
  render: ({ group }) => (
    <Stack spacing={3}>
      <group.AppField
        name="kind"
        listeners={{
          onChange: ({ value }) => {
            if (value === "inline") {
              group.setFieldValue("soundId", "");
              group.setFieldValue("range", "");
            } else {
              group.setFieldValue("value", "");
            }
          },
        }}
      >
        {(field) => (
          <FormControl>
            <FormLabel>Sound format</FormLabel>
            <field.FC$RadioGroup options={SOUND_KINDS} />
          </FormControl>
        )}
      </group.AppField>
      <group.Subscribe selector={({ values }) => values.kind}>
        {(kind) => {
          switch (kind) {
            case "reference":
              return (
                <group.AppField name="value">
                  {(field) => <field.FC$TextField label="Sound event ID" />}
                </group.AppField>
              );
            case "inline":
              return (
                <Stack spacing={3}>
                  <group.AppField name="soundId">
                    {(field) => (
                      <field.FC$TextField label="Client-side sound event ID" />
                    )}
                  </group.AppField>
                  <group.AppField name="range">
                    {(field) => (
                      <field.FC$TextField label="Fixed range (optional)" />
                    )}
                  </group.AppField>
                </Stack>
              );
          }
        }}
      </group.Subscribe>
    </Stack>
  ),
});

export const Consumable = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:consumable": {
        consume_seconds: data.consumeSeconds,
        animation: data.animation,
        sound:
          data.sound.kind === "reference"
            ? data.sound.value
            : {
                sound_id: data.sound.soundId,
                range: data.sound.range,
              },
        has_consume_particles: data.hasConsumeParticles,
        on_consume_effects:
          data.onConsumeEffects.length === 0
            ? undefined
            : data.onConsumeEffects.map(ConsumeEffect.toDataPackJSON),
      },
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <FieldGroupPanel title="Consumable">
        <group.AppField name="consumeSeconds">
          {(field) => <field.FC$TextField label="Consume seconds" />}
        </group.AppField>
        <group.AppField name="animation">
          {(field) => (
            <FormControl>
              <FormLabel>Animation</FormLabel>
              <field.FC$RadioGroup options={CONSUME_ANIMATIONS} />
            </FormControl>
          )}
        </group.AppField>
        <FieldGroupSection title="Sound">
          <_FieldGroup$Sound form={group} fields="sound" />
        </FieldGroupSection>
        <group.AppField name="hasConsumeParticles">
          {(field) => <field.BooleanCheckbox label="Show consume particles" />}
        </group.AppField>
        <FieldGroupSection title="On consume effects">
          <group.AppField name="onConsumeEffects" mode="array">
            {(field) => (
              <Stack spacing={2}>
                <SortableList
                  items={field.state.value}
                  onMove={(fromIndex, toIndex) =>
                    field.moveValue(fromIndex, toIndex)
                  }
                  renderItem={(_, index) => (
                    <Stack spacing={2}>
                      <ConsumeEffect.fieldGroupComponent
                        form={group}
                        fields={`onConsumeEffects[${index}]`}
                      />
                      <Button onClick={() => field.removeValue(index)}>
                        REMOVE CONSUME EFFECT
                      </Button>
                    </Stack>
                  )}
                />
                <Button
                  onClick={() =>
                    field.pushValue({
                      type: ConsumeEffectType.CLEAR_ALL_EFFECTS,
                    })
                  }
                >
                  ADD CONSUME EFFECT
                </Button>
              </Stack>
            )}
          </group.AppField>
        </FieldGroupSection>
      </FieldGroupPanel>
    ),
  }),
} as const;

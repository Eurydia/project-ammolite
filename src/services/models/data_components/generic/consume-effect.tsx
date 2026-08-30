import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
import { _FieldGroup$PotionContents$CustomEffects$Effect } from "#/components/form/field-groups/data-component/potion-content/potion-content";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import {
  PotionContents$CustomEffects$Effect,
  PotionContents$CustomEffects$Effect$AsDatapackJSON,
} from "#/services/models/data_components/potion_contents";

export enum ConsumeEffectType {
  APPLY_EFFECTS = "minecraft:apply_effects",
  REMOVE_EFFECTS = "minecraft:remove_effects",
  CLEAR_ALL_EFFECTS = "minecraft:clear_all_effects",
  TELEPORT_RANDOMLY = "minecraft:teleport_randomly",
  PLAY_SOUND = "minecraft:play_sound",
}

const EFFECT_ID_KINDS = ["single", "list"] as const;
const SOUND_KINDS = ["reference", "inline"] as const;
const CONSUME_EFFECT_TYPES = Object.values(ConsumeEffectType);

const _schema$ArbitraryIdentifier = z.string().trim().normalize().min(1);

const _schema$OptionalFloatString = z
  .string()
  .trim()
  .normalize()
  .transform((value) => (value.length === 0 ? undefined : Number(value)))
  .pipe(z.number().optional());

const _schema$EffectIds = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("single"), value: _schema$ArbitraryIdentifier }),
  z.object({
    kind: z.literal("list"),
    values: _schema$ArbitraryIdentifier.array().min(1),
  }),
]);

const _schema$Sound = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("reference"),
    value: _schema$ArbitraryIdentifier,
  }),
  z.object({
    kind: z.literal("inline"),
    soundId: _schema$ArbitraryIdentifier,
    range: _schema$OptionalFloatString,
  }),
]);

const schema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(ConsumeEffectType.APPLY_EFFECTS),
    effectInstances: PotionContents$CustomEffects$Effect.array().min(1),
    probability: _schema$OptionalFloatString.pipe(
      z.number().min(0).max(1).optional(),
    ),
  }),
  z.object({
    type: z.literal(ConsumeEffectType.REMOVE_EFFECTS),
    effectIds: _schema$EffectIds,
  }),
  z.object({ type: z.literal(ConsumeEffectType.CLEAR_ALL_EFFECTS) }),
  z.object({
    type: z.literal(ConsumeEffectType.TELEPORT_RANDOMLY),
    diameter: _schema$OptionalFloatString,
    directionalParticles: z.boolean().optional(),
  }),
  z.object({
    type: z.literal(ConsumeEffectType.PLAY_SOUND),
    sound: _schema$Sound,
  }),
]);

const _FieldGroup$EffectIds = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof _schema$EffectIds>,
  render: ({ group }) => (
    <Stack spacing={3}>
      <group.AppField
        name="kind"
        listeners={{
          onChange: ({ value }) => {
            if (value === "list") {
              group.setFieldValue("values", [""]);
            } else {
              group.setFieldValue("value", "");
            }
          },
        }}
      >
        {(field) => <field.FC$RadioGroup options={EFFECT_ID_KINDS} />}
      </group.AppField>
      <group.Subscribe selector={({ values }) => values.kind}>
        {(kind) => {
          switch (kind) {
            case "single":
              return (
                <group.AppField name="value">
                  {(field) => <field.FC$TextField label="Effect ID" />}
                </group.AppField>
              );
            case "list":
              return (
                <group.AppField name="values" mode="array">
                  {(field) => (
                    <Stack spacing={2}>
                      {field.state.value.map((_, index) => (
                        <Stack direction="row" spacing={2} key={index}>
                          <group.AppField name={`values[${index}]`}>
                            {(effectId) => (
                              <effectId.FC$TextField label="Effect ID" />
                            )}
                          </group.AppField>
                          <Button
                            disabled={field.state.value.length === 1}
                            onClick={() => field.removeValue(index)}
                          >
                            REMOVE
                          </Button>
                        </Stack>
                      ))}
                      <Button onClick={() => field.pushValue("")}>
                        ADD EFFECT ID
                      </Button>
                    </Stack>
                  )}
                </group.AppField>
              );
          }
        }}
      </group.Subscribe>
    </Stack>
  ),
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
        {(field) => <field.FC$RadioGroup options={SOUND_KINDS} />}
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

const fieldGroupComponent = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof schema>,
  render: ({ group }) => (
    <Paper variant="outlined">
      <Stack spacing={3}>
        <Typography sx={{ fontWeight: 700 }}>CONSUME EFFECT</Typography>
        <group.AppField
          name="type"
          listeners={{
            onChange: ({ value }) => {
              switch (value) {
                case ConsumeEffectType.APPLY_EFFECTS:
                  group.setFieldValue("effectInstances", []);
                  group.setFieldValue("probability", "");
                  break;
                case ConsumeEffectType.REMOVE_EFFECTS:
                  group.setFieldValue("effectIds", {
                    kind: "single",
                    value: "",
                  });
                  break;
                case ConsumeEffectType.CLEAR_ALL_EFFECTS:
                  break;
                case ConsumeEffectType.TELEPORT_RANDOMLY:
                  group.setFieldValue("diameter", "");
                  group.setFieldValue("directionalParticles", true);
                  break;
                case ConsumeEffectType.PLAY_SOUND:
                  group.setFieldValue("sound", {
                    kind: "reference",
                    value: "",
                  });
                  break;
              }
            },
          }}
        >
          {(field) => <field.FC$RadioGroup options={CONSUME_EFFECT_TYPES} />}
        </group.AppField>
        <group.Subscribe selector={({ values }) => values.type}>
          {(type) => {
            switch (type) {
              case ConsumeEffectType.APPLY_EFFECTS:
                return (
                  <Stack spacing={3}>
                    <group.AppField name="effectInstances" mode="array">
                      {(field) => (
                        <Stack spacing={2}>
                          {field.state.value.map((_, index) => (
                            <Paper variant="outlined" key={index}>
                              <Stack spacing={2}>
                                <_FieldGroup$PotionContents$CustomEffects$Effect
                                  form={group}
                                  fields={`effectInstances[${index}]`}
                                />
                                <Button
                                  onClick={() => field.removeValue(index)}
                                >
                                  REMOVE EFFECT
                                </Button>
                              </Stack>
                            </Paper>
                          ))}
                          <Button
                            onClick={() =>
                              field.pushValue({
                                id: PotionType.REGENERATION,
                                amplifier: "",
                                duration: "",
                                ambient: false,
                                visible: false,
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
                    <group.AppField name="probability">
                      {(field) => (
                        <field.FC$TextField label="Probability (optional, 0–1)" />
                      )}
                    </group.AppField>
                  </Stack>
                );
              case ConsumeEffectType.REMOVE_EFFECTS:
                return (
                  <_FieldGroup$EffectIds form={group} fields="effectIds" />
                );
              case ConsumeEffectType.CLEAR_ALL_EFFECTS:
                return null;
              case ConsumeEffectType.TELEPORT_RANDOMLY:
                return (
                  <Stack spacing={3}>
                    <group.AppField name="diameter">
                      {(field) => (
                        <field.FC$TextField label="Diameter (optional)" />
                      )}
                    </group.AppField>
                    <group.AppField name="directionalParticles">
                      {(field) => (
                        <field.BooleanCheckbox label="Directional particles" />
                      )}
                    </group.AppField>
                  </Stack>
                );
              case ConsumeEffectType.PLAY_SOUND:
                return <_FieldGroup$Sound form={group} fields="sound" />;
            }
          }}
        </group.Subscribe>
      </Stack>
    </Paper>
  ),
});

export const ConsumeEffect = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    switch (data.type) {
      case ConsumeEffectType.APPLY_EFFECTS:
        return {
          type: data.type,
          effects: data.effectInstances.map(
            PotionContents$CustomEffects$Effect$AsDatapackJSON,
          ),
          probability: data.probability,
        };
      case ConsumeEffectType.REMOVE_EFFECTS:
        return {
          type: data.type,
          effects:
            data.effectIds.kind === "list"
              ? data.effectIds.values
              : data.effectIds.value,
        };
      case ConsumeEffectType.CLEAR_ALL_EFFECTS:
        return { type: data.type };
      case ConsumeEffectType.TELEPORT_RANDOMLY:
        return {
          type: data.type,
          diameter: data.diameter,
          directional_particles: data.directionalParticles,
        };
      case ConsumeEffectType.PLAY_SOUND:
        return {
          type: data.type,
          sound:
            data.sound.kind === "reference"
              ? data.sound.value
              : {
                  sound_id: data.sound.soundId,
                  range: data.sound.range,
                },
        };
    }
  },
  fieldGroupComponent,
} as const;

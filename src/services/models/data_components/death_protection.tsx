import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { ConsumeEffect, ConsumeEffectType } from "./generic/consume-effect";

const schema = z.object({
  deathEffects: ConsumeEffect.schema.array(),
});

export const DeathProtection = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:death_protection":
        data.deathEffects.length === 0
          ? {}
          : {
              death_effects: data.deathEffects.map(
                ConsumeEffect.toDataPackJSON,
              ),
            },
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <Paper>
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>DEATH PROTECTION</Typography>
          <group.AppField name="deathEffects" mode="array">
            {(field) => (
              <Stack spacing={2}>
                {field.state.value.map((_, index) => (
                  <Stack spacing={2} key={index}>
                    <ConsumeEffect.fieldGroupComponent
                      form={group}
                      fields={`deathEffects[${index}]`}
                    />
                    <Button onClick={() => field.removeValue(index)}>
                      REMOVE CONSUME EFFECT
                    </Button>
                  </Stack>
                ))}
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
        </Stack>
      </Paper>
    ),
  }),
} as const;

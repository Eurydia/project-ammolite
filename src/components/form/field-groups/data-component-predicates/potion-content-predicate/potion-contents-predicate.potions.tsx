import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import { FieldGroupSection } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type { PotionContentsPredicate$Potions } from "#/services/models/data_component_predicates/potion_contents_predicate";

const POTION_OPTIONS = Object.values(PotionType);

export const _FieldGroup$PotionContentPredicate$Potions =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContentsPredicate$Potions>,
    render: ({ group }) => {
      return (
        <FieldGroupSection title="Potions">
          <group.AppField name="values" mode="array">
            {(field) => (
              <Stack spacing={2}>
                <SortableList
                  items={field.state.value}
                  onMove={(fromIndex, toIndex) =>
                    field.moveValue(fromIndex, toIndex)
                  }
                  renderItem={(_, index) => (
                    <Stack direction="row" spacing={2}>
                      <group.AppField name={`values[${index}]`}>
                        {(entry) => (
                          <Autocomplete
                            options={POTION_OPTIONS}
                            value={entry.state.value}
                            onBlur={entry.handleBlur}
                            onChange={(_, value) => {
                              if (value !== null) {
                                entry.handleChange(value);
                              }
                            }}
                            renderInput={(inputProps) => (
                              <TextField
                                {...inputProps}
                                error={entry.state.meta.errors.length > 0}
                                label="Potion"
                              />
                            )}
                          />
                        )}
                      </group.AppField>
                      <Button onClick={() => field.removeValue(index)}>
                        REMOVE
                      </Button>
                    </Stack>
                  )}
                />
                <Button onClick={() => field.pushValue(PotionType.AWKWARD)}>
                  ADD POTION
                </Button>
              </Stack>
            )}
          </group.AppField>
        </FieldGroupSection>
      );
    },
  });

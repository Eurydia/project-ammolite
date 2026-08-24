import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type {
  EffectsCountPredicate,
  EffectsPredicate,
  PotionContentsPredicate,
  PotionKindPredicate,
} from "#/services/models/data_component_predicates/potion_contents_predicate";
import { FG$IntBoundPredicate } from "./generics/int-bound";

const FG$Kind = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionKindPredicate>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="kind">
          {(f) => {
            return (
              <RadioGroup
                row
                value={f.state.value}
                onChange={(_, value) => {
                  const _v = value as "tag" | "list";
                  f.handleChange(_v);
                }}
                onBlur={f.handleBlur}
              >
                <FormControlLabel value="tag" control={<Radio />} label="tag" />
                <FormControlLabel
                  value="list"
                  control={<Radio />}
                  label="List"
                />
              </RadioGroup>
            );
          }}
        </group.AppField>
        <group.Subscribe
          selector={({ values: { kind } }) => {
            return kind;
          }}
        >
          {(kind) =>
            kind === "tag" ? (
              <group.AppField name="value">
                {(f) => (
                  <TextField
                    value={f.state.value as string}
                    onChange={(e) => f.handleChange(e.target.value)}
                    onBlur={f.handleBlur}
                  />
                )}
              </group.AppField>
            ) : (
              <group.AppField name="value" mode="array">
                {(f) => (
                  <Autocomplete
                    multiple
                    value={f.state.value as PotionType[]}
                    onChange={(_, value) => f.handleChange(value)}
                    options={Object.values(PotionType)}
                    renderInput={(inputProps) => <TextField {...inputProps} />}
                  />
                )}
              </group.AppField>
            )
          }
        </group.Subscribe>
      </Stack>
    );
  },
});

const FG$Effects$Contains = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContentsPredicate>["effects"],
  render: ({ group }) => {},
});

const FG$Effects = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof EffectsPredicate>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <Card variant="outlined">
          <group.Subscribe
            selector={({ values: { contains } }) => {
              return contains !== undefined;
            }}
          >
            {(active) => (
              <>
                <CardActions>
                  <Button
                    onClick={() =>
                      group.setFieldValue("contains", active ? undefined : [])
                    }
                  >
                    {!active ? "Add" : "Clear"}
                  </Button>
                </CardActions>
                {active && (
                  <CardContent>
                    <FG$IntBoundPredicate fields={"size"} form={group} />
                  </CardContent>
                )}
              </>
            )}
          </group.Subscribe>
        </Card>
        <Card variant="outlined">
          <group.Subscribe
            selector={({ values: { size } }) => {
              return size !== undefined;
            }}
          >
            {(active) => (
              <>
                <CardActions>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "size",
                        active ? undefined : { kind: "exact", value: "" },
                      )
                    }
                  >
                    {!active ? "Add" : "Clear"}
                  </Button>
                </CardActions>
                {active && (
                  <CardContent>
                    <FG$IntBoundPredicate fields={"size"} form={group} />
                  </CardContent>
                )}
              </>
            )}
          </group.Subscribe>
        </Card>
      </Stack>
    );
  },
});

export const FG$PotionContentsPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContentsPredicate>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <Card variant="outlined">
          <group.Subscribe
            selector={({ values: { potions } }) => {
              return potions !== undefined;
            }}
          >
            {(active) => (
              <>
                <CardActions>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "potions",
                        active ? undefined : { kind: "tag", value: "" },
                      )
                    }
                  >
                    {!active ? "Add" : "Clear"}
                  </Button>
                </CardActions>
                {active && (
                  <CardContent>
                    <FG$Kind fields={"potions"} form={group} />
                  </CardContent>
                )}
              </>
            )}
          </group.Subscribe>
        </Card>
        <Card variant="outlined">
          <group.Subscribe
            selector={({ values: { effects } }) => {
              return effects !== undefined;
            }}
          >
            {(active) => (
              <>
                <CardActions>
                  <Button
                    onClick={() =>
                      group.setFieldValue("effects", active ? undefined : {})
                    }
                  >
                    {!active ? "Add" : "Clear"}
                  </Button>
                </CardActions>
                {active && (
                  <CardContent>
                    <FG$Effects fields={"effects"} form={group} />
                  </CardContent>
                )}
              </>
            )}
          </group.Subscribe>
        </Card>
      </Stack>
    );
  },
});

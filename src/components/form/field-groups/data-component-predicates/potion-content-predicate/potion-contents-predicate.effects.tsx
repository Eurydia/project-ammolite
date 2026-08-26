import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { PotionContentsPredicate$Effects } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { FieldGroup$IntBoundPredicate } from "../generics/int-bound";
import { _FieldGroup$PotionContentPredicate$Effects$Contains } from "./potion-contents-predicate.effects.contains";

export const _FieldGroup$PotionContentPredicate$Effects =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContentsPredicate$Effects>,
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
                        group.setFieldValue(
                          "contains",
                          active ? undefined : { values: [] },
                        )
                      }
                    >
                      {!active ? "Add" : "Clear"}
                    </Button>
                  </CardActions>
                  {active && (
                    <CardContent>
                      <_FieldGroup$PotionContentPredicate$Effects$Contains
                        fields={"contains"}
                        form={group}
                      />
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
                      <FieldGroup$IntBoundPredicate
                        fields={"size"}
                        form={group}
                      />
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

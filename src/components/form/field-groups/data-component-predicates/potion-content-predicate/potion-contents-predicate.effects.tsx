import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { PotionContentsPredicate$Effects } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { FieldGroup$OptionalIntBoundPredicate } from "../generics/optional-int-bound-predicate";
import { _FieldGroup$PotionContentPredicate$Effects$Contains } from "./potion-contents-predicate.effects.contains";
import { _FieldGroup$PotionContentPredicate$Effects$Count } from "./potion-contents-predicate.effects.count";

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
              selector={({ values: { count } }) => {
                return count !== undefined;
              }}
            >
              {(active) => (
                <>
                  <CardActions>
                    <Button
                      onClick={() =>
                        group.setFieldValue(
                          "count",
                          active ? undefined : { values: [] },
                        )
                      }
                    >
                      {!active ? "Add" : "Clear"}
                    </Button>
                  </CardActions>
                  {active && (
                    <CardContent>
                      <_FieldGroup$PotionContentPredicate$Effects$Count
                        fields={"count"}
                        form={group}
                      />
                    </CardContent>
                  )}
                </>
              )}
            </group.Subscribe>
          </Card>
          <Card variant="outlined">
            <CardContent>
              <FieldGroup$OptionalIntBoundPredicate
                fields={"size"}
                form={group}
              />
            </CardContent>
          </Card>
        </Stack>
      );
    },
  });

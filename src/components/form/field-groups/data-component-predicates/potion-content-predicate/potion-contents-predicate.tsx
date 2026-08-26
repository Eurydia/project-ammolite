import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { PotionContentsPredicate } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { _FieldGroup$PotionContentPredicate$Effects } from "./potion-contents-predicate.effects";
import { _FieldGroup$PotionContentPredicate$Potions } from "./potion-contents-predicate.potions";

export const FieldGroup$PotionContentsPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContentsPredicate>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <Card variant="outlined">
          <group.Subscribe
            selector={({ values }) => {
              return values.potions !== undefined;
            }}
          >
            {(active) => (
              <>
                <CardActions>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "potions",
                        active ? undefined : { kind: "list", value: [] },
                      )
                    }
                  >
                    {!active ? "Add" : "Clear"}
                  </Button>
                </CardActions>
                {active && (
                  <CardContent>
                    <_FieldGroup$PotionContentPredicate$Potions
                      fields={"potions"}
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
            selector={({ values }) => {
              return values.effects !== undefined;
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
                    <_FieldGroup$PotionContentPredicate$Effects
                      fields={"effects"}
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

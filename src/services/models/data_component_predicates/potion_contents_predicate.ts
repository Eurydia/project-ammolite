import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { IntBoundPredicate } from "./generics/int-bound-predicate";
import { OptionalIntBoundPredicate } from "./generics/optional-int-bound-predicate";
import {
  MobEffectPredicate,
  MobEffectPredicate$AsDataPackJSON,
} from "./mob-effect-predicate";

export const PotionContentsPredicate$Potions = z.object({
  values: z.enum(PotionType).array(),
});

export const PotionContentsPredicate$Potions$AsDataPackJSON = (
  dt: z.output<typeof PotionContentsPredicate$Potions>,
) => {
  return dt.values;
};

export const PotionContentsPredicate$Effects$Contains = z.object({
  values: MobEffectPredicate.array(),
});

export const PotionContentsPredicate$Effects$Contains$AsDataPackJSON = (
  dt: z.output<typeof PotionContentsPredicate$Effects$Contains>,
) => {
  return dt.values.map((item) => MobEffectPredicate$AsDataPackJSON(item));
};

export const PotionContentsPredicate$Effects$Count = z.object({
  values: z
    .object({
      test: z.array(MobEffectPredicate),
      count: IntBoundPredicate,
    })
    .array(),
});

export const PotionContentsPredicate$Effects$Count$AsDataPackJSON = (
  dt: z.output<typeof PotionContentsPredicate$Effects$Count>,
) => {
  return dt.values.map((value) => ({
    count: value.count,
    test: value.test
      .map((item) => MobEffectPredicate$AsDataPackJSON(item))
      .reduce((prev, curr) => {
        return Object.assign(prev, curr);
      }, {}),
  }));
};

export const PotionContentsPredicate$Effects = z.object({
  contains: PotionContentsPredicate$Effects$Contains.optional(),
  count: PotionContentsPredicate$Effects$Count.optional(),
  size: OptionalIntBoundPredicate,
});

const PotionContentsPredicate$Effects$AsDataPackJSON = (
  dt: z.output<typeof PotionContentsPredicate$Effects>,
) => {
  return {
    contains:
      dt.contains === undefined
        ? undefined
        : PotionContentsPredicate$Effects$Contains$AsDataPackJSON(dt.contains),
    count:
      dt.count === undefined
        ? undefined
        : PotionContentsPredicate$Effects$Count$AsDataPackJSON(dt.count),
    size: dt.size,
  };
};

export const PotionContentsPredicate = z.object({
  potions: PotionContentsPredicate$Potions.optional(),
  effects: PotionContentsPredicate$Effects.optional(),
});

export const PotionContentsPredicate$AsDataPackJSON = (
  dt: z.output<typeof PotionContentsPredicate>,
) => {
  return {
    potions:
      dt.potions === undefined
        ? undefined
        : PotionContentsPredicate$Potions$AsDataPackJSON(dt.potions),
    effects:
      dt.effects === undefined
        ? undefined
        : PotionContentsPredicate$Effects$AsDataPackJSON(dt.effects),
  };
};

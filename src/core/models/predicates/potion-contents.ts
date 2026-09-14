import { MobEffectPredicateType } from "#/models/predicates/common/mob-effect.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";
import { NumberBound, NumberBoundType } from "#/models/snbt/number-bound.ts";

const makeEffectPredicateValue = ({
  amplifier,
  duration,
  ambient,
  visible,
}: Omit<MobEffectPredicateType, "effect">) => {
  return Object.freeze({
    amplifier,
    duration,
    ambient,
    visible,
  });
};

export type PotionContentsPredicateType = Readonly<{
  potions?: string | ReadonlyArray<string>;
  effects?: {
    contains?: ReadonlyArray<
      Readonly<{
        [k: string]: Readonly<{
          amplifier?: NumberBoundType;
          duration?: NumberBoundType;
          ambient?: boolean;
          visible?: boolean;
        }>;
      }>
    >;
    count?: ReadonlyArray<{
      count: NumberBoundType;
      test: Readonly<{
        [k: string]: Readonly<{
          amplifier?: NumberBoundType;
          duration?: NumberBoundType;
          ambient?: boolean;
          visible?: boolean;
        }>;
      }>;
    }>;
    size?: NumberBoundType;
  };
}>;

export const PotionContentsPredicate = {
  from({
    potions,
    effects,
  }: {
    potions?: string | Array<string>;
    effects?: {
      contains?: Array<MobEffectPredicateType>;
      count?: Array<{
        count: NumberBoundType;
        test: Array<MobEffectPredicateType>;
      }>;
      size?: NumberBoundType;
    };
  }) {
    return Object.freeze({
      potions: keepUndefinedOrTransform(potions, (val) => {
        return typeof val === "string" ? val : Object.freeze([...val]);
      }),
      effects: keepUndefinedOrTransform(
        effects,
        ({ contains, count, size }) => {
          return Object.freeze({
            size: size === undefined
              ? undefined
              : NumberBound.integer(size, 0, 2_147_483_647),
            contains: keepUndefinedOrTransform(contains, (vals) => {
              return Object.freeze(
                vals.map(({ effect, ...rest }) =>
                  Object.freeze({
                    [effect]: makeEffectPredicateValue(rest),
                  }) as Readonly<{
                    [K: string]: Readonly<{
                      amplifier?: NumberBoundType;
                      duration?: NumberBoundType;
                      ambient?: boolean;
                      visible?: boolean;
                    }>;
                  }>
                ),
              );
            }),
            count: keepUndefinedOrTransform(count, (vals) => {
              return Object.freeze(
                vals.map(({ count, test }) => {
                  return Object.freeze({
                    count: NumberBound.integer(count, 0, 2_147_483_647),
                    test: Object.freeze(
                      test.reduce((prev, { effect, ...rest }) => {
                        return Object.assign(prev, {
                          [effect]: makeEffectPredicateValue(rest),
                        });
                      }, {}) as {
                        [K: string]: {
                          amplifier?: NumberBoundType;
                          duration?: NumberBoundType;
                          ambient?: boolean;
                          visible?: boolean;
                        };
                      },
                    ),
                  });
                }),
              );
            }),
          });
        },
      ),
    });
  },
};

//   private readonly value: DataShape

//     constructor(value: DataShape) {}
//     string | Array<string>};
//   private readonly effects?: Effects;

//   public constructor(potions?: string | Array<string>, effects?: Effects) {
//     this.effects = effects;
//     this.potions = potions;
//   }

//   public static fromObject(obj: {
//     potions?: string | Array<string>;
//     effects?: Effects;
//   }) {
//     return new this(obj.potions, obj.effects);
//   }

//   public asJsonObject() {
//     return {
//       potions: this.potions,
//       effects:
//         this.effects === undefined
//           ? undefined
//           : {
//               contains: this.effects.contains?.map((mobEff) => {
//                 const { effect, ...rest } = mobEff.asJsonObject();
//                 return {
//                   [effect]: rest,
//                 };
//               }),
//               size: this.effects.size,
//               count: this.effects.count?.map(({ count, test }) => ({
//                 count,
//                 test: test.reduce((prev, curr) => {
//                   const { effect, ...rest } = curr.asJsonObject();
//                   return Object.assign(prev, { [effect]: rest });
//                 }, {}),
//               })),
//             },
//     };
//   }
// }

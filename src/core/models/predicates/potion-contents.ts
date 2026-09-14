import { MobEffectPredicateType } from "#/models/predicates/common/mob-effect.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";
import { NumberBoundType } from "#/models/snbt/number-bound.ts";

export type PotionContentsPredicateType = Readonly<{
  potions?: string | ReadonlyArray<string>;
  effects?: {
    contains?: Readonly<{
      [k: string]: Readonly<{
        amplifier?: NumberBoundType;
        duration?: NumberBoundType;
        ambient?: boolean;
        visible?: boolean;
      }>;
    }>;
    count?: ReadonlyArray<{
      count: number;
      test: Readonly<{
        [k: string]: Readonly<{
          amplifier?: NumberBoundType;
          duration?: NumberBoundType;
          ambient?: boolean;
          visible?: boolean;
        }>;
      }>;
    }>;
    size?: number;
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
        count: number;
        test: Array<MobEffectPredicateType>;
      }>;
      size?: number;
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
            size,
            contains: keepUndefinedOrTransform(contains, (vals) => {
              return Object.freeze(
                vals.reduce((prev, { effect, ...rest }) => {
                  return Object.assign(prev, { [effect]: rest });
                }, {}) as {
                  [K: string]: Readonly<{
                    amplifier?: NumberBoundType;
                    duration?: NumberBoundType;
                    ambient?: boolean;
                    visible?: boolean;
                  }>;
                },
              );
            }),
            count: keepUndefinedOrTransform(count, (vals) => {
              return Object.freeze(
                vals.map(({ count, test }) => {
                  return Object.freeze({
                    count,
                    test: Object.freeze(
                      test.reduce((prev, { effect, ...rest }) => {
                        return Object.assign(prev, { [effect]: rest });
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

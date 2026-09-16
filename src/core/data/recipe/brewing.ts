import { PotionContentsPredicateType } from "#/models/predicates/potion-contents.ts";
import {
  ItemStack,
  type ItemStackType,
} from "#/models/data-components/common/item-stack.ts";
import { DataComponentType } from "#/models/data-components/data-component.ts";

// export class BrewingRecipe implements Recipe {
//   private inputItem: RecipeInput;
//   private reagentItem: RecipeInput;
//   private outputItem: RecipeOutput;

//   private constructor(
//     inputItem: string,
//     reagentItem: string,
//     outputItem: string,
//   ) {
//     this.inputItem = RecipeInput.new(inputItem);
//     this.reagentItem = RecipeInput.new(reagentItem);
//     this.outputItem = RecipeOutput.new(outputItem);
//   }

//   public static new(
//     inputItem: string,
//     reagentItem: string,
//     outputItem: string,
//   ) {
//     return new this(inputItem, reagentItem, outputItem);
//   }

//   public whereInputPredicate(pred: InputPredicate) {
//     this.inputItem.wherePotionContents(pred);
//     return this;
//   }

//   public whereReagentPredicate(pred: InputPredicate) {
//     this.reagentItem.wherePotionContents(pred);
//     return this;
//   }

//   public withOutputComponents(
//     comp: [string, unknown],
//     ...rest: Array<[string, unknown]>
//   ) {
//     this.outputItem.withComponents(comp, rest);
//     return this;
//   }

//   public asJsonObject() {
//     return {
//       type: "minecraft:brewing",
//       input: this.inputItem.asJsonObject(),
//       reagent: this.reagentItem.asJsonObject(),
//       output: this.outputItem.asJsonObject(),
//     };
//   }
// }

export type BrewingRecipeType = Readonly<{
  type: "minecraft:brewing";
  input: Readonly<{
    item: string;
    potion_contents?: PotionContentsPredicateType;
  }>;
  reagent: Readonly<{
    item: string;
    potion_contents?: PotionContentsPredicateType;
  }>;
  output: ItemStackType;
}>;

export const BrewingRecipe = {
  from({
    input: inputData,
  }: {
    input: {
      item: string;
      potionContents?: PotionContentsPredicateType;
    };
  }) {
    return ({
      reagent: reagentData,
    }: {
      reagent: {
        item: string;
        potionContents?: PotionContentsPredicateType;
      };
    }) => {
      return ItemStack.__from(
        (data: {
          output: {
            id: string;
            count?: number;
            components?: DataComponentType;
          };
        }) => {
          return data.output;
        },
        (output) =>
          Object.freeze({
            type: "minecraft:brewing",
            input: Object.freeze({
              item: inputData.item,
              potion_contents: inputData.potionContents,
            }),
            reagent: Object.freeze({
              item: reagentData.item,
              potion_contents: reagentData.potionContents,
            }),
            output,
          }),
      );
    };
  },
};

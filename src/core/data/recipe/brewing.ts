import { PotionContentsPredicateType } from "#/models/predicates/potion-contents.ts";
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
  input: Readonly<{
    item: string;
    potion_contents?: PotionContentsPredicateType;
  }>;
  reagent: Readonly<{
    item: string;
    potion_contents?: PotionContentsPredicateType;
  }>;
  output: Readonly<{
    id: string;
    components?: DataComponentType;
  }>;
}>;

export const BrewingRecipe = {
  from(
    input: {
      item: string;
      potion_contents?: PotionContentsPredicateType;
    },
    reagent: {
      item: string;
      potion_contents?: PotionContentsPredicateType;
    },
    output: {
      id: string;
      components?: DataComponentType;
    },
  ) {
    return Object.freeze({
      input: Object.freeze({
        ...input,
      }),
      reagent: Object.freeze({ ...reagent }),
      output: Object.freeze({ ...output }),
    });
  },
};

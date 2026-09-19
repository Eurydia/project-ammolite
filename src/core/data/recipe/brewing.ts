import {
  type DataPackModel,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";
import {
  ItemStack,
  ItemStackData,
  type ItemStackInput,
  type ItemStackType,
} from "#/models/data-components/common/item-stack.ts";
import type { DataComponentType } from "#/models/data-components/data-component.ts";
import { PotionContentsPredicate } from "#/models/predicates/potion-contents.ts";
import type {
  PotionContentsPredicateData,
  PotionContentsPredicateType,
} from "#/models/predicates/potion-contents.ts";
import type { Recipe } from "./recipe.ts";

export type BrewingIngredientInput = {
  item: string;
  potionContents?: PotionContentsPredicateType | PotionContentsPredicateData;
  potion_contents?: PotionContentsPredicateType | PotionContentsPredicateData;
};

export type BrewingIngredientType = Readonly<{
  item: string;
  potion_contents?: PotionContentsPredicateType;
}>;

export type BrewingRecipeType = Readonly<{
  type: "minecraft:brewing";
  input: BrewingIngredientType;
  reagent: BrewingIngredientType;
  output: ItemStackType;
}>;

export class BrewingRecipeData
  implements DataPackModel<BrewingRecipeType>, Recipe {
  public readonly input: BrewingIngredientInput;
  public readonly reagent: BrewingIngredientInput;
  public readonly output: ItemStackType | ItemStackData;

  public constructor({
    input,
    reagent,
    output,
  }: {
    input: BrewingIngredientInput;
    reagent: BrewingIngredientInput;
    output: ItemStackType | ItemStackData;
  }) {
    this.input = Object.freeze({ ...input });
    this.reagent = Object.freeze({ ...reagent });
    this.output = output;
    freezeDataClass(this);
  }

  public asJsonObject(): BrewingRecipeType {
    return Object.freeze({
      type: "minecraft:brewing",
      input: ingredientToJson(this.input),
      reagent: ingredientToJson(this.reagent),
      output: toDataPackObject(this.output),
    });
  }
}

export interface BrewingRecipeBuilderConfigurator {
  input(value: BrewingIngredientInput): BrewingRecipeBuilderConfigurator;
  reagent(value: BrewingIngredientInput): BrewingRecipeBuilderConfigurator;
  output(value: ItemStackInput): BrewingRecipeBuilderConfigurator;
}

export class BrewingRecipeBuilder implements BrewingRecipeBuilderConfigurator {
  private inputValue?: BrewingIngredientInput;
  private reagentValue?: BrewingIngredientInput;
  private outputValue?: ItemStackType | ItemStackData;

  public input(value: BrewingIngredientInput): this {
    this.inputValue = value;
    return this;
  }

  public reagent(value: BrewingIngredientInput): this {
    this.reagentValue = value;
    return this;
  }

  public output(value: ItemStackInput): this {
    this.outputValue = ItemStack.from(value);
    return this;
  }

  public build(): Readonly<BrewingRecipeData> {
    if (this.inputValue === undefined || this.reagentValue === undefined) {
      throw new Error("A brewing recipe needs both input and reagent.");
    }
    if (this.outputValue === undefined) {
      throw new Error("A brewing recipe needs an output item stack.");
    }

    return freezeDataClass(
      new BrewingRecipeData({
        input: this.inputValue,
        reagent: this.reagentValue,
        output: this.outputValue,
      }),
    );
  }
}

const ingredientToJson = (
  value: BrewingIngredientInput,
): BrewingIngredientType =>
  Object.freeze({
    item: value.item,
    potion_contents: toDataPackObject(
      value.potionContents ?? value.potion_contents,
    ) as PotionContentsPredicateType | undefined,
  });

const makeRecipe = (
  input: BrewingIngredientInput,
  reagent: BrewingIngredientInput,
  output: ItemStackInput,
) => {
  const recipe = new BrewingRecipeData({
    input,
    reagent,
    output: ItemStack.from(output),
  });
  return recipe.asJsonObject();
};

function brewingFrom({
  input,
  reagent,
  output,
}: {
  input: BrewingIngredientInput;
  reagent: BrewingIngredientInput;
  output: ItemStackInput;
}): BrewingRecipeType;
function brewingFrom({
  input,
  reagent,
}: {
  input: BrewingIngredientInput;
  reagent: BrewingIngredientInput;
}): (output: ItemStackInput) => BrewingRecipeType;
function brewingFrom({ input }: { input: BrewingIngredientInput }): (
  data: { reagent: BrewingIngredientInput },
) => (output: { output: ItemStackInput }) => BrewingRecipeType;
function brewingFrom({
  input,
  reagent,
  output,
}: {
  input: BrewingIngredientInput;
  reagent?: BrewingIngredientInput;
  output?: ItemStackInput;
}) {
  if (reagent !== undefined && output !== undefined) {
    return makeRecipe(input, reagent, output);
  }

  if (reagent !== undefined) {
    return (outputData: ItemStackInput) =>
      makeRecipe(input, reagent, outputData);
  }

  return ({ reagent: reagentData }: { reagent: BrewingIngredientInput }) =>
  ({ output: outputData }: { output: ItemStackInput }) =>
    makeRecipe(input, reagentData, outputData);
}

export const BrewingRecipe = {
  builder(): BrewingRecipeBuilder {
    return new BrewingRecipeBuilder();
  },
  from: brewingFrom,
};

import z from "zod";
import {
  ItemStack,
  type ItemStackInput,
  type ItemStackType,
  Schema$ItemStackComponent,
} from "#/models/data-components/common/item-stack.ts";
import {
  type Type$PotionContentsPredicate,
  Schema$PotionContentsPredicate,
} from "#/models/predicates/potion-contents.ts";

export type BrewingIngredientInput = {
  item: string;
  potionContents?: Type$PotionContentsPredicate;
  potion_contents?: Type$PotionContentsPredicate;
};
export const Schema$BrewingIngredient = z.compile(
  z
    .object({
      item: z.string(),
      potion_contents: Schema$PotionContentsPredicate.optional(),
    })
    .readonly(),
);
export type BrewingIngredientType = z.output<typeof Schema$BrewingIngredient>;
export const Schema$BrewingRecipe = z.compile(
  z
    .object({
      type: z.literal("minecraft:brewing"),
      input: Schema$BrewingIngredient,
      reagent: Schema$BrewingIngredient,
      output: Schema$ItemStackComponent,
    })
    .readonly(),
);
export type BrewingRecipeType = z.output<typeof Schema$BrewingRecipe>;

const ingredient = ({
  item,
  potionContents,
  potion_contents,
}: BrewingIngredientInput): BrewingIngredientType =>
  Schema$BrewingIngredient.parse({
    item,
    potion_contents: potionContents ?? potion_contents,
  });

export interface Configurator$BrewingRecipe {
  input(value: BrewingIngredientInput): Configurator$BrewingRecipe;
  reagent(value: BrewingIngredientInput): Configurator$BrewingRecipe;
  output(value: ItemStackInput): Configurator$BrewingRecipe;
}

export class Builder$BrewingRecipe implements Configurator$BrewingRecipe {
  private inputValue?: BrewingIngredientInput;
  private reagentValue?: BrewingIngredientInput;
  private outputValue?: ItemStackType;
  input(value: BrewingIngredientInput) {
    this.inputValue = value;
    return this;
  }
  reagent(value: BrewingIngredientInput) {
    this.reagentValue = value;
    return this;
  }
  output(value: ItemStackInput) {
    this.outputValue = ItemStack.from(value);
    return this;
  }
  build() {
    return Schema$BrewingRecipe.parse({
      type: "minecraft:brewing",
      input: this.inputValue && ingredient(this.inputValue),
      reagent: this.reagentValue && ingredient(this.reagentValue),
      output: this.outputValue,
    });
  }
}

const makeRecipe = (
  input: BrewingIngredientInput,
  reagent: BrewingIngredientInput,
  output: ItemStackInput,
): BrewingRecipeType =>
  Schema$BrewingRecipe.parse({
    type: "minecraft:brewing",
    input: ingredient(input),
    reagent: ingredient(reagent),
    output: ItemStack.from(output),
  });

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
function brewingFrom({
  input,
}: {
  input: BrewingIngredientInput;
}): (data: {
  reagent: BrewingIngredientInput;
}) => (output: { output: ItemStackInput }) => BrewingRecipeType;
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
  builder: () => new Builder$BrewingRecipe(),
  from: brewingFrom,
};

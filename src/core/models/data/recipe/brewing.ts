import z from "zod";
import {
  Builder$PotionContentsPredicate,
  Configurator$PotionContentsPredicate,
  Schema$PotionContentsPredicate,
  Type$PotionContentsPredicate,
} from "#/models/predicates/potion-contents.ts";
import {
  Builder$ItemStackComponent,
  Configurator$ItemStackComponent,
  Schema$ItemStackComponent,
  Type$ItemStackComponent,
} from "#/models/data-components/common/item-stack.ts";

const __Schema$BrewingRecipe$Ingredient = z.compile(
  z
    .object({
      item: z.string(),
      potion_contents: Schema$PotionContentsPredicate.optional(),
    })
    .readonly(),
);

type __Type$BrewingRecipe$Ingredient = z.output<
  typeof __Schema$BrewingRecipe$Ingredient
>;

export const Schema$BrewingRecipe = z.compile(
  z
    .object({
      type: z.literal("minecraft:brewing"),
      input: __Schema$BrewingRecipe$Ingredient,
      reagent: __Schema$BrewingRecipe$Ingredient,
      output: Schema$ItemStackComponent,
    })
    .readonly(),
);
export type Type$BrewingRecipe = z.output<typeof Schema$BrewingRecipe>;

export interface Configurator$BrewingRecipe {
  input(
    item: string,
    configFn?: (configurator: Configurator$PotionContentsPredicate) => void,
  ): Configurator$BrewingRecipe;
  reagent(
    item: string,
    configFn?: (configurator: Configurator$PotionContentsPredicate) => void,
  ): Configurator$BrewingRecipe;
  output(
    configFn: (configurator: Configurator$ItemStackComponent) => void,
  ): Configurator$BrewingRecipe;
}

export class Builder$BrewingRecipe implements Configurator$BrewingRecipe {
  private inputValue?: __Type$BrewingRecipe$Ingredient;
  private reagentValue?: __Type$BrewingRecipe$Ingredient;
  private outputValue?: Type$ItemStackComponent;

  input(
    item: string,
    configFn?: (configurator: Configurator$PotionContentsPredicate) => void,
  ) {
    let value: Type$PotionContentsPredicate | undefined = undefined;
    if (configFn !== undefined) {
      const builder = new Builder$PotionContentsPredicate();
      configFn(builder);
      value = builder.build();
    }
    this.inputValue = { item, potion_contents: value };
    return this;
  }
  reagent(
    item: string,
    configFn?: (configurator: Configurator$PotionContentsPredicate) => void,
  ) {
    let value: Type$PotionContentsPredicate | undefined = undefined;
    if (configFn !== undefined) {
      const builder = new Builder$PotionContentsPredicate();
      configFn(builder);
      value = builder.build();
    }
    this.reagentValue = { item, potion_contents: value };
    return this;
  }
  output(configFn: (configurator: Configurator$ItemStackComponent) => void) {
    const builder = new Builder$ItemStackComponent();
    configFn(builder);
    this.outputValue = builder.build();
    return this;
  }
  build() {
    return Schema$BrewingRecipe.parse({
      type: "minecraft:brewing",
      input: this.inputValue,
      reagent: this.reagentValue,
      output: this.outputValue,
    });
  }
}

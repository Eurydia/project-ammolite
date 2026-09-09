import { MinecraftItem } from "#/enum/minecraft-item.enum.ts";
import { PotionContentsPredicate as InputPredicate } from "#/models/predicates/potion-contents.ts";
import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { hashString } from "../../utility/hashing.ts";
import { IllegalRecipeNameError, Recipe } from "./recipe.ts";
import { validateIdentifier } from "../../utility/validator.ts";

class RecipeInput {
  private item: string;
  private potionContents?: InputPredicate;

  private constructor(item: string) {
    this.item = item;
  }
  public static new(item: string) {
    return new this(item);
  }

  public wherePotionContents(predicate: InputPredicate) {
    this.potionContents = predicate;
  }

  public asJsonObject() {
    return {
      item: this.item,
      potionContents: this.potionContents?.asJsonObject(),
    };
  }
}

class RecipeOutput {
  private item: string;
  private components?: DataComponent[];

  private constructor(item: string | MinecraftItem) {
    this.item = item;
  }

  public static new(item: string | MinecraftItem) {
    return new this(item);
  }

  public withComponents(...comp: Array<DataComponent>) {
    this.components = [...comp];
  }

  public asJsonObject() {
    return {
      id: this.item,
      components: this.components?.reduce((prev, curr) => {
        const { component, ...rest } = curr.asJsonObject();
        return Object.assign(prev, { [component]: rest });
      }, {}),
    };
  }
}

export class BrewingRecipe implements Recipe {
  private recipeNameOverride?: string;
  private inputItem: RecipeInput;
  private reagentItem: RecipeInput;
  private outputItem: RecipeOutput;

  private constructor(
    inputItem: string,
    reagentItem: string,
    outputItem: string,
  ) {
    this.inputItem = RecipeInput.new(inputItem);
    this.reagentItem = RecipeInput.new(reagentItem);
    this.outputItem = RecipeOutput.new(outputItem);
  }

  public static new(
    inputItem: string,
    reagentItem: string,
    outputItem: string,
  ) {
    return new this(inputItem, reagentItem, outputItem);
  }

  public whereInputPredicate(pred: InputPredicate) {
    this.inputItem.wherePotionContents(pred);
    return this;
  }

  public whereReagentPredicate(pred: InputPredicate) {
    this.reagentItem.wherePotionContents(pred);
    return this;
  }

  public withOutputComponents(...comps: Array<DataComponent>) {
    this.outputItem.withComponents(...comps);
    return this;
  }

  public withRecipeName(name: string) {
    if (!validateIdentifier(name)) {
      throw new IllegalRecipeNameError();
    }
    this.recipeNameOverride = name;
    return this;
  }

  public asJsonObject() {
    return {
      type: "minecraft:brewing",
      input: this.inputItem.asJsonObject(),
      reagent: this.reagentItem.asJsonObject(),
      output: this.outputItem.asJsonObject(),
    };
  }

  public getRecipeName() {
    return this.recipeNameOverride === undefined
      ? hashString(JSON.stringify(this.asJsonObject()))
      : this.recipeNameOverride;
  }
}

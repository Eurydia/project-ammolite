import { MinecraftItem } from "#/enum/minecraft-item.enum.ts";
import { PotionContents as InputPredicate } from "#/models/predicates/potion-contents.ts";
import { hashString } from "../../utility/hashing.ts";

class RecipeInput {
  private item: MinecraftItem | string;
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

export class BrewingRecipe {
  private recipeNameOverride?: string;
  private inputItem: RecipeInput;
  private reagentItem: RecipeInput;

  private constructor(inputItem: string, reagentItem: string) {
    this.inputItem = RecipeInput.new(inputItem);
    this.reagentItem = RecipeInput.new(reagentItem);
  }

  public static new(inputItem: string, reagentItem: string) {
    return new this(inputItem, reagentItem);
  }

  public whereInputPredicate(pred: InputPredicate) {
    this.inputItem.wherePotionContents(pred);
    return this;
  }

  public whereReagentPredicate(pred: InputPredicate) {
    this.reagentItem.wherePotionContents(pred);
    return this;
  }

  public withRecipeName(name: string) {
    this.recipeNameOverride = name;
    return this;
  }

  public asJsonObject() {
    return {
      input: this.inputItem.asJsonObject(),
      reagent: this.reagentItem.asJsonObject(),
    };
  }

  public getRecipeName() {
    return this.recipeNameOverride === undefined
      ? hashString(JSON.stringify(this.asJsonObject()))
      : this.recipeNameOverride;
  }
}

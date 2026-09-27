import {
  Builder$BrewingRecipe,
  type Configurator$BrewingRecipe,
  type Type$BrewingRecipe,
} from "#/models/data/recipe/brewing.ts";

export class DataPack {
  private name: string;
  private desc: string;

  private readonly recipes: Array<Type$BrewingRecipe> = [];

  constructor(name: string, desc?: string) {
    this.name = name;
    this.desc = desc ?? "";
  }

  public getDesc() {
    return this.desc;
  }

  public getRecipes() {
    return [...this.recipes];
  }

  public addBrewingRecipe(
    configFn: (configurator: Configurator$BrewingRecipe) => void,
  ) {
    const builder = new Builder$BrewingRecipe();
    configFn(builder);
    this.recipes.push(builder.build());
  }
  public getName() {
    return this.name;
  }
}

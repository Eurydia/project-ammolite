export class DataPack {
  private name: string;
  private desc: string;

  private readonly recipes: Array<BrewingRecipeType> = [];

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

  public addBrewingRecipe(recipe: BrewingRecipeType | BrewingRecipeData) {
    this.recipes.push(toDataPackObject(recipe) as BrewingRecipeType);
  }
  public getName() {
    return this.name;
  }
}

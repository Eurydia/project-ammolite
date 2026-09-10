import { DataPack } from "#/models/data_pack.ts";

export class PackBuilder {
  private zip?: boolean;
  private constructor() {}
  public static new() {
    return new this();
  }
  public buildZip() {
    this.zip = true;
    return this;
  }

  public static buildDataPack(dataPack: DataPack) {
    const root = `./OUTPUT/${dataPack.getName()}`;
    Deno.mkdirSync(root, { recursive: true });
    Deno.writeTextFileSync(
      `${root}/pack.mcmeta`,
      JSON.stringify({
        pack: {
          max_format: 110,
          min_format: 110,
          description: dataPack.getDesc(),
        },
      }),
    );

    const nsPath = `${root}/data/0/recipe/brewing`;
    Deno.mkdirSync(nsPath, { recursive: true });
    dataPack.getRecipes().forEach((recipe, i) => {
      Deno.writeTextFileSync(
        `${nsPath}/${i}.json`,
        JSON.stringify(recipe.asJsonObject()),
      );
    });
  }
}

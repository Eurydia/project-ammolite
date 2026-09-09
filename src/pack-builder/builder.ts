import { DataPack } from "#/models/data_pack.ts";

export class PackBuilder {
  public static buildDataPack(dataPack: DataPack) {
    const root = `./OUTPUT/${dataPack.getName()}`;
    Deno.mkdirSync(root, { recursive: true });
    Deno.writeTextFileSync(
      `${root}/pack.mcmeta`,
      JSON.stringify({
        pack: { max_format: 110, description: dataPack.getDesc() },
      }),
    );

    dataPack.listNamespaces().forEach((entry) => {
      const nsPath = `${root}/data/${entry.namespace}/recipe/brewing`;
      Deno.mkdirSync(nsPath, { recursive: true });
      entry.recipes.forEach((recipe) => {
        Deno.writeTextFileSync(
          `${nsPath}/${recipe.getRecipeName()}.json`,
          JSON.stringify(recipe.asJsonObject()),
        );
      });
    });
  }
}

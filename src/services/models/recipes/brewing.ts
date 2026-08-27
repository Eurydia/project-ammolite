import z from "zod";
import { MinecraftItem } from "#/services/enums/minecraft-item.enum";
import { OptionalIntString } from "../data_component_predicates/generics/optional-int-string";
import {
  PotionContentsPredicate,
  PotionContentsPredicate$AsDataPackJSON,
} from "../data_component_predicates/potion_contents_predicate";
import {
  PotionContents,
  PotionContents$AsDataPackJSON,
} from "../data_components/potion_contents";

export const BrewingRecipe$OutputItem = z.object({
  item: z.enum(MinecraftItem),
  count: OptionalIntString,
  components: PotionContents,
});

const BrewingRecipe$OutputItem$ToDataPackJSON = (
  dt: z.output<typeof BrewingRecipe$OutputItem>,
) => {
  return {
    item: dt.item,
    count: dt.count,
    components:
      dt.components === undefined
        ? undefined
        : [PotionContents$AsDataPackJSON(dt.components)],
  };
};

export const BrewingRecipe$InputItem = z.object({
  item: z.enum(MinecraftItem),
  potionContents: PotionContentsPredicate.optional(),
});

const BrewingRecipe$InputItem$ToDataPackJSON = (
  dt: z.output<typeof BrewingRecipe$InputItem>,
) => {
  return {
    item: dt.item,
    potion_contents:
      dt.potionContents === undefined
        ? undefined
        : PotionContentsPredicate$AsDataPackJSON(dt.potionContents),
  };
};

export const BrewingRecipe = z.object({
  inputItem: BrewingRecipe$InputItem,
  reagentItem: BrewingRecipe$InputItem,
  outputItem: BrewingRecipe$OutputItem,
});

export const BrewingRecipe$toDataPackJSON = (
  data: z.output<typeof BrewingRecipe>,
) => {
  return {
    id: "minecraft:brewing",
    input: BrewingRecipe$InputItem$ToDataPackJSON(data.inputItem),
    reagent: BrewingRecipe$InputItem$ToDataPackJSON(data.reagentItem),
    output: BrewingRecipe$OutputItem$ToDataPackJSON(data.outputItem),
  };
};

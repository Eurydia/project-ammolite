import z from "zod";

enum ItemRarity {
  COMMON = "common",
  UNCOMMON = "uncommon",
  RARE = "rare",
  EPIC = "epic",
}

const __Schema$RarityComponent$Active = z.compile(
  z.object({ "minecraft:rarity": z.enum(ItemRarity) }).readonly(),
);

const __Schema$RarityComponent$Disabled = z.compile(
  z.object({ "!minecraft:rarity": z.object({}) }).readonly(),
);

export const Schema$RarityComponent = z.compile(
  z.union([__Schema$RarityComponent$Active, __Schema$RarityComponent$Disabled]),
);

export type Type$RarityComponent = z.output<typeof Schema$RarityComponent>;

export interface Configurator$RarityComponent {
  common(): Configurator$RarityComponent;
  uncommon(): Configurator$RarityComponent;
  rare(): Configurator$RarityComponent;
  epic(): Configurator$RarityComponent;
  disable(): Configurator$RarityComponent;
}

export class Builder$RarityComponent implements Configurator$RarityComponent {
  private value?: Type$RarityComponent;

  common(): this {
    this.value = { "minecraft:rarity": ItemRarity.COMMON };
    return this;
  }
  uncommon(): this {
    this.value = { "minecraft:rarity": ItemRarity.UNCOMMON };
    return this;
  }
  rare(): this {
    this.value = { "minecraft:rarity": ItemRarity.RARE };
    return this;
  }
  epic(): this {
    this.value = { "minecraft:rarity": ItemRarity.EPIC };
    return this;
  }

  disable(): this {
    this.value = { "!minecraft:rarity": {} };
    return this;
  }

  build() {
    return Schema$RarityComponent.parse(this.value);
  }
}

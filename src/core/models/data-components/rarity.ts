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
  common(): void;
  uncommon(): void;
  rare(): void;
  epic(): void;
  disable(): void;
}

export class Builder$RarityComponent implements Configurator$RarityComponent {
  private value?: Type$RarityComponent;

  common() {
    this.value = { "minecraft:rarity": ItemRarity.COMMON };
  }
  uncommon() {
    this.value = { "minecraft:rarity": ItemRarity.UNCOMMON };
  }
  rare() {
    this.value = { "minecraft:rarity": ItemRarity.RARE };
  }

  epic() {
    this.value = { "minecraft:rarity": ItemRarity.EPIC };
  }

  disable() {
    this.value = { "!minecraft:rarity": {} };
  }

  build() {
    return Schema$RarityComponent.parse(this.value);
  }
}

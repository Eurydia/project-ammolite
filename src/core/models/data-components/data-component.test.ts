import { assertEquals } from "@std/assert";
import {
  ConsumableComponent,
  ConsumeAnimations,
} from "#/models/data-components/consumable.ts";
import { ConsumeEffect } from "#/models/data-components/common/consume-effect.ts";
import { MobEffectComponent } from "#/models/data-components/common/mob-effect.ts";
import { SoundEvent } from "#/models/data-components/common/sound-event.ts";
import { TextComponent } from "#/models/data-components/common/text.ts";
import { CustomNameComponent } from "#/models/data-components/custom-name.ts";
import { DamageResistantComponent } from "#/models/data-components/damage-resistant.ts";
import { DataComponent } from "#/models/data-components/data-component.ts";
import { DeathProtectionComponent } from "#/models/data-components/death-protection.ts";
import { EnchantmentGlintOverrideComponent } from "#/models/data-components/enchantment-glint-override.ts";
import { ItemNameComponent } from "#/models/data-components/item-name.ts";
import { LoreComponent } from "#/models/data-components/lore.ts";
import { PotionContentsComponent } from "#/models/data-components/potion-contents.ts";
import { PotionDurationScaleComponent } from "#/models/data-components/potion-duration-scale.ts";
import { RarityComponent } from "#/models/data-components/rarity.ts";
import { SuspiciousStewEffectsComponent } from "#/models/data-components/suspicious-stew-effects.ts";
import { ItemRarity } from "#/enum/item-rarity.ts";
import { MobEffects } from "#/enum/mob-effects.ts";

Deno.test("data-component factories produce keyed Minecraft values", () => {
  const text = TextComponent.from({ text: "Named", italic: false });
  const effect = MobEffectComponent.from({
    id: MobEffects.SPEED,
    duration: 200,
    amplifier: 1,
    showIcon: true,
    showParticles: false,
  });

  assertEquals(
    JSON.parse(
      JSON.stringify(
        DataComponent.from(
          ConsumableComponent.from({
            consumeSeconds: 1.6,
            animation: ConsumeAnimations.DRINK,
            sound: SoundEvent.from({
              soundId: "minecraft:entity.generic.drink",
            }),
            hasConsumeParticles: false,
            onConsumeEffects: [
              ConsumeEffect.applyEffects({
                effects: [effect],
                probability: 0.5,
              }),
            ],
          }),
          CustomNameComponent.from({ text }),
          DamageResistantComponent.from({ types: ["minecraft:is_fire"] }),
          DeathProtectionComponent.from({
            deathEffects: [ConsumeEffect.clearAllEffects()],
          }),
          EnchantmentGlintOverrideComponent.from({ value: true }),
          ItemNameComponent.from({ text }),
          LoreComponent.from({ lines: [text] }),
          PotionContentsComponent.from({
            potion: "minecraft:swiftness",
            customColor: "#123456",
            customEffects: [effect],
          }),
          PotionDurationScaleComponent.from({ value: 1.5 }),
          RarityComponent.from({ rarity: ItemRarity.RARE }),
          SuspiciousStewEffectsComponent.from({
            effects: [{ id: MobEffects.NIGHT_VISION, duration: 200 }],
          }),
        ),
      ),
    ),
    {
      "minecraft:consumable": {
        consume_seconds: 1.6,
        animation: "drink",
        sound: "minecraft:entity.generic.drink",
        has_consume_particles: false,
        on_consume_effects: [
          {
            type: "minecraft:apply_effects",
            effects: [
              {
                id: "minecraft:speed",
                duration: 200,
                amplifier: 1,
                show_icon: true,
                show_particles: false,
              },
            ],
            probability: 0.5,
          },
        ],
      },
      "minecraft:custom_name": { type: "text", text: "Named", italic: false },
      "minecraft:damage_resistant": { types: ["minecraft:is_fire"] },
      "minecraft:death_protection": {
        death_effects: [{ type: "minecraft:clear_all_effects" }],
      },
      "minecraft:enchantment_glint_override": true,
      "minecraft:item_name": { type: "text", text: "Named", italic: false },
      "minecraft:lore": [{ type: "text", text: "Named", italic: false }],
      "minecraft:potion_contents": {
        potion: "minecraft:swiftness",
        custom_effects: [
          {
            id: "minecraft:speed",
            duration: 200,
            amplifier: 1,
            show_icon: true,
            show_particles: false,
          },
        ],
        custom_color: 1_193_046,
      },
      "minecraft:potion_duration_scale": 1.5,
      "minecraft:rarity": "rare",
      "minecraft:suspicious_stew_effects": [
        { id: "minecraft:night_vision", duration: 200 },
      ],
    },
  );
});

Deno.test("data-component factories use empty objects for negated values", () => {
  assertEquals(
    DataComponent.from(
      ConsumableComponent.negated(),
      CustomNameComponent.negated(),
      DamageResistantComponent.negated(),
      DeathProtectionComponent.negated(),
      EnchantmentGlintOverrideComponent.negated(),
      ItemNameComponent.negated(),
      LoreComponent.negated(),
      PotionContentsComponent.negated(),
      PotionDurationScaleComponent.negated(),
      RarityComponent.negated(),
      SuspiciousStewEffectsComponent.negated(),
    ),
    {
      "!minecraft:consumable": {},
      "!minecraft:custom_name": {},
      "!minecraft:damage_resistant": {},
      "!minecraft:death_protection": {},
      "!minecraft:enchantment_glint_override": {},
      "!minecraft:item_name": {},
      "!minecraft:lore": {},
      "!minecraft:potion_contents": {},
      "!minecraft:potion_duration_scale": {},
      "!minecraft:rarity": {},
      "!minecraft:suspicious_stew_effects": {},
    },
  );
});

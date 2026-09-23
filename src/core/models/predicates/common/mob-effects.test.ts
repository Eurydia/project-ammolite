import { assert, assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import {
  Builder$MobEffectPredicate,
  Configurator$MobEffectPredicate,
} from "#/models/predicates/common/mob-effect.ts";

Deno.test(
  "mob-effect predicate nested callbacks use the configurator API",
  () => {
    const configure: (builder: Configurator$MobEffectPredicate) => void = (
      builder,
    ) => {
      builder
        .amplifier((amplifier) => amplifier.exact(1))
        .duration((duration) =>
          duration.range((range) => range.min(200).max(400))
        )
        .ambient(false)
        .visible(true);
    };

    const builder = new Builder$MobEffectPredicate().effect(MobEffects.SPEED);
    configure(builder);
    const data = builder.build();

    assert(Object.isFrozen(data));
    assertEquals(data, {
      effect: "minecraft:speed",
      amplifier: 1,
      duration: { min: 200, max: 400 },
      ambient: false,
      visible: true,
    });
  },
);

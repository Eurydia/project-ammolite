import z from "zod";
import { PotionContents } from "./potion_contents";

export const DataComponents = z.discriminatedUnion("id", [PotionContents]);

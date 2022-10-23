import { Creature } from "@/types/creatures";
import { setInitialDates } from "./dates";

export function createDefaultCritter(name: string): Creature {

  return setInitialDates({
    name,
    tags: [],
    created: 0,
    lastEdited: 0,
  })
}
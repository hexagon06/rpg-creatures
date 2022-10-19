import { creatureApi as oldApi } from '../typed/creatureApi'
import { creatureApi as newApi } from '../new-typed/creatureApi'

import { convertCreature } from '@/types/conversion/convert-creature'
import { Converter } from "../conversionApi";

export function getCreatureConverter() {
  return new Converter(oldApi, newApi, convertCreature)
}

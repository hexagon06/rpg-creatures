import Vue from 'vue'
import { ArrayPills, Favorite, LabeledProp, PillMultiselect, SourceReference, Thumbnail } from './shared'
import { Edit as CreatureEdit, Create as CreatureCreate, CreatureForm, Alignment, Abilities, AlignmentEditor, CreatureDetails, CreatureFilters, Create, CreaturePagination, CreatureSidebar, CreatureTable } from './creatures'
import { Edit as ShopEdit, ShopDetails, ShopForm, ShopSidebar, ShopTable } from './shops'
import { Create as AbilityCreate, AbilityDetails, AbilityForm, AbilitySidebar, AbilityTable, Edit as AbilityEdit, CreatureAbility } from './abilities'

export function addCreatureComponents () {
  Vue.component('abilities', Abilities)
  Vue.component('alignment', Alignment)
  Vue.component('alignment-editor', AlignmentEditor)
  Vue.component('create-creature', CreatureCreate)
  Vue.component('creature-details', CreatureDetails)
  Vue.component('creature-filters', CreatureFilters)
  Vue.component('creature-form', CreatureForm)
  Vue.component('creature-pagination', CreaturePagination)
  Vue.component('creature-sidebar', CreatureSidebar)
  Vue.component('creature-table', CreatureTable)
  Vue.component('edit-creature', CreatureEdit)
}

export function addSharedComponents () {
  Vue.component('array-pills', ArrayPills)
  Vue.component('favorite', Favorite)
  Vue.component('labeled-prop', LabeledProp)
  Vue.component('pill-multiselect', PillMultiselect)
  Vue.component('source-reference', SourceReference)
  Vue.component('thumbnail', Thumbnail)
}

export function addShopComponents () {
  Vue.component('edit-shop', ShopEdit)
  Vue.component('shop-details', ShopDetails)
  Vue.component('shop-form', ShopForm)
  Vue.component('shop-sidebar', ShopSidebar)
  Vue.component('shop-table', ShopTable)
}

export function addAbilityComponents () {
  Vue.component('create-ability', AbilityCreate)
  Vue.component('edit-ability', AbilityEdit)
  Vue.component('ability-details', AbilityDetails)
  Vue.component('ability-form', AbilityForm)
  Vue.component('ability-sidebar', AbilitySidebar)
  Vue.component('ability-table', AbilityTable)
  Vue.component('creature-ability', CreatureAbility)
}

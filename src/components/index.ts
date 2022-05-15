import Vue from 'vue'
import { ArrayPills, Favorite, GridCard, InputWrapper, LabeledProp, ListCard, Modal, PillMultiselect, SourceReference, Thumbnail, ActionPanelFilterContent as ActionPanelFilterContent, ActionPanelActionContent, ReferencePicker, EntityTypeIcon } from './shared'
import {
  CreatureForm, Alignment, Abilities, AlignmentEditor, CreatureDetails,
  CreatureAbilityEditor, CreatureAbilityValueEditor,
  CreaturesFilter, CreatureActions, CreatureTypeIcon
} from './creatures'
import { Create as AbilityCreate, AbilityDetails, AbilityForm, AbilitySidebar, AbilityTable, Edit as AbilityEdit, CreatureAbility } from './abilities'
import { UserSign } from './users'
import { default as ActionPanel } from './ActionPanel.vue'
import { EncounterActions, EncountersFilter } from './encounters'
import { ChapterSection, ChapterSectionEdit, ImageSection, ImageSectionEdit, LinkSection, LinkSectionEdit, ListSection, ListSectionEdit, PlayerCharactersSection, PlayerCharactersSectionEdit, RunChecklistSection, SessionActions, SessionRunActions, SessionsFilter, TextSection, TextSectionEdit } from './sessions'
import { IdeaActions, IdeasFilter } from './ideas'
import { RollerListActions, RollerListFilter } from './lists'
import { RunningInformation } from './RunningInformation'
import { World, WorldActions } from './worlds'

export function addAllComponents () {
  addAbilityComponents()
  addCreatureComponents()
  addEncounterComponents()
  addIdeaComponents()
  addListComponents()
  addRootComponents()
  addRunningInformationComponents()
  addSessionComponents()
  addSharedComponents()
  addUserComponents()
  addWorldComponents()
}

function addAbilityComponents () {
  Vue.component('create-ability', AbilityCreate)
  Vue.component('edit-ability', AbilityEdit)
  Vue.component('ability-details', AbilityDetails)
  Vue.component('ability-form', AbilityForm)
  Vue.component('ability-sidebar', AbilitySidebar)
  Vue.component('ability-table', AbilityTable)
  Vue.component('creature-ability', CreatureAbility)
}

function addCreatureComponents () {
  Vue.component('abilities', Abilities)
  Vue.component('alignment', Alignment)
  Vue.component('alignment-editor', AlignmentEditor)
  Vue.component('creature-details', CreatureDetails)
  Vue.component('creature-form', CreatureForm)
  Vue.component('creature-ability-editor', CreatureAbilityEditor)
  Vue.component('creature-ability-value', CreatureAbilityValueEditor)
  Vue.component('creatures-filter', CreaturesFilter)
  Vue.component('creature-actions', CreatureActions)
  Vue.component('creature-type-icon', CreatureTypeIcon)
}

function addEncounterComponents () {
  Vue.component('encounters-filter', EncountersFilter)
  Vue.component('encounter-actions', EncounterActions)
}

function addIdeaComponents () {
  Vue.component('ideas-filter', IdeasFilter)
  Vue.component('idea-actions', IdeaActions)
}

function addListComponents () {
  Vue.component('lists-filter', RollerListFilter)
  Vue.component('list-actions', RollerListActions)
}

function addRunningInformationComponents () {
  Vue.component('running-information', RunningInformation)
}

function addSessionComponents () {
  Vue.component('sessions-filter', SessionsFilter)
  Vue.component('session-actions', SessionActions)
  Vue.component('session-run-actions', SessionRunActions)

  Vue.component('section-edit-chapter', ChapterSectionEdit)
  Vue.component('section-edit-image', ImageSectionEdit)
  Vue.component('section-edit-link', LinkSectionEdit)
  Vue.component('section-edit-list', ListSectionEdit)
  Vue.component('section-edit-player-characters', PlayerCharactersSectionEdit)
  Vue.component('section-edit-text', TextSectionEdit)

  Vue.component('section-chapter', ChapterSection)
  Vue.component('section-image', ImageSection)
  Vue.component('section-link', LinkSection)
  Vue.component('section-list', ListSection)
  Vue.component('section-player-characters', PlayerCharactersSection)
  Vue.component('section-text', TextSection)

  Vue.component('section-run-list', RunChecklistSection)
}

function addSharedComponents () {
  Vue.component('array-pills', ArrayPills)
  Vue.component('favorite', Favorite)
  Vue.component('labeled-prop', LabeledProp)
  Vue.component('pill-multiselect', PillMultiselect)
  Vue.component('source-reference', SourceReference)
  Vue.component('thumbnail', Thumbnail)
  Vue.component('list-card', ListCard)
  Vue.component('modal', Modal)
  Vue.component('grid-card', GridCard)
  Vue.component('input-wrapper', InputWrapper)
  Vue.component('action-panel-filter', ActionPanelFilterContent)
  Vue.component('action-panel-action', ActionPanelActionContent)
  Vue.component('reference-picker', ReferencePicker)
  Vue.component('entity-type-icon', EntityTypeIcon)
}

function addUserComponents () {
  Vue.component('user-sign', UserSign)
}

function addRootComponents () {
  Vue.component('action-panel', ActionPanel)
}

function addWorldComponents () {
  Vue.component('world-actions', WorldActions)
  Vue.component('world', World)
}

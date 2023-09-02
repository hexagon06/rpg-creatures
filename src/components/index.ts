import { ArrayPills, Favorite, GridCard, InputWrapper, LabeledProp, ListCard, Modal, PillMultiselect, SourceReference, Thumbnail, ActionPanelFilterContent as ActionPanelFilterContent, ActionPanelActionContent, ReferencePicker, EntityTypeIcon } from './shared'
import {
  CreatureForm, Alignment, Abilities, AlignmentEditor, CreatureDetails,
  CreatureAbilityEditor, CreatureAbilityValueEditor,
  CreaturesFilter, CreatureActions, CreatureTypeIcon
} from './creatures'
import {
  CrittersFilter, CritterActions, CritterDetails
} from './critters'
import { UserSign } from './users'
import ActionPanel from './ActionPanel.vue'
import { EncounterActions, EncountersFilter } from './encounters'
import { ChapterSection, ChapterSectionEdit, ImageSection, ImageSectionEdit, LinkSection, LinkSectionEdit, ListSection, ListSectionEdit, PlayerCharactersSection, PlayerCharactersSectionEdit, RunChecklistSection, SessionActions, SessionRunActions, SessionsFilter, TextSection, TextSectionEdit } from './sessions'
import { IdeaActions, IdeasFilter } from './ideas'
import { RollerListActions, RollerListFilter } from './lists'
import { RunningInformation } from './RunningInformation'
import { App } from 'vue'

export function addAllComponents(app: App) {
  addCreatureComponents(app)
  addEncounterComponents(app)
  addIdeaComponents(app)
  addListComponents(app)
  addRootComponents(app)
  addRunningInformationComponents(app)
  addSessionComponents(app)
  addSharedComponents(app)
  addUserComponents(app)
  addCritterComponents(app)
}


function addCreatureComponents(app: App) {
  app.component('alignment', Alignment)
  app.component('alignment-editor', AlignmentEditor)
  app.component('creature-details', CreatureDetails)
  app.component('creature-form', CreatureForm)
  app.component('creature-ability-editor', CreatureAbilityEditor)
  app.component('creature-ability-value', CreatureAbilityValueEditor)
  app.component('creatures-filter', CreaturesFilter)
  app.component('creature-actions', CreatureActions)
  app.component('creature-type-icon', CreatureTypeIcon)
}

function addCritterComponents(app: App) {
  app.component('critter-details', CritterDetails)
  app.component('critters-filter', CrittersFilter)
  app.component('critter-actions', CritterActions)
}

function addEncounterComponents(app: App) {
  app.component('encounters-filter', EncountersFilter)
  app.component('encounter-actions', EncounterActions)
}

function addIdeaComponents(app: App) {
  app.component('ideas-filter', IdeasFilter)
  app.component('idea-actions', IdeaActions)
}

function addListComponents(app: App) {
  app.component('lists-filter', RollerListFilter)
  app.component('list-actions', RollerListActions)
}

function addRunningInformationComponents(app: App) {
  app.component('running-information', RunningInformation)
}

function addSessionComponents(app: App) {
  app.component('sessions-filter', SessionsFilter)
  app.component('session-actions', SessionActions)
  app.component('session-run-actions', SessionRunActions)

  app.component('section-edit-chapter', ChapterSectionEdit)
  app.component('section-edit-image', ImageSectionEdit)
  app.component('section-edit-link', LinkSectionEdit)
  app.component('section-edit-list', ListSectionEdit)
  app.component('section-edit-player-characters', PlayerCharactersSectionEdit)
  app.component('section-edit-text', TextSectionEdit)

  app.component('section-chapter', ChapterSection)
  app.component('section-image', ImageSection)
  app.component('section-link', LinkSection)
  app.component('section-list', ListSection)
  app.component('section-player-characters', PlayerCharactersSection)
  app.component('section-text', TextSection)

  app.component('section-run-list', RunChecklistSection)
}

function addSharedComponents(app: App) {
  app.component('array-pills', ArrayPills)
  app.component('favorite', Favorite)
  app.component('labeled-prop', LabeledProp)
  app.component('pill-multiselect', PillMultiselect)
  app.component('source-reference', SourceReference)
  app.component('thumbnail', Thumbnail)
  app.component('list-card', ListCard)
  app.component('modal', Modal)
  app.component('grid-card', GridCard)
  app.component('input-wrapper', InputWrapper)
  app.component('action-panel-filter', ActionPanelFilterContent)
  app.component('action-panel-action', ActionPanelActionContent)
  app.component('reference-picker', ReferencePicker)
  app.component('entity-type-icon', EntityTypeIcon)
}

function addUserComponents(app: App) {
  app.component('user-sign', UserSign)
}

function addRootComponents(app: App) {
  app.component('action-panel', ActionPanel)
}

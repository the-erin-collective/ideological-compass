// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const ideologySchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Ideology', additionalProperties: false }
)
export type Ideology = Static<typeof ideologySchema>
export const ideologyValidator = getValidator(ideologySchema, dataValidator)
export const ideologyResolver = resolve<Ideology, HookContext>({})

export const ideologyExternalResolver = resolve<Ideology, HookContext>({})

// Schema for creating new entries
export const ideologyDataSchema = Type.Pick(ideologySchema, ['text'], {
  $id: 'IdeologyData'
})
export type IdeologyData = Static<typeof ideologyDataSchema>
export const ideologyDataValidator = getValidator(ideologyDataSchema, dataValidator)
export const ideologyDataResolver = resolve<Ideology, HookContext>({})

// Schema for updating existing entries
export const ideologyPatchSchema = Type.Partial(ideologySchema, {
  $id: 'IdeologyPatch'
})
export type IdeologyPatch = Static<typeof ideologyPatchSchema>
export const ideologyPatchValidator = getValidator(ideologyPatchSchema, dataValidator)
export const ideologyPatchResolver = resolve<Ideology, HookContext>({})

// Schema for allowed query properties
export const ideologyQueryProperties = Type.Pick(ideologySchema, ['id', 'text'])
export const ideologyQuerySchema = Type.Intersect(
  [
    querySyntax(ideologyQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type IdeologyQuery = Static<typeof ideologyQuerySchema>
export const ideologyQueryValidator = getValidator(ideologyQuerySchema, queryValidator)
export const ideologyQueryResolver = resolve<IdeologyQuery, HookContext>({})

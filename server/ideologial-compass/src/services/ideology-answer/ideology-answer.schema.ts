// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const ideologyAnswerSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'IdeologyAnswer', additionalProperties: false }
)
export type IdeologyAnswer = Static<typeof ideologyAnswerSchema>
export const ideologyAnswerValidator = getValidator(ideologyAnswerSchema, dataValidator)
export const ideologyAnswerResolver = resolve<IdeologyAnswer, HookContext>({})

export const ideologyAnswerExternalResolver = resolve<IdeologyAnswer, HookContext>({})

// Schema for creating new entries
export const ideologyAnswerDataSchema = Type.Pick(ideologyAnswerSchema, ['text'], {
  $id: 'IdeologyAnswerData'
})
export type IdeologyAnswerData = Static<typeof ideologyAnswerDataSchema>
export const ideologyAnswerDataValidator = getValidator(ideologyAnswerDataSchema, dataValidator)
export const ideologyAnswerDataResolver = resolve<IdeologyAnswer, HookContext>({})

// Schema for updating existing entries
export const ideologyAnswerPatchSchema = Type.Partial(ideologyAnswerSchema, {
  $id: 'IdeologyAnswerPatch'
})
export type IdeologyAnswerPatch = Static<typeof ideologyAnswerPatchSchema>
export const ideologyAnswerPatchValidator = getValidator(ideologyAnswerPatchSchema, dataValidator)
export const ideologyAnswerPatchResolver = resolve<IdeologyAnswer, HookContext>({})

// Schema for allowed query properties
export const ideologyAnswerQueryProperties = Type.Pick(ideologyAnswerSchema, ['id', 'text'])
export const ideologyAnswerQuerySchema = Type.Intersect(
  [
    querySyntax(ideologyAnswerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type IdeologyAnswerQuery = Static<typeof ideologyAnswerQuerySchema>
export const ideologyAnswerQueryValidator = getValidator(ideologyAnswerQuerySchema, queryValidator)
export const ideologyAnswerQueryResolver = resolve<IdeologyAnswerQuery, HookContext>({})

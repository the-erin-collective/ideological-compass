// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const userAnswerSchema = Type.Object(
  {
    id: Type.String(),
    userId: Type.String(),
    ideologyAnswerId: Type.String(),
    questionId: Type.String()
  },
  { $id: 'UserAnswer', additionalProperties: false }
)
export type UserAnswer = Static<typeof userAnswerSchema>
export const userAnswerValidator = getValidator(userAnswerSchema, dataValidator)
export const userAnswerResolver = resolve<UserAnswer, HookContext>({})

export const userAnswerExternalResolver = resolve<UserAnswer, HookContext>({})

// Schema for creating new entries
export const userAnswerDataSchema = Type.Pick(userAnswerSchema, ['userId'], {
  $id: 'UserAnswerData'
})
export type UserAnswerData = Static<typeof userAnswerDataSchema>
export const userAnswerDataValidator = getValidator(userAnswerDataSchema, dataValidator)
export const userAnswerDataResolver = resolve<UserAnswer, HookContext>({})

// Schema for updating existing entries
export const userAnswerPatchSchema = Type.Partial(userAnswerSchema, {
  $id: 'UserAnswerPatch'
})
export type UserAnswerPatch = Static<typeof userAnswerPatchSchema>
export const userAnswerPatchValidator = getValidator(userAnswerPatchSchema, dataValidator)
export const userAnswerPatchResolver = resolve<UserAnswer, HookContext>({})

// Schema for allowed query properties
export const userAnswerQueryProperties = Type.Pick(userAnswerSchema, ['id', 'userId'])
export const userAnswerQuerySchema = Type.Intersect(
  [
    querySyntax(userAnswerQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserAnswerQuery = Static<typeof userAnswerQuerySchema>
export const userAnswerQueryValidator = getValidator(userAnswerQuerySchema, queryValidator)
export const userAnswerQueryResolver = resolve<UserAnswerQuery, HookContext>({})

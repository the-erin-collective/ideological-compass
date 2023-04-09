// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const questionSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Question', additionalProperties: false }
)
export type Question = Static<typeof questionSchema>
export const questionValidator = getValidator(questionSchema, dataValidator)
export const questionResolver = resolve<Question, HookContext>({})

export const questionExternalResolver = resolve<Question, HookContext>({})

// Schema for creating new entries
export const questionDataSchema = Type.Pick(questionSchema, ['text'], {
  $id: 'QuestionData'
})
export type QuestionData = Static<typeof questionDataSchema>
export const questionDataValidator = getValidator(questionDataSchema, dataValidator)
export const questionDataResolver = resolve<Question, HookContext>({})

// Schema for updating existing entries
export const questionPatchSchema = Type.Partial(questionSchema, {
  $id: 'QuestionPatch'
})
export type QuestionPatch = Static<typeof questionPatchSchema>
export const questionPatchValidator = getValidator(questionPatchSchema, dataValidator)
export const questionPatchResolver = resolve<Question, HookContext>({})

// Schema for allowed query properties
export const questionQueryProperties = Type.Pick(questionSchema, ['id', 'text'])
export const questionQuerySchema = Type.Intersect(
  [
    querySyntax(questionQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type QuestionQuery = Static<typeof questionQuerySchema>
export const questionQueryValidator = getValidator(questionQuerySchema, queryValidator)
export const questionQueryResolver = resolve<QuestionQuery, HookContext>({})

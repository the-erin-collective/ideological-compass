// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const questionCategorySchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'QuestionCategory', additionalProperties: false }
)
export type QuestionCategory = Static<typeof questionCategorySchema>
export const questionCategoryValidator = getValidator(questionCategorySchema, dataValidator)
export const questionCategoryResolver = resolve<QuestionCategory, HookContext>({})

export const questionCategoryExternalResolver = resolve<QuestionCategory, HookContext>({})

// Schema for creating new entries
export const questionCategoryDataSchema = Type.Pick(questionCategorySchema, ['text'], {
  $id: 'QuestionCategoryData'
})
export type QuestionCategoryData = Static<typeof questionCategoryDataSchema>
export const questionCategoryDataValidator = getValidator(questionCategoryDataSchema, dataValidator)
export const questionCategoryDataResolver = resolve<QuestionCategory, HookContext>({})

// Schema for updating existing entries
export const questionCategoryPatchSchema = Type.Partial(questionCategorySchema, {
  $id: 'QuestionCategoryPatch'
})
export type QuestionCategoryPatch = Static<typeof questionCategoryPatchSchema>
export const questionCategoryPatchValidator = getValidator(questionCategoryPatchSchema, dataValidator)
export const questionCategoryPatchResolver = resolve<QuestionCategory, HookContext>({})

// Schema for allowed query properties
export const questionCategoryQueryProperties = Type.Pick(questionCategorySchema, ['id', 'text'])
export const questionCategoryQuerySchema = Type.Intersect(
  [
    querySyntax(questionCategoryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type QuestionCategoryQuery = Static<typeof questionCategoryQuerySchema>
export const questionCategoryQueryValidator = getValidator(questionCategoryQuerySchema, queryValidator)
export const questionCategoryQueryResolver = resolve<QuestionCategoryQuery, HookContext>({})

// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const userSurveySchema = Type.Object(
  {
    id: Type.String(),
    userId: Type.String(),
    createdAt: Type.Date(),
    closestMatchIdeologyId: Type.String(),
    questionsAndAnswers: Type.Array(Type.Object({
      priority: Type.Number(),
      questionId: Type.String(),
      userAnswerId: Type.String()
    }))
  },
  { $id: 'UserSurvey', additionalProperties: false }
)
export type UserSurvey = Static<typeof userSurveySchema>
export const userSurveyValidator = getValidator(userSurveySchema, dataValidator)
export const userSurveyResolver = resolve<UserSurvey, HookContext>({})

export const userSurveyExternalResolver = resolve<UserSurvey, HookContext>({})

// Schema for creating new entries
export const userSurveyDataSchema = Type.Pick(userSurveySchema, ['closestMatchIdeologyId'], {
  $id: 'UserSurveyData'
})
export type UserSurveyData = Static<typeof userSurveyDataSchema>
export const userSurveyDataValidator = getValidator(userSurveyDataSchema, dataValidator)
export const userSurveyDataResolver = resolve<UserSurvey, HookContext>({})

// Schema for updating existing entries
export const userSurveyPatchSchema = Type.Partial(userSurveySchema, {
  $id: 'UserSurveyPatch'
})
export type UserSurveyPatch = Static<typeof userSurveyPatchSchema>
export const userSurveyPatchValidator = getValidator(userSurveyPatchSchema, dataValidator)
export const userSurveyPatchResolver = resolve<UserSurvey, HookContext>({})

// Schema for allowed query properties
export const userSurveyQueryProperties = Type.Pick(userSurveySchema, ['id', 'closestMatchIdeologyId'])
export const userSurveyQuerySchema = Type.Intersect(
  [
    querySyntax(userSurveyQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserSurveyQuery = Static<typeof userSurveyQuerySchema>
export const userSurveyQueryValidator = getValidator(userSurveyQuerySchema, queryValidator)
export const userSurveyQueryResolver = resolve<UserSurveyQuery, HookContext>({})

// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userSurveyDataValidator,
  userSurveyPatchValidator,
  userSurveyQueryValidator,
  userSurveyResolver,
  userSurveyExternalResolver,
  userSurveyDataResolver,
  userSurveyPatchResolver,
  userSurveyQueryResolver
} from './user-survey.schema'

import type { Application } from '../../declarations'
import { UserSurveyService, getOptions } from './user-survey.class'
import { userSurveyPath, userSurveyMethods } from './user-survey.shared'

export * from './user-survey.class'
export * from './user-survey.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const userSurvey = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userSurveyPath, new UserSurveyService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userSurveyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userSurveyPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(userSurveyExternalResolver),
        schemaHooks.resolveResult(userSurveyResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(userSurveyQueryValidator),
        schemaHooks.resolveQuery(userSurveyQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userSurveyDataValidator),
        schemaHooks.resolveData(userSurveyDataResolver)
      ],
      patch: [
        schemaHooks.validateData(userSurveyPatchValidator),
        schemaHooks.resolveData(userSurveyPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userSurveyPath]: UserSurveyService
  }
}

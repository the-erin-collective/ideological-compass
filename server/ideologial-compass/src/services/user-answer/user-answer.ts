// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userAnswerDataValidator,
  userAnswerPatchValidator,
  userAnswerQueryValidator,
  userAnswerResolver,
  userAnswerExternalResolver,
  userAnswerDataResolver,
  userAnswerPatchResolver,
  userAnswerQueryResolver
} from './user-answer.schema'

import type { Application } from '../../declarations'
import { UserAnswerService, getOptions } from './user-answer.class'
import { userAnswerPath, userAnswerMethods } from './user-answer.shared'

export * from './user-answer.class'
export * from './user-answer.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const userAnswer = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userAnswerPath, new UserAnswerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userAnswerMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userAnswerPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(userAnswerExternalResolver),
        schemaHooks.resolveResult(userAnswerResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(userAnswerQueryValidator),
        schemaHooks.resolveQuery(userAnswerQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userAnswerDataValidator),
        schemaHooks.resolveData(userAnswerDataResolver)
      ],
      patch: [
        schemaHooks.validateData(userAnswerPatchValidator),
        schemaHooks.resolveData(userAnswerPatchResolver)
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
    [userAnswerPath]: UserAnswerService
  }
}

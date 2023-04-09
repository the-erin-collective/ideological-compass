// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ideologyAnswerDataValidator,
  ideologyAnswerPatchValidator,
  ideologyAnswerQueryValidator,
  ideologyAnswerResolver,
  ideologyAnswerExternalResolver,
  ideologyAnswerDataResolver,
  ideologyAnswerPatchResolver,
  ideologyAnswerQueryResolver
} from './ideology-answer.schema'

import type { Application } from '../../declarations'
import { IdeologyAnswerService, getOptions } from './ideology-answer.class'
import { ideologyAnswerPath, ideologyAnswerMethods } from './ideology-answer.shared'

export * from './ideology-answer.class'
export * from './ideology-answer.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ideologyAnswer = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ideologyAnswerPath, new IdeologyAnswerService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ideologyAnswerMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ideologyAnswerPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(ideologyAnswerExternalResolver),
        schemaHooks.resolveResult(ideologyAnswerResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ideologyAnswerQueryValidator),
        schemaHooks.resolveQuery(ideologyAnswerQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(ideologyAnswerDataValidator),
        schemaHooks.resolveData(ideologyAnswerDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ideologyAnswerPatchValidator),
        schemaHooks.resolveData(ideologyAnswerPatchResolver)
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
    [ideologyAnswerPath]: IdeologyAnswerService
  }
}

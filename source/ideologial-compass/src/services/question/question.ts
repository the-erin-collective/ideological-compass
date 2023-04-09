// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  questionDataValidator,
  questionPatchValidator,
  questionQueryValidator,
  questionResolver,
  questionExternalResolver,
  questionDataResolver,
  questionPatchResolver,
  questionQueryResolver
} from './question.schema'

import type { Application } from '../../declarations'
import { QuestionService, getOptions } from './question.class'
import { questionPath, questionMethods } from './question.shared'

export * from './question.class'
export * from './question.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const question = (app: Application) => {
  // Register our service on the Feathers application
  app.use(questionPath, new QuestionService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: questionMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(questionPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(questionExternalResolver),
        schemaHooks.resolveResult(questionResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(questionQueryValidator),
        schemaHooks.resolveQuery(questionQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(questionDataValidator),
        schemaHooks.resolveData(questionDataResolver)
      ],
      patch: [
        schemaHooks.validateData(questionPatchValidator),
        schemaHooks.resolveData(questionPatchResolver)
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
    [questionPath]: QuestionService
  }
}

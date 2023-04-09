// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  questionCategoryDataValidator,
  questionCategoryPatchValidator,
  questionCategoryQueryValidator,
  questionCategoryResolver,
  questionCategoryExternalResolver,
  questionCategoryDataResolver,
  questionCategoryPatchResolver,
  questionCategoryQueryResolver
} from './question-category.schema'

import type { Application } from '../../declarations'
import { QuestionCategoryService, getOptions } from './question-category.class'
import { questionCategoryPath, questionCategoryMethods } from './question-category.shared'

export * from './question-category.class'
export * from './question-category.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const questionCategory = (app: Application) => {
  // Register our service on the Feathers application
  app.use(questionCategoryPath, new QuestionCategoryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: questionCategoryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(questionCategoryPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(questionCategoryExternalResolver),
        schemaHooks.resolveResult(questionCategoryResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(questionCategoryQueryValidator),
        schemaHooks.resolveQuery(questionCategoryQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(questionCategoryDataValidator),
        schemaHooks.resolveData(questionCategoryDataResolver)
      ],
      patch: [
        schemaHooks.validateData(questionCategoryPatchValidator),
        schemaHooks.resolveData(questionCategoryPatchResolver)
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
    [questionCategoryPath]: QuestionCategoryService
  }
}

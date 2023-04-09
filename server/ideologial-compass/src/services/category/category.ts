// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  categoryDataValidator,
  categoryPatchValidator,
  categoryQueryValidator,
  categoryResolver,
  categoryExternalResolver,
  categoryDataResolver,
  categoryPatchResolver,
  categoryQueryResolver
} from './category.schema'

import type { Application } from '../../declarations'
import { CategoryService, getOptions } from './category.class'
import { categoryPath, categoryMethods } from './category.shared'

export * from './category.class'
export * from './category.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const category = (app: Application) => {
  // Register our service on the Feathers application
  app.use(categoryPath, new CategoryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: categoryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(categoryPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(categoryExternalResolver),
        schemaHooks.resolveResult(categoryResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(categoryQueryValidator),
        schemaHooks.resolveQuery(categoryQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(categoryDataValidator),
        schemaHooks.resolveData(categoryDataResolver)
      ],
      patch: [
        schemaHooks.validateData(categoryPatchValidator),
        schemaHooks.resolveData(categoryPatchResolver)
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
    [categoryPath]: CategoryService
  }
}

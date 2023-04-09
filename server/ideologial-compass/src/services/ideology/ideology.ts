// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  ideologyDataValidator,
  ideologyPatchValidator,
  ideologyQueryValidator,
  ideologyResolver,
  ideologyExternalResolver,
  ideologyDataResolver,
  ideologyPatchResolver,
  ideologyQueryResolver
} from './ideology.schema'

import type { Application } from '../../declarations'
import { IdeologyService, getOptions } from './ideology.class'
import { ideologyPath, ideologyMethods } from './ideology.shared'

export * from './ideology.class'
export * from './ideology.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const ideology = (app: Application) => {
  // Register our service on the Feathers application
  app.use(ideologyPath, new IdeologyService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ideologyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(ideologyPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(ideologyExternalResolver),
        schemaHooks.resolveResult(ideologyResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(ideologyQueryValidator),
        schemaHooks.resolveQuery(ideologyQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(ideologyDataValidator),
        schemaHooks.resolveData(ideologyDataResolver)
      ],
      patch: [
        schemaHooks.validateData(ideologyPatchValidator),
        schemaHooks.resolveData(ideologyPatchResolver)
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
    [ideologyPath]: IdeologyService
  }
}

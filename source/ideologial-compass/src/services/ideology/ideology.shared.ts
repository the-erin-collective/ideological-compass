// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Ideology, IdeologyData, IdeologyPatch, IdeologyQuery, IdeologyService } from './ideology.class'

export type { Ideology, IdeologyData, IdeologyPatch, IdeologyQuery }

export type IdeologyClientService = Pick<
  IdeologyService<Params<IdeologyQuery>>,
  (typeof ideologyMethods)[number]
>

export const ideologyPath = 'ideology'

export const ideologyMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ideologyClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ideologyPath, connection.service(ideologyPath), {
    methods: ideologyMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ideologyPath]: IdeologyClientService
  }
}

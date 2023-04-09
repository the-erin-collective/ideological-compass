// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  IdeologyAnswer,
  IdeologyAnswerData,
  IdeologyAnswerPatch,
  IdeologyAnswerQuery,
  IdeologyAnswerService
} from './ideology-answer.class'

export type { IdeologyAnswer, IdeologyAnswerData, IdeologyAnswerPatch, IdeologyAnswerQuery }

export type IdeologyAnswerClientService = Pick<
  IdeologyAnswerService<Params<IdeologyAnswerQuery>>,
  (typeof ideologyAnswerMethods)[number]
>

export const ideologyAnswerPath = 'ideology-answer'

export const ideologyAnswerMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const ideologyAnswerClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(ideologyAnswerPath, connection.service(ideologyAnswerPath), {
    methods: ideologyAnswerMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [ideologyAnswerPath]: IdeologyAnswerClientService
  }
}

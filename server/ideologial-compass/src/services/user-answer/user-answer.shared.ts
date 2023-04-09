// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  UserAnswer,
  UserAnswerData,
  UserAnswerPatch,
  UserAnswerQuery,
  UserAnswerService
} from './user-answer.class'

export type { UserAnswer, UserAnswerData, UserAnswerPatch, UserAnswerQuery }

export type UserAnswerClientService = Pick<
  UserAnswerService<Params<UserAnswerQuery>>,
  (typeof userAnswerMethods)[number]
>

export const userAnswerPath = 'user-answer'

export const userAnswerMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const userAnswerClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userAnswerPath, connection.service(userAnswerPath), {
    methods: userAnswerMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userAnswerPath]: UserAnswerClientService
  }
}

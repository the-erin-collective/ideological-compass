// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Question, QuestionData, QuestionPatch, QuestionQuery, QuestionService } from './question.class'

export type { Question, QuestionData, QuestionPatch, QuestionQuery }

export type QuestionClientService = Pick<
  QuestionService<Params<QuestionQuery>>,
  (typeof questionMethods)[number]
>

export const questionPath = 'question'

export const questionMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const questionClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(questionPath, connection.service(questionPath), {
    methods: questionMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [questionPath]: QuestionClientService
  }
}

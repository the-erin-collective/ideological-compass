// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  QuestionCategory,
  QuestionCategoryData,
  QuestionCategoryPatch,
  QuestionCategoryQuery,
  QuestionCategoryService
} from './question-category.class'

export type { QuestionCategory, QuestionCategoryData, QuestionCategoryPatch, QuestionCategoryQuery }

export type QuestionCategoryClientService = Pick<
  QuestionCategoryService<Params<QuestionCategoryQuery>>,
  (typeof questionCategoryMethods)[number]
>

export const questionCategoryPath = 'question-category'

export const questionCategoryMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const questionCategoryClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(questionCategoryPath, connection.service(questionCategoryPath), {
    methods: questionCategoryMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [questionCategoryPath]: QuestionCategoryClientService
  }
}

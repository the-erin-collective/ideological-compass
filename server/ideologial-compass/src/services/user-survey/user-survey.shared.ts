// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  UserSurvey,
  UserSurveyData,
  UserSurveyPatch,
  UserSurveyQuery,
  UserSurveyService
} from './user-survey.class'

export type { UserSurvey, UserSurveyData, UserSurveyPatch, UserSurveyQuery }

export type UserSurveyClientService = Pick<
  UserSurveyService<Params<UserSurveyQuery>>,
  (typeof userSurveyMethods)[number]
>

export const userSurveyPath = 'user-survey'

export const userSurveyMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const userSurveyClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userSurveyPath, connection.service(userSurveyPath), {
    methods: userSurveyMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userSurveyPath]: UserSurveyClientService
  }
}

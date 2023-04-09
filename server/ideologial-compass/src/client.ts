// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { categoryClient } from './services/category/category.shared'
export type {
  Category,
  CategoryData,
  CategoryQuery,
  CategoryPatch
} from './services/category/category.shared'

import { userAnswerClient } from './services/user-answer/user-answer.shared'
export type {
  UserAnswer,
  UserAnswerData,
  UserAnswerQuery,
  UserAnswerPatch
} from './services/user-answer/user-answer.shared'

import { ideologyAnswerClient } from './services/ideology-answer/ideology-answer.shared'
export type {
  IdeologyAnswer,
  IdeologyAnswerData,
  IdeologyAnswerQuery,
  IdeologyAnswerPatch
} from './services/ideology-answer/ideology-answer.shared'

import { ideologyClient } from './services/ideology/ideology.shared'
export type {
  Ideology,
  IdeologyData,
  IdeologyQuery,
  IdeologyPatch
} from './services/ideology/ideology.shared'

import { surveyClient } from './services/survey/survey.shared'
export type { Survey, SurveyData, SurveyQuery, SurveyPatch } from './services/survey/survey.shared'

import { questionClient } from './services/question/question.shared'
export type {
  Question,
  QuestionData,
  QuestionQuery,
  QuestionPatch
} from './services/question/question.shared'

import { userSurveyClient } from './services/user-survey/user-survey.shared'
export type {
  UserSurvey,
  UserSurveyData,
  UserSurveyQuery,
  UserSurveyPatch
} from './services/user-survey/user-survey.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the ideologial-compass app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(questionClient)
  client.configure(surveyClient)
  client.configure(ideologyClient)
  client.configure(ideologyAnswerClient)
  client.configure(userAnswerClient)
  client.configure(userSurveyClient)
  client.configure(categoryClient)
  return client
}

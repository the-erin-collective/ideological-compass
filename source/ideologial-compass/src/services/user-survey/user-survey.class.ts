// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { UserSurvey, UserSurveyData, UserSurveyPatch, UserSurveyQuery } from './user-survey.schema'

export type { UserSurvey, UserSurveyData, UserSurveyPatch, UserSurveyQuery }

export interface UserSurveyParams extends KnexAdapterParams<UserSurveyQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserSurveyService<ServiceParams extends Params = UserSurveyParams> extends KnexService<
  UserSurvey,
  UserSurveyData,
  UserSurveyParams,
  UserSurveyPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'user-survey'
  }
}

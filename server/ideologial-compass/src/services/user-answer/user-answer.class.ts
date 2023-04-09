// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { UserAnswer, UserAnswerData, UserAnswerPatch, UserAnswerQuery } from './user-answer.schema'

export type { UserAnswer, UserAnswerData, UserAnswerPatch, UserAnswerQuery }

export interface UserAnswerParams extends KnexAdapterParams<UserAnswerQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserAnswerService<ServiceParams extends Params = UserAnswerParams> extends KnexService<
  UserAnswer,
  UserAnswerData,
  UserAnswerParams,
  UserAnswerPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'user-answer'
  }
}

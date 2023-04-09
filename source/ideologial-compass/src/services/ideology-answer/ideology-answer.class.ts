// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  IdeologyAnswer,
  IdeologyAnswerData,
  IdeologyAnswerPatch,
  IdeologyAnswerQuery
} from './ideology-answer.schema'

export type { IdeologyAnswer, IdeologyAnswerData, IdeologyAnswerPatch, IdeologyAnswerQuery }

export interface IdeologyAnswerParams extends KnexAdapterParams<IdeologyAnswerQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class IdeologyAnswerService<ServiceParams extends Params = IdeologyAnswerParams> extends KnexService<
  IdeologyAnswer,
  IdeologyAnswerData,
  IdeologyAnswerParams,
  IdeologyAnswerPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'ideology-answer'
  }
}

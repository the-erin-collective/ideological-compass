// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Question, QuestionData, QuestionPatch, QuestionQuery } from './question.schema'

export type { Question, QuestionData, QuestionPatch, QuestionQuery }

export interface QuestionParams extends KnexAdapterParams<QuestionQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class QuestionService<ServiceParams extends Params = QuestionParams> extends KnexService<
  Question,
  QuestionData,
  QuestionParams,
  QuestionPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'question'
  }
}

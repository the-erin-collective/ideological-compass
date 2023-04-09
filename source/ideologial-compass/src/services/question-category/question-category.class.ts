// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  QuestionCategory,
  QuestionCategoryData,
  QuestionCategoryPatch,
  QuestionCategoryQuery
} from './question-category.schema'

export type { QuestionCategory, QuestionCategoryData, QuestionCategoryPatch, QuestionCategoryQuery }

export interface QuestionCategoryParams extends KnexAdapterParams<QuestionCategoryQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class QuestionCategoryService<
  ServiceParams extends Params = QuestionCategoryParams
> extends KnexService<
  QuestionCategory,
  QuestionCategoryData,
  QuestionCategoryParams,
  QuestionCategoryPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'question-category'
  }
}

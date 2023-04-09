// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Ideology, IdeologyData, IdeologyPatch, IdeologyQuery } from './ideology.schema'

export type { Ideology, IdeologyData, IdeologyPatch, IdeologyQuery }

export interface IdeologyParams extends KnexAdapterParams<IdeologyQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class IdeologyService<ServiceParams extends Params = IdeologyParams> extends KnexService<
  Ideology,
  IdeologyData,
  IdeologyParams,
  IdeologyPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('sqliteClient'),
    name: 'ideology'
  }
}

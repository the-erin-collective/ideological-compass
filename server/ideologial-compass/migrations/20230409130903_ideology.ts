// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ideology', (table) => {
    table.string('id')

    table.string('name')

    table.string('description')
    
    table.text('referenceLinks') // json array of strings
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ideology')
}

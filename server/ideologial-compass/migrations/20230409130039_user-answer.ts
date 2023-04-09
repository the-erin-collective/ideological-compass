// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user-answer', (table) => {
    table.string('id')

    table.string('userId')
    
    table.string('ideologyAnswerId')

    table.string('questionId')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user-answer')
}

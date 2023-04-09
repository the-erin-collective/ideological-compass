// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('ideology-answer', (table) => {
    table.string('id')

    table.string('text')

    table.string('ideologyId')

    table.string('questionId')

    table.string('categoryId')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('ideology-answer')
}

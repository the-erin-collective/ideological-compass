// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('survey', (table) => {
    table.string('id')

    table.text('rootQuestions') // json array of {questionId: string, priority:number} 
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('survey')
}

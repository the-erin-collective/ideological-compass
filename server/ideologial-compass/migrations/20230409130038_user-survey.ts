// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user-survey', (table) => {
    table.string('id')

    table.string('userId')

    table.date('createdAt')

    table.string('closestMatchIdeologyId')

    table.text('questionsAndAnswers').nullable() // json array of { priority: number, questionId: string, userAnswerId: string }
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user-survey')
}

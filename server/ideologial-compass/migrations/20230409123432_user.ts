// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('id')

    table.string('googleId')

    table.string('facebookId')

    table.string('twitterId')

    table.string('githubId')

    table.string('auth0Id')
    
    table.string('email').nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}

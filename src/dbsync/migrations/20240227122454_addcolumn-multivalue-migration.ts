import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`ALTER TABLE table_x ADD COLUMN columnMultiValue TEXT DEFAULT NULL;`)])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`ALTER TABLE table_x DROP COLUMN columnMultiValue;`)])
}

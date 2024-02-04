import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`ALTER TABLE table_u ADD COLUMN columnSelect VARCHAR(255);`)])
}

export async function down(knex: Knex): Promise<unknown> {
    return Promise.all([
        knex.schema.raw(`ALTER TABLE table_u DROP COLUMN columnSelect;`),
      ])
}

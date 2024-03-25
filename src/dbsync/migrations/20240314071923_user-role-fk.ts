import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.schema.raw(`ALTER TABLE table_u DROP COLUMN urole;`),
    knex.schema.raw(`ALTER TABLE table_u ADD COLUMN role_id INT DEFAULT NULL;`),
    knex.schema.raw(
      `ALTER TABLE table_u ADD CONSTRAINT fk_user_role_id FOREIGN KEY (role_id) REFERENCES user_roles (uid)`
    ),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`ALTER TABLE table_u DROP COLUMN role_id;`)])
}

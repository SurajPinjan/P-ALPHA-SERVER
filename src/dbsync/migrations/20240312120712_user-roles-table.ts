import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.schema.raw(`CREATE TABLE user_roles (
      uid int NOT NULL AUTO_INCREMENT,
      role_name varchar(500) NOT NULL,
      createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      createBy varchar(255) DEFAULT NULL,
      updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      updateBy varchar(255) DEFAULT NULL,
      isDeleted tinyint(1) DEFAULT '0',
      PRIMARY KEY (uid),
      UNIQUE (role_name)
    ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`DROP TABLE user_roles;`)])
}

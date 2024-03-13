import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.schema.raw(`CREATE TABLE permissions (
      uid int NOT NULL AUTO_INCREMENT,
      permission varchar(500) NOT NULL,
      perm_type varchar(50) NOT NULL,
      createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      createBy varchar(255) DEFAULT NULL,
      updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      updateBy varchar(255) DEFAULT NULL,
      isDeleted tinyint(1) DEFAULT '0',
      PRIMARY KEY (uid),
      UNIQUE KEY perm_perm_type_constraint (permission,perm_type)
    ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`DROP TABLE permissions;`)])
}

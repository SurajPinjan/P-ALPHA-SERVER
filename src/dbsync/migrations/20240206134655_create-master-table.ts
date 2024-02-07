import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw(`CREATE TABLE table_master (
            uid int NOT NULL AUTO_INCREMENT,
            master varchar (100) NOT NULL,
            createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
            createBy text,
            updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            updateBy text,
            isDeleted tinyint NOT NULL,
            PRIMARY KEY (uid)
           ) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`DROP TABLE table_master;`)])
}

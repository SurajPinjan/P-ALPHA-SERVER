import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.schema.raw(`CREATE TABLE table_x (
      uid int NOT NULL AUTO_INCREMENT,
      columnNumber int DEFAULT NULL,
      columnDate tinytext,
      url varchar(500) DEFAULT NULL,
      createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      createBy varchar(255) DEFAULT NULL,
      updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      updateBy varchar(255) DEFAULT NULL,
      isDeleted tinyint(1) DEFAULT '0',
      PRIMARY KEY (uid)
    ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `),

    knex.raw(`CREATE TABLE table_u (
      uid int NOT NULL AUTO_INCREMENT,
      username varchar(225) NOT NULL,
      passwordHash text NOT NULL,
      createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      createBy varchar(255) DEFAULT NULL,
      updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      updateBy varchar(255) DEFAULT NULL,
      isDeleted tinyint(1) DEFAULT '0',
      urole varchar(50) NOT NULL DEFAULT 'operator',
      PRIMARY KEY (uid),
      UNIQUE KEY username (username)
    ) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`),

    knex.schema.raw(`CREATE TABLE table_media (
          uid int NOT NULL AUTO_INCREMENT,
          fileurl varchar(500) DEFAULT NULL,
          filetype varchar(100) DEFAULT NULL,
          tag varchar(500) DEFAULT NULL,
          filesize int DEFAULT NULL,
          filename varchar(1000) DEFAULT NULL,
          entityType varchar(225) NOT NULL,
          entityId int NOT NULL,
          createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          createBy varchar(255) DEFAULT NULL,
          updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          updateBy varchar(255) DEFAULT NULL,
          isDeleted tinyint(1) DEFAULT '0',
          PRIMARY KEY (uid)
        ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.schema.raw(`DROP TABLE table_media;`),
    knex.schema.raw(`DROP TABLE table_u;`),
    knex.schema.raw(`DROP TABLE table_x;`),
  ])
}

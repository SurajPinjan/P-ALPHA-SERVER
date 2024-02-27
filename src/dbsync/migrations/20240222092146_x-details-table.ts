import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.schema.raw(`CREATE TABLE table_xdetail (
    uid int NOT NULL AUTO_INCREMENT,
    x_id int NOT NULL,
    columnDetail varchar(500) DEFAULT NULL,
    createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    createBy varchar(255) DEFAULT NULL,
    updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updateBy varchar(255) DEFAULT NULL,
    isDeleted tinyint(1) DEFAULT '0',
    PRIMARY KEY (uid),
    KEY x_id (x_id),
    CONSTRAINT table_xdetail_ibfk_1 FOREIGN KEY (x_id) REFERENCES table_x (uid)
) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;`),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`DROP TABLE table_xdetail;`)])
}

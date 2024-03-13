import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.schema.raw(`CREATE TABLE default_permissions (
        uid int NOT NULL AUTO_INCREMENT,
        role_id int NOT NULL,
        perm_id int NOT NULL,
        createDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        createBy varchar(255) DEFAULT NULL,
        updateDate timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        updateBy varchar(255) DEFAULT NULL,
        isDeleted tinyint(1) DEFAULT '0',
        PRIMARY KEY (uid),
        KEY role_id (role_id),
        KEY perm_id (perm_id),
        CONSTRAINT table_role_ibfk_1 FOREIGN KEY (role_id) REFERENCES user_roles (uid),
        CONSTRAINT table_perm_ibfk_1 FOREIGN KEY (perm_id) REFERENCES permissions (uid)
      ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([knex.schema.raw(`DROP TABLE default_permissions;`)])
}

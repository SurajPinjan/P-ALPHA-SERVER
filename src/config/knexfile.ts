import { Knex } from 'knex'
import { MYSQL_CLIENT } from '../types/enums'

const DB_HOST: string = 'localhost'
const DB_USER: string = 'root'
const DB_PASSWORD: string = 'admin123'
const DB_NAME: string = 'schema_a'
const KNEX_MIGRATION_DIR: string = '../dbsync/migrations'
const KNEX_SEED_DIR: string = '../dbsync/seeds'

const knexConfig: Knex.Config = {
  client: MYSQL_CLIENT,
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: KNEX_MIGRATION_DIR, // Specify the output directory for migrations
  },
  seeds: {
    directory: KNEX_SEED_DIR, // Specify the output directory for seeds
  },
}

export default knexConfig
